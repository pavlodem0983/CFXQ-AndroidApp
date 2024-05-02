import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TextInput } from 'react-native';
import { Text, Button } from '@components';
import { useAppSelector, useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { LineChart } from 'react-native-gifted-charts';
import SelectDropdown from 'react-native-select-dropdown';
import { generateRandomGraphData } from './Data';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const coins = ['ZONE', 'ETH_TEST', 'usdt', 'BTC_TEST'];

const QuickPurchase = () => {
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const { Layout, Gutters, Images, Colors } = useTheme();
  const navigation = useNavigation();
  const graphData = generateRandomGraphData();
  const [getData, setGetData] = useState([]);

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
  }, []);

  const assetIds = getData.map(asset => asset?.id);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[Gutters.regularBPadding]}
    >
      <View style={[Gutters.smallTMargin]}>
        <Text color="white" weight="bold" size="regular" mb={5}>
          CFXQ Acquisto veloce
        </Text>
        <Text color="textGray200">Hai O CFXQ adesso</Text>
        <Text color="textGray200">
          Ultimo prezzo del 17/08/2023 in Eur = 0.05396694
        </Text>
      </View>

      <View
        style={[
          Gutters.smallTMargin,
          Layout.rowHCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <View style={[Layout.rowHCenter]}>
          <Text color="white" weight="bold">
            ZONE/ETH
          </Text>
          <Text color="textGray200" ml={3}>
            1,536.20832452
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="caret-up" color="white" size={16} />
        </TouchableOpacity>
      </View>

      {/* <View style={[Gutters.smallTMargin, {marginLeft: -10  }]}>
        <LineChart 
          thickness={3}
          color="#354469"
          areaChart
          maxValue={30}
          height={140}
          startFillColor={'#5E88FF'}
          endFillColor={'#060A11'}
          startOpacity={0.4}
          endOpacity={0.4}
          hideDataPoints
          xAxisColor={'#999999'}
          xAxisThickness={3}
          hideOrigin
          hideRules
          hideYAxisText  
          initialSpacing={0}
          spacing={32}
          data={graphData}
        />
      </View> */}

      {/*  */}
      <View style={[Gutters.smallTMargin]}>
        <View>
          <Text>Paga Importo</Text>
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
              data={assetIds}
              onSelect={value => console.log(value)}
              defaultValue={assetIds[0]}
              buttonStyle={{
                backgroundColor: 'transparent',
                width: 128,
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
                  <Image source={Images.coins[item]} style={styles.coinIcon} />
                  <Text uppercase color="white" ml={5} weight="semibold">
                    {item}
                  </Text>
                </View>
              )}
              renderCustomizedRowChild={(item, index) => (
                <View style={[Layout.rowHCenter]}>
                  <Image source={Images.coins[item]} style={styles.coinIcon} />
                  <Text uppercase color="white" ml={5} weight="semibold">
                    {item}
                  </Text>
                </View>
              )}
            />
            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 12,
                height: 40,
                color: Colors.white,
              }}
              placeholder="Inserisci importo da Pagare"
              textAlign="right"
              placeholderTextColor={Colors.textGray200}
            />
          </View>
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
            <Text color="textGray200" size="tiny">
              Saldo 0 ETH
            </Text>
            <TouchableOpacity>
              <Text color="highlight">Tutto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Gutters.tinyVMargin, Layout.alignItemsCenter]}>
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 16,
              borderWidth: 1.2,
              borderColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SimpleIcons name="refresh" color="white" size={14} />
          </View>
        </View>

        {/* Exchange Component */}
        <View>
          <Text>Paga Importo</Text>
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
              data={assetIds}
              onSelect={value => console.log(value)}
              defaultValue={assetIds[0]}
              buttonStyle={{
                backgroundColor: 'transparent',
                width: 125,
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
                  <Image source={Images.coins[item]} style={styles.coinIcon} />
                  <Text uppercase color="white" ml={5} weight="semibold">
                    {item}
                  </Text>
                </View>
              )}
              renderCustomizedRowChild={(item, index) => (
                <View style={[Layout.rowHCenter]}>
                  <Image source={Images.coins[item]} style={styles.coinIcon} />
                  <Text uppercase color="white" ml={5} weight="semibold">
                    {item}
                  </Text>
                </View>
              )}
            />
            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 12,
                height: 40,
                color: Colors.white,
                backgroundColor: Colors.buttonDisabled,
              }}
              textAlign="right"
              editable={false}
              selectTextOnFocus={false}
              placeholderTextColor={Colors.textGray200}
            />
          </View>
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
            <Text color="textGray200" size="tiny">
              1 ETH~1,536.20832452 ZONE
            </Text>
          </View>
        </View>

        {/* Exchange button */}

        <View style={[Gutters.smallVMargin]}>
          <Button title="Conferma" />
        </View>
      </View>
    </ScrollView>
  );
};

export default QuickPurchase;

const styles = StyleSheet.create({
  coinIcon: {
    width: 18,
    height: 18,
  },
});
