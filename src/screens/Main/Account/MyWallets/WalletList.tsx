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
import { userApi } from '@services/modules/users';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

type DataType = {
  id: number;
  icon: ImageSourcePropType;
  name: string;
  token: string;
  description: string;
  address: string;
};

const data: DataType[] = [
  {
    id: 1,
    icon: require('@theme/assets/images/icons/coins/usdt.png'),
    name: 'ZONE',
    token: 'Tether ZONE',
    description: 'XT MM ACCOUNT USDT',
    address: '0x916363bd905a833d2a9fd84271f91adf7a6cbb26',
  },
  {
    id: 2,
    icon: require('@theme/assets/images/icons/coins/eth.png'),
    name: 'ETH_TEST',
    token: 'Ethereum',
    description: 'LUCA x DEFI ETH',
    address: 'Oxld6E577a394401832d285d2158873a4226De8bFB',
  },
  {
    id: 5,
    icon: require('@theme/assets/images/icons/coins/btc.png'),
    name: 'BTC_TEST',
    token: 'Bitcoin',
    description: 'TEST SAMPLE WALLET',
    address: '0x916363bd905a833d2a9fd84271f91adf7a6cbb26',
  },
  {
    id: 6,
    icon: require('@theme/assets/images/icons/coins/dash.png'),
    name: 'DASH',
    token: 'Dash',
    description: 'TEST SAMPLE WALLET',
    address: '0x916363bd905a833d2a9fd84271f91adf7a6cbb26',
  },
  {
    id: 7,
    icon: require('@theme/assets/images/icons/coins/zone.png'),
    name: 'BNB_TEST',
    token: 'BNB Coin',
    description: 'TEST SAMPLE ZONE COIN',
    address: '0x916363bd905a833d2a9fd84271f91adf7a6cbb26',
  },
  {
    id: 8,
    icon: require('@theme/assets/images/icons/coins/dba.png'),
    name: 'DBA',
    token: 'DBA',
    description: 'TEST DBA SAMPLE WALLET',
    address: '0x916363bd905a833d2a9fd84271f91adf7a6cbb26',
  },
];

const WalletList = () => {
  const { Layout, Gutters, Images, Colors } = useTheme();
  const navigation = useNavigation();
  const windowLayout = useWindowDimensions();
  const [tokens, setTokens] = useState<any>([]);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const [reset, setRest] = useState<any>(false);
  const { t, i18n } = useTranslation();

  const deleteWalletApi = async item => {
    try {
      let updatedTokenId = null;

      if (item?.assets[0]?.tokenTypeId === 104) {
        updatedTokenId = 'BNB_TEST';
      } else if (item?.assets[0]?.tokenTypeId === 101) {
        updatedTokenId = 'BTC_TEST';
      } else if (item?.assets[0]?.tokenTypeId === 102) {
        updatedTokenId = 'ETH_TEST3';
      } else if (item?.assets[0]?.tokenTypeId === 103) {
        updatedTokenId = 'XLM_TEST';
      } else if (item?.assets[0]?.tokenTypeId === 105) {
        updatedTokenId = 'LTC_TEST';
      }

      const userId = user?.id;
      const assetId = 'BTC_TEST';
      // const assetId = item?.assets[0]?.id;

      const address = item?.assets[0]?.address;

      const response = await axios.delete(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/external?assetId=${updatedTokenId}&address=${address}`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setRest(!reset);
      Alert.alert('Wallet address has been deleted sucessfully');
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  const getTokenBalances3 = async () => {
    try {
      const userId = user?.id;

      let tokenBalances = await Promise.all(
        tokenTypes.map(async token => {
          const assetId = token?.assetId;
          const result = await dispatch(
            userApi.endpoints.getWalletsByTokenId.initiate({
              assetId,
              userId,
            }),
          );

          if (result.data?.length) {
            return result.data;
          } else {
            return null;
          }
        }),
      );
      setTokens(tokenBalances);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  const copyAddress = item => {
    Clipboard.setString(item?.assets[0]?.address);
    Alert.alert('Address copied sucessfully!');
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
      console.log('nainb errror two', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getWalletData();
    }
  }, [reset, isFocused]);

  return (
    <>
      {tokens.length === 0 ? (
        <View>
          <Text color="white">No data found please add address!</Text>
          <Button
            title={t('allTxts.addAddressTitle')}
            color="white"
            onPress={() => navigation.navigate('AddDdress')}
            style={[Gutters.largeTMargin]}
          />
        </View>
      ) : (
        <FlatList
          data={tokens}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item }) => {
            const image =
              item?.assets[0]?.tokenTypeId === 101
                ? Images.coins.BTC
                : item?.assets[0]?.tokenTypeId === 0
                ? Images.coins.ZONE
                : item?.assets[0]?.tokenTypeId === 1
                ? Images.coins.USDT
                : item?.assets[0]?.tokenTypeId === 2
                ? Images.coins.CFXQ
                : item?.assets[0]?.tokenTypeId === 102
                ? Images.coins.ETH
                : item?.assets[0]?.tokenTypeId === 103
                ? Images.coins.XLM
                : item?.assets[0]?.tokenTypeId === 104
                ? Images.coins.BNB_TEST
                : item?.assets[0]?.tokenTypeId === 105
                ? Images.coins.LTC
                : '';

            return (
              <>
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
                          {item?.assets[0]?.tokenTypeId === 101
                            ? 'BTC_TEST'
                            : item?.assets[0]?.tokenTypeId === 0
                            ? 'ZONE'
                            : item?.assets[0]?.tokenTypeId === 1
                            ? 'USTD'
                            : item?.assets[0]?.tokenTypeId === 2
                            ? 'CFXQ'
                            : item?.assets[0]?.tokenTypeId === 102
                            ? 'ETH_TEST3'
                            : item?.assets[0]?.tokenTypeId === 103
                            ? 'XLM_TEST'
                            : item?.assets[0]?.tokenTypeId === 104
                            ? 'BNB_TEST'
                            : item?.assets[0]?.tokenTypeId === 105
                            ? 'LTC_TEST'
                            : ''}
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
                      right: 90,
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
              </>
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
