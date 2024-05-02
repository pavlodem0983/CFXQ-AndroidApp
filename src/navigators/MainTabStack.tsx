import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Plus } from '@screens/Main/Plus';
import { useTheme } from '@hooks';
import { Image } from 'react-native';
import { Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CasaStack, AccountStack, ExchangeStack } from './TabStacks';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const { Colors, Images } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.background,
          height: 56 + Math.max(insets.bottom, 20),
        },
        tabBarActiveTintColor: Colors.highlight,
      }}
    >
      <Tab.Screen
        name="Home"
        component={CasaStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => {
            return (
              <Image
                source={Images.tab.casa}
                style={{ width: 30, height: 30 }}
              />
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                color={focused ? 'highlight' : 'white'}
                size="tiny"
                lineHeight={12}
              >
                Casa
              </Text>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="ExchangeStack"
        component={ExchangeStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => {
            return (
              <Image
                source={Images.tab.exchange}
                style={{ width: 30, height: 30 }}
              />
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                color={focused ? 'highlight' : 'white'}
                size="tiny"
                lineHeight={12}
              >
                Exchange
              </Text>
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Plus"
        component={Plus}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => {
            return (
              <Image
                source={Images.tab.plus}
                style={{ width: 30, height: 30 }}
              />
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                color={focused ? 'highlight' : 'white'}
                size="tiny"
                lineHeight={12}
              >
                Plus
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Conto"
        component={AccountStack}
        options={{
          title: 'Conto',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => {
            return (
              <Image
                source={Images.tab.conto}
                style={{ width: 30, height: 30 }}
              />
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                color={focused ? 'highlight' : 'white'}
                size="tiny"
                lineHeight={12}
              >
                Conto
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
