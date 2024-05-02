import React from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@hooks';
import { Brand, Text, Loading } from '@components';
// import { AuthenticationScreenProps } from 'types/navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAppSelector } from '@hooks';
import Login from './Login';
import SignUp from './Registration';
import { useTranslation } from 'react-i18next';

const renderScene = SceneMap({
  login: Login,
  signup: SignUp,
});

const Authentication = () => {
  const { t, i18n } = useTranslation();

  const { Layout, Gutters } = useTheme();
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();

  const appStore = useAppSelector(state => state.app);

  const [routes] = React.useState([
    { key: 'login', title: `${t('allTxts.signInTitle')}` },
    { key: 'signup', title: `${t('allTxts.signUpTitle')}` },
  ]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <LinearGradient
        colors={['rgba(8, 9, 14, 20)', 'rgba(22, 36, 53, 20)']}
        style={[Layout.fill]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={[Layout.fill]}>
          <View style={[Layout.alignItemsCenter]}>
            <Brand />
          </View>
          <View style={[Layout.fill, Gutters.smallHPadding]}>
            <TabView
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={styles.tabBarIndicatorStyle}
                  style={styles.tabBarStyle}
                  renderLabel={({ route, focused }) => (
                    <Text
                      color={focused ? 'highlight' : 'white'}
                      uppercase
                      weight="semibold"
                    >
                      {route.title}
                    </Text>
                  )}
                />
              )}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          </View>
        </SafeAreaView>
        {appStore.loading && <Loading />}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#515156',
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'transparent',
  },
});
