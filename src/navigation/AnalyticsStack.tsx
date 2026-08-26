import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { AnalyticsRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { Text } from '../components/atoms/Text';

export type AnalyticsStackParamList = {
  [AnalyticsRoutes.ANALYTICS_MAIN]: undefined;
  [AnalyticsRoutes.HABIT_ANALYTICS]: undefined;
  [AnalyticsRoutes.EXPENSE_ANALYTICS]: undefined;
  [AnalyticsRoutes.HEALTH_ANALYTICS]: undefined;
};

const Stack = createStackNavigator<AnalyticsStackParamList>();

const PlaceholderScreen: React.FC<{ readonly name: string }> = ({ name }) => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{name}</Text>
  </View>
);

export const AnalyticsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AnalyticsRoutes.ANALYTICS_MAIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={AnalyticsRoutes.ANALYTICS_MAIN}>
        {() => <PlaceholderScreen name={AnalyticsRoutes.ANALYTICS_MAIN} />}
      </Stack.Screen>
      <Stack.Screen name={AnalyticsRoutes.HABIT_ANALYTICS}>
        {() => <PlaceholderScreen name={AnalyticsRoutes.HABIT_ANALYTICS} />}
      </Stack.Screen>
      <Stack.Screen name={AnalyticsRoutes.EXPENSE_ANALYTICS}>
        {() => <PlaceholderScreen name={AnalyticsRoutes.EXPENSE_ANALYTICS} />}
      </Stack.Screen>
      <Stack.Screen name={AnalyticsRoutes.HEALTH_ANALYTICS}>
        {() => <PlaceholderScreen name={AnalyticsRoutes.HEALTH_ANALYTICS} />}
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
