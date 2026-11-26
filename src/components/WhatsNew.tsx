import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { CHANGELOG, ChangelogEntry } from '../data/changelog';
import { compareVersions } from '../utils/updateCheck';
import { colors, radius } from '../theme';

const SEEN_KEY = 'arcana:last-seen-version';

interface Props {
  // chamado quando não há nada a mostrar ou quando a pessoa fecha o popup
  onDone: () => void;
}

// Mostra as novidades uma única vez por versão, na primeira abertura depois de atualizar.
export default function WhatsNew({ onDone }: Props) {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const current = Constants.expoConfig?.version;

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!current) return onDone();
      const last = await AsyncStorage.getItem(SEEN_KEY).catch(() => null);
      if (!alive) return;
      if (last && compareVersions(last, current) >= 0) return onDone(); // já viu esta versão

      // atualizando de uma versão conhecida: mostra tudo o que saiu desde então;
      // primeira abertura sem registro: mostra só a versão atual
      const list = CHANGELOG.filter((e) =>
        last
          ? compareVersions(e.version, last) > 0 && compareVersions(e.version, current) <= 0
          : compareVersions(e.version, current) === 0
      );
      if (list.length === 0) {
        AsyncStorage.setItem(SEEN_KEY, current).catch(() => {});
        return onDone();
      }
      setEntries(list);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (entries.length === 0) return null;

  const close = () => {
    if (current) AsyncStorage.setItem(SEEN_KEY, current).catch(() => {});
    setEntries([]);
    onDone();
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.glyph}>✦</Text>
          <Text style={styles.title}>Novidades</Text>
          <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 4 }}>
            {entries.map((e) => (
              <View key={e.version} style={styles.entry}>
                <Text style={styles.version}>
                  Versão {e.version} · {e.title}
                </Text>
                {e.items.map((it) => (
                  <View key={it} style={styles.row}>
                    <Text style={styles.bullet}>✦</Text>
                    <Text style={styles.item}>{it}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <Pressable style={styles.button} onPress={close} accessibilityRole="button">
            <Text style={styles.buttonText}>Entendi</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(10,7,20,0.75)', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 22, alignItems: 'center', maxHeight: '85%' },
  glyph: { color: colors.saffron, fontSize: 26 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 6 },
  list: { alignSelf: 'stretch', marginTop: 14, flexGrow: 0 },
  entry: { marginBottom: 10 },
  version: { color: colors.rose, fontSize: 14, fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  bullet: { color: colors.saffron, fontSize: 12, marginTop: 4 },
  item: { flex: 1, color: colors.text, fontSize: 14.5, lineHeight: 21 },
  button: { alignSelf: 'stretch', backgroundColor: colors.saffron, borderRadius: radius.md, paddingVertical: 13, alignItems: 'center', marginTop: 16 },
  buttonText: { color: colors.bg, fontWeight: '700', fontSize: 15 },
});
