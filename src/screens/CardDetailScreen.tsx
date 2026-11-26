import React, { useLayoutEffect, useState } from 'react';
import { LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardImage from '../components/CardImage';
import Constellation, { THEMES } from '../components/Constellation';
import { ARCANO_LABEL, getCard } from '../data/cards';
import { MAJOR_DEPTH, ThemeId } from '../data/majorDepth';
import { colors, radius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export default function CardDetailScreen({ route, navigation }: Props) {
  const card = getCard(route.params.cardId);
  const [reversed, setReversed] = useState(false);
  const [theme, setTheme] = useState<ThemeId>('geral');

  useLayoutEffect(() => {
    navigation.setOptions({ title: card?.name ?? 'Carta' });
  }, [navigation, card]);

  if (!card) return <View style={styles.container}><Text style={styles.body}>Carta não encontrada.</Text></View>;
  const side = reversed ? card.reversed : card.upright;
  const depth = MAJOR_DEPTH[card.id]; // só os Arcanos Maiores têm aprofundamento por enquanto
  const key = reversed ? 'i' : 'n';
  const themeLabel = THEMES.find((t) => t.id === theme)?.label ?? '';
  const themeText = depth
    ? theme === 'simbolos'
      ? depth.simbolos
      : depth[theme][key]
    : '';
  const selectTheme = (id: ThemeId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTheme(id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <CardImage uri={card.image} reversed={reversed} style={styles.image} />
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.sub}>{card.nameEn} · {ARCANO_LABEL[card.arcano]}</Text>

      <View style={styles.toggle}>
        {[false, true].map((rev) => (
          <Pressable key={String(rev)} onPress={() => setReversed(rev)} style={[styles.toggleBtn, reversed === rev && styles.toggleOn]}>
            <Text style={[styles.toggleText, reversed === rev && styles.toggleTextOn]}>{rev ? 'Invertida' : 'Normal'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.chips}>
        {side.keywords.map((k) => (
          <View key={k} style={styles.chip}><Text style={styles.chipText}>{k}</Text></View>
        ))}
        {depth?.extra[key].map((k) => (
          <View key={k} style={[styles.chip, styles.chipExtra]}><Text style={styles.chipExtraText}>{k}</Text></View>
        ))}
      </View>

      <Text style={styles.body}>{side.meaning}</Text>

      {depth && (
        <>
          <Text style={styles.hint}>Toque numa estrela para ver a carta por outro ângulo</Text>
          <Constellation selected={theme} onSelect={selectTheme} />
          <View style={styles.themeCard}>
            <Text style={styles.themeTitle}>{themeLabel}</Text>
            <Text style={styles.themeText}>{themeText}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  image: { width: 200, height: 345, borderRadius: radius.md, marginVertical: 12 },
  title: { color: colors.text, fontSize: 26, fontWeight: '700', marginTop: 10, textAlign: 'center' },
  sub: { color: colors.muted, marginTop: 4 },
  toggle: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 999, padding: 4, marginTop: 20 },
  toggleBtn: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: 999 },
  toggleOn: { backgroundColor: colors.saffron },
  toggleText: { color: colors.muted, fontWeight: '600' },
  toggleTextOn: { color: colors.bg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 20 },
  chip: { backgroundColor: colors.surface2, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: colors.border },
  chipText: { color: colors.rose },
  body: { color: colors.text, fontSize: 16, lineHeight: 25, marginTop: 20, alignSelf: 'stretch' },
  chipExtra: { backgroundColor: 'transparent' },
  chipExtraText: { color: colors.muted },
  hint: { color: colors.muted, fontSize: 13, marginTop: 28, textAlign: 'center' },
  themeCard: { alignSelf: 'stretch', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 18, marginTop: 8, marginBottom: 28 },
  themeTitle: { color: colors.saffron, fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  themeText: { color: colors.text, fontSize: 15.5, lineHeight: 24 },
});
