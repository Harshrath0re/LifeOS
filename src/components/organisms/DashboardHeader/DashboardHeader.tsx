import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../../atoms/Text';
import { Avatar } from '../../atoms/Avatar';
import { COLORS } from '../../../theme/colors';
import { rw, rh } from '../../../theme/responsive';

export interface DashboardHeaderProps {
  readonly userName?: string;
  readonly greeting?: string;
  readonly style?: ViewStyle;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = 'User',
  greeting = 'Welcome back',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text variant="caption" color={COLORS.textSecondary}>
          {greeting}
        </Text>
        <Text variant="h2">{userName}</Text>
      </View>
      <Avatar name={userName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(16),
    paddingVertical: rh(12),
  },
});
