import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AccountMain,
  Account,
  Security,
  Financial,
  MyWallets,
  Settings,
  VerifyEmail,
  VerifyPhone,
} from '@screens/Main/Account';
import { AccountStackNavigatorParams } from 'types/navigation';
import { useTheme } from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddDdress from '@screens/Main/Account/MyWallets/AddDdress';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<AccountStackNavigatorParams>();

export const AccountStack = () => {
  const { t, i18n } = useTranslation();

  const { Colors, Gutters, Fonts } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="AccountHome"
      screenOptions={{
        gestureEnabled: false,
        headerBackTitle: ' ',
        headerTitleStyle: {
          ...Fonts.fontRegular,
          color: Colors.white,
        },
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomColor: Colors.background,
          borderColor: Colors.background,
        },
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
    >
      <Stack.Screen
        name="AccountHome"
        component={AccountMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: 'Conto',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          headerTitle: 'Sicurezza',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Financial"
        component={Financial}
        options={{
          headerTitle: 'Financial',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="MyWallets"
        component={MyWallets}
        options={{
          headerTitle: `${t('allTxts.financialAddressBookName')}`,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="AddDdress"
        component={AddDdress}
        options={{
          headerTitle: `${t('allTxts.financialAddressBookName')}`,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: `${t('allTxts.accountMenuSettings')}`,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          headerTitle: 'Email',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{
          headerTitle: 'Phone',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
