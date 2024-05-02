import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ToastAndroid,
  Share,
  Alert,
} from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Text } from '@components';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Deposit = props => {
  const { t, i18n } = useTranslation();
  const [tokens, setTokens] = useState<any>([]);
  const { Layout, Gutters, Colors } = useTheme();
  const [copiedText, setCopiedText] = useState('');
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const copyToClipboard = () => {
    Clipboard.setString(
      props?.addressId == null
        ? 'mw1MWVn1eiMoQwdQxAQGdbAExPP5JdwJNJ'
        : props?.addressId,
    );
    Alert.alert('Address copied sucessfully!');
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
    getTokenBalances2();
  }, []);

  const onShare = async () => {
    try {
      const imageUrl =
        'https://support.thinkific.com/hc/article_attachments/360042081334/5d37325ea1ff6.png';

      const result = await Share.share({
        url: imageUrl,
        message: 'Check out this image!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View
      style={[
        Layout.alignItemsCenter,
        Gutters.smallTMargin,
        Gutters.tinyHPadding,
      ]}
    >
      {tokens?.status != 2 && tokens?.status != 4 ? (
        <View style={{ width: 350, marginTop: 15 }}>
          <Text align="center" lineHeight={24} color="error" weight="bold">
            {t('allTxts.redTxt')}
          </Text>
        </View>
      ) : (
        <>
          <View
            style={[
              Gutters.tinyPadding,
              Gutters.smallVMargin,
              { shadowColor: Colors.highlight, backgroundColor: Colors.white },
              styles.shadow,
            ]}
          >
            <QRCode
              value={props?.addressId ?? 'mw1MWVn1eiMoQwdQxAQGdbAExPP5JdwJNJ'}
              logoSize={30}
              logoBackgroundColor="transparent"
              size={200}
            />
          </View>

          <TouchableOpacity
            onPress={() => onShare()}
            style={[
              Gutters.smallVMargin,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              {
                backgroundColor: Colors.background,
                shadowColor: Colors.highlight,
              },
              styles.shadow,
            ]}
          >
            <Text uppercase color="highlight" weight="bold">
              Save QR Code
            </Text>
          </TouchableOpacity>

          <View style={[Layout.alignItemsCenter, Gutters.smallVMargin]}>
            <Text color="textGray200" mb={10}>
              Deposit Address
            </Text>
            <Text weight="bold">
              {props?.addressId == null
                ? 'mw1MWVn1eiMoQwdQxAQGdbAExPP5JdwJNJ'
                : props?.addressId}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              Gutters.smallVMargin,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              {
                backgroundColor: Colors.background,
                shadowColor: Colors.highlight,
              },
              styles.shadow,
            ]}
            onPress={() => copyToClipboard()}
          >
            <Text uppercase color="highlight" weight="bold">
              Copy Address
            </Text>
          </TouchableOpacity>
        </>
      )}

      <View style={[{ backgroundColor: Colors.textGray400 }, styles.divider]} />

      <View>
        <Text color="textGray200" weight="bold" mb={25}>
          Please don't depost any other digital asset except{' '}
          <Text color="highlight" weight="bold">
            {props?.showValue}
          </Text>{' '}
          to the above address.
        </Text>
        {/* 
        <Text color="textGray200" weight="bold" mb={10}>
          Minimum deposit:{' '}
          <Text weight="bold" color="highlight">
            0.005BTC.
          </Text>
        </Text> */}

        <Text color="textGray200" weight="bold" mb={40}>
          {t('allTxts.depositNewTxt')}
        </Text>
      </View>
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.0,
    elevation: 13,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
});
