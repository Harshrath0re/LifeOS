import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Input, InputProps } from '../../atoms/Input';
import { rw } from '../../../theme/responsive';

export interface SearchBarProps extends Omit<InputProps, 'placeholder'> {
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder?: string;
  readonly style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(16),
  },
});
