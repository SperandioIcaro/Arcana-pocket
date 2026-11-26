export interface ChangelogEntry {
  version: string; // igual à "version" do app.json
  title: string;
  items: string[];
}

// Mais nova primeiro. A cada versão lançada, acrescente uma entrada no topo:
// o popup de novidades mostra o que mudou na primeira vez que o app abre depois de atualizar.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.1',
    title: 'Menu novo e muito mais conteúdo',
    items: [
      'Menu inicial em mandala, com as áreas flutuando no ar',
      'Botão no cabeçalho para voltar ao menu de qualquer aba',
      'Quiz: agora com "Qual tiragem fazer?", e a seção Básico virou Guia, com respostas em cards',
      'Arcanos Maiores aprofundados: mais palavras-chave, símbolos, perguntas para refletir e leitura por tema (amor, trabalho e outros) numa constelação',
      '7 novas tiragens: Reconhecimento de alma, Geral, Ficar ou partir?, Templo do Diabo, Taça do Amor, Templo de Afrodite e Triângulo de Vênus',
      'Aviso quando existe uma versão nova do app, e este popup de novidades',
    ],
  },
];
