import { Animated, Easing } from 'react-native';

// Multiplica um valor animado por uma constante (continua no driver nativo).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mul = (v: any, k: number): Animated.AnimatedInterpolation<number> =>
  v.interpolate({ inputRange: [0, 1], outputRange: [0, k] });

// Flutua para sempre entre -amp e +amp, sem nunca resetar o valor
// (resetBeforeIteration: false evita o solavanco de recomeço).
export function drift(v: Animated.Value, amp: number, duration: number, delay = 0) {
  const to = (value: number, ms: number) =>
    Animated.timing(v, { toValue: value, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
  return Animated.sequence([
    Animated.delay(delay),
    to(amp, duration / 2),
    Animated.loop(Animated.sequence([to(-amp, duration), to(amp, duration)]), { resetBeforeIteration: false }),
  ]);
}
