import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../../atoms/Text';
import { Touchable } from '../../atoms/Touchable';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';

export interface SectionHeaderProps {
  readonly title: string;
  readonly actionTitle?: string;
  readonly onActionPress?: () => void;
  readonly style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionTitle,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h3">{title}</Text>
      {actionTitle && onActionPress ? (
        <Touchable onPress={onActionPress}>
          <Text variant="bodySmall" color={COLORS.primary}>
            {actionTitle}
          </Text>
        </Touchable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: rh(12),
  },
});
