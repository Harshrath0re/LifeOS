import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { Touchable } from '../../atoms/Touchable';
import { formatDisplayDate } from '../../../utils/date';
import { rw } from '../../../theme/responsive';

export interface DateSelectorProps {
  readonly selectedDate: string;
  readonly onPreviousDay: () => void;
  readonly onNextDay: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onPreviousDay,
  onNextDay,
}) => {
  return (
    <View style={styles.container}>
      <Touchable onPress={onPreviousDay}>
        <Text variant="h3">‹</Text>
      </Touchable>
      <Text variant="bodyLarge">{formatDisplayDate(selectedDate)}</Text>
      <Touchable onPress={onNextDay}>
        <Text variant="h3">›</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(16),
  },
});
