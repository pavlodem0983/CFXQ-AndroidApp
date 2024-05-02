import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Button, TextInput, Text } from '@components';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@hooks';
import { userApi } from '@services/modules/users';
import EmailConfirm from './EmailConfirm';
import Modal from 'react-native-modal';
import { loginByEmailPassword } from '@store/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invaild emaill address!')
    .required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

interface SignInFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  // email: 'sofia@cfxquantum.com',
  // email: 'testcfxquantum@gmail.com',
  // password: 'Moneta!45',
  const naivgation = useNavigation();
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<any>([]);
  const { t, i18n } = useTranslation();

  const [icEye, setIcEye] = React.useState('eye-off');
  const [showPassword, setShowPassword] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const onSubmit = async (values: SignInFormValues, { resetForm }) => {
    const { meta } = await dispatch(loginByEmailPassword(values));
    if (meta.requestStatus == 'fulfilled') {
      naivgation.navigate('Main' as never);
      setIcEye('eye-off');
      setShowPassword(true);
      resetForm(); // Reset the form values after successful login
    } else {
      Alert.alert('Something went wrong!');
    }
  };
  const eyeIconFun = () => {
    setShowPassword(!showPassword);
    if (showPassword === true) {
      setIcEye('eye');
    } else {
      setIcEye('eye-off');
    }
  };

  const goToForgotPassword = () => {
    naivgation.navigate('ForgotPassword' as never);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignInSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        resetForm,
      }) => (
        <View
          style={[
            Gutters.regularVPadding,
            Gutters.regularTPadding,
            // eslint-disable-next-line react-native/no-inline-styles
            { paddingHorizontal: 3 },
          ]}
        >
          <TextInput
            label={t('allTxts.emailFormLabel')}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder={t('allTxts.emailFormPlaceholder')}
            placeholderTextColor={Colors.highlight}
            error={errors.email}
            autoCapitalize="none"
          />
          <TextInput
            label={t('allTxts.passwordFormLabel')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder={t('allTxts.passwordFormPlaceholder')}
            placeholderTextColor={Colors.highlight}
            secureTextEntry={showPassword}
            autoCapitalize="none"
            error={errors.password}
            style={{ flexDirection: 'row' }}
          />
          <View style={{ position: 'absolute', top: 185, right: 20 }}>
            <Ionicons
              name={icEye}
              color={Colors.white}
              size={20}
              onPress={() => eyeIconFun()}
            />
          </View>
          <TouchableOpacity
            style={[Layout.alignItemsEnd, Gutters.tinyVPadding]}
            onPress={goToForgotPassword}
          >
            <Text color="white">{t('allTxts.signInForgotPasswordLink')}</Text>
          </TouchableOpacity>

          <Button
            title={t('allTxts.signInButton')}
            color="white"
            onPress={() => handleSubmit()}
            style={[Gutters.largeTMargin]}
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;
