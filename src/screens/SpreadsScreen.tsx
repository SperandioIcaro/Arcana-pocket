import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SpreadThumb from '../components/SpreadThumb';
import { SPREADS } from '../data/spreads';
import { colors, radius } from '../theme';
import { RootStackParamList } from '../types';

export default function SpreadsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={SPREADS}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => nav.navigate('SpreadDetail', { spreadId: item.id })}>
          <SpreadThumb spread={item} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.level}>{item.level} · {item.count === 1 ? '1 carta' : `${item.count} cartas`}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: { flexDirection: 'row', gap: 14, backgroundColor: colors.surface, padding: 16, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  name: { color: colors.text, fontSize: 17, fontWeight: '700' },
  level: { color: colors.rose, marginTop: 2, fontSize: 13 },
  desc: { color: colors.muted, marginTop: 6, lineHeight: 20 },
});
