import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Staking from './Staking';
import History from './History';
import YourPlus from './YourPlus';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const renderScene = SceneMap({
  staking: Staking,
  plus: YourPlus,
  history: History,
});

const Plus = () => {
  const { Layout, Gutters, Colors, Images } = useTheme();
  const [index, setIndex] = React.useState(1); // Set the initial index to 1
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const layout = useWindowDimensions();

  const [routes] = React.useState([
    { key: 'staking', title: `${t('allTxts.zerooneMenuStaking')}` },
    { key: 'plus', title: `${t('allTxts.zerooneMenuPlus')}` },
    { key: 'history', title: `${t('allTxts.zerooneMenuHistory')}` },
  ]);

  useEffect(() => {
    // Reset the index to 1 whenever the screen is focused
    if (isFocused) {
      setIndex(1);
    }
  }, [isFocused]);

  return (
    <View style={[Layout.container, Gutters.tinyHPadding]}>
      <SafeAreaView style={[Layout.fill]}>
        <View style={[Layout.alignItemsEnd]}>
          <Image
            style={{ width: 153, height: 57 }}
            source={Images.main.zerooneCal}
          />
        </View>
        <View style={[Layout.alignItemsCenter]}>
          <Image
            style={{ width: 183, height: 103 }}
            source={Images.main.zerooneLogo}
          />
        </View>

        {/* Tab */}
        <View style={[Layout.fill, Gutters.smallTMargin]}>
          <TabView
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.tabBarIndicatorStyle}
                style={styles.tabBarStyle}
                renderLabel={({ route, focused }) => (
                  <Text
                    color={focused ? 'error' : 'textGray200'}
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
    </View>
  );
};

export default Plus;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#515156',
    marginBottom: 16,
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'transparent',
  },
});
