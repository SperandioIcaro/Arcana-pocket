import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Spread } from '../types';

const SIZE = 84;
const PAD = 8;

// tamanho de cada mini carta conforme a quantidade
function cardSize(count: number) {
  if (count === 1) return { w: 28, h: 44 };
  if (count <= 3) return { w: 18, h: 29 };
  if (count <= 5) return { w: 14, h: 22 };
  if (count <= 7) return { w: 12, h: 19 };
  return { w: 10, h: 16 };
}

export default function SpreadThumb({ spread }: { spread: Spread }) {
  const { w, h } = cardSize(spread.count);
  const inner = SIZE - PAD * 2;

  return (
    <View style={styles.box}>
      {spread.positions.map((p) => (
        <View
          key={p.title}
          style={[
            styles.mini,
            {
              width: w,
              height: h,
              left: PAD + (p.x / 100) * inner - w / 2,
              top: PAD + (p.y / 100) * inner - h / 2,
              transform: p.rotated ? [{ rotate: '90deg' }] : undefined,
            },
          ]}
        >
          {spread.count === 1 && <Ionicons name="sunny" size={20} color={colors.saffron} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mini: {
    position: 'absolute',
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.saffron,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
