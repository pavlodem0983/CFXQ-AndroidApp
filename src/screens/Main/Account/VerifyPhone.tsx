import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@hooks';
import { Brand, Text, Loading, Button } from '@components';
// @ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';
import { FontFamilies } from '@theme/Variables';
import { useAppSelector } from '@hooks';
import { useSendPhoneVerificationCodeMutation } from '@services/modules/users';

const API_URL = process.env.API_URL;

const VerifyPhone = () => {
  const { Layout, Gutters } = useTheme();
  const [code, setCode] = useState('');
  const { user, AccessToken } = useAppSelector(state => state.app);

  const [resend, { isError, isLoading, isSuccess, status }] =
    useSendPhoneVerificationCodeMutation(user?.id);

  // @ts-ignore
  const { email } = user;

  const onPressConfirm = async () => {
    if (code.length < 6) return;
    try {
      const result = await axios.post(
        `${API_URL}/Investors/${user?.id}/verify-mobile/confirm?code=${code}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      Alert.alert('Your phone number has beeb verified!');
    } catch (error) {
      Alert.alert('Invalid code!');
    }
  };

  const onPressResend = async () => {
    try {
      const result = await resend(user?.id);
      Alert.alert('Verification code has been sent to your phone!');
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong!');
    }
  };

  return (
    <LinearGradient
      colors={['rgba(8, 9, 14, 20)', 'rgba(22, 36, 53, 20)']}
      style={[Layout.fill]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View
        style={[
          Layout.fill,
          Gutters.regularHPadding,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <View style={[Layout.alignItemsCenter]}>
          <Brand />
        </View>
        <View style={[Layout.center]}>
          <Text weight="bold" size="medium">
            Verify Phone Number
          </Text>
          <Text align="center" mt={20} pl={15} pr={15}>
            Please enter the verification code sent to
          </Text>
          <Text align="center" pl={15} pr={15} mt={5}>
            {user?.mobile}
          </Text>
        </View>

        <SmoothPinCodeInput
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: 'gray',
          }}
          cellStyleFocused={{
            borderColor: 'white',
          }}
          textStyle={{
            color: 'white',
            fontFamily: FontFamilies.regular,
            fontSize: 24,
          }}
          codeLength={6}
          value={code}
          onTextChange={(value: string) => setCode(value)}
          containerStyle={[Gutters.smallTMargin]}
        />

        <View style={[Layout.fullWidth, Gutters.regularTMargin]}>
          <Button
            title="Verify"
            style={[Gutters.largeTMargin]}
            onPress={onPressConfirm}
          />
          <Button
            title="Resend Verification Code"
            style={[Gutters.smallTMargin, Gutters.largeBMargin]}
            onPress={onPressResend}
          />
        </View>
      </View>
      {/* {isLoading && <Loading  />} */}
    </LinearGradient>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({});
