import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Button, Text, TextInput } from '@components';
import Modal from 'react-native-modal';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Withdraw = props => {
  const { t, i18n } = useTranslation();

  const { Layout, Gutters, Colors } = useTheme();
  const [isVisibleLogout, setVisibleLogout] = useState(false);
  const [address, setAddress] = useState(false);
  const [amount, setAmount] = useState('');
  const [confirmId, setConfirmId] = useState('');
  const [previewData, setPreviewData] = useState<any>([]);

  const [tokens, setTokens] = useState<any>([]);
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const confirmFun = async () => {
    if (address === '' || amount === '') {
      Alert.alert('Error', 'Please enter both address and amount.');
      return; // Stop execution if either field is empty
    }
    try {
      const userId = user?.id;

      const response = await axios.post(
        'https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Transactions/toexternal/preview',
        {
          amount: amount,
          feeLevel: 1,
          tokenType: props?.tokenId,
          treatAsGrossAmount: true,
          sourceInvestorId: userId,
          destinationAddress: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setPreviewData(response?.data);
      setVisibleLogout(true);
      setConfirmId(response?.data?.confirmationId);
    } catch (error) {
      console.log('Error fetching data:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        Alert.alert(error.response.data.detail);
      } else {
        Alert.alert('An error occurred while processing your request.');
      }
    }
  };

  const finalFun = async () => {
    try {
      const userId = user?.id;

      const response = await axios.post(
        'https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Transactions/toexternal/confirm',
        {
          amount: amount,
          feeLevel: 1,
          tokenType: props?.tokenId,
          treatAsGrossAmount: true,
          sourceInvestorId: userId,
          destinationAddress: address,
          confirmationId: confirmId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setPreviewData(response?.data);
      setVisibleLogout(false);
      Alert.alert('Transaction was submitted successfully!');
    } catch (error) {
      console.log('Error fetching data:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        Alert.alert('The transaction could not be submitted!');
        setVisibleLogout(false);
      } else {
        Alert.alert('The transaction could not be submitted!');
        setVisibleLogout(false);
      }
    }
  };

  const getTokenBalances2 = async () => {
    try {
      const userId = user?.id;

      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Investors/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setTokens(response?.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTokenBalances2();
    }
  }, [isFocused]);

  return (
    <View style={[Gutters.smallTMargin, Gutters.tinyHPadding]}>
      <TextInput
        label={t('allTxts.addressFormLabel')}
        placeholder={t('allTxts.addressFormPlaceholder')}
        placeholderTextColor={Colors.textGray200}
        onChangeText={txt => setAddress(txt)}
        value={address}
      />
      <TextInput
        label={t('allTxts.amountFormLabel')}
        placeholder={t('allTxts.amountFormPlaceholder')}
        placeholderTextColor={Colors.textGray200}
        keyboardType="numeric"
        value={amount}
        onChangeText={txt => setAmount(txt)}
      />
      <Text color="textGray200" size="tiny" mt={10} ml={5}>
        Available: {props?.secondShow ? props?.secondShow : props?.firstShow}{' '}
        {props?.getAddress}
      </Text>
      <View
        style={[
          styles.feeDynamic,
          { borderColor: Colors.borderColor },
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.tinyVPadding,
          Gutters.smallTMargin,
        ]}
      >
        <Text weight="bold" color="highlight">
          {t('allTxts.withdrawFeeDynamicDescription')}
        </Text>
        <Text weight="bold">{props?.showValue}</Text>
      </View>
      <View
        style={[
          Gutters.smallVPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          // { borderBottomWidth: 1, borderBottomColor: Colors.borderColor },
        ]}
      >
        <Text lineHeight={24} color="textGray200" weight="bold">
          {t('allTxts.withdrawFeeDynamicText')}
        </Text>
      </View>
      <View
        style={[
          Gutters.smallVPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          // { borderBottomWidth: 1, borderBottomColor: Colors.borderColor },
        ]}
      >
        <Text lineHeight={24} color="textGray200" weight="bold">
          {t('allTxts.widhtrawNewTxt')}
        </Text>
      </View>
      {/* 
      <View style={[Gutters.smallTMargin]}>
        <Text color="textGray200" weight="bold" mb={5}>
          Mininmum Withdrawal amount:{' '}
          <Text color="highlight" weight="bold">
            0.003BTC
          </Text>
        </Text>
      </View> */}
      {tokens?.status != 2 && tokens?.status != 4 ? (
        <View style={{ width: 350, marginTop: 15 }}>
          <Text align="center" lineHeight={24} color="error" weight="bold">
            {t('allTxts.redTxt')}
          </Text>
        </View>
      ) : (
        <View style={[Gutters.smallVMargin]}>
          <Button
            // onPress={() => setVisibleLogout(true)}
            onPress={() => confirmFun()}
            title="Confirmation"
          />
        </View>
      )}

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
            {t('allTxts.confirmFeeText')}{' '}
          </Text>
          <Text mt={10} color={'textGray200'}>
            {t('allTxts.confirmFeeText1')}{' '}
            {previewData?.estimatedFees?.medium?.networkFee}
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
              title={t('allTxts.dismissButton')}
              style={styles.modalButton}
              onPress={() => setVisibleLogout(false)}
            />
            <Button
              variant="primary"
              title={t('allTxts.confirmButton')}
              style={styles.modalButton}
              onPress={() => finalFun()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  feeDynamic: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  content: {
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    width: 120,
    height: 45,
  },
});
