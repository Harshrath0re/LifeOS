import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { rf, rh, rw } from '../../../../theme/responsive';
import { TYPOGRAPHY } from '../../../../theme/typography';
import AuthService from '../../../../services/AuthService';
import BiometricService from '../../../../services/BiometricService';
import { useAuthStore } from '../../../../stores/authStore';

const Unlock: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [canUseBiometrics, setCanUseBiometrics] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('Biometrics');

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    let isMounted = true;

    const checkAndPromptBiometrics = async () => {
      const isEnabled = AuthService.biometricEnabled();
      if (!isEnabled) {
        if (isMounted) {
          setCanUseBiometrics(false);
        }
        return;
      }
      const isAvailable = await BiometricService.isAvailable();
      if (isAvailable && isMounted) {
        setCanUseBiometrics(true);
        const type = await BiometricService.biometricType();
        if (type && isMounted) {
          setBiometricType(type);
        }

        // Auto-prompt biometrics immediately when returning to Unlock screen
        const success = await BiometricService.authenticate('Unlock LifeOS');
        if (success && isMounted) {
          AuthService.updateLastAuthenticated();
          setAuthenticated(true);
        }
      } else if (isMounted) {
        setCanUseBiometrics(false);
      }
    };

    checkAndPromptBiometrics();

    return () => {
      isMounted = false;
    };
  }, [setAuthenticated]);

  const handleUnlockWithPassword = async () => {
    if (isProcessing) {
      return;
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setError('Please enter your master PIN.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const isValid = await AuthService.verifyPassword(trimmedPassword);
      if (isValid) {
        AuthService.updateLastAuthenticated();
        setAuthenticated(true);
      } else {
        setError('Incorrect master PIN. Please try again.');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnlockWithBiometrics = async () => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const success = await BiometricService.authenticate('Unlock LifeOS');
      if (success) {
        AuthService.updateLastAuthenticated();
        setAuthenticated(true);
      }
    } catch {
      setError('Biometric authentication failed.');
    } finally {
      setIsProcessing(false);
    }
  };

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

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Enter your master PIN to unlock LifeOS.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Master PIN</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(null);
                }}
                placeholder="Enter PIN"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={!showPassword}
                keyboardType="number-pad"
                maxLength={6}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}>
                <Text style={styles.toggleText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, isProcessing && styles.buttonDisabled]}
            onPress={handleUnlockWithPassword}
            disabled={isProcessing}>
            <Text style={styles.buttonText}>
              {isProcessing ? 'Verifying...' : 'Unlock'}
            </Text>
          </TouchableOpacity>

          {canUseBiometrics ? (
            <TouchableOpacity
              style={styles.bioButton}
              onPress={handleUnlockWithBiometrics}
              disabled={isProcessing}>
              <Text style={styles.bioText}>
                Unlock with {biometricType}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Unlock;

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
  inputContainer: {
    marginBottom: rh(16),
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: rh(6),
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: rw(8),
  },
  input: {
    flex: 1,
    paddingHorizontal: rw(14),
    paddingVertical: rh(12),
    color: COLORS.white,
    fontSize: rf(14),
  },
  toggleButton: {
    paddingHorizontal: rw(14),
    paddingVertical: rh(12),
  },
  toggleText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  errorText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: rh(16),
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
  bioButton: {
    paddingVertical: rh(14),
    alignItems: 'center',
    marginTop: rh(12),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: rw(8),
  },
  bioText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
});
