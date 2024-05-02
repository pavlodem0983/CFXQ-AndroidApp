import React, { useEffect, useState } from 'react';
import { View, Alert, Image, StyleSheet } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Button, TextInput, Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@hooks';
import { userApi } from '@services/modules/users';
import EmailConfirm from './EmailConfirm';
import Modal from 'react-native-modal';
import { loginByEmailPassword } from '@store/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';

const AddDdress = () => {
  const { Layout, Gutters, Images, Colors } = useTheme();
  const naivgation = useNavigation();
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<any>([]);
  const [icEye, setIcEye] = React.useState('eye-off');
  const [showPassword, setShowPassword] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const coins = ['ZONE', 'ETH_TEST', 'usdt', 'BTC_TEST'];
  const [getData, setGetData] = useState([]);
  const { t, i18n } = useTranslation();
  const [addAddress, setAddAddress] = useState('');
  const [addLabel, setAddLabel] = useState('');
  const [addToken, setAddToken] = useState('BTC_TEST');
  const [assetShortNames, setAssetShortNames] = useState({});
  const [tokTypes, setTokTypes] = useState([]);

  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const onSubmit = async (values: SignInFormValues) => {
    const { meta } = await dispatch(loginByEmailPassword(values));
    if (meta.requestStatus == 'fulfilled') {
      naivgation.navigate('Main' as never);
    } else {
      Alert.alert('Something went wrong!');
    }
  };

  const addWalletApi = async () => {
    try {
      const userId = user?.id;

      const response = await axios.post(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/external?assetId=${addToken}&address=${addAddress}&description=${addLabel}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      Alert.alert('Wallet address has been added successfully.');
      setAddAddress('');
      setAddLabel('');
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('One or more validation errors occurred.');
    }
  };

  const getTokTypesApi = async () => {
    try {
      const response = await axios.get(
        'https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/TokenTypes',

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setTokTypes(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  const getStacksApi = async () => {
    try {
      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${user?.id}`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setGetData(response?.data?.assets);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  useEffect(() => {
    getStacksApi();
    getTokTypesApi();
  }, []);

  useEffect(() => {
    const tempAssetShortNames = {};
    for (const asset of getData) {
      const assetId = asset.id;
      const tokenType = tokTypes.find(t => t.assetId === assetId);
      if (tokenType) {
        tempAssetShortNames[assetId] = tokenType.shortName;
      }
    }
    setAssetShortNames(tempAssetShortNames);
  }, [tokTypes, getData]); // Run this effect when tokTypes or getData changes

  const assetIds = getData.map(asset => asset?.id);

  const namesArray = Object.values(assetShortNames).map(value => {
    const parts = value.split(' ');
    return parts.join(' '); // Rejoin all parts to preserve the original name format
  });

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'black',
      }}
    >
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <TextInput
          label={t('allTxts.addAddressTitle')}
          onChangeText={val => setAddAddress(val)}
          // onBlur={handleBlur('email')}
          value={addAddress}
          placeholder="Wallet address"
          placeholderTextColor={Colors.highlight}
          autoCapitalize="none"
          containerStyle={{ marginTop: 50 }}
        />
        <TextInput
          label={t('allTxts.addressFormLabelLabel')}
          onChangeText={val => setAddLabel(val)}
          // onBlur={handleBlur('email')}
          value={addLabel}
          placeholder={t('allTxts.addressFormLabelPlaceholder')}
          placeholderTextColor={Colors.highlight}
          autoCapitalize="none"
          containerStyle={{ marginTop: 50 }}
        />
        <Text mt={50} mb={8} weight="bold" color="white">
          {t('allTxts.token')}
        </Text>
        <SelectDropdown
          data={namesArray}
          onSelect={value => setAddToken(value)}
          defaultValue={namesArray[0]}
          buttonStyle={{
            backgroundColor: Colors.inputBackground,
            width: 370,
            height: 46,
            borderRadius: 5,
            alignSelf: 'center',
          }}
          rowStyle={{
            backgroundColor: Colors.background,
            paddingHorizontal: 10,
          }}
          renderDropdownIcon={isOpened => {
            return (
              <Ionicons
                name={isOpened ? 'caret-up' : 'caret-down'}
                color={'white'}
                size={12}
              />
            );
          }}
          renderCustomizedButtonChild={(item, index) => (
            <View style={[Layout.rowHCenter]}>
              <Image
                source={
                  Images.coins1[item] ? Images.coins1[item] : Images.coins1.GEN
                }
                style={styles.coinIcon}
              />
              <Text uppercase color="white" ml={5} weight="semibold">
                {item}
              </Text>
            </View>
          )}
          renderCustomizedRowChild={(item, index) => (
            <View style={[Layout.rowHCenter]}>
              <Image
                source={
                  Images.coins1[item] ? Images.coins1[item] : Images.coins1.GEN
                }
                style={styles.coinIcon}
              />
              <Text uppercase color="white" ml={5} weight="semibold">
                {item}
              </Text>
            </View>
          )}
        />
        <View style={{ marginTop: 100 }}>
          <Button
            title={t('allTxts.addAddressTitle')}
            color="white"
            onPress={() => addWalletApi()}
            style={[Gutters.largeTMargin]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coinIcon: {
    width: 18,
    height: 18,
  },
});

export default AddDdress;
