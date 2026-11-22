import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

const SECTIONS: { title: string; text: string }[] = [
  {
    title: 'Como usar o app',
    text: 'Embaralhe e tire as cartas do seu baralho físico. Depois procure cada carta na aba Cartas para ler o significado, na posição normal ou invertida. Na aba Tiragens você vê onde colocar cada carta e o que cada posição quer dizer.',
  },
  {
    title: 'Cartas invertidas',
    text: 'Uma carta invertida não é "ruim". Ela pode indicar energia bloqueada, interna ou em excesso, ou uma versão mais suave da carta. Algumas pessoas preferem ler só cartas normais, e isso é válido. Escolha um jeito e mantenha.',
  },
  {
    title: 'Arcanos Maiores',
    text: 'São 22 cartas que representam grandes temas e lições de vida. Quando aparecem muitas em uma tiragem, a situação costuma ter peso maior.',
  },
  {
    title: 'Arcanos Menores e naipes',
    text: 'São 56 cartas do dia a dia, divididas em 4 naipes. Paus (Fogo): ação e criatividade. Copas (Água): emoções e relações. Espadas (Ar): mente, palavras e conflitos. Ouros (Terra): trabalho, dinheiro e corpo.',
  },
  {
    title: 'Cartas da corte',
    text: 'Pajem, Cavaleiro, Rainha e Rei podem representar pessoas ou formas de agir. Pajem: aprendizado e mensagens. Cavaleiro: movimento e impulso. Rainha: maturidade interna. Rei: maturidade externa e controle.',
  },
  {
    title: 'Arcanos pessoais',
    text: 'São três cartas dos Arcanos Maiores calculadas a partir da sua data de nascimento e do seu nome, unindo tarot e numerologia. Na aba Pessoal você calcula e salva os seus e os de outras pessoas. O Arcano de Vida mostra sua essência e os aprendizados da jornada. O Arcano de Expressão mostra como você manifesta seus talentos e se comunica. O Arcano de Síntese une os dois e aponta a direção da sua evolução.',
  },
  {
    title: 'Como o cálculo é feito',
    text: 'Vida: soma todos os dígitos da data de nascimento. Expressão: converte cada letra do nome completo pela tabela pitagórica (A, J, S = 1; B, K, T = 2; C, L, U = 3; D, M, V = 4; E, N, W = 5; F, O, X = 6; G, P, Y = 7; H, Q, Z = 8; I, R = 9) e soma tudo. Síntese: soma o Arcano de Vida com o de Expressão. Em todos, se o total passar de 22, somam-se os algarismos do resultado até chegar entre 1 e 22. O 22 é O Louco. A numeração é a do Tarot de Marselha (VIII é A Justiça e XI é A Força). Este é um método específico, e outras escolas calculam de outras formas.',
  },
  {
    title: 'Dicas para quem está começando',
    text: 'Tire uma carta por dia e anote o que ela mostrou. Leia a imagem antes de consultar o significado. Olhe as cartas em conjunto, não uma por uma. Faça perguntas abertas, como "o que preciso entender sobre...", em vez de sim ou não.',
  },
];

export default function BasicsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {SECTIONS.map((s) => (
        <React.Fragment key={s.title}>
          <Text style={styles.h}>{s.title}</Text>
          <Text style={styles.p}>{s.text}</Text>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  h: { color: colors.saffron, fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 6 },
  p: { color: colors.text, fontSize: 15, lineHeight: 24 },
});
