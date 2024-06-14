import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Balance } from 'types/main';
import { useAppSelector, useCurrency, useAppDispatch } from '@hooks';
import { toggleShowTotalPrice } from '@store/settings';
import { useTranslation } from 'react-i18next';

type SummaryCardProps = {
  tokens: Balance[];
};

const SummaryCard = ({ tokens, totalPrice }: SummaryCardProps) => {
  const { Layout, Colors, Gutters, Images } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { tokenTypes, user } = useAppSelector(state => state.app);
  const { showTotalPrice } = useAppSelector(state => state.settings);
  // console.log(JSON.stringify(tokens, 2, 4));
  console.log(JSON.stringify(tokens, 2, 4));

  const initialValue = 0;
  const currency = useCurrency();
  const total = useMemo(() => {
    return tokens.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }, [tokens]);

  const onPressToggle = useCallback(() => {
    dispatch(toggleShowTotalPrice());
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <View
      style={[styles.summaryCard, Gutters.tinyHMargin, Gutters.regularTMargin]}
    >
      <Image
        source={Images.main.summaryCardBackground}
        style={styles.summaryCardBackgroundImage}
      />
      <View style={[styles.summaryCardContainer, Gutters.smallPadding]}>
        {showTotalPrice == false ? (
          <View style={[Layout.justifyContentBetween]}>
            <Text>{t('allTxts.totalBalance')}</Text>

            <View
              style={[Layout.row, Layout.alignItemsStart, Gutters.tinyTMargin]}
            >
              <Text weight="bold" size="medium" lineHeight={24}>
                {currency.symbol}
              </Text>
              <Text weight="bold" size="large" ml={6}>
                {parseFloat(totalPrice).toFixed(2)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={[Layout.justifyContentBetween]}>
            <Text>{t('allTxts.totalBalance')}</Text>

            <View
              style={[Layout.row, Layout.alignItemsStart, Gutters.tinyTMargin]}
            >
              <Text weight="bold" size="medium" lineHeight={24}>
                {currency.symbol}
              </Text>
              <Text mt={4} weight="bold" size="large" ml={6}>
                {/* {parseFloat(total).toFixed(2)} */}
                {'*'.repeat(String(parseFloat(total).toFixed(2)).length)}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={() => onPressToggle()} style={styles.eye}>
          <Ionicons
            name={showTotalPrice ? 'eye-off' : 'eye'}
            color={Colors.white}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          Gutters.smallVPadding,
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
          Gutters.regularHPadding,
        ]}
      >
        <TouchableOpacity
          style={[Layout.alignItemsCenter]}
          onPress={() => navigation.navigate('Cash' as never, { tokens })}
        >
          <Image
            source={Images.icons.deposit}
            style={{ width: 30, height: 30 }}
          />
          <Text mt={5}>{t('allTxts.depositMenuButton')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Cash' as never, { tokens, check: true })
          }
          style={[Layout.alignItemsCenter]}
        >
          <Image
            source={Images.icons.withdraw}
            style={{ width: 30, height: 30 }}
          />
          <Text mt={5}>{t('allTxts.withdrawMenuButton')}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[Layout.alignItemsCenter]}>
          <Image source={Images.icons.fiat} />
          <Text mt={5}>Fiat</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#171A23',
    borderRadius: 8,
    shadowColor: '#234155',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 18.3,
    elevation: 13,
  },
  summaryCardBackgroundImage: {
    width: '100%',
    height: 115,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
  },
  summaryCardContainer: {
    backgroundColor: '#06091299',
    with: '100%',
    height: 115,
    borderRadius: 10,
  },
  eye: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
