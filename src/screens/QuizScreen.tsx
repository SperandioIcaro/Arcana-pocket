import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPREADS } from '../data/spreads';
import { colors, radius } from '../theme';
import { RootStackParamList, Topic } from '../types';

const TOPICS: { id: Topic; label: string }[] = [
  { id: 'amor', label: 'Amor e relacionamentos' },
  { id: 'carreira', label: 'Trabalho e dinheiro' },
  { id: 'decisao', label: 'Uma decisão difícil' },
  { id: 'autoconhecimento', label: 'Autoconhecimento' },
  { id: 'dia', label: 'Orientação para o dia a dia' },
];

const SIZES: { target: number | null; label: string }[] = [
  { target: 1, label: 'Rápida: 1 carta' },
  { target: 3, label: 'Curta: 3 cartas' },
  { target: 5, label: 'Média: 5 a 7 cartas' },
  { target: 10, label: 'Completa: 10 cartas' },
  { target: null, label: 'Não sei, sugira' },
];

const LEVEL_ORDER = { Iniciante: 0, Intermediário: 1, Avançado: 2 } as const;

type Step = 'hub' | 'topic' | 'size' | 'result';

export default function QuizScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<Step>('hub');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [size, setSize] = useState<{ target: number | null } | null>(null);

  const results = useMemo(() => {
    if (!topic || !size) return [];
    const pool = SPREADS.filter((s) => s.topics.includes(topic));
    const t = size.target;
    return [...pool]
      .sort((a, b) =>
        t === null
          ? LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.count - b.count
          : Math.abs(a.count - t) - Math.abs(b.count - t) || a.count - b.count
      )
      .slice(0, 3);
  }, [topic, size]);

  const toHub = () => { setTopic(null); setSize(null); setStep('hub'); };
  const restart = () => { setTopic(null); setSize(null); setStep('topic'); };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {step === 'hub' && (
        <>
          <Text style={styles.q}>Quizzes</Text>
          <Pressable style={styles.opt} onPress={() => setStep('topic')}>
            <Text style={styles.optText}>Qual tiragem fazer?</Text>
            <Text style={styles.optSub}>Responda duas perguntas e descubra a tiragem ideal para o seu momento.</Text>
          </Pressable>
          {/* reservado para a atualização do quiz de aprendizado */}
          <View style={[styles.opt, styles.disabled]} accessibilityState={{ disabled: true }}>
            <Text style={styles.optText}>Quiz de aprendizado</Text>
            <Text style={styles.optSub}>Teste o que você já aprendeu sobre as cartas.</Text>
            <Text style={styles.soon}>EM BREVE</Text>
          </View>
        </>
      )}

      {step === 'topic' && (
        <>
          <Text style={styles.kicker}>Qual tiragem fazer? · Pergunta 1 de 2</Text>
          <Text style={styles.q}>Sobre o que é a sua pergunta?</Text>
          {TOPICS.map((t) => (
            <Pressable key={t.id} style={styles.opt} onPress={() => { setTopic(t.id); setStep('size'); }}>
              <Text style={styles.optText}>{t.label}</Text>
            </Pressable>
          ))}
          <Pressable onPress={toHub}><Text style={styles.link}>Voltar aos quizzes</Text></Pressable>
        </>
      )}

      {step === 'size' && (
        <>
          <Text style={styles.kicker}>Qual tiragem fazer? · Pergunta 2 de 2</Text>
          <Text style={styles.q}>Quanto tempo e quantas cartas você quer usar?</Text>
          {SIZES.map((s) => (
            <Pressable key={s.label} style={styles.opt} onPress={() => { setSize({ target: s.target }); setStep('result'); }}>
              <Text style={styles.optText}>{s.label}</Text>
            </Pressable>
          ))}
          <Pressable onPress={() => setStep('topic')}><Text style={styles.link}>Voltar à pergunta anterior</Text></Pressable>
        </>
      )}

      {step === 'result' && (
        <>
          <Text style={styles.kicker}>Qual tiragem fazer?</Text>
          <Text style={styles.q}>Tiragens indicadas para você</Text>
          {results.map((s, i) => (
            <Pressable key={s.id} style={[styles.opt, i === 0 && styles.best]} onPress={() => nav.navigate('SpreadDetail', { spreadId: s.id })}>
              <Text style={styles.optText}>{s.name}</Text>
              <Text style={styles.optSub}>{i === 0 ? 'Melhor opção · ' : ''}{s.count === 1 ? '1 carta' : `${s.count} cartas`} · {s.level}</Text>
            </Pressable>
          ))}
          <Pressable onPress={restart}><Text style={styles.link}>Refazer o questionário</Text></Pressable>
          <Pressable onPress={toHub}><Text style={styles.link}>Voltar aos quizzes</Text></Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  kicker: { color: colors.rose, fontSize: 13, fontWeight: '600', marginTop: 8 },
  q: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  opt: { backgroundColor: colors.surface, padding: 16, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  best: { borderColor: colors.saffron },
  disabled: { opacity: 0.55 },
  optText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  optSub: { color: colors.muted, marginTop: 4, lineHeight: 20 },
  soon: { color: colors.saffron, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginTop: 8 },
  link: { color: colors.rose, marginTop: 14, textAlign: 'center', padding: 8 },
});
