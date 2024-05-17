import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Clipboard } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Text } from '@components';
import { CasaStackScreenProps } from 'types/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Cash = ({ route }: CasaStackScreenProps) => {
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const [token, setToken] = useState<any>([]);
  const [freeze, setFreeze] = useState<any>([]);
  const [getAddress, setGetAddress] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { t } = useTranslation();

  const tokens = route.params?.tokens;
  const check = route.params?.check;
  console.log(AccessToken);

  const [getData, setGetData] = useState([]);
  const [getValue, setGetValue] = useState([]);
  const [tokTypes, setTokTypes] = useState([]);
  const [assetShortNames, setAssetShortNames] = useState({});
  const addressId = token[0]?.address;
  console.log('checkkkkkkkkk', user?.id);

  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(101);

  const [assetValue, setAssetValue] = useState<string | null>(null);
  const [showValue, setShowValue] = useState<string | null>('BTC_TEST');

  const { Layout, Colors, Gutters, Images } = useTheme();
  const [tab, setTab] = useState<
    | 'deposit'
    | 'withdrawal'
    // 'fiat' |
    | 'transfer'
  >(check ? 'withdrawal' : 'deposit');

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

  const getTokenData = async value => {
    let updatedTokenId = 3;
    console.log('numaric', value);

    if (value === 'ZONE') {
      updatedTokenId = 0;
    } else if (value === 'CFXQ') {
      updatedTokenId = 1;
    } else if (value === 'ETH') {
      updatedTokenId = 2;
    } else if (value === 'BTC') {
      updatedTokenId = 3;
    } else if (value === 'BAT') {
      updatedTokenId = 4;
    } else if (value === 'BNB_BSC') {
      updatedTokenId = 5;
    } else if (value === 'DASH') {
      updatedTokenId = 6;
    } else if (value === 'USDT') {
      updatedTokenId = 7;
    } else if (value === 'USDT_BSC') {
      updatedTokenId = 8;
    } else if (value === 'USDT_TRON') {
      updatedTokenId = 9;
    } else if (value === 'XLM') {
      updatedTokenId = 10;
    } else if (value === 'XRP') {
      updatedTokenId = 11;
    } else if (value === 'ZRX') {
      updatedTokenId = 12;
    } else if (value === 'VAFFA') {
      updatedTokenId = 13;
    } else if (value === 'EDCC') {
      updatedTokenId = 14;
    } else if (value === 'BTT') {
      updatedTokenId = 15;
    } else if (value === 'LTC') {
      updatedTokenId = 16;
    } else if (value === 'SHIB') {
      updatedTokenId = 17;
    } else if (value === 'SHIB_BSC') {
      updatedTokenId = 18;
    } else if (value === 'UNI') {
      updatedTokenId = 19;
    } else if (value === 'USDC') {
      updatedTokenId = 20;
    } else if (value === 'TRX') {
      updatedTokenId = 21;
    } else if (value === 'MATIC') {
      updatedTokenId = 22;
    } else if (value === 'USDT_MATIC') {
      updatedTokenId = 23;
    } else if (value === 'CFXQ7L_1') {
      updatedTokenId = 110;
    } else if (value === 'CFXQ7L_2') {
      updatedTokenId = 111;
    } else if (value === 'CFXQ7L_3') {
      updatedTokenId = 112;
    } else if (value === 'CFXQ7L_4') {
      updatedTokenId = 113;
    } else if (value === 'CFXQ2Y') {
      updatedTokenId = 118;
    } else if (value === 'DBA') {
      updatedTokenId = 119;
    }

    setTokenId(updatedTokenId); // Update tokenId based on dropdown value
    console.log('updatedTokenId', updatedTokenId);

    try {
      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/TokenPrices/${updatedTokenId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setGetValue(response?.data);
      console.log('response?.data', response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  useEffect(() => {
    getStacksApi();
    getTokenData();
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

  const assetId = tokens[1]?.tokenType?.assetId;

  const getTokenBalances2 = async value => {
    try {
      const userId = user?.id;
      console.log(value);

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/${value}/addresses?onlyDeposit=true`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setToken(response?.data);
      setSelectedAddress(response?.data[0]?.address);
    } catch (error) {
      console.log('nainbcheck1 ', error);
    }
  };

  const getTokenBalances3 = async value => {
    try {
      const userId = user?.id;

      const valueBe = value ?? 'BTC';

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/${valueBe}/balance`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setFreeze(response?.data);
    } catch (error) {
      console.log('nainbcheck2 ', error);
    }
  };

  const getTokenBalances4 = async value => {
    try {
      const userId = user?.id;
      const valueBe = value ?? 'BTC';

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Wallets/${userId}/${valueBe}/balance`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setAssetValue(response?.data?.available);
      setGetAddress(response?.data?.id);
    } catch (error) {
      console.log('nainbcheck3 ', error);
    }
  };

  useEffect(() => {
    getTokenBalances3();
    getTokenData();
    getTokenBalances4();
  }, []);

  // const assetIds = getData.map(asset => asset?.id
  // const assetIds = getData.map(asset => asset.id);
  const assetIds = Object.keys(assetShortNames);
  const btcIndex = assetIds.indexOf('BTC');
  const btcAssetId = btcIndex !== -1 ? `assetId_${btcIndex}` : null;

  const namesArray = Object.values(assetShortNames).map(value => {
    const parts = value.split(' ');
    return parts.join(' '); // Rejoin all parts to preserve the original name format
  });

  return (
    <View
      style={[Layout.container, Gutters.tinyHPadding, Gutters.smallTPadding]}
    >
      {/* Tabs */}
      <View
        style={[
          Gutters.tinyVPadding,
          Gutters.smallHPadding,
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: Colors.backgroundHighlight,
            borderRadius: 8,
            borderColor: Colors.borderHighlight,
            borderWidth: 1,
          },
        ]}
      >
        <TouchableOpacity
          style={[Layout.alignItemsCenter]}
          onPress={() => setTab('deposit')}
        >
          <Image
            source={Images.icons.deposit}
            style={{ width: 25, height: 25 }}
          />
          <Text uppercase size="tiny" weight="bold" mt={10}>
            {t('allTxts.depositTitle')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Layout.alignItemsCenter]}
          onPress={() => setTab('withdrawal')}
        >
          <Image source={Images.icons.withdrawAlt} />
          <Text uppercase size="tiny" weight="bold" mt={10}>
            {t('allTxts.withdrawTitle')}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[Layout.alignItemsCenter]}
          onPress={() => setTab('fiat')}
        >
          <Image source={Images.icons.fiatAlt} />
          <Text uppercase size="tiny" weight="bold" mt={10}>
            Fiat
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[Layout.alignItemsCenter]}
          onPress={() => setTab('transfer')}
        >
          <Image source={Images.icons.transfer} />
          <Text uppercase size="tiny" weight="bold" mt={10}>
            Transfer
          </Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        {/* title */}
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            Gutters.smallTMargin,
          ]}
        >
          <View />
          <Text uppercase weight="bold" size="medium">
            {tab}
          </Text>
          <TouchableOpacity>
            {/* <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
            /> */}
          </TouchableOpacity>
        </View>
        {/* Asset Card */}
        <View
          style={[
            Gutters.smallTMargin,
            Gutters.tinyHMargin,
            Gutters.tinyPadding,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: Colors.backgroundHighlight,
              borderRadius: 8,
              borderColor: '#FA651444',
              borderWidth: 1,
            },
          ]}
        >
          <View style={[Layout.justifyContentBetween, Layout.rowHCenter]}>
            <View style={[Layout.rowHCenter]}>
              {/* <Image
                source={Images.coins.btc}
                style={{ width: 40, height: 40 }}
              /> */}
              <View style={[Gutters.tinyLMargin]}>
                {/* <Text weight="bold" size="small" mt={5} color="gold">
                  BTC
                </Text>
                <Text size="tiny" mt={5} color="textGray200" weight="light">
                  BITCOIN
                </Text> */}
                <View
                  style={[
                    Layout.rowHCenter,
                    Gutters.tinyVMargin,
                    {
                      borderWidth: 1.2,
                      borderColor: Colors.borderColorLight,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <SelectDropdown
                    data={namesArray}
                    onSelect={(value, index) => {
                      const assetId = Object.keys(assetShortNames).find(
                        key => assetShortNames[key] === value,
                      );
                      setSelectedAssetId(value);
                      getTokenBalances4(value);
                      getTokenBalances2(assetId);
                      getTokenData(value);
                      setShowValue(value);
                      getTokenBalances3(value);
                    }}
                    defaultValue={btcAssetId}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      width: 150,
                      height: 36,
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
                            Images.coins1[item]
                              ? Images.coins1[item]
                              : Images.coins1.GEN
                          }
                          style={{ width: 18, height: 18 }}
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
                            Images.coins1[item]
                              ? Images.coins1[item]
                              : Images.coins1.GEN
                          }
                          style={{ width: 18, height: 18 }}
                        />
                        <Text uppercase color="white" ml={5} weight="semibold">
                          {item}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
              <TouchableOpacity style={[Gutters.tinyLMargin]}>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={[Layout.alignItemsEnd]}>
              <Text>1</Text>
              <Text>
                {getValue[0]?.unitValue
                  ? parseFloat(getValue[0]?.unitValue).toFixed(2)
                  : 0}
              </Text>
            </View>
          </View>
          <View
            style={[
              Gutters.smallTMargin,
              Gutters.tinyHPadding,
              Gutters.tinyBMargin,
            ]}
          >
            <View
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
              ]}
            >
              <Text>{t('allTxts.availableLabel')}</Text>
              <Text>{assetValue}</Text>
            </View>
            <View
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
              ]}
            >
              <Text>Freeze</Text>
              <Text>{freeze?.frozen}</Text>
            </View>
          </View>
        </View>

        {tab === 'deposit' && (
          <Deposit addressId={selectedAddress} showValue={showValue} />
        )}
        {tab === 'withdrawal' && (
          <Withdraw
            firstShow={freeze?.available}
            secondShow={assetValue}
            getAddress={token?.address}
            tokenId={tokenId}
            showValue={showValue}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Cash;
