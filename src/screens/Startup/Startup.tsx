import React, { useEffect } from 'react';
import { ActivityIndicator, View, ImageBackground } from 'react-native';
import { useTheme } from '@hooks';
import { Brand, Text } from '@components';
import { setDefaultTheme } from '@store/theme';
import { ApplicationScreenProps } from 'types/navigation';
import { useAppDispatch, useAppSelector } from '@hooks';
import { logout, setAppData } from '@store/app';
import { userApi } from '@services/modules/users';
import { appApi } from '@services/modules/app';
import { decode } from 'base-64';

const Startup = ({ navigation }: ApplicationScreenProps<'Startup'>) => {
  const { Layout, Gutters, Images, Colors } = useTheme();
  const appState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const init = async () => {
    setDefaultTheme({ theme: 'default', darkMode: null });
    if (!appState.user || !appState.AccessToken || !appState.IdToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } else {
      const decodedString = decode(appState.IdToken.split('.')[1])
      const decodedObject = JSON.parse(decodedString);
      const username = decodedObject["cognito:username"];
      try {
        const userdata = await dispatch(userApi.endpoints.getLoggedInUserByUsername.initiate(username))
        if (userdata.error) {
          throw new Error('User not found:');
        } else {
          const { data: countryData} = await dispatch(appApi.endpoints.getCountries.initiate());
          const { data: tokenPlatformsData } = await dispatch(appApi.endpoints.getTokenPlatforms.initiate());
          const { data: tokenTypesData } = await dispatch(appApi.endpoints.getTokenTypes.initiate());
          dispatch(setAppData({
            user: userdata.data,
            countries: countryData,
            tokenPlatforms: tokenPlatformsData,
            tokenTypes: tokenTypesData
          }))
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main'}]
          })
        }
      } catch (error) {
        dispatch(logout())
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      }
    }
    
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ImageBackground
      source={Images.spalsh.bg}
      style={[Layout.fill]}
    >
      <View style={[Layout.fill, Layout.alignItemsCenter, Gutters.largeTMargin]}>
        <Brand />
        <Text color={'white'} weight='bold' size={"large"} mt={10} mb={10}>
          CFX QUANTUM
        </Text>
        <Text weight='bold' size="medium" style={{ color: "#24ABFD"}} mt={10}>
          Control Your Wealth
        </Text>
      </View>
    </ImageBackground>

  );
};

export default Startup;
