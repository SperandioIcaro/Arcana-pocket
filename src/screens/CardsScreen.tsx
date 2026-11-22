import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardImage from '../components/CardImage';
import { ARCANO_LABEL, CARDS } from '../data/cards';
import { colors, radius } from '../theme';
import { Arcano, RootStackParamList } from '../types';
import { matchesQuery } from '../utils/search';

type Filter = 'todas' | Arcano;
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  ...(Object.keys(ARCANO_LABEL) as Arcano[]).map((id) => ({ id, label: ARCANO_LABEL[id] })),
];

export default function CardsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('todas');

  const itemW = (width - 32 - 20) / 3;
  const itemH = itemW / 0.58;

  const data = useMemo(
    () => CARDS.filter((c) => (filter === 'todas' || c.arcano === filter) && matchesQuery(c, query)),
    [query, filter]
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar: nome, palavra-chave ou 6 de ouros"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => (
            <Pressable key={f.id} onPress={() => setFilter(f.id)} style={[styles.chip, filter === f.id && styles.chipOn]}>
              <Text style={[styles.chipText, filter === f.id && styles.chipTextOn]}>{f.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ padding: 16, gap: 14 }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma carta encontrada. Tente outro termo ou limpe o filtro.</Text>}
        renderItem={({ item }) => (
          <Pressable style={{ width: itemW }} onPress={() => nav.navigate('CardDetail', { cardId: item.id })}>
            <CardImage uri={item.image} style={{ width: itemW, height: itemH, borderRadius: radius.sm }} />
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: {
    margin: 16, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: colors.surface, borderRadius: radius.md, color: colors.text,
    borderWidth: 1, borderColor: colors.border,
  },
  chips: { paddingHorizontal: 16, gap: 8, paddingBottom: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipOn: { backgroundColor: colors.saffron, borderColor: colors.saffron },
  chipText: { color: colors.muted },
  chipTextOn: { color: colors.bg, fontWeight: '700' },
  name: { color: colors.text, fontSize: 12, marginTop: 6, textAlign: 'center' },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40 },
});
