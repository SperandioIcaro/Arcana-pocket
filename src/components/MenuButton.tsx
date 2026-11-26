import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

// Botão do cabeçalho que volta para o menu (a mandala).
export default function MenuButton() {
  const nav = useNavigation();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Voltar ao menu"
      hitSlop={12}
      onPress={() => nav.dispatch(StackActions.popToTop())}
      style={({ pressed }) => ({ marginLeft: 16, opacity: pressed ? 0.6 : 1 })}
    >
      <Ionicons name="apps-outline" size={24} color={colors.saffron} />
    </Pressable>
  );
}
