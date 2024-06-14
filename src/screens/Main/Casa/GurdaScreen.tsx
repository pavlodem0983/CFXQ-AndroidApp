import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Text, TextInput } from '@components';
import { useTheme } from '@hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import YourPlus from '../Plus/YourPlus';
import History from '../Plus/History';
import Staking from '../Plus/Staking';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

const renderScene = SceneMap({
  staking: Staking,
  plus: YourPlus,
  history: History,
});

const GurdaScreen = () => {
  const { Layout, Gutters, Colors, Images } = useTheme();
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'staking', title: 'Staking' },
    { key: 'plus', title: 'Il Tuo Plus' },
    { key: 'history', title: 'Storico' },
  ]);
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');

  const [textInputVal, setTextInputVal] = useState('');
  const [sliderVal, setSliderVal] = useState(0);
  const [potentialReturns, setPotentialReturns] = useState(0);
  const [percentageReturns, setPercentageReturns] = useState(0);

  const data = [
    { clientStakes: '0,00€', monthlyPlus: '2999,00€', interestRate: '1%' },
    {
      clientStakes: '3000,00€',
      monthlyPlus: '9999,99€',
      interestRate: '1,10%',
    },
    {
      clientStakes: '10.000,00€',
      monthlyPlus: '24.999,99€',
      interestRate: '1,20%',
    },
    {
      clientStakes: '25.000,00€',
      monthlyPlus: '49.999,99€',
      interestRate: '1,30%',
    },
    {
      clientStakes: '50.000,00€',
      monthlyPlus: '99.999,99€',
      interestRate: '1,40%',
    },
    {
      clientStakes: '100.000,00€',
      monthlyPlus: '<',
      interestRate: '1,50%',
    },
  ];

  const getInterestRate = amount => {
    if (amount >= 1000 && amount < 3000) {
      return 0.01;
    } else if (amount >= 3000 && amount < 10000) {
      return 0.011;
    } else if (amount >= 10000 && amount < 25000) {
      return 0.012;
    } else if (amount >= 25000 && amount < 50000) {
      return 0.013;
    } else if (amount >= 50000 && amount < 100000) {
      return 0.014;
    } else if (amount >= 100000) {
      return 0.015;
    }
    return 0;
  };

  const calculateCompoundInterest = intValue => {
    const amount = parseFloat(textInputVal);

    if (amount >= 1000) {
      const parsedAmount = amount;
      const parsedMonths = parseInt(intValue);

      if (
        isNaN(parsedAmount) ||
        isNaN(parsedMonths) ||
        parsedMonths < 1 ||
        parsedMonths > 48
      ) {
        alert('Please enter valid values.');
        return;
      }

      let stakedAmount = parsedAmount;
      let earnings = 0;

      for (let m = 0; m < parsedMonths; m++) {
        const interestRate = getInterestRate(stakedAmount);
        const monthlyAccruedInterest =
          Math.round(interestRate * stakedAmount * 100) / 100;
        earnings += monthlyAccruedInterest;
        stakedAmount += monthlyAccruedInterest;
      }

      const percentageReturns = (earnings / parsedAmount) * 100;

      setPotentialReturns(earnings.toFixed(2));
      setPercentageReturns(percentageReturns.toFixed(2));
    } else {
      Alert.alert('Staking Amount should be 1000 or more!');
    }
  };

  return (
    <View style={[Layout.container, Gutters.tinyHPadding]}>
      <SafeAreaView style={[Layout.fill]}>
        <View style={[Layout.alignItemsEnd]}>
          <Image
            style={{ width: 153, height: 57 }}
            source={Images.main.zerooneCal}
          />
        </View>
        <View style={[Layout.alignItemsCenter]}>
          <Image
            source={Images.main.neww}
            style={{ width: 300, height: 20, marginTop: 30 }}
          />
        </View>
        <View style={{ width: '50%', alignSelf: 'center', marginTop: 15 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {t('allTxts.GurdaScreen1')}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: '95%',
            alignSelf: 'center',
            marginVertical: '1%',
            borderColor: '#515156',
            marginTop: 35,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={{ color: 'white' }}>
              {/* {t('allTxts.stakingSimulAmountLabel')} */}
            </Text>
          </View>
          <View style={[Layout.alignItemsCenter]}>
            <Image
              source={Images.main.zonenew}
              style={{ width: 350, height: 50, marginTop: 10 }}
            />
          </View>
          <View>
            <TextInput
              label={t('allTxts.stakingSimulAmountLabel')}
              placeholder={t('allTxts.stakingSimulAmountPlaceholder')}
              placeholderTextColor={Colors.textGray200}
              keyboardType="numeric"
              value={textInputVal}
              onChangeText={val => setTextInputVal(val)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 25,
            }}
          >
            <Text style={{ color: '#EFF3F6' }}>
              {t('allTxts.stakingSimulSliderLabel')}
            </Text>
            <Text style={{ color: '#268DC4' }}>
              {t('allTxts.stakingSimulPotentialReturnsMonth')}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#171A23',
              borderWidth: 1.2,
              borderColor: Colors.inputBackground,
              height: 85,
              paddingHorizontal: 10,
              borderRadius: 5,
              shadowColor: '#268CD0',
              shadowOffset: {
                width: 1,
                height: 0,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6.5,
              elevation: 5,
            }}
          >
            <Slider
              style={{ width: 350, height: 40 }}
              minimumValue={1}
              maximumValue={48}
              minimumTrackTintColor="#22ACFF"
              maximumTrackTintColor="#E3E3E3"
              thumbTintColor="grey"
              tapToSeek={true}
              value={sliderVal}
              onValueChange={val => {
                const intValue = Math.round(val); // Round slider value to the nearest integer
                setSliderVal(intValue);
                setAmount(intValue);
                calculateCompoundInterest(intValue);
                // Update slider value
              }}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text>{t('allTxts.stakingSimulPotentialReturns')}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="Type here"
              placeholderTextColor={Colors.textGray200}
              keyboardType="numeric"
              style={{ width: 160, height: 45, shadowColor: '#BF174A' }}
              value={`${textInputVal} ZONE`} // Set TextInput value from state
              // onChangeText={text => setTextInputVal(text)} // Update state when TextInput changes
            />
            <TextInput
              placeholder="Type here"
              placeholderTextColor={Colors.textGray200}
              keyboardType="numeric"
              style={{ width: 160, height: 45 }}
              value={`${sliderVal.toString()}  ${t(
                'allTxts.stakingSimulPotentialReturnsMonth',
              )}`} // Set TextInput value from state
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>{t('allTxts.GurdaScreen3')}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              backgroundColor: '#171A23',
              borderWidth: 1.2,
              borderColor: Colors.inputBackground,
              height: 85,
              paddingHorizontal: 10,
              borderRadius: 5,
              shadowColor: '#268CD0',

              shadowOffset: {
                width: 1,
                height: 0,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6.5,
              elevation: 5,
            }}
          >
            <Text style={{ color: 'white', marginLeft: 10 }}>
              {sliderVal} {t('allTxts.stakingSimulPotentialReturnsMonth')} ={' '}
              {potentialReturns}
              <Text style={{ color: '#DB2734' }}> {percentageReturns}% </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 40,
            }}
          >
            {/* <Text>{t('allTxts.stakingSimulTableClientStakes')}</Text> */}
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: '#171A23',
              borderWidth: 1.2,
              borderColor: Colors.inputBackground,
              // height: 255,
              width: 350,
              paddingHorizontal: 10,
              borderRadius: 5,
              shadowColor: '#268CD0',

              shadowOffset: {
                width: 1,
                height: 0,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6.5,
              elevation: 5,
              padding: 10,
              alignSelf: 'center',
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={{ top: 10 }} color="error" weight="bold">
                  {t('allTxts.stakingSimulTableClientStakes')}
                </Text>
                <Text style={{ top: 10 }} color="error" weight="bold">
                  {t('allTxts.stakingSimulTableMonthlyPlus')}
                </Text>
              </View>
              {/* <Divider /> */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 385,
                  alignSelf: 'center',
                  marginVertical: '1%',
                  borderColor: '#515156',
                  marginTop: 35,
                }}
              />
              <View
                style={{
                  marginTop: 10,
                }}
              />
              <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <Text
                  weight="bold"
                  style={{ flex: 1 }}
                  align="left"
                  color="white"
                >
                  {t('allTxts.stakingSimulTableFrom')}
                </Text>
                <Text
                  weight="bold"
                  style={{ right: 185 }}
                  align="center"
                  color="white"
                >
                  {t('allTxts.stakingSimulTableTo')}
                </Text>
              </View>

              {data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:
                      index % 2 === 0 ? '#1F3B57' : 'transparent', // Highlight every second row
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <Text>{item.clientStakes}</Text>
                  <Text>{item.monthlyPlus}</Text>
                  <Text>{item.interestRate}</Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              width: 400,
              alignSelf: 'center',
              marginVertical: '1%',
              borderColor: '#515156',
              marginTop: 25,
            }}
          />
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: '#BF174A' }}>
              {' '}
              {t('allTxts.stakingSimulRulesTitle')}
            </Text>
          </View>

          <View
            style={{ marginTop: 10, gap: 10, width: 335, marginBottom: 20 }}
          >
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText1')}
            </Text>
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText2')}
            </Text>
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText3')}
            </Text>
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText4')}
            </Text>
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText5')}
            </Text>
            {/* <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesTest6')}
            </Text> */}
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText7')}
            </Text>
            <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText8')}
            </Text>
            {/* <Text style={{ color: 'white' }}>
              {t('allTxts.stakingSimulRulesText9')}
            </Text> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default GurdaScreen;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#515156',
    marginBottom: 16,
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'transparent',
  },
});
