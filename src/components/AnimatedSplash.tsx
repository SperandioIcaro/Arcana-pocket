import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors } from '../theme';

interface Props {
  onReady?: () => void; // a tela já foi desenhada (esconde a splash nativa)
  onFinish: () => void; // a animação terminou
}

// Quanto tempo a abertura fica na tela depois de aparecer (ajuste aqui)
const HOLD_MS = 6500;
const REVEAL_MS = 700;
const REVEAL_DELAY_MS = 200;
const FADE_OUT_MS = 450;
const TOTAL_MS = REVEAL_DELAY_MS + REVEAL_MS + HOLD_MS;

const PHRASES = ['Embaralhando as cartas...', 'Consultando os arcanos...', 'Preparando as tiragens...', 'Quase pronto...'];
const BAR_WIDTH = 170;
const CENTER_Y = 0.66; // centro da carta/estrelas: do meio da tela para baixo

const RADIUS = 155;
const SIZE = RADIUS * 2 + 40;
const STARS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * RADIUS, y: Math.sin(a) * RADIUS, size: i % 2 ? 14 : 22 };
});

export default function AnimatedSplash({ onReady, onFinish }: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const [phrase, setPhrase] = useState(0);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const spinAnim = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 7000, easing: Easing.linear, useNativeDriver: true })
    );
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const progressAnim = Animated.timing(progress, {
      toValue: 1, duration: TOTAL_MS, easing: Easing.inOut(Easing.quad), useNativeDriver: false,
    });
    const main = Animated.sequence([
      Animated.timing(reveal, { toValue: 1, duration: REVEAL_MS, delay: REVEAL_DELAY_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.delay(HOLD_MS),
      Animated.timing(fadeOut, { toValue: 0, duration: FADE_OUT_MS, useNativeDriver: true }),
    ]);

    spinAnim.start();
    pulseAnim.start();
    progressAnim.start();
    main.start(({ finished }) => { if (finished) onFinish(); });

    const timer = setInterval(() => setPhrase((p) => (p + 1) % PHRASES.length), TOTAL_MS / PHRASES.length);

    return () => {
      spinAnim.stop(); pulseAnim.stop(); progressAnim.stop(); main.stop();
      clearInterval(timer);
    };
  }, [spin, pulse, reveal, progress, fadeOut, onFinish]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.15] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.22] });
  const cardScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });
  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: [0, BAR_WIDTH] });

  const stageTop = height * CENTER_Y - SIZE / 2;

  return (
    <Animated.View style={[styles.root, { width, height, opacity: fadeOut }]} onLayout={onReady}>
      <Animated.View style={[styles.titleBox, { top: height * 0.17, opacity: reveal }]}>
        <Text style={styles.title}>Arcana Pocket</Text>
        <Text style={styles.subtitle}>Seu apoio para estudar tarot</Text>
      </Animated.View>

      <View style={{ position: 'absolute', top: stageTop, left: (width - SIZE) / 2, width: SIZE, height: SIZE }}>
        <Animated.View
          style={[
            styles.glow,
            { left: (SIZE - 280) / 2, top: (SIZE - 280) / 2, opacity: glowOpacity, transform: [{ scale: glowScale }] },
          ]}
        />

        <Animated.View style={[styles.orbit, { opacity: reveal, transform: [{ rotate }] }]}>
          {STARS.map((s, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: s.size,
                height: s.size,
                left: SIZE / 2 + s.x - s.size / 2,
                top: SIZE / 2 + s.y - s.size / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.saffron, fontSize: s.size, lineHeight: s.size + 2 }}>✦</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.Image
          source={require('../../assets/splash-icon.png')}
          style={{
            position: 'absolute',
            left: (SIZE - 240) / 2,
            top: (SIZE - 240) / 2,
            width: 240,
            height: 240,
            transform: [{ scale: cardScale }],
          }}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[styles.footer, { opacity: reveal }]}>
        <Text style={styles.phrase}>{PHRASES[phrase]}</Text>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width: barWidth }]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { position: 'absolute', top: 0, left: 0, backgroundColor: colors.bg },
  glow: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: colors.saffron },
  orbit: { position: 'absolute', top: 0, left: 0, width: SIZE, height: SIZE },
  titleBox: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  title: { color: colors.saffron, fontSize: 30, fontWeight: '700', letterSpacing: 1.5 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 6 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: '8%', alignItems: 'center' },
  phrase: { color: colors.text, fontSize: 13, opacity: 0.85 },
  track: { width: BAR_WIDTH, height: 4, borderRadius: 2, backgroundColor: colors.surface2, marginTop: 12, overflow: 'hidden' },
  fill: { height: 4, borderRadius: 2, backgroundColor: colors.saffron },
});
