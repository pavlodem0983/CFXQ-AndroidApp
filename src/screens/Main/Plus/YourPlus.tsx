import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Divider } from '@components';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks';
import { numnber2LocaleString } from '@utils';
import { userApi } from '@services/modules/users';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const YourPlus = () => {
  const { Layout, Gutters, Colors, Images } = useTheme();

  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [tokens, setTokens] = useState<any>([]);
  const [stacks, setStacks] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);
  const { t, i18n } = useTranslation();

  const [showImage, setShowImage] = useState(null);

  const getTokenBalances = async () => {
    try {
      const userId = user?.id;
      let tokenBalances = await Promise.all(
        tokenTypes.map(async token => {
          const result = await dispatch(
            userApi.endpoints.getBalanceByTokenTypeId.initiate({
              userId,
              tokenTypeId: token.id,
            }),
          );

          if (result.data?.length) {
            return result.data[0];
          } else {
            return null;
          }
        }),
      );
      // tokenBalances = tokenBalances.filter(token => token !== null);
      setTokens(tokenBalances);
    } catch (error) {
      console.log('Check Error', error);
    }
  };

  useEffect(() => {
    getTokenBalances();
    getTokenBalances2();
    getTokenBalances3();
  }, []);

  const getTokenBalances2 = async bearerToken => {
    try {
      const userId = user?.id;

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Stacks/interests/${userId}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setStacks(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  const getTokenBalances3 = async bearerToken => {
    try {
      const userId = user?.id;

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Stacks/balances/${userId}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setHistory(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  const totalZone = tokens[0]?.cumulatedTotal + stacks?.simpleAccrued;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[Gutters.smallBMargin]}>
        <Text color="error" uppercase weight="bold">
          Plus
        </Text>
        <Text weight="bold" uppercase mt={10}>
          {t('allTxts.txtShowStaking1')}
        </Text>
        <Text weight="bold" mt={10}>
          {t('allTxts.txtShowStaking')}
        </Text>
        <Text weight="bold" mt={10}>
          {t('allTxts.txtShowStaking2')}
        </Text>
      </View>
      <Divider />

      <View
        style={[
          Gutters.tinyTMargin,
          Gutters.tinyHPadding,
          Gutters.smallBMargin,
        ]}
      >
        <Text color="error" uppercase weight="bold">
          Plus
        </Text>
        <View style={[styles.card, Gutters.smallPadding, Gutters.tinyTMargin]}>
          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.tinyVPadding,
            ]}
          >
            <Text weight="bold">{t('allTxts.plusStakingAmount')}</Text>
            <Text weight="bold">{tokens[0]?.cumulatedPrincipal}</Text>
          </View>
          <Divider />
          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.tinyVPadding,
            ]}
          >
            <Text weight="bold">{t('allTxts.plusCompound')}</Text>
            <Text weight="bold">{tokens[0]?.cumulatedInterests}</Text>
          </View>
          <Divider />
          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.tinyVPadding,
            ]}
          >
            <Text weight="bold">{t('allTxts.plusTotalStaking')}</Text>
            <Text weight="bold">{tokens[0]?.cumulatedTotal}</Text>
          </View>
          <Divider />
          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              Gutters.tinyVPadding,
            ]}
          >
            <Text weight="bold">{t('allTxts.plusThisMonth')}</Text>
            <Text weight="bold">
              {parseFloat(stacks?.simpleAccrued).toFixed(3)}
            </Text>
          </View>
          <Divider />
          {/* <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.tinyVPadding]}>
            <Text weight='bold'>Zone liberi</Text>
            <Text weight="bold">{numnber2LocaleString(33.929)}</Text>
          </View> */}
        </View>
      </View>
      <Divider />

      <View style={[Gutters.tinyVPadding]}>
        <View style={[Layout.rowHCenter]}>
          <Image
            style={{ width: 40, height: 40 }}
            source={Images.icons.zerooneToken}
          />
          <Text ml={20} weight="bold">
            {t('allTxts.plusZoneTotalBalance')} ={' '}
            {parseFloat(totalZone).toFixed(3)}
          </Text>
        </View>

        <View style={[Layout.row, Gutters.smallTMargin]}>
          <Image
            style={{ width: 30, height: 30 }}
            source={Images.icons.returns}
          />
          <View style={[Gutters.smallLMargin]}>
            <Text weight="bold">{t('allTxts.plusNextDateText')}</Text>
            <Text weight="bold" mt={10}>
              {t('allTxts.plusNextDateText1')} = {'2024-4-01'}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('GurdaScreen')}
            >
              <Text color="error" mt={10}>
                {t('allTxts.gudaalloStaking')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />

      <View style={[Gutters.tinyVPadding]}>
        <Text uppercase color="error">
          {t('allTxts.plusRecordsTitle')}
        </Text>
        {history?.map((item, index) => {
          const date = new Date(item?.tms); // Create a Date object from the date string
          const daysInMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
          ).getDate(); // Get the number of days in the month

          if (item?.operationStatus === 6) {
            return (
              <View
                key={index} // Adding a unique key for each item
                style={[
                  styles.card,
                  Gutters.smallTMargin,
                  Gutters.smallPadding,
                  Gutters.smallBMargin,
                ]}
              >
                <View
                  style={[
                    Layout.rowHCenter,
                    Layout.justifyContentBetween,
                    Gutters.tinyBMargin,
                  ]}
                >
                  <View>
                    <Text weight="bold" size="regular">
                      # {t('allTxts.plusCycleTitle')} #{daysInMonth}
                    </Text>
                    <Text color="textGray200">
                      {moment(item?.tms).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                  <Text color="error">Compound Interest</Text>
                </View>
                <Divider />

                <View
                  style={[
                    Layout.rowHCenter,
                    Layout.justifyContentBetween,
                    Gutters.tinyTMargin,
                  ]}
                >
                  <Image
                    source={Images.icons.zerooneToken}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text weight="bold">{item?.amount} ZONE</Text>
                </View>
              </View>
            );
          } else {
            return null; // Skip rendering if operationStatus is not 6
          }
        })}
      </View>
    </ScrollView>
  );
};

export default YourPlus;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171A23',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A3363D',
    shadowColor: '#C0444F',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,

    elevation: 16,
  },
});
