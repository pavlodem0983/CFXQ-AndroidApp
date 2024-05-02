import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import Anticons from 'react-native-vector-icons/AntDesign';
import Purchase from './Purchase';
import TransactionHistories from './TransactionHistories';
import { useNavigation } from '@react-navigation/native';
import { ExchangeStackScreenProps } from 'types/navigation';

const SpotTrading = () => {
  const { Layout, Gutters, Colors, Images } = useTheme();
  const navigation = useNavigation<ExchangeStackScreenProps['navigation']>();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[Gutters.regularBPadding]}
    >
      <TouchableOpacity
        style={[Layout.rowHCenter, Layout.justifyContentBetween]}
        onPress={() => navigation.navigate('TradeView')}
      >
        <View style={[Layout.rowHCenter]}>
          <Anticons name="menu-fold" color="white" size={24} />
          <Text ml={5} weight="bold" size="regular" lineHeight={24}>
            BTC/USDT
          </Text>
          <Text color="highlight" weight="semibold" ml={4}>
            +0.00%
          </Text>
        </View>
        <View>
          <Image
            source={require('@theme/assets/images/icons/trade-chart.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 22, height: 22 }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={[Layout.row, Layout.justifyContentBetween, Gutters.smallTMargin]}
      >
        <Purchase />
        <TransactionHistories />
      </View>

      {/* Ordini aperti (Operation orders list) */}
      <View style={[Layout.fill, Gutters.smallTMargin]}>
        <View
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallBPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.borderColor },
          ]}
        >
          <Text>Ordini aperti</Text>
          <TouchableOpacity>
            <Text>Tutto</Text>
          </TouchableOpacity>
        </View>
        <View style={[Gutters.smallVPadding, Layout.center]}>
          <Image source={Images.noRecord} />
          <Text color="textGray200">No Record</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SpotTrading;

const styles = StyleSheet.create({});
