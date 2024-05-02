import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DataType = {
  id: string;
  title: string;
  description: string;
};

const data: DataType[] = [
  {
    id: '1',
    title: 'Per transfer interno CFX',
    description: 'CFXAdmin',
  },
  {
    id: '2',
    title: 'Account for sending Airdrops',
    description: 'Airdrop_Account',
  },
  {
    id: '3',
    title: 'Payment of invoices Financial Future (HK) Limited',
    description: 'grace',
  },
  {
    id: '4',
    title: 'Market Making CFXQ',
    description: 'ferryconqu',
  },
];

const Transforms = () => {
  const { Layout, Gutters, Colors } = useTheme();
  const renderItem: ListRenderItem<DataType> = ({ item }) => {
    return (
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Gutters.smallVPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderBottomWidth: 2,
            borderBottomColor: Colors.borderColor,
          },
        ]}
      >
        <View style={styles.left}>
          <Text>{item.title}</Text>
          <Text color="textGray200" mt={10}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="trash" color="white" size={16} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default Transforms;

const styles = StyleSheet.create({
  left: {
    width: 270,
  },
});
