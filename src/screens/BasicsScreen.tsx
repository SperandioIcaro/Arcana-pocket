import React, { useState } from 'react';
import { LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const ITEMS: { title: string; text: string }[] = [
  {
    title: 'Como usar o app?',
    text: 'Embaralhe e tire as cartas do seu baralho físico. Depois procure cada carta na aba Cartas para ler o significado, na posição normal ou invertida. Na aba Tiragens você vê onde colocar cada carta e o que cada posição quer dizer.',
  },
  {
    title: 'O que são cartas invertidas?',
    text: 'Uma carta invertida não é "ruim". Ela pode indicar energia bloqueada, interna ou em excesso, ou uma versão mais suave da carta. Algumas pessoas preferem ler só cartas normais, e isso é válido. Escolha um jeito e mantenha.',
  },
  {
    title: 'O que são os Arcanos Maiores?',
    text: 'São 22 cartas que representam grandes temas e lições de vida. Quando aparecem muitas em uma tiragem, a situação costuma ter peso maior.',
  },
  {
    title: 'O que são os Arcanos Menores e os naipes?',
    text: 'São 56 cartas do dia a dia, divididas em 4 naipes. Paus (Fogo): ação e criatividade. Copas (Água): emoções e relações. Espadas (Ar): mente, palavras e conflitos. Ouros (Terra): trabalho, dinheiro e corpo.',
  },
  {
    title: 'O que são as cartas da corte?',
    text: 'Pajem, Cavaleiro, Rainha e Rei podem representar pessoas ou formas de agir. Pajem: aprendizado e mensagens. Cavaleiro: movimento e impulso. Rainha: maturidade interna. Rei: maturidade externa e controle.',
  },
  {
    title: 'O que são os Arcanos Pessoais?',
    text: 'São três cartas dos Arcanos Maiores calculadas a partir da sua data de nascimento e do seu nome, unindo tarot e numerologia. Na aba Pessoal você calcula e salva os seus e os de outras pessoas. O Arcano de Vida mostra sua essência e os aprendizados da jornada. O Arcano de Expressão mostra como você manifesta seus talentos e se comunica. O Arcano de Síntese une os dois e aponta a direção da sua evolução.',
  },
  {
    title: 'Como o cálculo dos Arcanos Pessoais é feito?',
    text: 'Vida: soma todos os dígitos da data de nascimento. Expressão: converte cada letra do nome completo pela tabela pitagórica (A, J, S = 1; B, K, T = 2; C, L, U = 3; D, M, V = 4; E, N, W = 5; F, O, X = 6; G, P, Y = 7; H, Q, Z = 8; I, R = 9) e soma tudo. Síntese: soma o Arcano de Vida com o de Expressão. Em todos, se o total passar de 22, somam-se os algarismos do resultado até chegar entre 1 e 22. O 22 é O Louco. A numeração é a do Tarot de Marselha (VIII é A Justiça e XI é A Força). Este é um método específico, e outras escolas calculam de outras formas.',
  },
  {
    title: 'Por onde começar?',
    text: 'Tire uma carta por dia e anote o que ela mostrou. Leia a imagem antes de consultar o significado. Olhe as cartas em conjunto, não uma por uma. Faça perguntas abertas, como "o que preciso entender sobre...", em vez de sim ou não.',
  },
];

export default function BasicsScreen() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => ({ ...o, [title]: !o[title] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text style={styles.intro}>Toque em uma pergunta para ver a resposta.</Text>
      {ITEMS.map((it) => {
        const isOpen = !!open[it.title];
        return (
          <View key={it.title} style={styles.item}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(it.title)}
              style={[styles.question, isOpen && styles.questionOpen]}
            >
              <Text style={styles.qText}>{it.title}</Text>
              <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.saffron} />
            </Pressable>
            {isOpen && (
              <View style={styles.answer}>
                <Text style={styles.aText}>{it.text}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  intro: { color: colors.muted, fontSize: 14, marginBottom: 14 },
  item: { marginBottom: 10 },
  question: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, padding: 16, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  questionOpen: { borderColor: colors.saffron },
  qText: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '600' },
  answer: { backgroundColor: colors.surface2, marginTop: 6, padding: 16, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  aText: { color: colors.text, fontSize: 15, lineHeight: 24 },
});
