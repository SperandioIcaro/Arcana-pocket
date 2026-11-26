import React, { useEffect, useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { checkForUpdate, UpdateInfo } from '../utils/updateCheck';
import { colors, radius } from '../theme';

const DISMISSED_KEY = 'arcana:update-dismissed';

// Aviso de nova versão. Monte uma vez, depois da abertura animada.
export default function UpdateNotice() {
  const [update, setUpdate] = useState<UpdateInfo | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const current = Constants.expoConfig?.version;
      if (!current) return;
      const info = await checkForUpdate(current);
      if (!info || !alive) return;
      // 'Agora não' vale só para aquela versão; uma mais nova avisa de novo
      const dismissed = await AsyncStorage.getItem(DISMISSED_KEY).catch(() => null);
      if (!alive || dismissed === info.version) return;
      setUpdate(info);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!update) return null;

  const close = () => {
    AsyncStorage.setItem(DISMISSED_KEY, update.version).catch(() => {});
    setUpdate(null);
  };

  const download = () => {
    Linking.openURL(update.url).catch(() => {});
    setUpdate(null);
  };

  return (
    <Modal transparent animationType='fade' onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.glyph}>✦</Text>
          <Text style={styles.title}>Uma nova versão chegou</Text>
          <Text style={styles.version}>Arcana Pocket {update.version}</Text>
          {update.notes ? (
            <ScrollView style={styles.notes}>
              <Text style={styles.notesText}>{update.notes}</Text>
            </ScrollView>
          ) : null}
          <Pressable style={styles.primary} onPress={download}>
            <Text style={styles.primaryText}>Baixar atualização</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={close}>
            <Text style={styles.secondaryText}>Agora não</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(10,7,20,0.75)', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 22, alignItems: 'center' },
  glyph: { color: colors.saffron, fontSize: 26 },
  title: { color: colors.text, fontSize: 19, fontWeight: '700', marginTop: 6 },
  version: { color: colors.rose, marginTop: 4, fontSize: 14 },
  notes: { maxHeight: 140, alignSelf: 'stretch', marginTop: 14, backgroundColor: colors.surface2, borderRadius: radius.sm, padding: 12 },
  notesText: { color: colors.muted, lineHeight: 20 },
  primary: { alignSelf: 'stretch', backgroundColor: colors.saffron, borderRadius: radius.md, paddingVertical: 13, alignItems: 'center', marginTop: 18 },
  primaryText: { color: colors.bg, fontWeight: '700', fontSize: 15 },
  secondary: { paddingVertical: 12, marginTop: 4 },
  secondaryText: { color: colors.muted, fontSize: 14 },
});
