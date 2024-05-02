import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = ['Limit', 'Option1', 'Option2', 'Option3'];
const width = Dimensions.get('window').width / 2 - 30;

const TransactionHistories = () => {
  const { Layout, Gutters, Colors, Images } = useTheme();
  return (
    <View style={[{ width }, Gutters.tinyLMargin]}>
      <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
        <Text color="textGray200">Prezzo</Text>
        <Text color="textGray200">Quantità</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error" weight="medium">
          100.00000
        </Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error">100.00000</Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error">100.00000</Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error">100.00000</Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error">100.00000</Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <View style={styles.bar} />
        <Text color="error">100.00000</Text>
        <Text color="textGray200">0.00004</Text>
      </View>
      {/* Total */}
      <Text color="error" weight="bold" size="regular" mt={10}>
        29,313.2
      </Text>
      <Text size="tiny" mt={5} color="textGray200" mb={40}>
        = € 26,982
      </Text>

      {/* Sell */}
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <Text color="highlight" weight="medium">
          29,068.1
        </Text>
        <Text color="textGray200">0.00002</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <Text color="highlight" weight="medium">
          29,068.1
        </Text>
        <Text color="textGray200">0.00002</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <Text color="highlight" weight="medium">
          29,068.1
        </Text>
        <Text color="textGray200">0.00002</Text>
      </View>
      <View
        style={[Layout.rowHCenter, Layout.justifyContentBetween, styles.row]}
      >
        <Text color="highlight" weight="medium">
          29,068.1
        </Text>
        <Text color="textGray200">0.00002</Text>
      </View>

      {/*  */}
      <View style={[Layout.rowHCenter, Gutters.smallTMargin]}>
        <SelectDropdown
          data={options}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'Select'}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          buttonStyle={[
            styles.dropdown1BtnStyle,
            { backgroundColor: Colors.background },
          ]}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'white'}
                size={12}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={[
            styles.dropdown1RowStyle,
            { backgroundColor: Colors.background },
          ]}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <TouchableOpacity style={[Gutters.tinyLMargin, Layout.alignItemsCenter, Layout.justifyContentCenter, { borderWidth: 1, borderColor: Colors.borderColor, height: 30, width: 30, borderRadius: 3}]}>
          <Image source={require('@theme/assets/images/icons/top.png')} style={{ width : 20, height: 8,}} />
          <Image source={require('@theme/assets/images/icons/bottom.png')} style={{ marginTop: 3, width: 20, height: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionHistories;

const styles = StyleSheet.create({
  row: {
    height: 30,
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#51161D',
    height: '100%',
    width: '20%',
  },
  dropdown1BtnStyle: {
    height: 30,
    width: width - 50,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#B1B1B1',
  },
  dropdown1BtnTxtStyle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B1B1B1',
  },
  dropdown1RowStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: '#B1B1B1',
  },
  dropdown1RowTxtStyle: {
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Mulish-Regular',
    fontSize: 13,
  },
});
