import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../../components/atoms/Text';
import { COLORS } from '../../../../theme/colors';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="h1">LifeOS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
