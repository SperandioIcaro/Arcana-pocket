import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LOCAL } from '../data/cardImages';
import { colors } from '../theme';
import { RootStackParamList } from '../types';

// Frase de apresentação (troque aqui)
const TAGLINE = 'Estude tarot, carta por carta.';

type Tab = 'Cartas' | 'Tiragens' | 'Quiz' | 'Pessoal' | 'Guia';

// Em sentido horário, a partir do topo. amp = quanto flutua (px), dur = ritmo (ms)
const SECTIONS: { tab: Tab; card: string; amp: number; durX: number; durY: number }[] = [
  { tab: 'Cartas', card: 'maior-0', amp: 7, durX: 4200, durY: 5200 },
  { tab: 'Tiragens', card: 'maior-10', amp: 8, durX: 5000, durY: 4000 },
  { tab: 'Quiz', card: 'maior-9', amp: 6, durX: 4600, durY: 5600 },
  { tab: 'Pessoal', card: 'maior-17', amp: 8, durX: 3800, durY: 4800 },
  { tab: 'Guia', card: 'maior-2', amp: 7, durX: 5400, durY: 4300 },
];

// multiplica um valor animado por uma constante (tudo continua no driver nativo)
const mul = (v: Animated.AnimatedInterpolation<number> | Animated.Value, k: number) =>
  v.interpolate({ inputRange: [0, 1], outputRange: [0, k] });

// Vai até um extremo e depois oscila para sempre entre -amp e +amp.
// resetBeforeIteration: false é o que evita o "solavanco": sem isso o Animated.loop
// volta o valor para 0 a cada volta e o círculo dá um pulo.
function drift(v: Animated.Value, amp: number, duration: number, delay: number) {
  const to = (value: number, ms: number) =>
    Animated.timing(v, { toValue: value, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
  return Animated.sequence([
    Animated.delay(delay),
    to(amp, duration / 2),
    Animated.loop(Animated.sequence([to(-amp, duration), to(amp, duration)]), { resetBeforeIteration: false }),
  ]);
}

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const focused = useIsFocused(); // só anima quando o menu está na tela

  const motion = useRef(
    SECTIONS.map(() => ({ dx: new Animated.Value(0), dy: new Animated.Value(0) }))
  ).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!focused) return;
    const anims = [
      ...SECTIONS.flatMap((s, i) => [
        drift(motion[i].dx, s.amp, s.durX, i * 350),
        drift(motion[i].dy, s.amp, s.durY, i * 500),
      ]),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        { resetBeforeIteration: false }
      ),
    ];
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [focused, motion, pulse]);

  // geometria: centro e raio da mandala dentro da área livre da tela
  const headerH = insets.top + 118;
  const footerH = insets.bottom + 56;
  const areaH = height - headerH - footerH;
  const size = Math.round(Math.min(92, width * 0.23)); // diâmetro dos círculos
  const R = Math.max(90, Math.min(width * 0.34, areaH / 2 - size / 2 - 22));
  const cx = width / 2;
  const cy = headerH + areaH / 2;
  const EMBLEM = 96;

  const nodes = useMemo(
    () =>
      SECTIONS.map((s, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / SECTIONS.length;
        return { ...s, a, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), cos: Math.cos(a), sin: Math.sin(a) };
      }),
    [cx, cy, R]
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <Text style={styles.title}>✦ Arcana Pocket</Text>
        <Text style={styles.tagline}>{TAGLINE}</Text>
      </View>

      <View
        pointerEvents="none"
        style={[styles.ring, { left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: R }]}
      />

      {/* as linhas: cada uma sai do centro e acompanha o círculo que flutua.
          Para deslocamentos pequenos, comprimento e ângulo variam de forma linear,
          então tudo roda no driver nativo. */}
      {nodes.map((n, i) => {
        const { dx, dy } = motion[i];
        const radial = Animated.add(mul(dx, n.cos), mul(dy, n.sin)); // estica/encolhe a linha
        const tangent = Animated.add(mul(dx, -n.sin), mul(dy, n.cos)); // gira a linha
        return (
          <Animated.View
            key={n.tab}
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: cx,
              top: cy,
              width: 0,
              height: 0,
              transform: [
                { rotate: tangent.interpolate({ inputRange: [0, 1], outputRange: [`${n.a}rad`, `${n.a + 1 / R}rad`] }) },
              ],
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: -0.6,
                width: R,
                height: 1.2,
                backgroundColor: colors.saffron,
                opacity: 0.5,
                transform: [
                  { translateX: radial.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
                  { scaleX: radial.interpolate({ inputRange: [0, 1], outputRange: [1, 1 + 1 / R] }) },
                ],
              }}
            />
          </Animated.View>
        );
      })}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.emblem,
          {
            left: cx - EMBLEM / 2,
            top: cy - EMBLEM / 2,
            width: EMBLEM,
            height: EMBLEM,
            borderRadius: EMBLEM / 2,
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) }],
          },
        ]}
      >
        <Text style={styles.emblemGlyph}>✦</Text>
      </Animated.View>

      {nodes.map((n, i) => {
        const { dx, dy } = motion[i];
        return (
          <Animated.View
            key={n.tab}
            style={[
              styles.node,
              {
                left: n.x - (size + 40) / 2,
                top: n.y - size / 2,
                width: size + 40,
                transform: [
                  { translateX: dx },
                  { translateY: dy },
                  { rotate: dx.interpolate({ inputRange: [-n.amp, n.amp], outputRange: ['-4deg', '4deg'] }) },
                ],
              },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={n.tab}
              onPress={() => nav.navigate('Tabs', { screen: n.tab })}
              style={({ pressed }) => ({ alignItems: 'center', opacity: pressed ? 0.75 : 1 })}
            >
              <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
                <Animated.Image source={LOCAL[n.card]} style={{ width: size, height: size * 1.7 }} resizeMode="cover" />
              </View>
              <Text style={styles.label}>{n.tab}</Text>
            </Pressable>
          </Animated.View>
        );
      })}

      <Text style={[styles.hint, { bottom: insets.bottom + 20 }]}>Escolha uma carta para entrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { alignItems: 'center', paddingHorizontal: 24 },
  title: { color: colors.saffron, fontSize: 30, fontWeight: '700', letterSpacing: 0.5 },
  tagline: { color: colors.muted, fontSize: 14, marginTop: 6, textAlign: 'center' },
  ring: { position: 'absolute', borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  emblem: {
    position: 'absolute',
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemGlyph: { color: colors.saffron, fontSize: 38 },
  node: { position: 'absolute', alignItems: 'center' },
  circle: { overflow: 'hidden', borderWidth: 2, borderColor: colors.saffron, backgroundColor: colors.surface },
  label: { color: colors.text, fontSize: 13, fontWeight: '600', marginTop: 6 },
  hint: { position: 'absolute', left: 0, right: 0, textAlign: 'center', color: colors.muted, fontSize: 13 },
});
