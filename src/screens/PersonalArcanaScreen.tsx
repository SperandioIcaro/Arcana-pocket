import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import CardImage from '../components/CardImage';
import { getCard } from '../data/cards';
import { getArcano, PersonalArcano } from '../data/personalArcana';
import { colors, radius } from '../theme';
import { RootStackParamList } from '../types';
import {
  ExpressionResult, LifeResult, PYTHAGOREAN_TABLE, SynthesisResult,
  expressionArcano, lifeArcano, parseBirthDate, synthesisArcano,
} from '../utils/personalArcana';

interface Result {
  life: LifeResult;
  expression: ExpressionResult;
  synthesis: SynthesisResult;
}

interface SavedItem {
  id: string;
  name: string;
  date: string; // DD/MM/AAAA
  savedAt: number;
}

// A chave mantém o nome antigo de propósito: trocá-la apagaria os arcanos já salvos.
const STORAGE_KEY = 'tarot-guia:arcanos-salvos';

const maskDate = (text: string) => {
  const d = text.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
};

const normName = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

function compute(date: string, name: string): { result: Result } | { error: string } {
  const parsed = parseBirthDate(date);
  if (!parsed.ok) return { error: parsed.error };
  const expression = expressionArcano(name);
  if (!expression) return { error: 'Digite o nome completo, com pelo menos uma letra.' };
  const life = lifeArcano(parsed.day, parsed.month, parsed.year);
  const synthesis = synthesisArcano(life.value, expression.value);
  return { result: { life, expression, synthesis } };
}

