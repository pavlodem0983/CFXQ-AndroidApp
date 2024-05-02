import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickPurchase from './QuickPurchase';
import SpotTrading from './SpotTrading';

const Exchange = () => {
  const { Layout, Gutters, Colors } = useTheme();
  const [tab, setTab] = useState<'trading' | 'purchase'>('purchase');
  return (
    <View
      style={[Layout.container, Gutters.smallVPadding]}
    >
      <SafeAreaView>
        <View style={[Layout.rowHCenter, Layout.justifyContentCenter]}>
          {/* <TouchableOpacity
            onPress={() => setTab('trading')}
            style={{
              ...styles.tabButton,
              borderColor:
                tab === 'trading' ? Colors.highlight : Colors.textGray400,
            }}
          >
            <Text
              color={tab === 'trading' ? 'highlight' : 'textGray400'}
              align="center"
              weight="bold"
            >
              Spot Trading
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setTab('purchase')}
            style={{
              ...styles.tabButton,
              borderColor:
                tab === 'purchase' ? Colors.highlight : Colors.textGray400,
            }}
          >
            <Text
              color={tab === 'purchase' ? 'highlight' : 'textGray400'}
              align="center"
              weight="bold"
            >
              Acquisto veloce
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[Gutters.smallTMargin, Gutters.tinyHPadding]}>
          {tab === 'trading' ? <SpotTrading /> : <QuickPurchase />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    borderWidth: 1.2,
    paddingVertical: 8,
    borderRadius: 3,
  },
});
