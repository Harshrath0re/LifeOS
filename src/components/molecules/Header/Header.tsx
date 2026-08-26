import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { rh, rw } from '../../../theme/responsive';
import { Text } from '../../atoms/Text';
import { Touchable } from '../../atoms/Touchable';

export interface HeaderProps {
  readonly title: string;
  readonly showBack?: boolean;
  readonly onBackPress?: () => void;
  readonly rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightElement,
}) => {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Touchable onPress={onBackPress} style={styles.backButton}>
          <Text variant="h3">←</Text>
        </Touchable>
      ) : (
        <View style={styles.backButton} />
      )}
      <Text variant="h3" style={styles.title}>
        {title}
      </Text>
      <View style={styles.rightContainer}>{rightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: rh(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(16),
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: rw(40),
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: rw(40),
    alignItems: 'flex-end',
  },
});
