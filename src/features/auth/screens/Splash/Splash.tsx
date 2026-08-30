import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutes } from '../../../../constants/routes';
import { AuthStackParamList } from '../../../../navigation/AuthStack';

import { COLORS } from '../../../../theme/colors';
import { rh, rw } from '../../../../theme/responsive';
import { TYPOGRAPHY } from '../../../../theme/typography';

import AuthService from '../../../../services/AuthService';
import BiometricService from '../../../../services/BiometricService';
import { useAuthStore } from '../../../../stores/authStore';

type SplashNavigationProp = StackNavigationProp<
  AuthStackParamList,
  AuthRoutes.SPLASH
>;

type Props = {
  navigation: SplashNavigationProp;
};

const Splash: React.FC<Props> = ({ navigation }) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 350,
        useNativeDriver: true,
      }),

      Animated.timing(titleTranslate, {
        toValue: 0,
        duration: 600,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    let isMounted = true;

    const runAuthCheck = async () => {
      const startTime = Date.now();
      const hasPassword = await AuthService.hasPassword();

      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 1800 - elapsed);

      setTimeout(async () => {
        if (!isMounted) {
          return;
        }

        if (!hasPassword) {
          navigation.replace(AuthRoutes.CREATE_PASSWORD as any);
          return;
        }

        const bioEnabled = await AuthService.isBiometricEnabled();
        if (!bioEnabled) {
          navigation.replace(AuthRoutes.UNLOCK as any);
          return;
        }

        const bioAvailable = await BiometricService.isAvailable();
        if (!bioAvailable) {
          navigation.replace(AuthRoutes.UNLOCK as any);
          return;
        }

        const success = await BiometricService.authenticate('Unlock LifeOS');
        if (!isMounted) {
          return;
        }

        if (success) {
          AuthService.updateLastAuthenticated();
          useAuthStore.getState().setAuthenticated(true);
        } else {
          navigation.replace(AuthRoutes.UNLOCK as any);
        }
      }, remainingDelay);
    };

    runAuthCheck();

    return () => {
      isMounted = false;
    };
  }, [navigation, logoOpacity, logoScale, titleOpacity, titleTranslate, rotate]);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.logoContainer}>
            <View style={styles.logoGlow} />

            <Animated.Image
              source={require('../../../../assets/icons/lifeos-logo.png')}
              resizeMode="contain"
              style={[
                styles.logo,
                {
                  opacity: logoOpacity,
                  transform: [
                    { scale: logoScale },
                    {
                      rotate: rotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          <Animated.View
            style={{
              opacity: titleOpacity,
              transform: [
                {
                  translateY: titleTranslate,
                },
              ],
            }}>
            <Text style={styles.title}>
              LifeOS
            </Text>

            <Text style={styles.subtitle}>
              Your Personal Operating System
            </Text>

            <Text style={styles.author}>
              Designed & Developed by Harsh Rathore
            </Text>
          </Animated.View>
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

  logoContainer: {
    width: rw(230),
    height: rw(230),

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: rh(18),
  },

  logoGlow: {
    position: 'absolute',

    width: rw(150),
    height: rw(150),

    borderRadius: rw(75),

    backgroundColor: COLORS.primary,

    opacity: 0.18,

    transform: [
      {
        scale: 1.15,
      },
    ],
  },

  logo: {
    width: rw(185),
    height: rw(185),

    shadowColor: COLORS.primary,

    shadowOpacity: 0.55,

    shadowRadius: rw(35),

    shadowOffset: {
      width: 0,
      height: rh(10),
    },

    elevation: 22,
  },

  title: {
    ...TYPOGRAPHY.h1,

    color: COLORS.white,

    textAlign: 'center',

    letterSpacing: 4,

    marginTop: rh(10),
  },

  subtitle: {
    ...TYPOGRAPHY.bodyLarge,

    color: COLORS.textSecondary,

    textAlign: 'center',

    marginTop: rh(8),
  },

  author: {
    ...TYPOGRAPHY.bodySmall,

    color: COLORS.textMuted,

    textAlign: 'center',

    marginTop: rh(18),

    letterSpacing: 1,
  },
});