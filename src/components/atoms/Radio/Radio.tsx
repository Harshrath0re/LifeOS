import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Touchable, TouchableProps } from '../Touchable';
import { COLORS } from '../../../theme/colors';
import { rw, rh } from '../../../theme/responsive';
import { Text } from '../Text';

export interface RadioProps extends Omit<TouchableProps, 'onPress'> {
  readonly selected: boolean;
  readonly onChange?: (selected: boolean) => void;
  readonly label?: string;
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  onChange,
  label,
  style,
  ...props
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!selected);
    }
  };

  return (
    <Touchable style={[styles.container, style]} onPress={handlePress} {...props}>
      <View style={[styles.outer, selected && styles.outerSelected]}>
        {selected ? <View style={styles.inner} /> : null}
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
  outer: {
    width: rw(20),
    height: rw(20),
    borderRadius: rw(10),
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  outerSelected: {
    borderColor: COLORS.primary,
  },
  inner: {
    width: rw(10),
    height: rw(10),
    borderRadius: rw(5),
    backgroundColor: COLORS.primary,
  },
  label: {
    marginLeft: rw(8),
  },
});
