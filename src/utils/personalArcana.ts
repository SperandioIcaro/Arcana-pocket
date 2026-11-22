// Cálculo dos 3 Arcanos Pessoais. Somente adição; resultado entre 1 e 22.

const TABLE: Record<string, number> = {};
const GROUPS: [string, number][] = [
  ['AJS', 1], ['BKT', 2], ['CLU', 3], ['DMV', 4], ['ENW', 5],
  ['FOX', 6], ['GPY', 7], ['HQZ', 8], ['IR', 9],
];
GROUPS.forEach(([letters, v]) => letters.split('').forEach((l) => { TABLE[l] = v; }));

export const PYTHAGOREAN_TABLE = GROUPS.map(([letters, v]) => ({ value: v, letters: letters.split('').join(', ') }));

export interface Reduced {
  steps: string[]; // ex.: "3 + 9 = 12"
  value: number; // entre 1 e 22
}

// Reduz por soma dos algarismos enquanto o número for maior que 22.
export function reduceTo22(n: number): Reduced {
  const steps: string[] = [];
  let v = n;
  while (v > 22) {
    const digits = String(v).split('');
    const sum = digits.reduce((acc, d) => acc + Number(d), 0);
    steps.push(`${digits.join(' + ')} = ${sum}`);
    v = sum;
  }
  return { steps, value: v };
}

export type ParsedDate = { ok: true; day: number; month: number; year: number } | { ok: false; error: string };

export function parseBirthDate(text: string): ParsedDate {
  const m = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return { ok: false, error: 'Digite a data completa, como 14/09/1996.' };
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(year, month - 1, day);
  const valid = d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
  if (!valid || year < 1900 || year > new Date().getFullYear()) {
    return { ok: false, error: 'Essa data não existe. Confira dia, mês e ano.' };
  }
  return { ok: true, day, month, year };
}

export interface LifeResult extends Reduced {
  digits: number[];
  sum: number;
}

export function lifeArcano(day: number, month: number, year: number): LifeResult {
  const text = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`;
  const digits = text.split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return { digits, sum, ...reduceTo22(sum) };
}

export interface NamePart {
  word: string;
  letters: { char: string; value: number }[];
  sum: number;
}

export interface ExpressionResult extends Reduced {
  parts: NamePart[];
  total: number;
}

export function expressionArcano(fullName: string): ExpressionResult | null {
  const words = fullName.toUpperCase().split(/[\s'’\-]+/).filter(Boolean);
  const parts: NamePart[] = [];
  for (const word of words) {
    const letters: { char: string; value: number }[] = [];
    for (const char of word) {
      const base = char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (/^[A-Z]$/.test(base)) letters.push({ char, value: TABLE[base] });
    }
    if (letters.length > 0) {
      parts.push({ word, letters, sum: letters.reduce((a, l) => a + l.value, 0) });
    }
  }
  if (parts.length === 0) return null;
  const total = parts.reduce((a, p) => a + p.sum, 0);
  return { parts, total, ...reduceTo22(total) };
}

export interface SynthesisResult extends Reduced {
  sum: number;
}

export function synthesisArcano(life: number, expression: number): SynthesisResult {
  const sum = life + expression;
  return { sum, ...reduceTo22(sum) };
}
