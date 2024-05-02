import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useTheme } from '@hooks';
import { Text, StockChart } from '@components';

const TradeView = () => {

  const { Layout, Gutters, Colors } = useTheme();

  return (
    <ScrollView
      style={[Layout.container, Gutters.smallVPadding, Layout.fill]}
      contentContainerStyle={{ flex : 1}}
    >
      <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.tinyHPadding]}>
        <View style={[Layout.row, Layout.alignItemsEnd]}>
          <Text color='highlight' weight='bold' size="medium" lineHeight={24}>29,313.2</Text>
          <Text color="textGray400" size="tiny" lineHeight={24} ml={5}>-$26.982</Text>
        </View>

        <View style={[Gutters.tinyPadding, { backgroundColor: "#28ABFF44"}]}>
          <Text color="highlight">+0.00%</Text>
        </View>
      </View>

      <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.tinyHPadding, Gutters.tinyTMargin]}>
        <View>
          <Text color="textGray400">24H High</Text>
          <Text weight='semibold'>0</Text>
        </View>

        <View>
          <Text color="textGray400">24H Low</Text>
          <Text align='center' weight='semibold'>0</Text>
        </View>

        <View>
          <Text color="textGray400">24H Vol</Text>
          <Text align='right' weight='semibold'>0.00</Text>
        </View>
      </View>

      <StockChart  />
    </ScrollView>
  )
}

export default TradeView

const styles = StyleSheet.create({})