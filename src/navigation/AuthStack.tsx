import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';

import Splash from '../features/auth/screens/Splash';
import CreatePassword from '../features/auth/screens/CreatePassword';
import EnableBiometric from '../features/auth/screens/EnableBiometric';
import Unlock from '../features/auth/screens/Unlock';

export type AuthStackParamList = {
  [AuthRoutes.SPLASH]: undefined;
  [AuthRoutes.CREATE_PASSWORD]: undefined;
  [AuthRoutes.ENABLE_BIOMETRIC]: undefined;
  [AuthRoutes.UNLOCK]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.SPLASH}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}>
      <Stack.Screen
        name={AuthRoutes.SPLASH}
        component={Splash}
      />
      <Stack.Screen
        name={AuthRoutes.CREATE_PASSWORD}
        component={CreatePassword}
      />
      <Stack.Screen
        name={AuthRoutes.ENABLE_BIOMETRIC}
        component={EnableBiometric}
      />
      <Stack.Screen
        name={AuthRoutes.UNLOCK}
        component={Unlock}
      />
    </Stack.Navigator>
  );
};
