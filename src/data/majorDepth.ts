// Aprofundamento dos Arcanos Maiores (ids iguais aos de cards.ts: 'maior-0' ... 'maior-21').
// n = posição normal, i = posição invertida.

export type ThemeId = 'geral' | 'amor' | 'trabalho' | 'espiritual' | 'simbolos' | 'reflexao';

type Pair = { n: string; i: string };

export interface CardDepth {
  extra: { n: string[]; i: string[] }; // palavras-chave ampliadas
  geral: Pair;
  amor: Pair;
  trabalho: Pair;
  espiritual: Pair;
  simbolos: string; // leitura da imagem (baralho Rider-Waite-Smith)
  reflexao: Pair; // pergunta para refletir
}

export const MAJOR_DEPTH: Record<string, CardDepth> = {
  'maior-0': {
    extra: {
      n: ['liberdade', 'inocência', 'aventura', 'leveza', 'confiança', 'recomeço'],
      i: ['descuido', 'ingenuidade', 'medo de começar', 'impulso', 'falta de planejamento', 'paralisia'],
    },
    geral: {
      n: 'Estar diante de um começo sem garantias. A carta convida a dar o primeiro passo com curiosidade, sem exigir ter todas as respostas antes de começar.',
      i: 'Pode apontar para um salto dado sem olhar o chão ou, ao contrário, para a recusa em começar por medo. O desafio é achar o meio entre coragem e prudência.',
    },
    amor: {
      n: 'Uma relação nova ou um recomeço afetivo, vivido com leveza e abertura. Pede entrega sem cobrar certezas do outro logo de início.',
      i: 'Entrar na relação sem pensar no que se quer, ou fugir de compromisso por medo. Vale conversar sobre expectativas antes de se jogar.',
    },
    trabalho: {
      n: 'Projeto novo, mudança de área ou oportunidade fora do roteiro. Bom momento para experimentar, desde que o risco seja assumido com consciência.',
      i: 'Decisões apressadas, promessas sem planejamento ou adiamento de uma ideia por insegurança. Falta organizar o que há de real por trás do entusiasmo.',
    },
    espiritual: {
      n: 'Fé no processo e desapego. A jornada importa mais do que o destino, e confiar no caminho é parte do aprendizado.',
      i: 'Confundir liberdade com fuga, ou travar a própria busca por medo de errar. Presença e discernimento ajudam a seguir.',
    },
    simbolos: 'O Louco está à beira de um penhasco, olhando para o alto e não para onde pisa: confiança, mas também risco. O cão branco aos seus pés é o instinto que o acompanha e o alerta. A trouxa no cajado carrega o que ele precisa, pouco e leve. A rosa branca simboliza pureza de intenção, o sol ao fundo traz otimismo e a pena no chapéu liga a mente ao ar e às ideias.',
    reflexao: {
      n: 'Que passo eu estou adiando só porque não tenho todas as garantias?',
      i: 'Estou agindo por impulso ou estou paralisado por medo? O que um olhar para o chão me mostraria?',
    },
  },
  'maior-1': {
    extra: {
      n: ['vontade', 'comunicação', 'iniciativa', 'concentração', 'recursos', 'criação'],
      i: ['dispersão', 'enganação', 'bloqueio', 'vaidade', 'promessas vazias', 'talento parado'],
    },
    geral: {
      n: 'Você tem em mãos o que precisa: ferramentas, ideias e vontade. A carta fala de transformar intenção em ação, usando o que já está disponível.',
      i: 'Energia espalhada demais ou usada para impressionar, e não para realizar. Também pode indicar um talento que segue guardado por falta de foco.',
    },
    amor: {
      n: 'Comunicação clara e iniciativa. Quem se expressa com honestidade e se mostra por inteiro atrai conexão de verdade.',
      i: 'Charme usado para convencer, jogos de sedução ou palavras que não se sustentam em atitudes. Vale desconfiar de discursos bonitos demais, inclusive os próprios.',
    },
    trabalho: {
      n: 'Competência, habilidade técnica e boa capacidade de execução. Bom momento para apresentar ideias, iniciar projetos e usar todos os recursos disponíveis.',
      i: 'Falta de foco, promessas maiores do que a entrega ou habilidades que não estão sendo aproveitadas. Atenção a propostas que parecem boas demais.',
    },
    espiritual: {
      n: 'Intenção e prática caminham juntas: o que está no alto se reflete embaixo. É a carta da vontade consciente aplicada ao crescimento interior.',
      i: 'Usar o conhecimento para alimentar o ego ou controlar, ou ficar só na teoria sem praticar. A coerência entre pensar e agir volta a ser o ponto.',
    },
    simbolos: 'Uma mão aponta o céu e a outra a terra: o que está em cima age embaixo. O oito deitado sobre a cabeça é o símbolo do infinito, sinal de energia sem fim. Na mesa estão os quatro naipes (bastão, copa, espada e pentáculo), as quatro áreas da vida à disposição. Rosas vermelhas e lírios brancos lembram desejo e pureza. A cobra mordendo a própria cauda no cinto é o ciclo que se renova.',
    reflexao: {
      n: 'O que eu já tenho em mãos e ainda não estou usando?',
      i: 'Onde minha energia está se dispersando, e o que eu realmente quero criar?',
    },
  },
  'maior-2': {
    extra: {
      n: ['silêncio', 'mistério', 'percepção', 'sonhos', 'discrição', 'sabedoria oculta'],
      i: ['segredos', 'dúvida', 'superficialidade', 'intuição bloqueada', 'ruído', 'informações escondidas'],
    },
    geral: {
      n: 'Nem tudo precisa ser dito ou resolvido agora. A carta pede observação, silêncio e atenção ao que se sente por baixo das aparências.',
      i: 'Excesso de barulho, opiniões alheias ou pressa para decidir abafam a percepção. Também pode indicar algo importante que está sendo ocultado.',
    },
    amor: {
      n: 'Uma conexão que se constrói no silêncio e na confiança, com espaço para o mistério. Pode indicar sentimentos que ainda não foram ditos.',
      i: 'Segredos, mal-entendidos ou desconfiança sem base clara. Sentimentos reprimidos podem estar pesando mais do que se admite.',
    },
    trabalho: {
      n: 'Momento de estudar, observar e entender o cenário antes de agir. Informações importantes ainda não estão à vista; paciência e discrição ajudam.',
      i: 'Decidir sem ter todas as informações, ou ignorar um sinal que a intuição já deu. Cuidado com bastidores e conversas que não são o que parecem.',
    },
    espiritual: {
      n: 'Contato com o mundo interior: sonhos, meditação, intuição. A carta do conhecimento que se recebe mais do que se aprende.',
      i: 'Desconexão da própria voz interior ou medo do que ela poderia mostrar. Reservar momentos de silêncio ajuda a reaprender a escutar.',
    },
    simbolos: 'Entre duas colunas, uma preta e outra branca, ela guarda o limiar entre o visível e o oculto. O pergaminho semiescondido sob o manto representa um saber que só se mostra a quem presta atenção. A lua crescente aos pés e a coroa lunar ligam a carta ao inconsciente e aos ciclos. O véu atrás dela, enfeitado com romãs, separa o que se vê do que ainda não pode ser visto.',
    reflexao: {
      n: 'O que eu já sei, lá no fundo, mas ainda não deixei vir à tona?',
      i: 'O que está me impedindo de escutar minha intuição: barulho de fora ou medo de dentro?',
    },
  },
  'maior-3': {
    extra: {
      n: ['natureza', 'afeto', 'sensualidade', 'nutrição', 'prosperidade', 'acolhimento'],
      i: ['sufocamento', 'descuido', 'estagnação criativa', 'dependência', 'excessos', 'autocuidado esquecido'],
    },
    geral: {
      n: 'Fase de fartura, cuidado e crescimento. Aquilo que foi plantado com atenção começa a dar frutos, e o prazer de viver ganha espaço.',
      i: 'Cuidar demais dos outros e de menos de si, ou o inverso: negligenciar o que precisa ser nutrido. Criatividade e energia podem estar travadas.',
    },
    amor: {
      n: 'Afeto generoso, carinho e sensualidade. Relações que acolhem e permitem crescer juntos, com atenção ao corpo e ao prazer.',
      i: 'Possessividade, dependência emocional ou desgaste por dar mais do que recebe. Também pode indicar distanciamento e falta de calor na relação.',
    },
    trabalho: {
      n: 'Projetos criativos, trabalhos de cuidado e resultados que se acumulam com o tempo. Boa fase para cultivar, e não só para colher.',
      i: 'Bloqueio criativo, projeto que não avança ou excesso de cuidado que vira controle. Vale rever o ritmo e a forma de alimentar o que se criou.',
    },
    espiritual: {
      n: 'Conexão com a natureza, o corpo e os ciclos da terra. O sagrado aparece no cotidiano, no cuidado e na criação.',
      i: 'Perder o contato com o corpo e a natureza, ou viver só na cabeça. Voltar ao básico (comer, descansar, estar ao ar livre) reabre a conexão.',
    },
    simbolos: 'Sentada em almofadas num campo de trigo, a Imperatriz usa uma coroa de doze estrelas, que remetem aos meses do ano e aos ciclos. O símbolo de Vênus no escudo fala de amor e beleza. O vestido estampado de romãs lembra fertilidade. Ao fundo, a floresta e o riacho mostram a natureza em plena abundância.',
    reflexao: {
      n: 'O que eu estou cultivando agora, e estou cuidando disso com carinho?',
      i: 'Onde estou me esquecendo de cuidar de mim, ou cuidando dos outros de um jeito que sufoca?',
    },
  },
  'maior-4': {
    extra: {
      n: ['ordem', 'liderança', 'proteção', 'disciplina', 'estratégia', 'segurança'],
      i: ['autoritarismo', 'teimosia', 'controle excessivo', 'imaturidade', 'falta de limites', 'despotismo'],
    },
    geral: {
      n: 'Estrutura, responsabilidade e firmeza. Pede organização, limites claros e a postura de quem assume o comando da própria vida.',
      i: 'Controle em excesso ou, ao contrário, falta de estrutura. Podem aparecer conflitos com autoridade, de dentro ou de fora.',
    },
    amor: {
      n: 'Compromisso estável, proteção e clareza sobre o que se quer. Relações que se apoiam em acordos e responsabilidade.',
      i: 'Rigidez, ciúme de controle ou dificuldade de ceder. Também pode indicar um parceiro ausente ou imaturo emocionalmente.',
    },
    trabalho: {
      n: 'Liderança, planejamento e metas bem definidas. Bom momento para organizar processos, assumir responsabilidades e construir algo duradouro.',
      i: 'Chefias autoritárias, disciplina que virou rigidez ou, no oposto, falta de método. Vale rever como a autoridade está sendo exercida.',
    },
    espiritual: {
      n: 'Disciplina como caminho: rotina, prática constante e limites saudáveis sustentam o crescimento interior.',
      i: 'Dogmatismo ou resistência a qualquer regra. Encontrar uma estrutura que apoie, e não aprisione, é o aprendizado.',
    },
    simbolos: 'O trono de pedra com cabeças de carneiro lembra Áries, a energia de iniciativa e comando. A armadura sob o manto vermelho mostra força preparada. O cetro em forma de ankh e o globo falam de vida e de domínio sobre o mundo material. O fundo de montanhas áridas indica que a autoridade nasce de um terreno firme, mas exige trabalho.',
    reflexao: {
      n: 'Onde eu preciso de mais estrutura e limites para sustentar o que quero?',
      i: 'Estou controlando demais ou deixando faltar direção? O que seria uma liderança saudável aqui?',
    },
  },
  'maior-5': {
    extra: {
      n: ['ensino', 'ritual', 'ética', 'instituições', 'mentoria', 'crença'],
      i: ['dogma', 'conformismo', 'rebeldia', 'hipocrisia', 'ruptura', 'questionamento'],
    },
    geral: {
      n: 'Aprender com quem veio antes, seguir caminhos reconhecidos e pertencer a uma comunidade. A carta fala de valores compartilhados e orientação.',
      i: 'Regras que já não fazem sentido, ou rebeldia por rebeldia. É hora de perguntar o que se quer manter e o que se precisa repensar.',
    },
    amor: {
      n: 'Compromissos formais, valores em comum e relações que seguem tradições, como casamento ou noivado. Importância da palavra dada.',
      i: 'Pressão social sobre a relação, papéis impostos ou desejo de viver o amor fora dos moldes. Vale separar o que é seu do que é expectativa alheia.',
    },
    trabalho: {
      n: 'Estudos, formação, mentoria e ambientes com normas claras. Boa fase para aprender com quem tem experiência e respeitar processos.',
      i: 'Burocracia que trava, cultura rígida ou vontade de romper com o modelo atual. Questionar com respeito costuma render mais que confrontar.',
    },
    espiritual: {
      n: 'Tradições, ritos e mestres como pontes para o sagrado. O caminho coletivo oferece apoio e sentido.',
      i: 'Distância de dogmas e instituições, buscando uma espiritualidade mais pessoal. Atenção para não trocar a fé pela rejeição automática.',
    },
    simbolos: 'O Hierofante usa a tríplice coroa e segura um cetro de três cruzes, que remetem aos três planos: corpo, mente e espírito. Duas chaves cruzadas a seus pés falam do acesso ao conhecimento. Os dois discípulos ajoelhados representam quem aprende. As duas colunas ao fundo indicam o limiar de um saber que se transmite de pessoa para pessoa.',
    reflexao: {
      n: 'O que eu aprendi com quem veio antes de mim, e o que faz sentido manter?',
      i: 'Que regra eu sigo sem saber por quê, e o que acontece se eu a questionar com respeito?',
    },
  },
  'maior-6': {
    extra: {
      n: ['união', 'escolha', 'harmonia', 'atração', 'vínculo', 'integridade'],
      i: ['conflito de valores', 'dúvida', 'tentação', 'desencontro', 'escolha adiada', 'desequilíbrio'],
    },
    geral: {
      n: 'Uma escolha importante feita com consciência, em alinhamento com valores. Também fala de parcerias que se complementam.',
      i: 'Indecisão, escolhas contra si mesmo ou relações em que há desequilíbrio. Vale perguntar qual valor está sendo deixado de lado.',
    },
    amor: {
      n: 'Amor recíproco, atração e conexão profunda. A carta valoriza a honestidade e a escolha de estar junto.',
      i: 'Desarmonia, dúvida sobre os sentimentos ou dificuldade de decidir entre pessoas ou caminhos. Terceiros ou tentações podem pesar.',
    },
    trabalho: {
      n: 'Parcerias profissionais harmônicas e escolhas de carreira em linha com valores pessoais. Cooperação traz bons frutos.',
      i: 'Sociedades desalinhadas, dilemas entre duas oportunidades ou decisões tomadas só por conveniência. Esclarecer prioridades ajuda.',
    },
    espiritual: {
      n: 'Integração entre razão e emoção, consciente e inconsciente. O desafio é viver de acordo com o que se acredita.',
      i: 'Distância entre o que se pensa e o que se faz. Rever as escolhas que contradizem o próprio senso de integridade.',
    },
    simbolos: 'Um homem e uma mulher nus, sem máscaras, vivem a verdade um diante do outro. O anjo acima, com os braços abertos, abençoa a união. Atrás da mulher está a árvore do conhecimento, com a serpente, e atrás do homem a árvore da vida, com doze chamas. A montanha ao fundo aponta a elevação possível por meio das escolhas.',
    reflexao: {
      n: 'Minhas escolhas estão alinhadas com aquilo em que eu acredito?',
      i: 'Que decisão estou evitando, e o que me assusta em escolher?',
    },
  },
  'maior-7': {
    extra: {
      n: ['conquista', 'foco', 'avanço', 'autodomínio', 'vontade', 'vitória'],
      i: ['descontrole', 'dispersão', 'agressividade', 'travamento', 'teimosia', 'sem rumo'],
    },
    geral: {
      n: 'Avanço firme guiado pela vontade. A vitória vem de manter dois impulsos opostos andando na mesma direção.',
      i: 'Falta de direção, impulsos que puxam para lados diferentes ou pressa que gera atropelo. É hora de retomar as rédeas.',
    },
    amor: {
      n: 'Determinação para conquistar ou preservar uma relação e para superar obstáculos juntos. Cuidado para não transformar o afeto em disputa.',
      i: 'Conflitos de ego, ciúme ou uma relação sem rumo comum, com cada um puxando para um lado.',
    },
    trabalho: {
      n: 'Foco, disciplina e metas em andamento. Boa fase para viagens de trabalho, competições e conquistas que exigem constância.',
      i: 'Perda de foco, projetos que não saem do lugar ou competição agressiva. Reorganizar prioridades antes de acelerar.',
    },
    espiritual: {
      n: 'Domínio de si: disciplina para conduzir pensamentos e emoções em direção a um propósito.',
      i: 'Autocontrole que virou rigidez, ou perda de rumo interno. Voltar ao propósito ajuda a reorientar.',
    },
    simbolos: 'O guerreiro não segura rédeas: conduz pela vontade. As duas esfinges, uma preta e outra branca, são forças opostas que ele precisa manter juntas. O dossel de estrelas liga o carro ao céu e a um propósito maior. A cidade atrás mostra o ponto de partida, e o rio, a fluidez que ele atravessa.',
    reflexao: {
      n: 'Que meta merece meu foco total agora?',
      i: 'O que está puxando minha energia em direções diferentes?',
    },
  },
  'maior-8': {
    extra: {
      n: ['paciência', 'compaixão', 'coragem tranquila', 'domínio gentil', 'resiliência', 'autoconfiança'],
      i: ['insegurança', 'impulsividade', 'falta de fé em si', 'raiva contida', 'dúvida', 'esgotamento'],
    },
    geral: {
      n: 'A força de quem age com calma e firmeza. Domar os próprios impulsos com cuidado rende mais do que enfrentá-los na marra.',
      i: 'Autoconfiança abalada ou impulsos que ganham controle. Lembrar da própria coragem e se tratar com gentileza.',
    },
    amor: {
      n: 'Afeto paciente, capaz de acolher fragilidades e atravessar crises. Intimidade construída com respeito.',
      i: 'Insegurança, ciúme ou necessidade de provar força. Também pode apontar autoestima baixa afetando a relação.',
    },
    trabalho: {
      n: 'Persistência, equilíbrio emocional sob pressão e liderança pelo exemplo. Bom momento para resistir sem endurecer.',
      i: 'Cansaço, dúvida sobre a própria capacidade ou explosões que desgastam o ambiente. Cuidar da energia antes de seguir.',
    },
    espiritual: {
      n: 'Coragem de olhar para o lado instintivo e acolhê-lo. A fé vem da confiança em si.',
      i: 'Brigar com a própria natureza ou se afastar dela. A reconciliação com os impulsos é o passo.',
    },
    simbolos: 'A mulher fecha com delicadeza a boca do leão: autoridade sem violência. O oito deitado sobre sua cabeça é o infinito, o mesmo do Mago, e fala de energia e consciência amplas. O vestido branco e a guirlanda de flores indicam pureza e vitalidade. O leão representa os instintos e a paixão, que são aliados quando bem conduzidos. Nota: na numeração Rider-Waite, a Força é a carta 8; no Tarot de Marselha ela é a 11 (e a Justiça é a 8).',
    reflexao: {
      n: 'Onde posso ter mais paciência comigo e com os meus impulsos?',
      i: 'O que me faz duvidar da minha força, e de onde ela costuma vir?',
    },
  },
  'maior-9': {
    extra: {
      n: ['busca', 'solitude', 'sabedoria', 'discernimento', 'silêncio', 'guia'],
      i: ['isolamento', 'fuga', 'teimosia', 'solidão excessiva', 'rejeitar ajuda', 'desorientação'],
    },
    geral: {
      n: 'Tempo de recolhimento e reflexão. A resposta está dentro, e uma pausa ajuda a reorganizar o caminho.',
      i: 'Isolamento além do necessário ou evitar olhar para dentro. Também pode indicar recusa de conselhos de quem tem experiência.',
    },
    amor: {
      n: 'Momento de ficar consigo mesmo, ou de aprofundar a relação com mais silêncio e menos pressa. Qualidade vale mais que quantidade.',
      i: 'Distanciamento afetivo, solidão que dói ou medo de se abrir. Vale perceber se a solitude ainda faz bem.',
    },
    trabalho: {
      n: 'Estudo, pesquisa, mentoria e trabalho independente. Valorizar a profundidade em vez da pressa.',
      i: 'Isolamento profissional, falta de apoio ou resistência a pedir ajuda. Rever como a solidão está afetando os resultados.',
    },
    espiritual: {
      n: 'Introspecção, meditação e busca de sentido. A luz que guia o caminho vem de dentro.',
      i: 'Fuga disfarçada de busca espiritual. Voltar ao convívio pode ser parte do aprendizado.',
    },
    simbolos: 'Com o manto cinza e a barba branca, o Eremita representa a maturidade de quem já percorreu muito caminho. A lanterna com a estrela de seis pontas ilumina apenas o próximo passo e guarda a sabedoria. O cajado dá apoio. O pico nevado onde ele está sugere o alto de uma jornada de esforço.',
    reflexao: {
      n: 'Do que eu preciso me afastar para ouvir a mim mesmo?',
      i: 'Estou me protegendo no silêncio ou me escondendo dele?',
    },
  },
  'maior-10': {
    extra: {
      n: ['ciclos', 'destino', 'oportunidade', 'virada', 'movimento', 'acaso'],
      i: ['resistência', 'repetição', 'azar', 'estagnação', 'perda de controle', 'atraso'],
    },
    geral: {
      n: 'A vida em movimento: o que está embaixo pode subir e o que está no alto pode descer. Um ciclo muda, e vale aprender a acompanhá-lo.',
      i: 'Sensação de azar, de repetir padrões ou de lutar contra uma mudança inevitável. Ainda assim, nenhum ciclo dura para sempre.',
    },
    amor: {
      n: 'Encontros fortuitos, viradas no relacionamento e fases que se renovam. Aceitar a mudança aproxima.',
      i: 'Padrões que se repetem nas relações ou fases de distanciamento. Perceber o ciclo ajuda a interromper a repetição.',
    },
    trabalho: {
      n: 'Boa oportunidade, mudança de posição ou virada de sorte. Vale estar atento e flexível para aproveitar.',
      i: 'Instabilidade, projetos que atrasam ou queda temporária. Controlar o que se pode e não brigar com o que não se pode.',
    },
    espiritual: {
      n: 'Lei dos ciclos: tudo muda. Perceber o próprio ritmo e confiar que há sentido no movimento.',
      i: 'Resistência à mudança interna ou sensação de falta de sentido. Observar o padrão para sair da roda.',
    },
    simbolos: 'A roda traz letras que formam TARO e ROTA, além de símbolos alquímicos. No topo, a esfinge com a espada representa o equilíbrio; subindo, Anúbis; descendo, a serpente. Nos cantos, o homem, a águia, o touro e o leão (as quatro figuras do Apocalipse) seguram livros, lembrando que o movimento tem um sentido a ser estudado.',
    reflexao: {
      n: 'Que ciclo está se fechando na minha vida e que outro quer começar?',
      i: 'Que padrão eu repito, e o que muda se eu o enxergar?',
    },
  },
  'maior-11': {
    extra: {
      n: ['equilíbrio', 'verdade', 'consequência', 'ética', 'clareza', 'responsabilidade'],
      i: ['injustiça', 'desonestidade', 'parcialidade', 'culpa', 'fuga', 'desequilíbrio'],
    },
    geral: {
      n: 'Causa e efeito. As escolhas têm consequências, e a carta pede clareza, honestidade e decisões justas.',
      i: 'Parcialidade, desonestidade ou recusa em assumir a responsabilidade. Algo está desequilibrado e pede ajuste.',
    },
    amor: {
      n: 'Relações baseadas em reciprocidade, verdade e acordos justos. Conversas claras resolvem.',
      i: 'Desequilíbrio entre dar e receber, mentiras ou ressentimentos acumulados. É preciso olhar para os fatos com honestidade.',
    },
    trabalho: {
      n: 'Contratos, questões legais, avaliações e decisões justas. Bom momento para agir com ética e documentar.',
      i: 'Injustiças no trabalho, acordos pouco claros ou decisões enviesadas. Atenção a detalhes e prazos.',
    },
    espiritual: {
      n: 'Alinhar atitudes e valores. A consciência clara traz paz.',
      i: 'Autojulgamento duro ou fuga de responsabilidades. Olhar para as consequências sem culpa excessiva.',
    },
    simbolos: 'Sentada entre duas colunas, a figura segura uma espada erguida (razão e decisão) e uma balança (equilíbrio). A coroa e o manto vermelho mostram autoridade, e o fecho quadrado simboliza ordem. O véu roxo ao fundo lembra que a justiça combina intuição e racionalidade. Nota: na numeração Rider-Waite, a Justiça é a carta 11; no Tarot de Marselha ela é a 8 (e a Força é a 11).',
    reflexao: {
      n: 'Estou sendo justo comigo e com os outros nesta situação?',
      i: 'De que consequência estou fugindo, e o que mudaria se eu a encarasse?',
    },
  },
  'maior-12': {
    extra: {
      n: ['suspensão', 'entrega', 'novo ângulo', 'paciência', 'sacrifício consciente', 'pausa'],
      i: ['estagnação', 'sacrifício inútil', 'vitimismo', 'resistência', 'adiamento', 'teimosia'],
    },
    geral: {
      n: 'Uma pausa necessária. Ao parar de forçar, outra perspectiva aparece. Soltar o controle pode ser o próprio movimento.',
      i: 'Ficar preso por medo ou renunciar a algo sem propósito. A espera já não ensina e pede uma decisão.',
    },
    amor: {
      n: 'Tempo de suspender expectativas e ver a relação de outro ângulo. Entrega sem pressa, sem exigir resposta imediata.',
      i: 'Relação parada, sacrifício que não é reconhecido ou espera sem retorno. Reavaliar se a pausa ainda faz sentido.',
    },
    trabalho: {
      n: 'Projetos em espera, adiamentos e necessidade de rever a abordagem. Uma pausa estratégica pode evitar erros.',
      i: 'Estagnação, tarefas sem sentido ou esforço sem resultado. Decidir entre continuar e mudar de rumo.',
    },
    espiritual: {
      n: 'Rendição e mudança de perspectiva. O despertar vem quando se solta o que se achava saber.',
      i: 'Resistir à entrega ou usar o sofrimento como identidade. Libertar-se pede escolher.',
    },
    simbolos: 'Pendurado de cabeça para baixo por um pé, numa árvore em forma de T, o Enforcado não sofre: seu rosto é sereno, com um halo de luz. Uma perna dobrada forma um quatro, e as mãos atrás das costas indicam entrega. O mundo, visto de ponta-cabeça, ganha outro sentido.',
    reflexao: {
      n: 'O que eu enxergaria se parasse de forçar e olhasse por outro ângulo?',
      i: 'Estou esperando porque faz sentido ou porque tenho medo de agir?',
    },
  },
  'maior-13': {
    extra: {
      n: ['fim de ciclo', 'transformação', 'desapego', 'renovação', 'passagem', 'encerramento'],
      i: ['apego', 'medo de mudar', 'estagnação', 'luto adiado', 'resistência', 'recusa em soltar'],
    },
    geral: {
      n: 'Um final necessário. Algo termina para dar espaço ao novo. A carta raramente fala de morte literal e muito de transformação.',
      i: 'Agarrar-se ao que já acabou. A mudança está batendo à porta, e adiar só prolonga o desconforto.',
    },
    amor: {
      n: 'Fim de um ciclo afetivo ou transformação profunda na relação. O que for autêntico permanece, o resto se despede.',
      i: 'Relação que já terminou, mas ainda se arrasta, ou medo de mudar um padrão. Aceitar o encerramento libera.',
    },
    trabalho: {
      n: 'Encerramento de projeto, mudança de função ou de área. Hora de deixar para trás o que não serve mais.',
      i: 'Apego a uma função ou rotina que já não faz sentido. Planejar a transição ajuda a reduzir o medo.',
    },
    espiritual: {
      n: 'Morrer e renascer simbolicamente: abandonar velhas versões de si. Ciclos de transformação profunda.',
      i: 'Resistência a se transformar, ou luto não vivido. Permitir-se sentir faz parte da passagem.',
    },
    simbolos: 'O esqueleto de armadura negra cavalga um cavalo branco, e a bandeira com a rosa branca sugere beleza e pureza no fim. Ninguém escapa: o rei caído, o bispo que reza, a criança e a mulher que o encaram. Ao fundo, o sol nasce entre duas torres, prometendo o recomeço.',
    reflexao: {
      n: 'O que já terminou, mas ainda não me despedi?',
      i: 'O que me impede de soltar, e do que eu tenho medo?',
    },
  },
  'maior-14': {
    extra: {
      n: ['harmonia', 'moderação', 'cura', 'paciência', 'fluidez', 'alquimia'],
      i: ['excesso', 'pressa', 'desarmonia', 'desequilíbrio', 'extremos', 'impaciência'],
    },
    geral: {
      n: 'Equilíbrio entre extremos e ritmo constante. Misturar na medida certa traz estabilidade e cura gradual.',
      i: 'Excessos, pressa ou áreas da vida desproporcionais. Faltam moderação e paciência.',
    },
    amor: {
      n: 'Relações equilibradas, com troca saudável e paciência. Duas pessoas que se ajustam sem se anular.',
      i: 'Desencontro de ritmos, excessos emocionais ou desequilíbrio entre entrega e espaço. Vale buscar o meio-termo.',
    },
    trabalho: {
      n: 'Colaboração, equilíbrio entre vida e trabalho e progresso constante. Boa fase para integrar equipes e processos.',
      i: 'Sobrecarga, falta de equilíbrio ou pressa para ver resultados. Reorganizar o ritmo evita o desgaste.',
    },
    espiritual: {
      n: 'Integração de opostos: corpo e espírito, razão e fé. Prática regular e serenidade.',
      i: 'Extremos na busca espiritual ou impaciência com o próprio processo. Retomar a constância ajuda.',
    },
    simbolos: 'O anjo tem um pé na água e outro na terra, ligando o inconsciente e o consciente. Ele passa o líquido entre duas taças, num fluxo contínuo. O triângulo dentro do quadrado no peito representa o espírito dentro da matéria. Os íris na margem e o caminho que leva a uma coroa de luz no horizonte sugerem uma jornada com propósito.',
    reflexao: {
      n: 'Que área da minha vida precisa de mais equilíbrio?',
      i: 'Onde estou exagerando ou com pressa, e o que o tempo pede de mim?',
    },
  },
  'maior-15': {
    extra: {
      n: ['apego', 'sombra', 'desejo', 'dependência', 'materialismo', 'tentação'],
      i: ['libertação', 'consciência', 'romper amarras', 'recuperar poder', 'desprendimento', 'despertar'],
    },
    geral: {
      n: 'Amarras que parecem fortes, mas muitas vezes são escolhidas: hábitos, medos, dependências. A carta pede olhar para a própria sombra.',
      i: 'Começar a perceber e soltar correntes. Recuperar poder pessoal e reconhecer vícios e padrões.',
    },
    amor: {
      n: 'Atração intensa, dependência ou relações de posse. Vale perguntar se é vínculo ou prisão.',
      i: 'Libertação de relações tóxicas ou de padrões de dependência. Também pode indicar o fim de um ciclo de controle.',
    },
    trabalho: {
      n: 'Ambição, apego a status e dinheiro ou ambiente que aprisiona. Avaliar o preço do que se aceita em troca de segurança.',
      i: 'Rompimento com condições que sufocam. Reconquistar autonomia e rever o que sustenta o trabalho.',
    },
    espiritual: {
      n: 'Encarar a sombra: instintos, desejos e medos que se evita ver. Reconhecer é o primeiro passo para integrar.',
      i: 'Despertar da consciência e libertação de crenças limitantes. O caminho de volta ao poder próprio.',
    },
    simbolos: 'A figura caprina sobre o pedestal tem um pentagrama invertido na testa, que lembra a matéria colocada acima do espírito. Homem e mulher estão acorrentados, mas as correntes ficam frouxas em volta do pescoço: poderiam sair. Os chifres e a cauda neles mostram como a natureza instintiva os domina. A tocha na mão do Diabo aponta para o desejo que consome.',
    reflexao: {
      n: 'O que eu chamo de necessidade, mas que talvez seja uma prisão?',
      i: 'Que corrente eu já consigo enxergar, e como posso afrouxá-la?',
    },
  },
  'maior-16': {
    extra: {
      n: ['ruptura', 'revelação', 'choque', 'libertação', 'colapso', 'verdade'],
      i: ['crise adiada', 'medo de mudar', 'colapso lento', 'resistência', 'negação', 'reconstrução'],
    },
    geral: {
      n: 'Algo construído sobre bases frágeis cai de repente. A carta traz choque, mas também verdade e liberdade para reconstruir em terreno firme.',
      i: 'Uma crise adiada ou que acontece aos poucos. Resistir ao que precisa cair prolonga o desgaste.',
    },
    amor: {
      n: 'Rompimentos, revelações ou mudanças abruptas. Relações baseadas em ilusão não se sustentam; o que é real permanece.',
      i: 'Tensão acumulada que ainda não explodiu, ou medo de encarar a verdade. Vale conversar antes que estoure.',
    },
    trabalho: {
      n: 'Demissão, reestruturação ou queda de projeto inesperada. Depois do impacto, surge a chance de reconstruir de forma mais sólida.',
      i: 'Evitar mudanças necessárias, problemas que se arrastam ou instabilidade silenciosa. Agir antes que a crise se imponha.',
    },
    espiritual: {
      n: 'Quebra de crenças e certezas que já não servem. Dolorosa, mas libertadora.',
      i: 'Negar a necessidade de rever crenças, ou reconstruir sobre as mesmas bases. A mudança interior pede coragem.',
    },
    simbolos: 'Um raio atinge a torre e derruba a coroa no topo, imagem de uma estrutura de ego ou de poder que cai. Duas figuras despencam, e as chamas saem das janelas. As gotas douradas (yods) lembram centelhas de energia divina. O fundo escuro mostra o clima de crise, e a fragilidade da base explica a queda.',
    reflexao: {
      n: 'O que na minha vida está se sustentando em bases frágeis?',
      i: 'Que mudança eu estou evitando, e o que ela poderia libertar?',
    },
  },
  'maior-17': {
    extra: {
      n: ['esperança', 'cura', 'serenidade', 'inspiração', 'fé', 'renovação'],
      i: ['desesperança', 'descrença', 'desânimo', 'desconexão', 'cansaço', 'falta de fé'],
    },
    geral: {
      n: 'Calma depois da tempestade. Recuperação, esperança e confiança no que vem. É um convite a receber e a se renovar.',
      i: 'Desânimo, dificuldade de acreditar que as coisas melhoram ou sensação de estar à deriva. A esperança ainda está lá, mesmo discreta.',
    },
    amor: {
      n: 'Cura afetiva, abertura e relações sinceras. Confiança no amor depois de períodos difíceis.',
      i: 'Descrença no amor ou autoestima abalada. Reaprender a se cuidar prepara o terreno para novos vínculos.',
    },
    trabalho: {
      n: 'Inspiração, projetos que renovam e reconhecimento gradual. Visão de futuro e paciência trazem resultados.',
      i: 'Desmotivação, falta de perspectiva ou perda de sentido no trabalho. Retomar o propósito e pequenos objetivos.',
    },
    espiritual: {
      n: 'Fé, conexão com algo maior e serenidade. Receber orientação e se sentir acolhido.',
      i: 'Distância da fé ou da inspiração. Pequenos rituais e contato com a natureza ajudam a reconectar.',
    },
    simbolos: 'Nua e vulnerável, a mulher ajoelhada derrama água na lagoa e na terra: dar ao inconsciente e à vida prática. A grande estrela de oito pontas e as sete menores, que muitos leitores relacionam aos chacras, guiam a esperança. A ave no galho, um íbis, simboliza o pensamento. O cenário calmo mostra o depois da tempestade.',
    reflexao: {
      n: 'O que me devolve a esperança, e como posso cuidar disso?',
      i: 'O que apagou minha esperança, e qual seria um pequeno passo para reacendê-la?',
    },
  },
  'maior-18': {
    extra: {
      n: ['intuição', 'sonhos', 'incerteza', 'medos', 'ilusão', 'mistério'],
      i: ['clareza', 'verdade revelada', 'medo superado', 'despertar', 'segredos expostos', 'dissipação'],
    },
    geral: {
      n: 'Nem tudo é o que parece. Emoções, medos e sonhos turvam a visão, e é preciso caminhar com cautela e escutar a intuição.',
      i: 'A névoa começa a se dissipar. Segredos e medos vêm à tona e trazem alívio, mesmo que incômodo.',
    },
    amor: {
      n: 'Sentimentos confusos, dúvidas e dificuldade de ver com clareza. Cuidado com ilusões e projeções.',
      i: 'Verdades que emergem, ilusões que caem e medos que se superam. A relação ganha mais clareza.',
    },
    trabalho: {
      n: 'Cenário incerto, informações incompletas e intuição em alta. Evite decisões definitivas sem ver o quadro todo.',
      i: 'Confusões que se esclarecem e o fim de um período de dúvida. Atenção a detalhes que antes escapavam.',
    },
    espiritual: {
      n: 'Mergulho no inconsciente: sonhos, medos e imagens. Região de mistério que ensina pela vivência.',
      i: 'Trazer à luz o que estava oculto. Medos que perdem força ao serem nomeados.',
    },
    simbolos: 'A lua cheia, com rosto, brilha entre duas torres e ilumina um caminho sinuoso. Um cão e um lobo uivam: o domesticado e o selvagem que existem em nós. Um caranguejo sai da água, o profundo inconsciente vindo à superfície. As gotas douradas no ar lembram energias sutis.',
    reflexao: {
      n: 'O que eu estou sentindo que ainda não sei explicar?',
      i: 'O que está ficando mais claro agora, e como me sinto com isso?',
    },
  },
  'maior-19': {
    extra: {
      n: ['vitalidade', 'alegria', 'clareza', 'sucesso', 'generosidade', 'transparência'],
      i: ['entusiasmo exagerado', 'ego', 'alegria adiada', 'dispersão', 'ofuscamento', 'atraso'],
    },
    geral: {
      n: 'Alegria, clareza e vitalidade. Tudo fica mais leve e visível. Fase de conquistas, otimismo e confiança.',
      i: 'Felicidade que demora, otimismo que ignora problemas ou vaidade. O brilho ainda está lá, mas precisa de realismo.',
    },
    amor: {
      n: 'Relações felizes, afeto aberto e alegria compartilhada. Sinceridade, leveza e vontade de viver juntos.',
      i: 'Expectativas exageradas, ego em primeiro plano ou alegria que não é compartilhada. Cuidado com a imaturidade.',
    },
    trabalho: {
      n: 'Sucesso, reconhecimento e resultados claros. Bom momento para mostrar o que se fez.',
      i: 'Resultados que demoram, ego inflado ou excesso de confiança. Verificar detalhes antes de celebrar.',
    },
    espiritual: {
      n: 'Consciência clara, gratidão e vitalidade. A alegria de ser é, em si, uma prática.',
      i: 'Entusiasmo sem raiz, ou a busca da luz sem encarar a sombra. Integrar os dois lados traz profundidade.',
    },
    simbolos: 'O sol com rosto domina o céu, e uma criança nua sobre um cavalo branco ergue uma bandeira vermelha: pureza, energia e vitalidade. Os girassóis, quatro no total, ficam atrás do muro e seguem a luz, lembrando os quatro naipes ou elementos. A cena é de alegria sem medo.',
    reflexao: {
      n: 'O que me traz alegria simples, e como posso dar mais espaço a isso?',
      i: 'Estou deixando minha alegria depender de algo que ainda não chegou?',
    },
  },
  'maior-20': {
    extra: {
      n: ['chamado', 'despertar', 'perdão', 'renovação', 'avaliação', 'absolvição'],
      i: ['autocrítica', 'dúvida', 'culpa', 'recusa', 'medo de julgamento', 'adiamento'],
    },
    geral: {
      n: 'Hora de rever o passado, perdoar e responder a um chamado maior. Uma nova fase só começa depois de uma avaliação sincera.',
      i: 'Autojulgamento duro ou recusa em encarar uma decisão importante. Culpa antiga pode estar prendendo.',
    },
    amor: {
      n: 'Reconciliação, perdão e renovação da relação. Avaliação honesta do que se viveu e do que se quer.',
      i: 'Ressentimentos antigos, culpa ou dificuldade de perdoar. É preciso soltar o passado para seguir.',
    },
    trabalho: {
      n: 'Avaliações, reconhecimento do que foi feito e chamados para uma nova função. Momento de responder a um propósito.',
      i: 'Autocrítica excessiva, medo de assumir novas responsabilidades ou ignorar uma oportunidade. Reavaliar com justiça.',
    },
    espiritual: {
      n: 'Despertar, renascimento e reconciliação. Ouvir o chamado interno.',
      i: 'Duvidar do próprio chamado ou se condenar por erros antigos. A autocompaixão abre caminho.',
    },
    simbolos: 'O anjo, geralmente associado a Gabriel, toca a trombeta e traz uma bandeira com uma cruz. Das tumbas, figuras de braços abertos se levantam: renascimento e chamado. As montanhas e o mar ao fundo sugerem a vastidão do que se renova. É uma convocação para viver de acordo com o próprio propósito.',
    reflexao: {
      n: 'Que chamado eu venho ouvindo e ainda não respondi?',
      i: 'De que culpa ou julgamento eu preciso me libertar para avançar?',
    },
  },
  'maior-21': {
    extra: {
      n: ['conclusão', 'integração', 'plenitude', 'realização', 'celebração', 'inteireza'],
      i: ['inacabado', 'atraso', 'falta de fechamento', 'estagnação', 'quase lá', 'adiar'],
    },
    geral: {
      n: 'Um ciclo completo. Sensação de inteireza e conquista, com a certeza de que há um novo caminho à frente.',
      i: 'Falta um último passo para concluir, ou dificuldade de encerrar. Terminar bem abre espaço para o novo.',
    },
    amor: {
      n: 'Relação madura e completa, com plenitude e harmonia. Realização afetiva e senso de pertencimento.',
      i: 'Relação inacabada, algo que falta ou dificuldade de se comprometer. Olhar para o que ainda precisa ser dito.',
    },
    trabalho: {
      n: 'Conclusão de projetos, reconhecimento e expansão. Boa fase para celebrar e planejar o próximo nível.',
      i: 'Atrasos, projetos quase concluídos e falta de fechamento. Vale terminar o que já foi começado.',
    },
    espiritual: {
      n: 'Integração e unidade: sentir-se parte do todo. Realização de um percurso.',
      i: 'Dificuldade de concluir um aprendizado ou de reconhecer o que já foi conquistado. A gratidão ajuda.',
    },
    simbolos: 'A figura dança no centro de uma coroa de louros, símbolo de vitória e de completude. As duas varinhas representam o equilíbrio entre forças. Nos quatro cantos estão as mesmas figuras da Roda da Fortuna: o homem, a águia, o touro e o leão, que representam os quatro elementos e a totalidade. O lenço roxo cobre e revela, como o próprio ciclo.',
    reflexao: {
      n: 'O que eu já conquistei e ainda não reconheci?',
      i: 'Que último passo falta para fechar este ciclo?',
    },
  },
};
