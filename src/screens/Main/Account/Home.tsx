import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Linking,
} from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Text } from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountStackScreenProps } from 'types/navigation';
// import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

type SettingOptionProps = {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
};

const Setting = ({ navigation }: AccountStackScreenProps) => {
  const { t, i18n } = useTranslation();

  const { Layout, Colors, Images, Gutters } = useTheme();
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);

  const [showImage, setShowImage] = useState(null);

  // const choosePhotoFromLibrary = async () => {
  //   try {
  //     launchImageLibrary(
  //       {
  //         quality: 1,
  //         selectionLimit: 1,
  //         mediaType: 'photo',
  //       },
  //       response => {
  //         if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //         } else {
  //           const source = response.assets[0];
  //           setShowImage(source?.uri);
  //         }
  //       },
  //     );
  //   } catch (error) {
  //     console.log('ERROR ', error);
  //   }
  // };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SettingOption = ({ icon, title, onPress }: SettingOptionProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[Layout.rowHCenter, Layout.justifyContentBetween]}
      >
        <Image source={icon} style={{ width: 30, height: 30 }} />
        <View
          style={[
            Layout.fill,
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Gutters.smallVPadding,
            Gutters.tinyLMargin,
            styles.option,
            {
              borderColor: Colors.textGray400,
            },
          ]}
        >
          <Text weight="regular" size="small" ml={5}>
            {title}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[Layout.container]}>
      <SafeAreaView>
        <View
          style={[
            Layout.row,
            // Layout.justifyContentBetween,
            Layout.alignItemsCenter,
            Gutters.tinyTMargin,
            Gutters.tinyHPadding,
          ]}
        >
          <TouchableOpacity
          // onPress={() => choosePhotoFromLibrary()}
          >
            {showImage ? (
              <Image source={{ uri: showImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar1}>
                <Text style={{ color: 'white' }}>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={[Gutters.tinyLMargin]}>
            <Text color="white" weight="bold" size="regular" mb={5}>
              {user?.firstName} {user?.lastName}
            </Text>
            {/* <Text size="small">@Marcomatt</Text> */}
          </View>
        </View>
        {/* Setting options list */}
        <View style={[Gutters.regularTMargin, Gutters.smallHPadding]}>
          <SettingOption
            icon={Images.settings.conto}
            title="Conto"
            onPress={() => navigation.navigate('Account')}
          />
          <SettingOption
            icon={Images.settings.sicurezza}
            // title="Sicurezza"
            title={t('allTxts.accountMenuSecurity')}
            onPress={() => navigation.navigate('Security')}
          />
          <SettingOption
            icon={Images.settings.financial}
            // title="Financial"
            title={t('allTxts.accountMenuFinancial')}
            onPress={() => navigation.navigate('Financial')}
          />
          <SettingOption
            icon={Images.settings.impostazioin}
            // title="Impostazioni"
            title={t('allTxts.accountMenuSettings')}
            onPress={() => navigation.navigate('Settings')}
          />
          <SettingOption
            icon={Images.settings.help_support}
            // title="Help e Supporto"
            title={t('allTxts.accountMenuHelp')}
            onPress={() => Linking.openURL('mailto:support@cfxquantum.com')}
          />
          <SettingOption
            icon={Images.settings.risk}
            title={t('allTxts.accountRiskFactors')}
            // title="Fattori di rischio dei token"
            onPress={() =>
              Linking.openURL('https://cfxquantum.com/cfx-token-risk-factors/')
            }
          />
          <SettingOption
            icon={Images.settings.privacy}
            // title="Norme sulla privacy"
            title={t('allTxts.accountPrivacyPolicy')}
            onPress={() =>
              Linking.openURL('https://cfxquantum.com/privacy-policy/')
            }
          />
          <SettingOption
            icon={Images.settings.cookie}
            // title="Politica sui cookie"
            title={t('allTxts.accountCookiePolicy')}
            onPress={() =>
              Linking.openURL('https://cfxquantum.com/cookie-policy/')
            }
          />
          <SettingOption
            icon={Images.settings.wallet}
            title={t('allTxts.accountTermsConditions')}
            // title="Termini e condizioni di CFX Wallet"
            onPress={() =>
              Linking.openURL('https://cfxquantum.com/terms-and-conditions/')
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  option: {
    borderBottomWidth: 1.2,
  },
  avatar1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
