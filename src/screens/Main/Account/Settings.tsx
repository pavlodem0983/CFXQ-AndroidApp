import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useTheme } from '@hooks';
import { Text } from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dispatchIsDonor } from '@store/settings';

const LANGUAGES = [
  { label: 'Italiano', value: 'Italiano' },
  { label: 'English', value: 'English' },
];

const CURRENCIES = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
];

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { Layout, Colors, Gutters, Fonts } = useTheme();
  const { langChange } = useAppSelector(state => state.settings);
  const dispatch = useDispatch();

  const [languageChanged, setLanguageChanged] = useState(false); // State variable to force rerender
  const [language, setLanguage] = useState(
    langChange == 'en' ? 'English' : langChange == 'itan' ? 'Italiano' : null,
  );
  const [currency, setCurrency] = useState('USD');

  const { user, AccessToken } = useAppSelector(state => state.app);

  useEffect(() => {
    AsyncStorage.getItem('selectedCurrency').then(value => {
      if (value) {
        setCurrency(value);
      }
    });
  }, []);

  const onChangeLang = async value => {
    setCurrency(value);
    try {
      const userId = user?.id;
      const response = await axios.put(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Investors/${userId}`,
        { preferredCurrency: value },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      await AsyncStorage.setItem('selectedCurrency', value);
      console.log('aaaaaaa======>');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    setLanguageChanged(prevState => !prevState); // Toggle the state to force rerender
  }, [langChange]);

  return (
    <View
      style={[Layout.container, Gutters.smallHPadding, Gutters.smallTPadding]}
    >
      <View style={{ borderTopWidth: 1, borderTopColor: Colors.textGray400 }}>
        <View
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
        >
          {/* <Text>Lingua</Text> */}
          <Text>{t('allTxts.settingsPageLanguage')}</Text>

          <View style={[Layout.rowHCenter]}>
            <RNPickerSelect
              onValueChange={item => {
                setLanguage(item);
                if (item === 'English') {
                  dispatch(dispatchIsDonor('en'));
                } else if (item === 'Italiano') {
                  dispatch(dispatchIsDonor('itan'));
                }
              }}
              items={LANGUAGES}
              value={language}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: 'Select Language', value: null }}
              style={{
                inputIOS: {
                  color: Colors.textGray200,
                  ...Fonts.fontMedium,
                  fontWeight: 'bold',
                },
                inputAndroid: {
                  color: Colors.textGray200,
                  ...Fonts.fontMedium,
                  fontWeight: 'bold',
                },
              }}
              onOpen={() => console.log('Picker opened')}
              onClose={() => console.log('Picker closed')}
              onError={error => console.error('Picker error:', error)}
            />
            <TouchableOpacity>
              <Ionicons name="chevron-forward" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallVPadding,
          { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
        ]}
      >
        <Text>{t('allTxts.settingsPageCurrency')}</Text>
        <View style={[Layout.rowHCenter]}>
          <RNPickerSelect
            onValueChange={value => onChangeLang(value)}
            items={CURRENCIES}
            value={currency}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                color: Colors.textGray200,
                ...Fonts.fontMedium,
                fontWeight: 'bold',
              },
              inputAndroid: {
                color: Colors.textGray200,
                ...Fonts.fontMedium,
                fontWeight: 'bold',
              },
            }}
          />
          <TouchableOpacity>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;
