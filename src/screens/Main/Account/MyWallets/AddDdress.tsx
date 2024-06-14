import React, { useEffect, useState } from 'react';
import { View, Alert, Image, StyleSheet } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Button, TextInput, Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@hooks';
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
  const [getData, setGetData] = useState([]);
  const { t, i18n } = useTranslation();
  const [addAddress, setAddAddress] = useState('');
  const [addLabel, setAddLabel] = useState('');
  const [addToken, setAddToken] = useState('BTC');
  const [assetShortNames, setAssetShortNames] = useState({});
  const [tokTypes, setTokTypes] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(''); // State to store selected assetId

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
      console.log('Yes', userId, selectedAssetId, addAddress, addLabel);

      const response = await axios.post(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/external?assetId=${selectedAssetId}&address=${addAddress}&description=${addLabel}`,
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
      Alert.alert('Error:', error.response.data.detail); // Accessing the error detail message
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

  const assetOptions = getData.map(asset => ({
    id: asset.id,
    shortName: assetShortNames[asset.id] || 'Unknown',
  }));
  const assetIds = getData.map(asset => asset?.id);

  const namesArray = Object.values(assetShortNames).map(value => {
    const parts = value.split(' ');
    return parts.join(' '); // Rejoin all parts to preserve the original name format
  });
  console.log(JSON.stringify(tokTypes, 2, 4));

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
          data={assetOptions}
          onSelect={selectedItem => setSelectedAssetId(selectedItem.id)}
          defaultValue={assetOptions[0]}
          buttonStyle={{
            backgroundColor: Colors.inputBackground,
            width: 340,
            height: 46,
            borderRadius: 5,
            alignSelf: 'center',
          }}
          rowStyle={{
            backgroundColor: Colors.background,
            paddingHorizontal: 10,
          }}
          renderDropdownIcon={isOpened => (
            <Ionicons
              name={isOpened ? 'caret-up' : 'caret-down'}
              color={'white'}
              size={12}
            />
          )}
          renderCustomizedButtonChild={item => (
            <View style={[Layout.rowHCenter]}>
              <Image
                source={
                  Images.coins1[item?.shortName]
                    ? Images.coins1[item?.shortName]
                    : Images.coins1.GEN
                }
                style={styles.coinIcon}
              />
              <Text uppercase color="white" ml={5} weight="semibold">
                {item?.shortName}
              </Text>
            </View>
          )}
          renderCustomizedRowChild={item => (
            <View style={[Layout.rowHCenter]}>
              <Image
                source={
                  Images.coins1[item?.shortName]
                    ? Images.coins1[item?.shortName]
                    : Images.coins1.GEN
                }
                style={styles.coinIcon}
              />
              <Text uppercase color="white" ml={5} weight="semibold">
                {item?.shortName}
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
