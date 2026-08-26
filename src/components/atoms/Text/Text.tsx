import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';

export interface TextProps extends RNTextProps {
  readonly variant?: 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'button' | 'caption';
  readonly color?: string;
  readonly children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'bodyMedium',
  color = COLORS.textPrimary,
  style,
  children,
  ...props
}) => {
  const typographyStyle = TYPOGRAPHY[variant] || TYPOGRAPHY.bodyMedium;

  return (
    <RNText style={[typographyStyle, { color }, style]} {...props}>
      {children}
    </RNText>
  );
};
