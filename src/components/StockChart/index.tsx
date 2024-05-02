import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CandleStickChart, LineChart } from 'react-native-charts-wrapper';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { useTheme } from '@hooks';
import Text  from "../Text";

const config = {
  dataSets: [{
    values: [{
      shadowH: 20,
      shadowL: 0,
      open: 15,
      close: 5
    }, {
      shadowH: 30,
      shadowL: 10,
      open: 25,
      close: 15
    }, {
      shadowH: 10,
      shadowL: 5,
      open: 15,
      close: 10
    }, {
      shadowH: 50,
      shadowL: 30,
      open: 25,
      close: 15
    }],
    drawValues: false,
    colors: ['red'],
    label: 'Company A'
  }],
  labels: ['1990', '1991', '1992', '1993', '1994'],
  legend: {
  },
  xAxis: {
    position: 'bottom'
  },
  leftAxis: {
    drawGridLines: false,
    spaceBottom: 0
  },
  rightAxis: {
    drawGridLines: false,
    spaceBottom: 0
  },
  valueFormatter: {
    type: 'regular',
    maximumDecimalPlaces: 0
  }
};

const data = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11,
  },
  {
    timestamp: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
];


const StockChart = () => {


  return (
    <View style={{ width: '100%', height: 300, }}>
      <Text>Charts</Text>
      {/* <CandleStickChart
        data={config} 
        style={{ flex: 1, backgroundColor: 'white'}} 
      /> */}
       <CandlestickChart.Provider data={data}>
        <CandlestickChart>
          <CandlestickChart.Candles />
        </CandlestickChart>
      </CandlestickChart.Provider>
    </View>
  )
}

export default StockChart

const styles = StyleSheet.create({
  chart: {
    flex: 1
  }
})