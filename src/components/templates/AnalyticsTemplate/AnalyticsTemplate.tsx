import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { Header } from '../../molecules/Header';

export interface AnalyticsTemplateProps {
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly style?: ViewStyle;
}

export const AnalyticsTemplate: React.FC<AnalyticsTemplateProps> = ({
  title = 'Analytics',
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Header title={title} />
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
