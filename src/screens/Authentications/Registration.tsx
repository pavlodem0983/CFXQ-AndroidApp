import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useTheme } from '@hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, DatePicker, PhoneNumber, Text } from '@components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import { IRegisterBody } from 'types/main';
import moment from 'moment';
import { useAppDispatch } from '@hooks';
import { registerWithEmailPassword } from '@store/app';
import EmailConfirm from './EmailConfirm';
import { useTranslation } from 'react-i18next';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Required!'),
  lastName: Yup.string().required('Required!'),
  birthday: Yup.string().required(),
  email: Yup.string()
    .email('Invaild emaill address!')
    .required('Email is required!'),
  password: Yup.string().required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Confirm password is required!')
    // eslint-disable-next-line quotes
    .oneOf([Yup.ref('password'), ''], "Password don't match!"),
  termsOfUse: Yup.boolean().isTrue('You must agree our terms of Use'),
  privacyPolicy: Yup.boolean().isTrue('You must agree our privacy policy'),
});

interface SignInFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: Date;
  mobile: string;
}

const Registration = ({ jumpTo }: any) => {
  const { Layout, Colors, Gutters } = useTheme();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);

  const [visibleConfirmEmailModal, setVisibleConfirmEmailModal] =
    useState(false);

  const initialValues: SignInFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: new Date(),
    mobile: '',
  };

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    mobile,
    birthday,
  }: SignInFormValues) => {
    const requestBody: IRegisterBody = {
      givenName: firstName,
      email,
      password,
      mobile,
      birthDate: moment(birthday).format('YYYY-MM-DD'),
      familyName: lastName,
    };
    // const result = await dispatch(userApi.endpoints.register.initiate(requestBody))
    const result = await dispatch(registerWithEmailPassword(requestBody));
    // @ts-ignore
    if (result.payload.error) {
      //@ts-ignore
      Alert.alert(
        result?.payload?.error?.data?.detail ?? 'Something went wrong!',
      );
    } else {
      setVisibleConfirmEmailModal(true);
    }
  };

  const onConfirmEmail = async (email: string) => {
    // @ts-ignore
    setVisibleConfirmEmailModal(false);
    jumpTo('login');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignUpSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
        setFieldError,
      }) => (
        <KeyboardAwareScrollView
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { paddingHorizontal: 3 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[Layout.row, Layout.justifyContentBetween, Layout.fill]}>
            <TextInput
              label={t('allTxts.firstNameFormLabel')}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder={t('allTxts.firstNameFormPlaceholder')}
              placeholderTextColor={Colors.highlight}
              error={errors.firstName}
              containerStyle={[Layout.fill, Gutters.tinyRMargin]}
            />
            <TextInput
              label={t('allTxts.lastNameFormLabel')}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder={t('allTxts.lastNameFormPlaceholder')}
              placeholderTextColor={Colors.highlight}
              error={errors.lastName}
              containerStyle={[Layout.fill, Gutters.tinyLMargin]}
            />
          </View>
          <DatePicker
            label={t('allTxts.birthdayFormLabel')}
            value={values.birthday}
            onChange={value => {
              setFieldValue('birthday', value);
            }}
            // error={errors.birthday}
          />

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

          <PhoneNumber
            label={t('allTxts.mobileFormLabel')}
            onChange={value => {
              setFieldValue('mobile', value);
            }}
          />

          <TextInput
            label={t('allTxts.passwordFormLabel')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Enter Your Password"
            placeholderTextColor={Colors.highlight}
            secureTextEntry
            error={errors.password}
            autoCapitalize="none"
          />
          <TextInput
            label={t('allTxts.confirmPasswordFormLabel')}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            placeholder="Confirm Your Password"
            placeholderTextColor={Colors.highlight}
            secureTextEntry
            error={errors.confirmPassword}
            autoCapitalize="none"
          />

          <View style={[Gutters.smallTMargin, Layout.rowHCenter]}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              boxType="square"
              tintColor="#D9D9D9"
              onTintColor="#D9D9D9"
              style={{
                width: 18,
                height: 18,
                // backgroundColor: errors.termsOfUse ? Colors.error : '#D9D9D9',
              }}
            />
            <Text ml={10} weight="bold" color="white" style={{ height: 20 }}>
              {t('allTxts.tosAgreementCheckbox')}{' '}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://cfxquantum.com/terms-and-conditions/',
                  )
                }
              >
                <Text color="highlight" weight="bold" underline>
                  {t('allTxts.tosAgreementCheckbox1')}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <View style={[Gutters.smallTMargin, Layout.rowHCenter]}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox1}
              onValueChange={newValue => setToggleCheckBox1(newValue)}
              boxType="square"
              tintColor="#D9D9D9"
              onTintColor="#D9D9D9"
              style={{
                width: 18,
                height: 18,
                // backgroundColor: errors.privacyPolicy
                //   ? Colors.error
                //   : '#D9D9D9',
              }}
            />

            <Text ml={10} weight="bold" color="white" style={{ height: 20 }}>
              {t('allTxts.privacyAgreementCheckbox')}{' '}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://cfxquantum.com/privacy-policy/')
                }
              >
                <Text color="highlight" weight="bold" underline>
                  {t('allTxts.privacyAgreementCheckbox1')}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <Button
            title="Sign Up"
            color="white"
            onPress={() => handleSubmit()}
            style={[Gutters.largeTMargin]}
          />
          <Modal isVisible={visibleConfirmEmailModal} style={styles.halfModal}>
            <EmailConfirm
              email={values.email}
              onClose={() => setVisibleConfirmEmailModal(false)}
              onConfirm={() => onConfirmEmail(values.email)}
            />
          </Modal>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  halfModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default Registration;
