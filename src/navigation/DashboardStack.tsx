import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { DashboardRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { Text } from '../components/atoms/Text';

export type DashboardStackParamList = {
  [DashboardRoutes.DASHBOARD_MAIN]: undefined;
};

const Stack = createStackNavigator<DashboardStackParamList>();

const PlaceholderScreen: React.FC<{ readonly name: string }> = ({ name }) => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{name}</Text>
  </View>
);

export const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={DashboardRoutes.DASHBOARD_MAIN}>
        {() => <PlaceholderScreen name={DashboardRoutes.DASHBOARD_MAIN} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
