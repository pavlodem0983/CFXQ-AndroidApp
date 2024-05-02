import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Image,
} from 'react-native';
import { Text } from '@components';
import { CasaStackScreenProps } from 'types/navigation';
import { useTheme } from '@hooks';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useGetTransactionsByTokenIdQuery } from '@services/modules/users';
import { Transaction, Balance } from 'types/main';
import { usePrice, useCurrency } from '@hooks';
import { TRADE_TYPE, TRANSACTION_STATUS } from '@constants/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Asset = ({ route }: CasaStackScreenProps) => {
  const asset: Balance = route.params?.asset;
  const { t } = useTranslation();

  const { Layout, Colors, Gutters, Images } = useTheme();
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);

  const assetToken = asset.tokenType;
  const currency = useCurrency();
  const price = usePrice(asset.tokenType.id);

  const { data, error } = useGetTransactionsByTokenIdQuery({
    userId: user?.id,
    tokenTypeId: asset?.tokenTypeId,
    onlyLastVersion: true,
  });

  const renderTransactionItem: ListRenderItem<Transaction> = ({
    item,
    index,
  }) => {
    return (
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
          Gutters.smallHPadding,
          Gutters.tinyVPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderBottomColor: Colors.textGray500,
            borderBottomWidth: index < data?.length - 1 ? 2 : 0,
          },
        ]}
      >
        <View>
          <Text weight="semibold" size="regular">
            {TRADE_TYPE[item.tradeType]}
          </Text>
          <Text size="tiny" mt={8} color="textGray200">
            {moment(item.tms).format('YYYY, MMM.dd')}
          </Text>
        </View>
        <View style={[Layout.alignItemsEnd]}>
          <Text
            weight="semibold"
            color={item.quantity > 0 ? 'highlight' : 'error'}
          >{`${item.quantity}${assetToken.shortName}`}</Text>
          <Text size="tiny" color="textGray200" mt={8}>
            {TRANSACTION_STATUS[item.status]}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[Layout.container]}>
      <View
        style={[
          Gutters.tinyHMargin,
          Gutters.regularTMargin,
          Gutters.regularPadding,
          Gutters.regularBMargin,
          styles.summaryCard,
        ]}
      >
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Image
              source={
                Images.coins[asset?.tokenType.shortName]
                  ? Images.coins[asset?.tokenType.shortName]
                  : Images.coins1.GEN
              }
              style={{ width: 30, height: 30 }}
            />
            <View style={[Gutters.tinyLMargin]}>
              <Text weight="semibold" size="regular">
                {asset?.tokenType.shortName}
              </Text>
              <Text color="textGray200" mt={5} size="small">
                {asset?.tokenType.fullName}
              </Text>
            </View>
          </View>
          <View style={[Layout.alignItemsEnd]}>
            <Text weight="medium">{asset?.cumulatedTotal}</Text>
            <Text color="textGray200" weight="regular" mt={2}>
              {/* {`= ${currency.symbol}${price?.unitValue * asset?.total}`} */}
              {`= ${currency.symbol}${(
                price?.unitValue * asset?.cumulatedTotal
              ).toFixed(2)}`}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.cardDivider,
            Gutters.tinyVMargin,
            { backgroundColor: Colors.textGray200 },
          ]}
        />
        <View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Layout.alignItemsCenter,
            ]}
          >
            <Text color="textGray200">{t('allTxts.availableLabel')}</Text>
            <Text>{asset?.cumulatedTotal}</Text>
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Layout.alignItemsCenter,
              Gutters.tinyTMargin,
            ]}
          >
            <Text color="textGray200">{t('allTxts.frozenlabel')}</Text>
            <Text>{0}</Text>
          </View>
        </View>
      </View>
      <FlatList
        ListHeaderComponent={
          <Text style={[Gutters.smallLMargin]} mb={10} color="textGray200">
            Transazione
          </Text>
        }
        ListEmptyComponent={
          <Text
            style={[Gutters.smallLMargin, Layout.center]}
            mb={10}
            color="textGray200"
          >
            No Transactions!
          </Text>
        }
        data={data}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Asset;

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#000306',
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
  cardDivider: {
    width: '100%',
    height: 2,
  },
});
