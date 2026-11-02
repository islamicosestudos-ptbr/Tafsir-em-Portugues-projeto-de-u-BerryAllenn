#!/usr/bin/env python3
"""Marca d'agua em PNG: bits LSB dos canais RGB + chunk tEXt.
  python3 tools/stego.py embed "<texto>" a.png b.png ...
  python3 tools/stego.py verify a.png b.png ...
Requer Pillow (Termux: pkg install python-pillow).
Limite honesto: sobrevive a copia exata do arquivo; NAO sobrevive a
redimensionar, recomprimir (JPEG/WebP) ou screenshot.
"""
import struct, sys, zlib
from PIL import Image
from PIL.PngImagePlugin import PngInfo

MAGIC = b"WZFP"

def _slots(im):
    px, (w, h), rgba = im.load(), im.size, im.mode == "RGBA"
    for y in range(h):
        for x in range(w):
            if rgba and px[x, y][3] == 0:
                continue
            for c in range(3):
                yield x, y, c

def _frame(payload):
    body = MAGIC + bytes([len(payload)]) + payload
    return body + struct.pack(">I", zlib.crc32(body))

def embed(path, text):
    with Image.open(path) as f:
        im = f.copy()
    bits = [(b >> i) & 1 for b in _frame(text.encode()) for i in range(7, -1, -1)]
    slots = list(_slots(im))
    if len(bits) > len(slots):
        raise SystemExit(f"capacidade insuficiente: {path}")
    px = im.load()
    for (x, y, c), bit in zip(slots, bits):
        p = list(px[x, y]); p[c] = (p[c] & ~1) | bit; px[x, y] = tuple(p)
    meta = PngInfo()
    meta.add_text("WZ-Fingerprint", text)
    meta.add_text("Author", "WAZLA / u/BerryAllenn")
    im.save(path, "PNG", pnginfo=meta)

def extract(path):
    with Image.open(path) as f:
        im = f.copy()
        text_chunk = getattr(f, "text", {}).get("WZ-Fingerprint")
    px = im.load()
    gen = (px[x, y][c] & 1 for x, y, c in _slots(im))
    def rd(n):
        out = bytearray()
        for _ in range(n):
            v = 0
            for _ in range(8):
                v = (v << 1) | next(gen)
            out.append(v)
        return bytes(out)
    try:
        head = rd(5)
        if head[:4] != MAGIC:
            return None, text_chunk
        body = head + rd(head[4])
        crc = struct.unpack(">I", rd(4))[0]
        return (body[5:].decode() if zlib.crc32(body) == crc else None), text_chunk
    except StopIteration:
        return None, text_chunk

if __name__ == "__main__":
    cmd, rest = sys.argv[1], sys.argv[2:]
    if cmd == "embed":
        text, files = rest[0], rest[1:]
        for p in files:
            embed(p, text); print("ok", p)
    elif cmd == "verify":
        for p in rest:
            lsb, txt = extract(p)
            print(f"{p}\n  LSB : {lsb}\n  tEXt: {txt}")
    else:
        sys.exit(__doc__)
