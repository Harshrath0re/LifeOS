import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { SettingsRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { Text } from '../components/atoms/Text';

export type SettingsStackParamList = {
  [SettingsRoutes.SETTINGS_MAIN]: undefined;
  [SettingsRoutes.SECURITY]: undefined;
  [SettingsRoutes.BACKUP]: undefined;
  [SettingsRoutes.ABOUT]: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

const PlaceholderScreen: React.FC<{ readonly name: string }> = ({ name }) => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{name}</Text>
  </View>
);

export const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SettingsRoutes.SETTINGS_MAIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={SettingsRoutes.SETTINGS_MAIN}>
        {() => <PlaceholderScreen name={SettingsRoutes.SETTINGS_MAIN} />}
      </Stack.Screen>
      <Stack.Screen name={SettingsRoutes.SECURITY}>
        {() => <PlaceholderScreen name={SettingsRoutes.SECURITY} />}
      </Stack.Screen>
      <Stack.Screen name={SettingsRoutes.BACKUP}>
        {() => <PlaceholderScreen name={SettingsRoutes.BACKUP} />}
      </Stack.Screen>
      <Stack.Screen name={SettingsRoutes.ABOUT}>
        {() => <PlaceholderScreen name={SettingsRoutes.ABOUT} />}
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
