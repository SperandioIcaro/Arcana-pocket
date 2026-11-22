// Numeração do Tarot de Marselha: VIII = A Justiça, XI = A Força, 22 = O Louco (0).
// As imagens do app são Rider-Waite, então 8 e 11 apontam para as cartas trocadas.

export interface PersonalArcano {
  number: number;
  roman: string;
  name: string;
  cardId: string; // id da carta em cards.ts
  keywords: string[];
  vida: string;
  expressao: string;
  sintese: string;
}

export const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII'];

export const cardIdFor = (n: number) => (n === 22 ? 'maior-0' : n === 8 ? 'maior-11' : n === 11 ? 'maior-8' : `maior-${n}`);

// [nome, palavras-chave, vida, expressão, síntese]
const ROWS: [string, string, string, string, string][] = [
  ['O Mago', 'iniciativa, habilidade, vontade',
    'Sua jornada é aprender a transformar ideias em ação. Os desafios envolvem dispersão e dúvida sobre o próprio poder.',
    'Você se manifesta pela habilidade, pela comunicação e pela capacidade de começar coisas e dar forma a elas.',
    'O caminho de evolução é unir o que você é ao que você faz, usando seus recursos com intenção e foco.'],
  ['A Sacerdotisa', 'intuição, silêncio, sabedoria interior',
    'Sua jornada é desenvolver a escuta interior e a confiança na intuição. O aprendizado está em saber esperar e observar.',
    'Você se expressa de modo reservado e profundo. Seu talento é perceber o que está por trás das palavras.',
    'Evoluir é integrar razão e intuição, aprendendo quando falar e quando guardar o conhecimento.'],
  ['A Imperatriz', 'criação, acolhimento, abundância',
    'Sua jornada passa por criar, nutrir e aprender a receber. O desafio é cuidar sem sufocar e sem se esquecer de si.',
    'Você se manifesta pela criatividade, pela sensibilidade e pela capacidade de acolher e fazer crescer.',
    'O amadurecimento vem de transformar afeto em obra concreta e de equilibrar o dar com o receber.'],
  ['O Imperador', 'estrutura, autoridade, responsabilidade',
    'Sua jornada é construir bases sólidas e exercer autoridade com justiça. O desafio é a rigidez e a necessidade de controle.',
    'Você se expressa com firmeza, clareza e senso de ordem. Seu talento é organizar e liderar.',
    'Evoluir é conciliar disciplina e flexibilidade, usando o poder para proteger e sustentar, não para dominar.'],
  ['O Hierofante', 'ensino, tradição, valores',
    'Sua jornada envolve aprender e transmitir conhecimento, buscando sentido em valores e tradições. O desafio é não se prender a dogmas.',
    'Você se manifesta como mestre, conselheiro ou ponte entre o saber e as pessoas.',
    'O crescimento vem de transformar o que se aprende em exemplo vivido e de questionar o que já não serve.'],
  ['Os Enamorados', 'escolhas, vínculos, valores',
    'Sua jornada é aprender a escolher com o coração e a viver relações autênticas. O desafio é a indecisão.',
    'Você se expressa pela conexão, pela empatia e pela capacidade de harmonizar pessoas e opiniões.',
    'Evoluir é alinhar o que você sente, pensa e escolhe, assumindo as consequências das suas decisões.'],
  ['O Carro', 'determinação, direção, vitória',
    'Sua jornada é conquistar objetivos com foco e autodomínio. O desafio é conduzir forças opostas sem perder o rumo.',
    'Você se manifesta pela ação, pela coragem de seguir adiante e pela capacidade de vencer obstáculos.',
    'O amadurecimento vem de unir ambição e consciência, escolhendo bem para onde dirigir sua energia.'],
  ['A Justiça', 'equilíbrio, verdade, responsabilidade',
    'Sua jornada é aprender a lei de causa e efeito, agindo com honestidade e equilíbrio. O desafio é o julgamento excessivo.',
    'Você se expressa com clareza, senso de justiça e capacidade de ponderar antes de decidir.',
    'Evoluir é alinhar atos e valores, assumindo responsabilidade e buscando decisões justas, inclusive consigo.'],
  ['O Eremita', 'introspecção, sabedoria, busca',
    'Sua jornada é interior: buscar sentido, silêncio e a própria luz. O desafio é o isolamento excessivo.',
    'Você se manifesta de forma prudente e profunda. Seu talento é orientar com experiência e discrição.',
    'O crescimento vem de levar a sabedoria interior ao mundo, partilhando a luz sem se afastar das pessoas.'],
  ['A Roda da Fortuna', 'ciclos, mudança, oportunidade',
    'Sua jornada é marcada por ciclos de subida e queda. O aprendizado é fluir com as mudanças e aproveitar as oportunidades.',
    'Você se expressa com adaptabilidade e senso de oportunidade. Seu talento é se reinventar.',
    'Evoluir é aceitar que tudo se move, agindo com consciência para fazer a roda girar a seu favor.'],
  ['A Força', 'coragem, paciência, domínio gentil',
    'Sua jornada é desenvolver coragem serena e domar impulsos com gentileza. O desafio é a insegurança e a autocrítica.',
    'Você se manifesta com resiliência, calor humano e capacidade de lidar com situações intensas.',
    'O amadurecimento vem de unir instinto e consciência, usando a força interior com suavidade.'],
  ['O Enforcado', 'entrega, pausa, nova perspectiva',
    'Sua jornada ensina a soltar o controle e a ver as coisas por outro ângulo. O desafio é a sensação de estar parado.',
    'Você se expressa de modo original e contemplativo. Seu talento é enxergar o que os outros não veem.',
    'Evoluir é transformar sacrifício em sentido, aceitando pausas e mudanças de ponto de vista.'],
  ['A Morte', 'transformação, fim de ciclo, renovação',
    'Sua jornada passa por finais e recomeços profundos. O aprendizado é soltar o que terminou e se renovar.',
    'Você se manifesta como agente de mudança, com capacidade de eliminar o supérfluo e transformar situações.',
    'O crescimento vem de aceitar a transformação como parte natural da vida, renascendo mais verdadeiro.'],
  ['A Temperança', 'equilíbrio, cura, moderação',
    'Sua jornada é encontrar harmonia e paciência, integrando opostos. O desafio é o excesso e a pressa.',
    'Você se expressa com calma, diplomacia e capacidade de unir pessoas e ideias diferentes.',
    'Evoluir é equilibrar as áreas da vida, curando e misturando experiências em algo novo.'],
  ['O Diabo', 'desejo, apego, sombra',
    'Sua jornada envolve reconhecer desejos, apegos e padrões que prendem. O aprendizado é se libertar do que escraviza.',
    'Você se manifesta com magnetismo, intensidade e força de vontade. Atenção ao modo como usa seu poder de atração.',
    'O amadurecimento vem de integrar a sombra, transformando impulsos em energia consciente e livre.'],
  ['A Torre', 'ruptura, revelação, libertação',
    'Sua jornada inclui rupturas que derrubam o que era falso para você reconstruir com verdade. O desafio é a resistência.',
    'Você se expressa com franqueza e impacto. Seu talento é revelar verdades e abalar estruturas ultrapassadas.',
    'Evoluir é reconstruir a partir do essencial, vendo as crises como libertação.'],
  ['A Estrela', 'esperança, inspiração, cura',
    'Sua jornada é renovar a fé e a esperança, inspirando-se e cuidando de si. O desafio é o desânimo.',
    'Você se manifesta com leveza, otimismo e inspiração. Seu talento é iluminar o caminho dos outros.',
    'O crescimento vem de confiar no futuro e partilhar o que você tem de melhor.'],
  ['A Lua', 'intuição, sonhos, inconsciente',
    'Sua jornada é atravessar medos e ilusões para conhecer o inconsciente. O desafio é a insegurança e a confusão emocional.',
    'Você se expressa com sensibilidade, imaginação e profundidade emocional. Seu talento é o mundo simbólico.',
    'Evoluir é distinguir intuição de medo, trazendo à luz o que está oculto.'],
  ['O Sol', 'vitalidade, clareza, sucesso',
    'Sua jornada é brilhar com autenticidade, vivendo com alegria e clareza. O desafio é o ego e o excesso de otimismo.',
    'Você se manifesta com calor, entusiasmo e generosidade. Seu talento é energizar quem está ao redor.',
    'O amadurecimento vem de unir alegria e consciência, compartilhando sua luz sem ofuscar.'],
  ['O Julgamento', 'despertar, chamado, renovação',
    'Sua jornada é ouvir um chamado maior, rever o passado e renascer. O desafio é a autocrítica excessiva.',
    'Você se expressa como alguém que desperta e motiva os outros. Seu talento é convocar à mudança.',
    'Evoluir é perdoar, aprender com o passado e responder com coragem ao seu propósito.'],
  ['O Mundo', 'realização, integração, plenitude',
    'Sua jornada é de integração e conclusão de ciclos, com visão ampla. O desafio é a pressa de chegar.',
    'Você se manifesta com amplitude, versatilidade e senso de totalidade. Seu talento é conectar mundos.',
    'O crescimento vem de fechar ciclos com consciência e celebrar a inteireza do caminho.'],
  ['O Louco', 'liberdade, recomeço, fé',
    'Sua jornada é um salto de fé rumo ao desconhecido, com liberdade e espontaneidade. O desafio é a imprudência ou o medo de começar.',
    'Você se expressa de modo espontâneo, original e livre. Seu talento é ver o mundo com olhos novos.',
    'Evoluir é manter a leveza e a curiosidade enquanto aprende com a experiência.'],
];

export const ARCANA: PersonalArcano[] = ROWS.map(([name, kw, vida, expressao, sintese], i) => ({
  number: i + 1,
  roman: ROMAN[i + 1],
  name,
  cardId: cardIdFor(i + 1),
  keywords: kw.split(', '),
  vida,
  expressao,
  sintese,
}));

export const getArcano = (n: number) => ARCANA[n - 1];
