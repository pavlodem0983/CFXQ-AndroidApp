import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Asset, Cash } from '@screens/Main/Casa';
import { CasaStackNavigatorParams } from 'types/navigation';
import { useTheme } from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GurdaScreen from '@screens/Main/Casa/GurdaScreen';

const Stack = createStackNavigator<CasaStackNavigatorParams>();

export const CasaStack = () => {
  const { Colors, Gutters } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Casa"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Casa"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GurdaScreen"
        component={GurdaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Asset"
        component={Asset}
        options={{
          headerBackTitle: ' ',
          headerTitle: '',
          headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.background,
            borderColor: Colors.background,
          },
          headerShadowVisible: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              color="white"
              size={24}
              style={[Gutters.tinyLMargin]}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cash"
        component={Cash}
        options={{
          headerBackTitle: ' ',
          headerTitle: '',
          headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.background,
            borderColor: Colors.background,
          },
          headerShadowVisible: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              color="white"
              size={24}
              style={[Gutters.tinyLMargin]}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CasaStack;
