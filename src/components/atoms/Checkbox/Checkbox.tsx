import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Touchable, TouchableProps } from '../Touchable';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rw, rh } from '../../../theme/responsive';
import { Text } from '../Text';

export interface CheckboxProps extends Omit<TouchableProps, 'onPress'> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  style,
  ...props
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <Touchable style={[styles.container, style]} onPress={handlePress} {...props}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      {label ? (
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rh(4),
  },
  checkbox: {
    width: rw(20),
    height: rw(20),
    borderRadius: RADIUS.xs,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: rw(8),
  },
});
