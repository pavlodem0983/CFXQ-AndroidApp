import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button } from '@components';
import { useTheme } from '@hooks';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = ['Limit', 'Option1', 'Option2', 'Option3'];
const width = Dimensions.get('window').width / 2 - 30;

const Purchase = () => {
  const { Layout, Gutters, Colors } = useTheme();
  return (
    <View style={{ width: width }}>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallBMargin,
        ]}
      >
        <TouchableOpacity>
          <Text>Compra</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Vendi</Text>
        </TouchableOpacity>
      </View>
      <View style={[Gutters.smallBMargin]}>
        <Text color="textGray200" mb={5} size="small">
          Tipo
        </Text>
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
      </View>
      <View style={[Gutters.smallBMargin]}>
        <Text color="textGray200" mb={5} size="small">
          Prezzo (USDT)
        </Text>
        <NumericInput
          onChange={value => console.log(value)}
          totalHeight={40}
          totalWidth={width}
          iconSize={14}
          iconStyle={{ color: Colors.white }}
          textColor="white"
          rightButtonBackgroundColor="transparent"
          leftButtonBackgroundColor="transparent"
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{ borderWidth: 1 }}
          // eslint-disable-next-line react-native/no-inline-styles
          inputStyle={{ height: 20 }}
          borderColor="#B1B1B1"
        />
        <Text color="textGray200" size="tiny" mt={10}>
          ~$2433.022
        </Text>
      </View>
      <View style={[Gutters.smallBMargin]}>
        <Text color="textGray200" mb={5}>
          Quantità(BTC)
        </Text>
        <NumericInput
          onChange={value => console.log(value)}
          totalHeight={40}
          totalWidth={width}
          iconSize={14}
          iconStyle={{ color: Colors.white }}
          textColor="white"
          rightButtonBackgroundColor="transparent"
          leftButtonBackgroundColor="transparent"
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{ borderWidth: 1 }}
          // eslint-disable-next-line react-native/no-inline-styles
          inputStyle={{ height: 20 }}
          borderColor="#B1B1B1"
        />
        <Text color="textGray200" size="tiny" mt={10}>
          Disponibile 370.5441 USDT
        </Text>
      </View>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallBMargin,
        ]}
      >
        <TouchableOpacity style={styles.percentButton}>
          <Text size="tiny">25%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.percentButton}>
          <Text size="tiny">50%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.percentButton}>
          <Text size="tiny">75%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.percentButton}>
          <Text size="tiny">100%</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallBMargin,
        ]}
      >
        <Text color="textGray200">Totale</Text>
        <Text>0USDT</Text>
      </View>
      <Button title="Compra BTC" />
    </View>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    height: 38,
    width: width,
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
  percentButton: {
    backgroundColor: '#181B21',
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
