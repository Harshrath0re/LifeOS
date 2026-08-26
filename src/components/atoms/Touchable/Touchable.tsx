import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends TouchableOpacityProps {
  readonly children?: React.ReactNode;
}

export const Touchable: React.FC<TouchableProps> = ({
  activeOpacity = 0.7,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...props}>
      {children}
    </TouchableOpacity>
  );
};
