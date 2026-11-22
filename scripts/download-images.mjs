// Baixa as 78 cartas (Rider-Waite-Smith, domínio público) para assets/cards/
// e gera src/data/cardImages.ts. Rode na raiz do projeto: node scripts/download-images.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const MAJORS = [
  'Fool', 'Magician', 'High_Priestess', 'Empress', 'Emperor', 'Hierophant', 'Lovers', 'Chariot',
  'Strength', 'Hermit', 'Wheel_of_Fortune', 'Justice', 'Hanged_Man', 'Death', 'Temperance',
  'Devil', 'Tower', 'Star', 'Moon', 'Sun', 'Judgement', 'World',
];
const SUITS = [['paus', 'Wands'], ['copas', 'Cups'], ['espadas', 'Swords'], ['ouros', 'Pents']];

const items = [];
MAJORS.forEach((name, i) => items.push([`maior-${i}`, `RWS_Tarot_${String(i).padStart(2, '0')}_${name}`]));
for (const [id, file] of SUITS) {
  for (let n = 1; n <= 14; n++) items.push([`${id}-${n}`, `${file}${String(n).padStart(2, '0')}`]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const headers = { 'User-Agent': 'ArcanaPocket/1.0 (projeto pessoal de estudo)' };

async function download(file, dest) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}.jpg?width=400`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, { headers, redirect: 'follow' });
    if (res.ok) {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return true;
    }
    if (res.status === 429 || res.status >= 500) await sleep(2000 * attempt);
    else return false;
  }
  return false;
}

await mkdir('assets/cards', { recursive: true });
const ok = [];
const failed = [];

for (const [id, file] of items) {
  const dest = `assets/cards/${id}.jpg`;
  if (existsSync(dest)) { ok.push(id); continue; }
  const done = await download(file, dest);
  (done ? ok : failed).push(done ? id : `${id} (${file})`);
  console.log(`${done ? 'ok   ' : 'ERRO '} ${id}`);
  await sleep(700);
}

const lines = ok.map((id) => `  '${id}': require('../../assets/cards/${id}.jpg'),`);
await writeFile(
  'src/data/cardImages.ts',
  `// Gerado por scripts/download-images.mjs. Não edite à mão.\nexport const LOCAL: Record<string, number> = {\n${lines.join('\n')}\n};\n`
);

console.log(`\n${ok.length} imagens locais, ${failed.length} falharam.`);
if (failed.length) console.log('Falharam (o app usa a versão da internet nelas):\n' + failed.join('\n'));
