// Pos-build: ofusca os .js do CLIENTE (nao o servidor).
// Uso: node tools/obfuscate-dist.mjs [pasta] [limiteKB]
//   padrao: .output/public/assets  e  400 KB (arquivos maiores sao pulados)
// Requer: npm i -D javascript-obfuscator
import fs from "node:fs";
import path from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const dir = process.argv[2] ?? ".output/public/assets";
const limitKB = Number(process.argv[3] ?? 400);
const options = JSON.parse(
  fs.readFileSync(new URL("./obfuscator.config.json", import.meta.url), "utf8"),
);

function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

for (const file of walk(dir)) {
  if (!file.endsWith(".js")) continue;
  const kb = fs.statSync(file).size / 1024;
  if (kb > limitKB) {
    console.log(`pulado (${kb.toFixed(0)} KB): ${file}`);
    continue;
  }
  const code = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, JavaScriptObfuscator.obfuscate(code, options).getObfuscatedCode());
  console.log(`ofuscado: ${file}`);
}
