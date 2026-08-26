import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { DashboardStack } from './DashboardStack';
import { TodoStack } from './TodoStack';
import { AnalyticsStack } from './AnalyticsStack';
import { SettingsStack } from './SettingsStack';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/atoms/Text';

export type MainTabParamList = {
  [MainTabRoutes.DASHBOARD]: undefined;
  [MainTabRoutes.HABITS]: undefined;
  [MainTabRoutes.TODOS]: undefined;
  [MainTabRoutes.ANALYTICS]: undefined;
  [MainTabRoutes.SETTINGS]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderHabitsScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{MainTabRoutes.HABITS}</Text>
  </View>
);

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.disabled,
      }}
    >
      <Tab.Screen name={MainTabRoutes.DASHBOARD} component={DashboardStack} />
      <Tab.Screen name={MainTabRoutes.HABITS} component={PlaceholderHabitsScreen} />
      <Tab.Screen name={MainTabRoutes.TODOS} component={TodoStack} />
      <Tab.Screen name={MainTabRoutes.ANALYTICS} component={AnalyticsStack} />
      <Tab.Screen name={MainTabRoutes.SETTINGS} component={SettingsStack} />
    </Tab.Navigator>
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
