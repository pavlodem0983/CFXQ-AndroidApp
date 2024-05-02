import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, ForgotPassword, VerifyPhone } from '@screens';
import { AuthParamList } from 'types/navigation';

const Stack = createStackNavigator<AuthParamList>();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthHome" component={Authentication} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone}  />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
