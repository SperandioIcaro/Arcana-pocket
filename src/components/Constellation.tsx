import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ThemeId } from '../data/majorDepth';
import { colors } from '../theme';
import { drift, mul } from '../utils/float';

export const THEMES: { id: ThemeId; label: string; icon: keyof typeof Ionicons.glyphMap; x: number; y: number }[] = [
  { id: 'geral', label: 'Geral', icon: 'sparkles-outline', x: 0.08, y: 0.55 },
  { id: 'amor', label: 'Amor', icon: 'heart-outline', x: 0.28, y: 0.15 },
  { id: 'trabalho', label: 'Trabalho', icon: 'briefcase-outline', x: 0.5, y: 0.55 },
  { id: 'espiritual', label: 'Espiritual', icon: 'moon-outline', x: 0.74, y: 0.1 },
  { id: 'simbolos', label: 'Símbolos', icon: 'eye-outline', x: 0.92, y: 0.5 },
  { id: 'reflexao', label: 'Reflexão', icon: 'chatbubble-ellipses-outline', x: 0.66, y: 1 },
];

// Quais estrelas ficam ligadas por linha (o desenho da constelação)
const EDGES: [ThemeId, ThemeId][] = [
  ['geral', 'amor'],
  ['amor', 'trabalho'],
  ['trabalho', 'espiritual'],
  ['espiritual', 'simbolos'],
  ['trabalho', 'reflexao'],
];

const HEIGHT = 232;
const NODE = 44;

interface Props {
  selected: ThemeId;
  onSelect: (id: ThemeId) => void;
}

export default function Constellation({ selected, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const W = Math.min(width - 40, 420);
  const focused = useIsFocused();

  const motion = useRef(
    THEMES.map(() => ({ dx: new Animated.Value(0), dy: new Animated.Value(0) }))
  ).current;

  useEffect(() => {
    if (!focused) return;
    const anims = THEMES.flatMap((_, i) => [
      drift(motion[i].dx, 3.5, 3600 + i * 450, i * 300),
      drift(motion[i].dy, 3.5, 4800 - i * 350, i * 420),
    ]);
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [focused, motion]);

  const pts = useMemo(
    () => THEMES.map((t) => ({ x: t.x * W, y: 28 + t.y * (HEIGHT - 70) })),
    [W]
  );
  const index = (id: ThemeId) => THEMES.findIndex((t) => t.id === id);

  return (
    <View style={[styles.box, { width: W, height: HEIGHT }]}>
      {/* linhas da constelação: cada uma acompanha as duas estrelas que liga.
          Para deslocamentos pequenos, comprimento e ângulo variam de forma linear,
          então tudo roda no driver nativo (mesma técnica do menu). */}
      {EDGES.map(([a, b]) => {
        const ia = index(a);
        const ib = index(b);
        const A = pts[ia];
        const B = pts[ib];
        const L = Math.hypot(B.x - A.x, B.y - A.y);
        const ang = Math.atan2(B.y - A.y, B.x - A.x);
        const c = Math.cos(ang);
        const s = Math.sin(ang);
        const ddx = Animated.subtract(motion[ib].dx, motion[ia].dx);
        const ddy = Animated.subtract(motion[ib].dy, motion[ia].dy);
        const radial = Animated.add(mul(ddx, c), mul(ddy, s));
        const tangent = Animated.add(mul(ddx, -s), mul(ddy, c));
        return (
          <Animated.View
            key={`${a}-${b}`}
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: A.x,
              top: A.y,
              width: 0,
              height: 0,
              transform: [
                { translateX: motion[ia].dx },
                { translateY: motion[ia].dy },
                { rotate: tangent.interpolate({ inputRange: [0, 1], outputRange: [`${ang}rad`, `${ang + 1 / L}rad`] }) },
              ],
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: -0.5,
                width: L,
                height: 1,
                backgroundColor: colors.border,
                transform: [
                  { translateX: radial.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
                  { scaleX: radial.interpolate({ inputRange: [0, 1], outputRange: [1, 1 + 1 / L] }) },
                ],
              }}
            />
          </Animated.View>
        );
      })}

      {THEMES.map((t, i) => {
        const on = t.id === selected;
        return (
          <Animated.View
            key={t.id}
            style={[
              styles.node,
              {
                left: pts[i].x - 40,
                top: pts[i].y - NODE / 2,
                transform: [{ translateX: motion[i].dx }, { translateY: motion[i].dy }],
              },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
              hitSlop={6}
              onPress={() => onSelect(t.id)}
              style={({ pressed }) => ({ alignItems: 'center', opacity: pressed ? 0.7 : 1 })}
            >
              <View style={[styles.circle, on && styles.circleOn]}>
                <Ionicons name={t.icon} size={20} color={on ? colors.saffron : colors.muted} />
              </View>
              <Text style={[styles.label, on && styles.labelOn]}>{t.label}</Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignSelf: 'center', marginTop: 18 },
  node: { position: 'absolute', width: 80, alignItems: 'center' },
  circle: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOn: { borderColor: colors.saffron, backgroundColor: colors.surface2 },
  label: { color: colors.muted, fontSize: 11.5, marginTop: 4 },
  labelOn: { color: colors.saffron, fontWeight: '600' },
});
