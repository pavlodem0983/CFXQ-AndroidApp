import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useAppSelector, useAppDispatch } from '@hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';

import AssetList from './components/AssetList';
import axios from 'axios';

const Home = () => {
  const { Layout, Gutters, Images } = useTheme();
  const { user, AccessToken } = useAppSelector(state => state.app);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [tokens, setTokens] = useState([]);

  // const choosePhotoFromLibrary = async () => {
  //   try {
  //     launchImageLibrary(
  //       {
  //         quality: 1,
  //         selectionLimit: 1,
  //         mediaType: 'photo',
  //       },
  //       response => {
  //         if (!response.didCancel && !response.error) {
  //           const source = response.assets[0];
  //           setShowImage(source?.uri);
  //         }
  //       },
  //     );
  //   } catch (error) {
  //     console.log('ERROR ', error);
  //   }
  // };

  const getTokenBalances = async () => {
    try {
      const userId = user?.id;
      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Balances/last/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setTokens(response?.data);
    } catch (error) {
      console.log('Error fetching data121:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTokenBalances();
    }
  }, [isFocused]);

  const onPressZeroOne = () => {
    navigation.navigate('Plus' as never);
  };

  return (
    <View style={[Layout.container]}>
      <SafeAreaView>
        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.alignItemsCenter,
            Gutters.tinyTMargin,
            Gutters.tinyHPadding,
          ]}
        >
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <TouchableOpacity
            // onPress={() => choosePhotoFromLibrary()}
            >
              <View style={styles.avatar1}>
                <Text style={{ color: 'white' }}>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={[Gutters.tinyLMargin]}>
              <Text color="white" weight="bold" size="regular" mb={5}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </View>
          <View style={[Layout.alignItemsCenter]}>
            <TouchableOpacity onPress={onPressZeroOne}>
              <Image
                source={Images.main.zerooneCal}
                style={{ width: 100, height: 30, right: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <AssetList tokens={tokens} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  avatar1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
