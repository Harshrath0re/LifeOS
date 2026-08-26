import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Badge } from '../../atoms/Badge';
import { Touchable } from '../../atoms/Touchable';
import { rw, rh } from '../../../theme/responsive';

export interface FilterOption {
  readonly id: string;
  readonly label: string;
}

export interface FilterBarProps {
  readonly options: readonly FilterOption[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
  readonly style?: ViewStyle;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selectedId,
  onSelect,
  style,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {options.map((option) => (
        <Touchable
          key={option.id}
          onPress={() => onSelect(option.id)}
          style={styles.item}
        >
          <Badge
            label={option.label}
            variant={selectedId === option.id ? 'primary' : 'secondary'}
          />
        </Touchable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(16),
    paddingVertical: rh(8),
  },
  item: {
    marginRight: rw(8),
  },
});
