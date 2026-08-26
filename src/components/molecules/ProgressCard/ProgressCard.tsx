import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { Progress } from '../../atoms/Progress';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';

export interface ProgressCardProps {
  readonly title: string;
  readonly progress: number;
  readonly subtitle?: string;
  readonly style?: ViewStyle;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  subtitle,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <Text variant="bodyLarge">{title}</Text>
      <Progress progress={progress} style={styles.progressBar} />
      {subtitle ? (
        <Text variant="caption" color={COLORS.textSecondary}>
          {subtitle}
        </Text>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: rh(6),
  },
  progressBar: {
    marginVertical: rh(8),
  },
});
