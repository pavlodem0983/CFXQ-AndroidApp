import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExchangeStackNavigatorParams } from 'types/navigation';
import { useTheme } from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Exchange, TradeView  } from '@screens/Main/Exchange';

const Stack = createStackNavigator<ExchangeStackNavigatorParams>();

export const ExchangeStack = () => {
  const { Colors, Gutters, Fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Exchange"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Exchange" component={Exchange} options={{ headerShown: false }} />
      <Stack.Screen 
        name="TradeView"
        component={TradeView}
        options={{
          headerBackTitle: ' ',
          headerTitle: 'BTC/USDT',
          headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.background,
            borderColor: Colors.background,
          },
          headerTitleStyle: {
            ...Fonts.fontRegular,
            color: Colors.white,
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
  )
}

export default ExchangeStack;