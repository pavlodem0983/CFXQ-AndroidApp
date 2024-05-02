/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { useTheme } from '@hooks';
import { Text, Button } from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const Conto = ({ navigation }) => {
  const { Layout, Colors, Gutters } = useTheme();
  const [faceId, setFaceId] = useState(false);
  const [isVisibleLogout, setVisibleLogout] = useState(false);
  const { t } = useTranslation();

  const logOutFun = () => {
    setVisibleLogout(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View
      style={[Layout.container, Gutters.smallHPadding, Gutters.smallTPadding]}
    >
      <View style={{ borderTopWidth: 1, borderTopColor: Colors.textGray400 }}>
        {/* <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
        >
          <Text>SALVA FRASE SEGRETA</Text>
          <Ionicons name="chevron-forward" color="white" size={20} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
        >
          <Text>Face ID</Text>
          <Switch
            value={faceId}
            onChange={() => setFaceId(!faceId)}
            trackColor={{ false: Colors.white, true: Colors.highlight }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
          onPress={() => setVisibleLogout(true)}
        >
          <Text>Logout Conto</Text>
          <Ionicons name="chevron-forward" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            { borderBottomWidth: 1, borderBottomColor: Colors.textGray400 },
          ]}
          onPress={() => {
            Linking.openURL('https://cfxquantum.com/account_deletion/');
          }}
        >
          <Text>{t('allTxts.accountDelete')}</Text>
          <Ionicons name="chevron-forward" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={isVisibleLogout}>
        <View
          style={[
            Layout.alignItemsCenter,
            Layout.justifyContentCenter,
            Gutters.regularPadding,
            { backgroundColor: Colors.modalBackgroundColor },
            styles.content,
          ]}
        >
          <Text weight="bold" size="medium">
            Logout Conto
          </Text>
          <Text mt={10} color={'textGray200'}>
            <Text color="white" weight="bold">
              {t('allTxts.accountPageLogoutConfirmationText')}
            </Text>{' '}
            {t('allTxts.accountPageLogoutConfirmationText1')}
          </Text>

          <View
            style={[
              Layout.rowHCenter,
              Layout.justifyContentAround,
              Layout.fullWidth,
              Gutters.regularTMargin,
            ]}
          >
            <Button
              variant="close"
              title={t('allTxts.trxStatusCancelled')}
              style={styles.modalButton}
              onPress={() => setVisibleLogout(false)}
            />
            <Button
              variant="primary"
              title={t('allTxts.logoutButton')}
              style={styles.modalButton}
              onPress={() => logOutFun()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Conto;

const styles = StyleSheet.create({
  content: {
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    width: 120,
    height: 45,
  },
});
