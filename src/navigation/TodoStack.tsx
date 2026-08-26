import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { TodoRoutes } from '../constants/routes';
import { COLORS } from '../theme/colors';
import { Text } from '../components/atoms/Text';

export type TodoStackParamList = {
  [TodoRoutes.TODAY]: undefined;
  [TodoRoutes.UPCOMING]: undefined;
  [TodoRoutes.CALENDAR]: undefined;
  [TodoRoutes.ADD_TODO]: undefined;
};

const Stack = createStackNavigator<TodoStackParamList>();

const PlaceholderScreen: React.FC<{ readonly name: string }> = ({ name }) => (
  <View style={styles.placeholderContainer}>
    <Text variant="h2">{name}</Text>
  </View>
);

export const TodoStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={TodoRoutes.TODAY}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={TodoRoutes.TODAY}>
        {() => <PlaceholderScreen name={TodoRoutes.TODAY} />}
      </Stack.Screen>
      <Stack.Screen name={TodoRoutes.UPCOMING}>
        {() => <PlaceholderScreen name={TodoRoutes.UPCOMING} />}
      </Stack.Screen>
      <Stack.Screen name={TodoRoutes.CALENDAR}>
        {() => <PlaceholderScreen name={TodoRoutes.CALENDAR} />}
      </Stack.Screen>
      <Stack.Screen name={TodoRoutes.ADD_TODO}>
        {() => <PlaceholderScreen name={TodoRoutes.ADD_TODO} />}
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
