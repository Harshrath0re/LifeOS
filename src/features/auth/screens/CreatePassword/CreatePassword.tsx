import React, { useState } from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutes } from '../../../../constants/routes';
import { COLORS } from '../../../../theme/colors';
import { rf, rh, rw } from '../../../../theme/responsive';
import { TYPOGRAPHY } from '../../../../theme/typography';
import AuthService from '../../../../services/AuthService';

type CreatePasswordNavProp = StackNavigationProp<any, AuthRoutes.CREATE_PASSWORD>;

interface Props {
  navigation: CreatePasswordNavProp;
}

const CreatePassword: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    if (isProcessing) {
      return;
    }

    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedPassword) {
      setError('Please enter a master PIN.');
      return;
    }

    if (trimmedPassword.length < 4) {
      setError('PIN must be at least 4 digits.');
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError('PINs do not match.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      await AuthService.createPassword(trimmedPassword);
      navigation.replace(AuthRoutes.ENABLE_BIOMETRIC as any);
    } catch (err) {
      console.error('Error creating PIN:', err);
      setError('Failed to create PIN. Please try again.');
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

          <Text style={styles.title}>Create Master PIN</Text>
          <Text style={styles.subtitle}>
            Set a 4 to 6 digit PIN to protect your personal data in LifeOS.
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
                placeholder="Enter 4-6 digit PIN"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Master PIN</Text>
            <TextInput
              style={styles.inputFull}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError(null);
              }}
              placeholder="Confirm 4-6 digit PIN"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry={!showPassword}
              keyboardType="number-pad"
              maxLength={6}
              autoCapitalize="none"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, isProcessing && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={isProcessing}>
            <Text style={styles.buttonText}>
              {isProcessing ? 'Creating PIN...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreatePassword;

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
  inputFull: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: rw(8),
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
});
