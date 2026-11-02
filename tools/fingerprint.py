#!/usr/bin/env python3
"""Fingerprint SHA-256 do projeto (arquivos-chave). Uso:
  python3 tools/fingerprint.py <pasta-do-projeto> [--date 20261029] [--tags]
O fingerprint oficial foi calculado sobre o projeto ORIGINAL (antes das marcas),
extraido do zip original. Rode este script na pasta extraida do zip original
para reproduzir o mesmo ID.
"""
import glob, hashlib, os, sys

PATTERNS = [
    "package.json", "tsconfig.json", "vite.config.ts", "metadata.json",
    "public/manifest.json", "src/styles.css",
    "src/routes/__root.tsx", "src/routes/index.tsx",
    "src/legacy/App.tsx", "src/legacy/data/*.ts", "src/legacy/services/*.ts",
    "src/legacy/types/*.ts", "src/legacy/components/*.tsx", "src/server/*.ts",
    "src/server.ts", "src/start.ts",
]

def sha(b): return hashlib.sha256(b).hexdigest()

def collect(root):
    files = set()
    for pat in PATTERNS:
        for p in glob.glob(os.path.join(root, pat)):
            if os.path.isfile(p):
                files.add(os.path.relpath(p, root).replace(os.sep, "/"))
    return sorted(files)

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    root = args[0] if args else "."
    date = "20261029"
    if "--date" in sys.argv:
        date = sys.argv[sys.argv.index("--date") + 1]
        args = [a for a in args if a != date]
    lines = []
    for rel in collect(root):
        with open(os.path.join(root, rel), "rb") as f:
            lines.append(f"{sha(f.read())}  {rel}\n")
    overall = sha("".join(lines).encode())
    fid = f"FP-{date}-TAFSIR-{overall[:12].upper()}"
    print("".join(lines), end="")
    print(f"\nSHA256_GERAL={overall}\nID={fid}")
    if "--tags" in sys.argv:
        for rel in collect(root):
            print(f"wz:{sha((fid + '|' + rel).encode())[:8]}  {rel}")

if __name__ == "__main__":
    main()
