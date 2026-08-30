import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { AuthRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { Text } from '../components/atoms/Text';

import Splash from '../features/auth/screens/Splash';

export type AuthStackParamList = {
  [AuthRoutes.SPLASH]: undefined;
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.BIOMETRIC]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const PlaceholderScreen: React.FC<{ readonly name: string }> = ({ name }) => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{name}</Text>
  </View>
);

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.SPLASH}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name={AuthRoutes.SPLASH}
        component={Splash}
      />
      <Stack.Screen name={AuthRoutes.LOGIN}>
        {() => <PlaceholderScreen name={AuthRoutes.LOGIN} />}
      </Stack.Screen>
      <Stack.Screen name={AuthRoutes.BIOMETRIC}>
        {() => <PlaceholderScreen name={AuthRoutes.BIOMETRIC} />}
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
