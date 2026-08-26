import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { rh, rw } from '../../../theme/responsive';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';

export interface EmptyStateProps {
  readonly title: string;
  readonly description?: string;
  readonly actionTitle?: string;
  readonly onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionTitle,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" color={COLORS.textSecondary} style={styles.description}>
          {description}
        </Text>
      ) : null}
      {actionTitle && onActionPress ? (
        <Button title={actionTitle} onPress={onActionPress} style={styles.button} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: rw(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: rh(8),
  },
  description: {
    textAlign: 'center',
    marginBottom: rh(16),
  },
  button: {
    marginTop: rh(8),
  },
});
