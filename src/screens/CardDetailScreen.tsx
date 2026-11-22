import React, { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardImage from '../components/CardImage';
import { ARCANO_LABEL, getCard } from '../data/cards';
import { colors, radius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export default function CardDetailScreen({ route, navigation }: Props) {
  const card = getCard(route.params.cardId);
  const [reversed, setReversed] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: card?.name ?? 'Carta' });
  }, [navigation, card]);

  if (!card) return <View style={styles.container}><Text style={styles.body}>Carta não encontrada.</Text></View>;
  const side = reversed ? card.reversed : card.upright;

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
      </View>

      <Text style={styles.body}>{side.meaning}</Text>
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
});
