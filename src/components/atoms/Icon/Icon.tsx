import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { ICONS } from '../../../theme/Icons';
import { ri } from '../../../theme/responsive';

export interface IconProps {
  readonly source?: ImageSourcePropType;
  readonly name?: keyof typeof ICONS;
  readonly size?: number;
  readonly tintColor?: string;
}

export const Icon: React.FC<IconProps> = ({
  source,
  name,
  size = ri(24),
  tintColor,
}) => {
  const iconSource = source || (name ? ICONS[name] : ICONS.logo);

  return (
    <Image
      source={iconSource}
      style={[{ width: size, height: size }, tintColor ? { tintColor } : null]}
      resizeMode="contain"
    />
  );
};
