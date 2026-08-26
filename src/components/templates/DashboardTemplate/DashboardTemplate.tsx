import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { DashboardHeader } from '../../organisms/DashboardHeader';

export interface DashboardTemplateProps {
  readonly children?: React.ReactNode;
  readonly style?: ViewStyle;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <DashboardHeader />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
