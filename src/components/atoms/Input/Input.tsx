import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rh, rw, rf } from '../../../theme/responsive';
import { Text } from '../Text';

export interface InputProps extends RNTextInputProps {
  readonly label?: string;
  readonly error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  placeholderTextColor = COLORS.textSecondary,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="caption" color={COLORS.textSecondary} style={styles.label}>
          {label}
        </Text>
      ) : null}
      <RNTextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {error ? (
        <Text variant="caption" color={COLORS.error} style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: rh(6),
  },
  label: {
    marginBottom: rh(4),
  },
  input: {
    height: rh(48),
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.input,
    paddingHorizontal: rw(16),
    color: COLORS.textPrimary,
    fontSize: rf(14),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  error: {
    marginTop: rh(4),
  },
});
