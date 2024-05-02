import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTheme } from '@hooks';
import { Text } from '@components';
import WalletList from './WalletList';
import Transforms from './Transforms';

const renderScene = SceneMap({
  accounts: WalletList,
  transforms: Transforms,
});

const MyWallets = () => {
  const { Layout, Gutters } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'accounts', title: 'Indirizzo di Ritiro' },
    // { key: 'transforms', title: 'Indirizzo di trasferimento' },
  ]);

  return (
    <View style={[Layout.container, Gutters.smallHPadding]}>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabBarIndicatorStyle}
            style={styles.tabBarStyle}
            renderLabel={({ route, focused }) => (
              <Text
                color={focused ? 'highlight' : 'primary'}
                weight="semibold"
                align="center"
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
  );
};

export default MyWallets;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#5D8BDB',
  },
});
