import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ListRenderItem,
} from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import SummaryCard from './SummaryCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { Balance } from 'types/main';
import { useAppSelector, useCurrency } from '@hooks';
import { useTranslation } from 'react-i18next';

type AssetListProps = {
  tokens: Balance[];
};

const AssetList = ({ tokens }: AssetListProps) => {
  const { t, i18n } = useTranslation();

  const { Layout, Gutters, Images, Colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const { tokenTypes, user } = useAppSelector(state => state.app);
  const currency = useCurrency();
  const [showBlnc, setShowBlnc] = useState(false);
  const { showTotalPrice } = useAppSelector(state => state.settings);

  const onPressItem = (asset: Balance) => {
    navigation.navigate('Asset' as never, { asset });
  };

  // Function to calculate total price
  const calculateTotalPrice = useMemo(() => {
    return tokens.reduce((total, item) => {
      const token = tokenTypes.find(token => token.id === item.tokenType.id);
      const prefferedCurrency = user?.preferredCurrency;
      const priceObject = token?.tokenPrices.find(
        p => p.currencyTo.toLowerCase() === prefferedCurrency?.toLowerCase(),
      );
      const unitPrice = priceObject ? priceObject.unitValue : 0;
      return total + unitPrice * item.cumulatedTotal;
    }, 0);
  }, [tokens, tokenTypes, user]);

  const totalPrice = calculateTotalPrice;

  const renderItem: ListRenderItem<Balance> = ({ item }) => {
    const image = Images.coins.hasOwnProperty(item.tokenType.shortName)
      ? Images.coins[item.tokenType.shortName]
      : Images.coins.GEN;
    const token = tokenTypes.find(token => token.id === item.tokenType.id);
    const prefferedCurrency = user?.preferredCurrency;
    const priceObject = token?.tokenPrices.find(
      p => p.currencyTo.toLowerCase() === prefferedCurrency?.toLowerCase(),
    );

    const unitPrice = priceObject ? priceObject.unitValue : 0;
    const price = `${currency.symbol}${(
      unitPrice * item?.cumulatedTotal
    ).toFixed(2)}`;
    return (
      <>
        {showBlnc ? (
          item?.cumulatedTotal !== 0 && (
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
                Gutters.tinyHPadding,
              ]}
              onPress={() => onPressItem(item)}
            >
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <Image source={image} style={styles.coinIcon} />
                <View style={[Gutters.tinyLMargin]}>
                  <Text weight="medium">{item.tokenType.shortName}</Text>
                  <Text color="textGray400" weight="regular" mt={2}>
                    {item.tokenType.fullName}
                  </Text>
                </View>
              </View>
              <View style={[Layout.alignItemsEnd]}>
                <Text weight="medium">
                  {showTotalPrice ? '*******' : item?.cumulatedTotal}
                </Text>
                <Text color="textGray200" weight="regular" mt={2}>
                  {showTotalPrice ? '*********' : `= ${price}`}
                </Text>
              </View>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
            ]}
            onPress={() => onPressItem(item)}
          >
            <View style={[Layout.row, Layout.alignItemsCenter]}>
              <Image source={image} style={styles.coinIcon} />
              <View style={[Gutters.tinyLMargin]}>
                <Text weight="medium">{item.tokenType.shortName}</Text>
                <Text color="textGray400" weight="regular" mt={2}>
                  {item.tokenType.fullName}
                </Text>
              </View>
            </View>
            <View style={[Layout.alignItemsEnd]}>
              <Text weight="medium">
                {showTotalPrice ? '*******' : item?.cumulatedTotal}
              </Text>
              <Text color="textGray200" weight="regular" mt={2}>
                {showTotalPrice ? '*********' : `= ${price}`}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      <SummaryCard tokens={tokens} totalPrice={totalPrice} />

      <FlatList
        data={tokens}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.smallHPadding,
                Gutters.smallVMargin,
              ]}
            >
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <CheckBox
                  disabled={false}
                  value={showBlnc}
                  onValueChange={newValue => setShowBlnc(!showBlnc)}
                  style={styles.checkbox}
                />
                <TouchableOpacity>
                  <Text color="highlight" ml={5}>
                    {t('allTxts.homePageHideZeroBalances')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        contentContainerStyle={{
          paddingBottom: bottomTabBarHeight,
        }}
      />
    </>
  );
};

export default AssetList;

const styles = StyleSheet.create({
  coinIcon: {
    width: 32,
    height: 32,
  },
  checkbox: {
    width: 16,
    height: 16,
    color: 'white',
  },
});
