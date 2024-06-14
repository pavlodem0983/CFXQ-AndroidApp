import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from 'react-native';
import { Button, Text } from '@components';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

const WalletList = () => {
  const { Layout, Gutters, Images, Colors } = useTheme();
  const navigation = useNavigation();
  const windowLayout = useWindowDimensions();
  const [tokens, setTokens] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { user, AccessToken } = useAppSelector(state => state.app);
  const [reset, setReset] = useState(false);
  const [showStatus, setShowStatus] = useState('');
  const [getToken, setGetToken] = useState<any[]>([]);

  const { t, i18n } = useTranslation();

  const deleteWalletApi = async item => {
    try {
      const tokenType = getToken.find(
        token => token.id === item.assets[0].tokenTypeId,
      );
      const updatedTokenId = tokenType ? tokenType.shortName : '';

      const userId = user?.id;

      const token = getToken.find(t => t.id === item.assets[0].tokenTypeId);

      console.log(
        '=======>',
        AccessToken,
        userId,
        item?.assets[0]?.address,
        token?.assetId,
      );

      await axios.delete(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/external?assetId=${token?.assetId}&address=${item?.assets[0]?.address}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setReset(reset);
      Alert.alert('Wallet address has been deleted successfully');
    } catch (error) {
      console.log('Delete wallet error', error);
    }
  };

  const onChangeLang = async () => {
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
      setShowStatus(response?.data?.status);
    } catch (error) {
      console.log('Language change error:', error);
    }
  };

  const getAllTokens = async () => {
    try {
      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/TokenTypes`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setGetToken(response?.data);
    } catch (error) {
      console.log('Get tokens error', error);
    }
  };

  const copyAddress = item => {
    Clipboard.setString(item?.assets[0]?.address);
    Alert.alert('Address copied successfully!');
  };

  const getWalletData = async () => {
    try {
      const userId = user?.id;

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/external`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setTokens(response?.data);
    } catch (error) {
      console.log('Get wallet data error', error);
    }
  };

  const getTokenNameById = tokenTypeId => {
    const token = getToken.find(t => t.id === tokenTypeId);
    return token ? token.shortName : '';
  };

  useEffect(() => {
    if (isFocused) {
      getWalletData();
      onChangeLang();
      getAllTokens();
    }
  }, [reset, isFocused]);

  return (
    <>
      {tokens.length === 0 ? (
        <>
          {showStatus !== 2 && showStatus !== 4 ? (
            <Text
              style={{
                color: 'red',
                width: 350,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              {t('allTxts.depositWithdrawNotAllowed')}
            </Text>
          ) : (
            <View>
              <Text color="white">No data found, please add an address!</Text>
              <Button
                title={t('allTxts.addAddressTitle')}
                color="white"
                onPress={() => navigation.navigate('AddDdress')}
                style={[Gutters.largeTMargin]}
              />
            </View>
          )}
        </>
      ) : (
        <FlatList
          data={tokens}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item }) => {
            const tokenType = getToken.find(
              token => token.id === item.assets[0].tokenTypeId,
            );
            const image =
              tokenType?.shortName === 'BTC'
                ? Images.coins.BTC
                : tokenType?.shortName === 'ZONE'
                ? Images.coins.ZONE
                : tokenType?.shortName === 'USDT'
                ? Images.coins.USDT
                : tokenType?.shortName === 'CFXQ'
                ? Images.coins.CFXQ
                : tokenType?.shortName === 'ETH'
                ? Images.coins.ETH
                : tokenType?.shortName === 'XLM'
                ? Images.coins.XLM
                : tokenType?.shortName === 'BNB'
                ? Images.coins.BNB_TEST
                : tokenType?.shortName === 'LTC'
                ? Images.coins.LTC
                : Images.coins.GEN;
            return (
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.tinyVPadding,
                  Layout.fullWidth,
                ]}
              >
                <Image source={image} style={styles.icon} />
                <View>
                  <View
                    style={[Layout.rowHCenter, Layout.justifyContentBetween]}
                  >
                    <View style={[Layout.rowHCentr]}>
                      <Text style={{ width: 310 }} ml={6} weight="bold">
                        {getTokenNameById(item.assets[0].tokenTypeId)}
                      </Text>
                      <Text ml={5} color="textGray200">
                        {item?.displayLabel}
                      </Text>
                    </View>
                  </View>
                  <View style={[Gutters.smallVPadding]}></View>
                  <Text
                    style={{ width: windowLayout.width - 80 }}
                    color="textGray200"
                    ml={4}
                  >
                    {item?.assets[0]?.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 110,
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => copyAddress(item)}>
                    <Ionicons name="copy" color="white" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteWalletApi(item)}>
                    <Ionicons name="trash" color="white" size={20} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddDdress')}
                  >
                    <MaterialIcons name="add" color="white" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

export default WalletList;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
