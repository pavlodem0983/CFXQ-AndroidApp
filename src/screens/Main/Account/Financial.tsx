/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountStackScreenProps } from 'types/navigation';
import { useTranslation } from 'react-i18next';

const Financial = ({ navigation }: AccountStackScreenProps) => {
  const { Layout, Colors, Gutters } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[Layout.container, Gutters.smallHPadding, Gutters.smallTPadding]}
    >
      <View style={{ borderTopWidth: 1, borderTopColor: Colors.textGray400 }}>
        <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
          onPress={() => navigation.navigate('MyWallets')}
        >
          <Text>{t('allTxts.financialAddressBookName')}</Text>
          <View style={[Layout.rowHCenter]}>
            <Text color="textGray200" weight="bold" size="tiny">
              Gestisci
            </Text>
            <Ionicons name="chevron-forward" color="white" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Financial;
