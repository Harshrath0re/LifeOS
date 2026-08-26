import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { Text } from '../Text';

export interface SwitchProps extends RNSwitchProps {
  readonly label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  trackColor = { false: COLORS.surface, true: COLORS.primary },
  thumbColor = COLORS.white,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text variant="bodyMedium">{label}</Text> : null}
      <RNSwitch
        trackColor={trackColor}
        thumbColor={thumbColor}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
