import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { rh, rw } from '../../../../theme/responsive';
import { TYPOGRAPHY } from '../../../../theme/typography';
import AuthService from '../../../../services/AuthService';
import BiometricService from '../../../../services/BiometricService';
import { useAuthStore } from '../../../../stores/authStore';

const EnableBiometric: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await BiometricService.isAvailable();
      setIsAvailable(available);
      if (available) {
        const type = await BiometricService.biometricType();
        setBiometricType(type ?? 'Biometrics');
      }
    };
    checkAvailability();
  }, []);

  const handleEnableBiometric = async () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      const success = await BiometricService.authenticate('Enable Biometric Unlock');
      if (success) {
        AuthService.enableBiometric();
        AuthService.updateLastAuthenticated();
        setAuthenticated(true);
      }
    } catch {
      // Fallback
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    AuthService.disableBiometric();
    AuthService.updateLastAuthenticated();
    setAuthenticated(true);
  };

  const label = biometricType ?? 'Biometrics';

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../../assets/icons/lifeos-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Enable {label}</Text>
          <Text style={styles.subtitle}>
            {isAvailable === false
              ? 'Biometric hardware is not available on this device. You can unlock LifeOS using your master password.'
              : `Use ${label} to quickly and securely unlock LifeOS.`}
          </Text>

          {isAvailable !== false ? (
            <TouchableOpacity
              style={[styles.button, isProcessing && styles.buttonDisabled]}
              onPress={handleEnableBiometric}
              disabled={isProcessing}>
              <Text style={styles.buttonText}>
                {isProcessing ? 'Enabling...' : `Enable ${label}`}
              </Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}>
            <Text style={styles.skipText}>
              {isAvailable === false ? 'Continue to Dashboard' : 'Skip for Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EnableBiometric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: rw(24),
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: rh(24),
  },
  logo: {
    width: rw(100),
    height: rw(100),
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: rh(8),
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: rh(32),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: rh(14),
    borderRadius: rw(8),
    alignItems: 'center',
    marginTop: rh(12),
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background,
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: rh(14),
    alignItems: 'center',
    marginTop: rh(8),
  },
  skipText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
});
