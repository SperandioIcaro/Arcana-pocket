import { Arcano, TarotCard } from '../types';
import { LOCAL } from './cardImages';

// Imagens: Rider-Waite-Smith (1909, domínio público) via Wikimedia Commons.
const img = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}.jpg?width=400`;
const kw = (s: string) => s.split(', ');

// [nome, inglês, arquivo, palavras normal, palavras invertida, significado normal, significado invertida]
type MajorRow = [string, string, string, string, string, string, string];

const MAJORS: MajorRow[] = [
  ['O Louco', 'The Fool', 'RWS_Tarot_00_Fool', 'novos começos, espontaneidade, fé no desconhecido', 'imprudência, medo de arriscar, ingenuidade', 'Um salto de fé. Início de uma jornada com leveza, liberdade e confiança no processo.', 'Impulsividade sem avaliar riscos, ou paralisia diante de um caminho novo.'],
  ['O Mago', 'The Magician', 'RWS_Tarot_01_Magician', 'manifestação, poder pessoal, habilidade', 'manipulação, talento desperdiçado, falta de foco', 'Você tem os recursos e a capacidade para transformar uma ideia em realidade.', 'Energia dispersa, truques e promessas vazias, ou potencial que não está sendo usado.'],
  ['A Sacerdotisa', 'The High Priestess', 'RWS_Tarot_02_High_Priestess', 'intuição, mistério, sabedoria interior', 'segredos, intuição ignorada, desconexão', 'Hora de ouvir a voz interior e observar o que ainda não foi dito.', 'Ruído demais para ouvir a intuição, ou informações escondidas que distorcem o quadro.'],
  ['A Imperatriz', 'The Empress', 'RWS_Tarot_03_Empress', 'abundância, criatividade, cuidado, fertilidade', 'dependência, bloqueio criativo, excesso de zelo', 'Nutrir, criar e receber. Fase de fartura, prazer e crescimento.', 'Sufocar ou negligenciar, falta de autocuidado, criatividade travada.'],
  ['O Imperador', 'The Emperor', 'RWS_Tarot_04_Emperor', 'autoridade, estrutura, estabilidade', 'rigidez, autoritarismo, falta de disciplina', 'Ordem, limites claros e liderança firme constroem uma base sólida.', 'Controle excessivo e teimosia, ou ausência de estrutura e de pulso firme.'],
  ['O Hierofante', 'The Hierophant', 'RWS_Tarot_05_Hierophant', 'tradição, ensino, valores compartilhados', 'rebeldia, dogmatismo, quebra de regras', 'Aprender com uma tradição, um mestre ou uma instituição e seguir um caminho conhecido.', 'Questionar regras que já não servem, ou se prender a dogmas.'],
  ['Os Enamorados', 'The Lovers', 'RWS_Tarot_06_Lovers', 'amor, escolhas, alinhamento de valores', 'desarmonia, indecisão, valores desalinhados', 'União profunda e uma escolha importante feita com o coração e com os valores.', 'Desencontro, dúvida entre caminhos ou escolhas que traem o que você valoriza.'],
  ['O Carro', 'The Chariot', 'RWS_Tarot_07_Chariot', 'determinação, vitória, controle', 'falta de direção, agressividade, perda de controle', 'Foco e força de vontade levam à vitória quando forças opostas são conduzidas juntas.', 'Forças puxando para lados diferentes, agressividade ou falta de rumo.'],
  ['A Força', 'Strength', 'RWS_Tarot_08_Strength', 'coragem, paciência, domínio gentil', 'dúvida, insegurança, fraqueza interior', 'A verdadeira força é suave: compaixão e paciência domam os próprios instintos.', 'Autoconfiança abalada, impulsos que dominam, necessidade de se reconectar com a própria coragem.'],
  ['O Eremita', 'The Hermit', 'RWS_Tarot_09_Hermit', 'introspecção, busca interior, orientação', 'isolamento, solidão, recusa de conselhos', 'Um tempo a sós para refletir e encontrar a própria luz ou um guia sábio.', 'Isolamento que deixou de ajudar, ou fuga de olhar para dentro.'],
  ['A Roda da Fortuna', 'Wheel of Fortune', 'RWS_Tarot_10_Wheel_of_Fortune', 'ciclos, destino, mudança de sorte', 'má sorte, resistência à mudança, ciclo repetido', 'A vida gira: um ciclo se fecha e outro começa, com um toque de acaso.', 'Sensação de azar ou de repetir padrões; resistência a um ciclo que já virou.'],
  ['A Justiça', 'Justice', 'RWS_Tarot_11_Justice', 'justiça, verdade, causa e efeito', 'injustiça, desonestidade, fuga da responsabilidade', 'Decisões equilibradas e consequências coerentes com as ações.', 'Parcialidade, mentiras ou recusa em assumir as consequências.'],
  ['O Enforcado', 'The Hanged Man', 'RWS_Tarot_12_Hanged_Man', 'pausa, entrega, nova perspectiva', 'estagnação, sacrifício inútil, resistência', 'Suspender a ação para enxergar de outro ângulo. Soltar o controle.', 'Ficar parado por medo, ou sacrificar-se sem propósito.'],
  ['A Morte', 'Death', 'RWS_Tarot_13_Death', 'fim de ciclo, transformação, renascimento', 'resistência à mudança, apego, estagnação', 'Um final necessário abre espaço para o novo. Raramente fala de morte literal.', 'Agarrar-se ao que já terminou e adiar uma transformação inevitável.'],
  ['A Temperança', 'Temperance', 'RWS_Tarot_14_Temperance', 'equilíbrio, moderação, paciência', 'excesso, desequilíbrio, pressa', 'Combinar opostos na medida certa. Cura gradual e visão de longo prazo.', 'Extremos, pressa e falta de harmonia entre áreas da vida.'],
  ['O Diabo', 'The Devil', 'RWS_Tarot_15_Devil', 'apego, vícios, sombra, materialismo', 'libertação, romper correntes, consciência da sombra', 'Amarras que parecem fortes mas são escolhidas: vícios, dependências, relações de posse.', 'Começar a enxergar e soltar as correntes. Recuperar o poder pessoal.'],
  ['A Torre', 'The Tower', 'RWS_Tarot_16_Tower', 'ruptura, revelação, mudança súbita', 'evitar o desastre, medo da mudança, colapso lento', 'Estruturas falsas desmoronam de uma vez para que a verdade apareça.', 'A crise é adiada ou vem aos poucos; resistência ao que precisa cair.'],
  ['A Estrela', 'The Star', 'RWS_Tarot_17_Star', 'esperança, cura, inspiração', 'desesperança, desconexão, falta de fé', 'Calma depois da tempestade. Renovação e confiança no futuro.', 'Desânimo, dificuldade em acreditar que as coisas vão melhorar.'],
  ['A Lua', 'The Moon', 'RWS_Tarot_18_Moon', 'ilusão, medo, subconsciente', 'clareza chegando, medo superado, verdade revelada', 'Nem tudo é o que parece. Emoções e medos turvam a visão; confie na intuição com cautela.', 'A névoa começa a se dissipar e segredos ou medos vêm à tona.'],
  ['O Sol', 'The Sun', 'RWS_Tarot_19_Sun', 'alegria, sucesso, vitalidade', 'otimismo excessivo, alegria adiada, ego', 'Clareza, calor e conquistas. Tudo fica mais leve e visível.', 'Felicidade que demora ou entusiasmo exagerado que ignora problemas.'],
  ['O Julgamento', 'Judgement', 'RWS_Tarot_20_Judgement', 'despertar, chamado, renovação', 'autocrítica, dúvida, ignorar o chamado', 'Hora de reavaliar o passado, perdoar e responder a um chamado maior.', 'Autojulgamento duro ou recusa em encarar uma decisão importante.'],
  ['O Mundo', 'The World', 'RWS_Tarot_21_World', 'conclusão, realização, integração', 'incompleto, atrasos, falta de fechamento', 'Um ciclo completo e bem vivido. Sensação de inteireza e conquista.', 'Falta o último passo para fechar o ciclo, ou dificuldade em concluir.'],
];

const RANKS = ['Ás', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez', 'Pajem', 'Cavaleiro', 'Rainha', 'Rei'];
const RANKS_EN = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

interface Suit {
  id: Arcano;
  pt: string;
  en: string;
  file: string;
  domain: string;
  data: string[]; // "normal|invertida" por carta, na ordem de RANKS
}

const SUITS: Suit[] = [
  {
    id: 'paus', pt: 'Paus', en: 'Wands', file: 'Wands',
    domain: 'da ação, da energia e da criatividade (Fogo)',
    data: [
      'inspiração, novo projeto, energia|bloqueio criativo, atraso, falta de motivação',
      'planejamento, decisão, visão de futuro|medo do desconhecido, mau planejamento, zona de conforto',
      'expansão, progresso, espera por resultados|obstáculos, atrasos, falta de visão',
      'celebração, harmonia, lar|instabilidade, conflito em casa, celebração adiada',
      'competição, conflito, disputa|evitar conflito, tensão interna, fim da disputa',
      'vitória, reconhecimento, orgulho|queda, falta de reconhecimento, arrogância',
      'defesa, perseverança, postura firme|sobrecarga, desistência, ceder',
      'velocidade, movimento, notícias|atrasos, pressa, frustração',
      'resiliência, cautela, última etapa|exaustão, paranoia, teimosia',
      'fardo, responsabilidade, sobrecarga|delegar, aliviar o peso, esgotamento',
      'curiosidade, entusiasmo, novidade|imaturidade, falta de direção, ideias sem ação',
      'paixão, aventura, impulsividade|pressa, raiva, inconstância',
      'confiança, carisma, independência|ciúme, egocentrismo, insegurança',
      'liderança, visão, empreendedorismo|autoritarismo, impulsividade, expectativas altas demais',
    ],
  },
  {
    id: 'copas', pt: 'Copas', en: 'Cups', file: 'Cups',
    domain: 'das emoções e dos relacionamentos (Água)',
    data: [
      'amor novo, intuição, abertura emocional|emoções reprimidas, vazio, bloqueio emocional',
      'união, parceria, atração mútua|desequilíbrio, rompimento, desencontro',
      'amizade, celebração, comunidade|excessos, fofoca, isolamento',
      'apatia, contemplação, desinteresse|novas oportunidades, sair da apatia, despertar',
      'perda, luto, arrependimento|aceitação, seguir em frente, perdão',
      'nostalgia, infância, reencontro|preso ao passado, ingenuidade, idealização',
      'ilusão, escolhas, fantasia|clareza, decisão, desilusão',
      'abandono, busca de sentido, partir|medo de partir, estagnação, fuga',
      'desejo realizado, satisfação, contentamento|insatisfação, ganância, vaidade',
      'felicidade familiar, plenitude, harmonia|desarmonia, valores desalinhados, família em conflito',
      'sensibilidade, mensagem afetiva, criatividade|imaturidade emocional, bloqueio criativo, drama',
      'romance, proposta, idealismo|promessas vazias, mau humor, ciúme',
      'empatia, intuição, acolhimento|dependência emocional, hipersensibilidade, manipulação',
      'equilíbrio emocional, diplomacia, compaixão|frieza, manipulação, repressão',
    ],
  },
  {
    id: 'espadas', pt: 'Espadas', en: 'Swords', file: 'Swords',
    domain: 'da mente, da comunicação e dos conflitos (Ar)',
    data: [
      'clareza, verdade, avanço mental|confusão, brutalidade, julgamento nublado',
      'impasse, indecisão, bloqueio|informação nova, fim do impasse, ansiedade',
      'dor, coração partido, tristeza|cura, perdão, superar a dor',
      'descanso, recuperação, pausa|esgotamento, inquietação, volta à ação',
      'derrota, conflito, vitória vazia|reconciliação, remorso, deixar para lá',
      'transição, travessia, alívio|resistência à mudança, assuntos pendentes, estar preso',
      'estratégia, furtividade, engano|confessar, consciência pesada, ser descoberto',
      'restrição, sentir-se preso, medo|libertação, nova perspectiva, autoconfiança',
      'ansiedade, pesadelos, preocupação|esperança, pedir ajuda, superar medos',
      'fim doloroso, traição, fundo do poço|recuperação, renascimento, resistência ao fim',
      'curiosidade, vigilância, ideias novas|fofoca, palavras duras, falta de preparo',
      'ação rápida, ambição, intelecto|agressividade, imprudência, impaciência',
      'clareza, independência, honestidade|frieza, amargura, crueldade',
      'autoridade intelectual, justiça, verdade|abuso de poder, manipulação, rigidez',
    ],
  },
  {
    id: 'ouros', pt: 'Ouros', en: 'Pentacles', file: 'Pents',
    domain: 'do trabalho, do dinheiro e do corpo (Terra)',
    data: [
      'oportunidade, prosperidade, semente|oportunidade perdida, escassez, planos ruins',
      'equilíbrio, adaptação, malabarismo|desorganização, sobrecarga, prioridades confusas',
      'trabalho em equipe, aprendizado, qualidade|falta de cooperação, desalinhamento, mediocridade',
      'segurança, controle, apego|generosidade, desapego, medo de perder',
      'dificuldade, carência, exclusão|recuperação, ajuda chegando, superação',
      'generosidade, troca justa, caridade|dívidas, desigualdade, generosidade interesseira',
      'paciência, avaliação, investimento|impaciência, frustração, esforço sem retorno',
      'dedicação, aprimoramento, ofício|perfeccionismo, falta de foco, trabalho monótono',
      'independência, luxo, autossuficiência|dependência, ostentação, insegurança financeira',
      'legado, estabilidade, família|instabilidade financeira, conflito de herança, fracasso',
      'estudo, oportunidade, diligência|procrastinação, falta de foco, projetos sem base',
      'constância, responsabilidade, método|estagnação, teimosia, tédio',
      'praticidade, cuidado, abundância|desleixo, materialismo, sobrecarga',
      'prosperidade, segurança, liderança prática|ganância, teimosia, apego a bens',
    ],
  },
];

const majors: TarotCard[] = MAJORS.map(([name, nameEn, file, up, rev, upM, revM], i) => ({
  id: `maior-${i}`,
  name,
  nameEn,
  arcano: 'maior',
  number: i,
  image: LOCAL[`maior-${i}`] ?? img(file),
  upright: { keywords: kw(up), meaning: upM },
  reversed: { keywords: kw(rev), meaning: revM },
}));

const minors: TarotCard[] = SUITS.flatMap((suit) =>
  suit.data.map((row, i) => {
    const [up, rev] = row.split('|');
    return {
      id: `${suit.id}-${i + 1}`,
      name: `${RANKS[i]} de ${suit.pt}`,
      nameEn: `${RANKS_EN[i]} of ${suit.en}`,
      arcano: suit.id,
      number: i + 1,
      image: LOCAL[`${suit.id}-${i + 1}`] ?? img(`${suit.file}${String(i + 1).padStart(2, "0")}`),
      upright: { keywords: kw(up), meaning: `Na esfera ${suit.domain}, a carta fala de ${up}.` },
      reversed: { keywords: kw(rev), meaning: `Na esfera ${suit.domain}, a carta sugere ${rev}.` },
    } as TarotCard;
  })
);

export const CARDS: TarotCard[] = [...majors, ...minors];

export const getCard = (id: string) => CARDS.find((c) => c.id === id);

export const ARCANO_LABEL: Record<Arcano, string> = {
  maior: 'Arcanos Maiores',
  paus: 'Paus',
  copas: 'Copas',
  espadas: 'Espadas',
  ouros: 'Ouros',
};
