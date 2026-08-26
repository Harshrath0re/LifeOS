import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../../../theme/colors';
import { rw, rh } from '../../../../theme/responsive';
import { TYPOGRAPHY } from '../../../../theme/typography';

const Splash: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0.82)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(18)).current;

  const dot1 = useRef(new Animated.Value(0.2)).current;
  const dot2 = useRef(new Animated.Value(0.2)).current;
  const dot3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(titleOpacity, {
      delay: 350,
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();

    Animated.timing(titleTranslate, {
      delay: 350,
      duration: 500,
      easing: Easing.out(Easing.ease),
      toValue: 0,
      useNativeDriver: true,
    }).start();

    animateDots();
  }, []);

  const pulse = (value: Animated.Value, delay: number) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0.2,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    );

  const animateDots = () => {
    Animated.parallel([
      pulse(dot1, 0),
      pulse(dot2, 180),
      pulse(dot3, 360),
    ]).start();
  };

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.background}
        barStyle="light-content"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Animated.Image
            source={require('../../../../assets/icons/lifeos-logo.png')}
            style={[
              styles.logo,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
            resizeMode="contain"
          />

          <Animated.View
            style={{
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslate }],
            }}
          >
            <Text style={styles.title}>LifeOS</Text>

            <Text style={styles.subtitle}>
              Personal Operating System
            </Text>

            <Text style={styles.author}>
              by Harsh Rathore
            </Text>
          </Animated.View>

          <View style={styles.loadingRow}>
            <Animated.View style={[styles.dot, { opacity: dot1 }]} />
            <Animated.View style={[styles.dot, { opacity: dot2 }]} />
            <Animated.View style={[styles.dot, { opacity: dot3 }]} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(24),
  },

  logo: {
    width: rw(135),
    height: rw(135),

    shadowColor: COLORS.shadow,
    shadowOpacity: 0.28,
    shadowRadius: rw(30),
    shadowOffset: {
      width: 0,
      height: rh(10),
    },

    elevation: 12,
  },

  title: {
    ...TYPOGRAPHY.h1,

    color: COLORS.white,

    marginTop: rh(30),

    textAlign: 'center',

    letterSpacing: 3,
  },

  subtitle: {
    ...TYPOGRAPHY.bodyLarge,

    color: COLORS.textSecondary,

    marginTop: rh(10),

    textAlign: 'center',
  },

  author: {
    ...TYPOGRAPHY.bodySmall,

    color: COLORS.textMuted,

    marginTop: rh(8),

    textAlign: 'center',
  },

  loadingRow: {
    flexDirection: 'row',

    marginTop: rh(55),

    alignItems: 'center',
  },

  dot: {
    width: rw(8),

    height: rw(8),

    borderRadius: rw(4),

    marginHorizontal: rw(5),

    backgroundColor: COLORS.primary,
  },
});