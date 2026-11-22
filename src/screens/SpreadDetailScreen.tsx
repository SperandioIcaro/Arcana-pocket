import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSpread } from '../data/spreads';
import { colors, radius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SpreadDetail'>;

const BOX_W = 48;
const BOX_H = 74;

export default function SpreadDetailScreen({ route, navigation }: Props) {
  const spread = getSpread(route.params.spreadId);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({ title: spread?.name ?? 'Tiragem' });
  }, [navigation, spread]);

  if (!spread) return <View style={styles.container}><Text style={styles.body}>Tiragem não encontrada.</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.level}>{spread.level} · {spread.count === 1 ? '1 carta' : `${spread.count} cartas`}</Text>
      <Text style={styles.body}>{spread.description}</Text>

      <Text style={styles.h}>Quando usar</Text>
      <Text style={styles.body}>{spread.whenToUse}</Text>

      <Text style={styles.h}>Como dispor as cartas</Text>
      <View style={[styles.diagram, { height: spread.diagramHeight, width: width - 32 }]}>
        {spread.positions.map((p, i) => (
          <View
            key={p.title}
            style={[
              styles.slot,
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                marginLeft: -BOX_W / 2,
                marginTop: -BOX_H / 2,
                transform: p.rotated ? [{ rotate: '90deg' }] : undefined,
                opacity: p.rotated ? 0.85 : 1,
              },
            ]}
          >
            <Text style={styles.slotNum}>{i + 1}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.h}>O que cada posição significa</Text>
      {spread.positions.map((p, i) => (
        <View key={p.title} style={styles.pos}>
          <View style={styles.posNum}><Text style={styles.posNumText}>{i + 1}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.posTitle}>{p.title}</Text>
            <Text style={styles.posMeaning}>{p.meaning}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  level: { color: colors.rose, marginBottom: 8 },
  h: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 8 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  diagram: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginTop: 4 },
  slot: { position: 'absolute', width: BOX_W, height: BOX_H, borderRadius: 6, borderWidth: 1.5, borderColor: colors.saffron, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' },
  slotNum: { color: colors.saffron, fontWeight: '700', fontSize: 16 },
  pos: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  posNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.saffron, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  posNumText: { color: colors.bg, fontWeight: '700' },
  posTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  posMeaning: { color: colors.muted, marginTop: 2, lineHeight: 21 },
});
