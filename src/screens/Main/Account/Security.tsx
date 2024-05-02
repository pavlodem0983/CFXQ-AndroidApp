/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '@hooks';
import { AccountStackScreenProps } from 'types/navigation';
import axios from 'axios';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import { useTranslation } from 'react-i18next';

const Account = ({ navigation }: AccountStackScreenProps) => {
  const { Layout, Colors, Gutters } = useTheme();

  const [tokens, setTokens] = useState<any>([]);
  const [getVeri, setGetVeri] = useState<any>([]);
  const { t, i18n } = useTranslation();

  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);

  const getTokenKYC = async () => {
    try {
      const userId = user?.id;

      const response = await axios.post(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Investors/${userId}/get-sumsub-token`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setTokens(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  useEffect(() => {
    getTokenKYC();
    getVerifaction();
  }, []);

  const launchSNSMobileSDK = () => {
    //
    const userId = user?.id;

    let accessToken = tokens?.token;

    let snsMobileSDK = SNSMobileSDK.init(accessToken, async () => {
      const resp = await fetch(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Investors/${userId}/get-sumsub-token`,
        {
          method: 'GET',
        },
      );
      return tokens?.token;
    })

      .withDebug(true)
      .withLocale('en')
      .build();

    snsMobileSDK
      .launch()
      .then(result => {
        console.log('SumSub SDK State: ' + JSON.stringify(result));
      })
      .catch(err => {
        console.log('SumSub SDK Error: ' + JSON.stringify(err));
      });
  };

  const getVerifaction = async () => {
    try {
      const userId = user?.id;

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Investors/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setGetVeri(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  return (
    <View
      style={[Layout.container, Gutters.smallHPadding, Gutters.smallTPadding]}
    >
      <View style={{ borderTopWidth: 1, borderTopColor: Colors.textGray400 }}>
        <TouchableOpacity
          onPress={() => launchSNSMobileSDK()}
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
        >
          <Text>KYC</Text>
          <View style={[Layout.rowHCenter]}>
            <Text color="highlight" weight="bold" size="tiny">
              {getVeri?.kycStatus == 3 ? 'Verificato' : 'Non verificato'}
            </Text>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
          onPress={() => navigation.navigate('VerifyEmail')}
        >
          <Text>Email</Text>
          <View style={[Layout.rowHCenter]}>
            <Text color="highlight" weight="bold" size="tiny">
              {getVeri?.emailVerified == true ? 'Verificato' : 'Non verificato'}
            </Text>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
          onPress={() => navigation.navigate('VerifyPhone')}
        >
          <Text>{t('allTxts.mobileFormLabel')}</Text>
          <View style={[Layout.rowHCenter]}>
            <Text color="highlight" weight="bold" size="tiny">
              {getVeri?.mobileVerified == true
                ? 'Verificato'
                : 'Non verificato'}
            </Text>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
        >
          <Text>Google Authenticator</Text>
          <View style={[Layout.rowHCenter]}>
            <Text color="highlight" weight="bold" size="tiny">
              Non verificato
            </Text>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Account;
