import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text } from '@components';
import { useTheme } from '@hooks';
import SIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { FontFamilies } from '@theme/Variables';

const API_URL = process.env.API_URL;

type EmailConfirmPropTypes = {
  email: string;
  onConfirm: () => void;
  onClose: () => void;
};

const EmailConfirm = ({ email, onConfirm, onClose }: EmailConfirmPropTypes) => {
  const { Layout, Gutters, Colors } = useTheme();
  const [code, setCode] = useState('');

  const onPressConfirm = async () => {
    if (code.length < 6) return;
    try {
      const result = await axios.post(
        `${API_URL}/Investors/onboarding/confirm?email=${email}&code=${code}`,
      );
      onConfirm && onConfirm();
    } catch (error) {
      Alert.alert('Invalid code!');
    }
  };

  const onPressResend = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/Investors/onboarding/resend-code?email=${email}`,
      );
      Alert.alert('Verification code has been sent to your email address!');
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong!');
    }
  };

  return (
    <View style={styles.content}>
      <SIcons name="envelope" size={100} color={Colors.textGray200} />
      <View style={[Layout.center, Gutters.regularPadding]}>
        <Text weight="bold" size="medium">
          Verify Email
        </Text>
        <Text align="center" mt={20} pl={15} pr={15}>
          Email verification code has been sent to your email address {email}.
        </Text>
        <Text align="center" pl={15} pr={15} mt={5}>
          Please check your inbox and confirm your email.
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
        containerStyle={[Gutters.regularVMargin]}
      />

      <View style={[Layout.fullWidth, Gutters.regularTMargin]}>
        <Button
          title="Confirm"
          style={[Gutters.largeTMargin]}
          onPress={onPressConfirm}
        />
        <Button
          title="Resend Verification Code"
          style={[Gutters.smallTMargin, Gutters.largeBMargin]}
          onPress={onPressResend}
        />
      </View>

      <View style={styles.closeButton}>
        <TouchableOpacity onPress={onClose}>
          <Icons name="close" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailConfirm;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingTop: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(22, 36, 53, 20)',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    // position: 'absolute',
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
