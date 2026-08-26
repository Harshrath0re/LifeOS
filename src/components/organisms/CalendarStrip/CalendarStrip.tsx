import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../../atoms/Text';
import { Touchable } from '../../atoms/Touchable';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rw, rh } from '../../../theme/responsive';

export interface CalendarStripProps {
  readonly selectedDate: string;
  readonly onSelectDate?: (date: string) => void;
  readonly style?: ViewStyle;
}

export const CalendarStrip: React.FC<CalendarStripProps> = ({
  selectedDate,
  onSelectDate,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Touchable
        style={[styles.dayItem, styles.activeItem]}
        onPress={() => onSelectDate?.(selectedDate)}
      >
        <Text variant="caption" color={COLORS.white}>
          Today
        </Text>
        <Text variant="button" color={COLORS.white}>
          {selectedDate}
        </Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: rh(8),
  },
  dayItem: {
    paddingHorizontal: rw(16),
    paddingVertical: rh(8),
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: COLORS.primary,
  },
});
