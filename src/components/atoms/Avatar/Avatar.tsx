import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { rw } from '../../../theme/responsive';
import { Text } from '../Text';

export interface AvatarProps {
  readonly source?: ImageSourcePropType;
  readonly name?: string;
  readonly size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = rw(40),
}) => {
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const containerStyle = [
    styles.container,
    { width: size, height: size, borderRadius: size / 2 },
  ];

  if (source) {
    return <Image source={source} style={containerStyle} resizeMode="cover" />;
  }

  return (
    <View style={containerStyle}>
      <Text variant="button" color={COLORS.white}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
