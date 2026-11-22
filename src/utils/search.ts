import { ARCANO_LABEL } from '../data/cards';
import { TarotCard } from '../types';

export const norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const NUMBER_WORDS: Record<string, number> = {
  as: 1, um: 1, uma: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5,
  seis: 6, sete: 7, oito: 8, nove: 9, dez: 10,
};
const STOP = new Set(['de', 'do', 'da', 'dos', 'das', 'ou', 'e']);

// Aceita: "seis", "6", "6 de ouro", "6, 7 ou 8 de ouros", "rainha de copas", palavras-chave, etc.
export function matchesQuery(card: TarotCard, query: string): boolean {
  const tokens = norm(query).split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const numbers: number[] = [];
  const terms: string[] = [];
  for (const t of tokens) {
    if (STOP.has(t)) continue;
    if (/^\d+$/.test(t)) numbers.push(parseInt(t, 10));
    else if (t in NUMBER_WORDS) numbers.push(NUMBER_WORDS[t]);
    else terms.push(t);
  }

  if (numbers.length > 0) {
    if (!numbers.includes(card.number)) return false;
    // com naipe/termo na busca, os Arcanos Maiores ficam de fora
    if (card.arcano === 'maior' && terms.length > 0) return false;
  }

  if (terms.length === 0) return true;
  const hay = norm(
    [card.name, card.nameEn, ARCANO_LABEL[card.arcano], ...card.upright.keywords, ...card.reversed.keywords].join(' ')
  );
  return terms.every((t) => hay.includes(t));
}
