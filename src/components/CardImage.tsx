import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

interface Props {
  uri: string | number;
  style?: StyleProp<any>;
  reversed?: boolean;
}

export default function CardImage({ uri, style, reversed }: Props) {
  const [failed, setFailed] = useState(false);
  const progress = useRef(new Animated.Value(reversed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: reversed ? 1 : 0,
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [reversed, progress]);

  const transform = [
    { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) },
    { scale: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.9, 1] }) },
  ];

  if (failed) {
    return (
      <Animated.View style={[styles.fallback, style, { transform }]}>
        <Text style={styles.glyph}>✦</Text>
      </Animated.View>
    );
  }
  return (
    <Animated.Image
      source={typeof uri === 'number' ? uri : { uri }}
      style={[style, { transform }]}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  glyph: { color: colors.saffron, fontSize: 28 },
});