export default function PersonalArcanaScreen() {
  const [mode, setMode] = useState<'calcular' | 'salvos'>('calcular');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // carrega os salvos
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => { if (raw) setSaved(JSON.parse(raw)); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const persist = useCallback((list: SavedItem[]) => {
    setSaved(list);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)).catch(() => {});
  }, []);

  const isSaved = saved.some((s) => s.date === date && normName(s.name) === normName(name));

  const calculate = () => {
    Keyboard.dismiss();
    const out = compute(date, name);
    if ('error' in out) { setError(out.error); setResult(null); return; }
    setError('');
    setResult(out.result);
  };

  const save = () => {
    if (!result || isSaved) return;
    persist([{ id: String(Date.now()), name: name.trim(), date, savedAt: Date.now() }, ...saved]);
  };

  const open = (item: SavedItem) => {
    const out = compute(item.date, item.name);
    if ('error' in out) return;
    setName(item.name);
    setDate(item.date);
    setError('');
    setResult(out.result);
    setMode('calcular');
  };

  const remove = (item: SavedItem) => {
    Alert.alert('Remover dos salvos', `Remover ${item.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => persist(saved.filter((s) => s.id !== item.id)) },
    ]);
  };

  const clear = () => { setName(''); setDate(''); setResult(null); setError(''); };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <View style={styles.segment}>
        {([['calcular', 'Calcular'], ['salvos', `Salvos (${saved.length})`]] as const).map(([id, label]) => (
          <Pressable key={id} onPress={() => setMode(id)} style={[styles.segBtn, mode === id && styles.segOn]}>
            <Text style={[styles.segText, mode === id && styles.segTextOn]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {mode === 'calcular' ? (
        <>
          <Text style={styles.intro}>
            Descubra os três arcanos pessoais a partir da data de nascimento e do nome completo.
          </Text>

          <Text style={styles.label}>Data de nascimento</Text>
          <TextInput
            value={date}
            onChangeText={(t) => setDate(maskDate(t))}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.muted}
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
          />

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Como está no registro, com todos os sobrenomes"
            placeholderTextColor={colors.muted}
            autoCapitalize="words"
            style={styles.input}
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable style={styles.button} onPress={calculate}>
            <Text style={styles.buttonText}>Calcular arcanos</Text>
          </Pressable>

          {result && (
            <>
              <View style={styles.actions}>
                <Pressable style={[styles.secondary, isSaved && styles.secondaryOn]} onPress={save} disabled={isSaved}>
                  <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={18} color={colors.saffron} />
                  <Text style={styles.secondaryText}>{isSaved ? 'Salvo' : 'Salvar'}</Text>
                </Pressable>
                <Pressable style={styles.secondary} onPress={clear}>
                  <Ionicons name="refresh-outline" size={18} color={colors.saffron} />
                  <Text style={styles.secondaryText}>Novo cálculo</Text>
                </Pressable>
              </View>
              <Results result={result} />
            </>
          )}
        </>
      ) : (
        <>
          {loaded && saved.length === 0 && (
            <Text style={styles.empty}>
              Nada salvo ainda. Faça um cálculo e toque em Salvar para guardar aqui os arcanos de você, de amigos e de familiares.
            </Text>
          )}
          {saved.map((item) => {
            const out = compute(item.date, item.name);
            const r = 'result' in out ? out.result : null;
            const lifeCard = r ? getCard(getArcano(r.life.value).cardId) : undefined;
            return (
              <Pressable key={item.id} style={styles.savedCard} onPress={() => open(item)}>
                {lifeCard && (
                  <View style={styles.avatar}>
                    <CardImage uri={lifeCard.image} style={styles.avatarImg} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.savedName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.savedDate}>{item.date}</Text>
                  {r && (
                    <Text style={styles.savedRoman}>
                      {getArcano(r.life.value).roman} · {getArcano(r.expression.value).roman} · {getArcano(r.synthesis.value).roman}
                    </Text>
                  )}
                </View>
                <Pressable onPress={() => remove(item)} hitSlop={12} style={styles.trash}>
                  <Ionicons name="trash-outline" size={20} color={colors.rose} />
                </Pressable>
              </Pressable>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

function Results({ result }: { result: Result }) {
  const life = getArcano(result.life.value);
  const expr = getArcano(result.expression.value);
  const synth = getArcano(result.synthesis.value);

  const lifeLines = [`${result.life.digits.join(' + ')} = ${result.life.sum}`, ...result.life.steps];

  const exprLines = [
    ...result.expression.parts.map(
      (p) => `${p.word} = ${p.letters.map((l) => l.value).join(' + ')} = ${p.sum}\n${p.letters.map((l) => `${l.char}=${l.value}`).join('  ')}`
    ),
    `Soma total: ${result.expression.parts.map((p) => p.sum).join(' + ')} = ${result.expression.total}`,
    ...result.expression.steps,
  ];

  const synthLines = [`${result.life.value} + ${result.expression.value} = ${result.synthesis.sum}`, ...result.synthesis.steps];

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.summary}>
        {[
          { t: 'Vida', a: life },
          { t: 'Expressão', a: expr },
          { t: 'Síntese', a: synth },
        ].map(({ t, a }) => (
          <View key={t} style={styles.summaryItem}>
            <Text style={styles.summaryTitle}>{t}</Text>
            <Text style={styles.summaryRoman}>{a.roman}</Text>
            <Text style={styles.summaryName}>{a.name}</Text>
          </View>
        ))}
      </View>

      <ArcanoSection title="Arcano de Vida" subtitle="Essência, aprendizados e jornada pessoal" arcano={life} text={life.vida} lines={lifeLines} />

      <ArcanoSection
        title="Arcano de Expressão"
        subtitle="Manifestação, comunicação e talentos"
        arcano={expr}
        text={expr.expressao}
        lines={exprLines}
        extra={
          <Text style={styles.calcNote}>
            Tabela pitagórica: {PYTHAGOREAN_TABLE.map((r) => `${r.value} = ${r.letters}`).join(' · ')}
          </Text>
        }
      />

      <ArcanoSection title="Arcano de Síntese" subtitle="Integração, amadurecimento e evolução" arcano={synth} text={synth.sintese} lines={synthLines} />

      <Text style={styles.h}>Leitura integrada</Text>
      <Text style={styles.body}>
        A essência é {life.name} ({life.keywords[0]}, {life.keywords[1]}). Ela se manifesta pelo caminho de {expr.name} ({expr.keywords[0]}, {expr.keywords[1]}) e evolui ao integrar os dois em {synth.name} ({synth.keywords[0]}, {synth.keywords[1]}).
      </Text>

      <Text style={styles.disclaimer}>
        Este é o método específico adotado pelo app: somente adição, resultado entre 1 e 22, numerologia pitagórica e numeração do Tarot de Marselha (VIII = A Justiça, XI = A Força, XXII = O Louco). Outras escolas calculam de outras formas, então não é uma regra universal.
      </Text>
    </View>
  );
}

function ArcanoSection({
  title, subtitle, arcano, text, lines, extra,
}: {
  title: string; subtitle: string; arcano: PersonalArcano; text: string; lines: string[]; extra?: React.ReactNode;
}) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [open, setOpen] = useState(false);
  const card = getCard(arcano.cardId);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSub}>{subtitle}</Text>

      <View style={styles.row}>
        {card && (
          <Pressable onPress={() => nav.navigate('CardDetail', { cardId: card.id })}>
            <CardImage uri={card.image} style={styles.cardImg} />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.roman}>{arcano.roman}</Text>
          <Text style={styles.arcName}>{arcano.name}</Text>
          <View style={styles.chips}>
            {arcano.keywords.map((k) => (
              <View key={k} style={styles.chip}><Text style={styles.chipText}>{k}</Text></View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.body}>{text}</Text>

      <Pressable onPress={() => setOpen((o) => !o)}>
        <Text style={styles.link}>{open ? 'Ocultar cálculo' : 'Ver cálculo'}</Text>
      </Pressable>
      {open && (
        <View style={styles.calc}>
          {lines.map((l, i) => <Text key={i} style={styles.calcLine}>{l}</Text>)}
          {extra}
          <Text style={styles.calcResult}>Resultado: {arcano.roman} — {arcano.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  segment: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 999, padding: 4, marginBottom: 16 },
  segBtn: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  segOn: { backgroundColor: colors.saffron },
  segText: { color: colors.muted, fontWeight: '600' },
  segTextOn: { color: colors.bg },
  intro: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 8 },
  label: { color: colors.text, fontWeight: '600', marginTop: 16, marginBottom: 6 },
  input: { backgroundColor: colors.surface, color: colors.text, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  error: { color: colors.rose, marginTop: 12 },
  button: { backgroundColor: colors.saffron, borderRadius: radius.md, padding: 15, alignItems: 'center', marginTop: 20 },
  buttonText: { color: colors.bg, fontWeight: '700', fontSize: 16 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  secondary: { flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.saffron, borderRadius: radius.md, paddingVertical: 12 },
  secondaryOn: { backgroundColor: colors.surface2 },
  secondaryText: { color: colors.saffron, fontWeight: '600' },
  empty: { color: colors.muted, fontSize: 15, lineHeight: 23, marginTop: 24, textAlign: 'center' },
  savedCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 },
  avatar: { width: 64, height: 64, borderRadius: 32, overflow: 'hidden', borderWidth: 2, borderColor: colors.saffron, backgroundColor: colors.surface2 },
  avatarImg: { width: 88, height: 152, marginLeft: -12, marginTop: -16 },
  savedName: { color: colors.text, fontSize: 16, fontWeight: '600' },
  savedDate: { color: colors.muted, marginTop: 2 },
  savedRoman: { color: colors.saffron, fontWeight: '700', marginTop: 8 },
  trash: { padding: 6 },
  summary: { flexDirection: 'row', gap: 8 },
  summaryItem: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.saffron, padding: 12, alignItems: 'center' },
  summaryTitle: { color: colors.muted, fontSize: 12 },
  summaryRoman: { color: colors.saffron, fontSize: 22, fontWeight: '700', marginTop: 4 },
  summaryName: { color: colors.text, fontSize: 13, textAlign: 'center', marginTop: 2 },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: 16, marginTop: 16 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  sectionSub: { color: colors.rose, marginTop: 2, marginBottom: 14 },
  row: { flexDirection: 'row', gap: 14 },
  cardImg: { width: 96, height: 166, borderRadius: radius.sm },
  roman: { color: colors.saffron, fontSize: 24, fontWeight: '700' },
  arcName: { color: colors.text, fontSize: 18, fontWeight: '600', marginTop: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chip: { backgroundColor: colors.surface2, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: colors.border },
  chipText: { color: colors.rose, fontSize: 12 },
  body: { color: colors.text, fontSize: 15, lineHeight: 24, marginTop: 14 },
  link: { color: colors.saffron, marginTop: 14, fontWeight: '600' },
  calc: { backgroundColor: colors.surface2, borderRadius: radius.sm, padding: 12, marginTop: 10, gap: 6 },
  calcLine: { color: colors.text, fontSize: 13, lineHeight: 20 },
  calcNote: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  calcResult: { color: colors.saffron, fontWeight: '700', marginTop: 6 },
  h: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 28 },
  disclaimer: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 16 },
});
