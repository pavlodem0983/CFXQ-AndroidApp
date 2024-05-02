import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector, useTheme } from '@hooks';
import { Text, Divider } from '@components';
import { numnber2LocaleString } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { log } from 'console';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const History = () => {
  const { t, i18n } = useTranslation();

  const { Layout, Gutters, Colors } = useTheme();
  const { user, countries, tokenPlatforms, tokenTypes, AccessToken } =
    useAppSelector(state => state.app);
  const [getData, setGetData] = useState([]);
  const getStacksApi = async () => {
    try {
      const response = await axios.get(
        `https://cfxbackofficeec200.backend.cfxquantum.com:35062/api/Stacks/balances/${user?.id}/${tokenTypes[0]?.id}`,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
      setGetData(response?.data);
    } catch (error) {
      console.log('nainb errror two', error);
    }
  };

  useEffect(() => {
    getStacksApi();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {getData?.map((item, index) => (
        <>
          <View
            style={[styles.card, Gutters.smallBMargin, Gutters.smallPadding]}
          >
            <View>
              <Text color="error" weight="bold">
                {item?.operationType == 1 && <Text>Stake</Text>}
                {item?.operationType == 0 && <Text>Pending operation</Text>}
                {item?.operationType == -1 && <Text>Redeem</Text>}
              </Text>
            </View>
            <Divider />

            <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
              <Text style={{ flex: 1 }} align="left" color="error">
                {t('allTxts.historyRecordDate')}
              </Text>
              <Text style={{ flex: 1 }} align="center" color="error">
                {t('allTxts.historyRecordQty')}
              </Text>
              <Text style={{ flex: 1 }} align="right" color="error">
                {t('allTxts.historyRecordStatus')}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
              ]}
            >
              <Text style={{ flex: 1 }} weight="bold">
                {moment(item?.tms).format('L')}
              </Text>
              <Text style={{ flex: 1 }} align="center" weight="bold">
                {/* {numnber2LocaleString(1000)} */}
                {item?.amount}
              </Text>
              <Text style={{ flex: 1 }} align="right" weight="bold">
                {item?.operationStatus === 0 && <Text>Redeem Request</Text>}
                {item?.operationStatus === 1 && <Text>Redeem Successful</Text>}
                {item?.operationStatus === 2 && <Text>Redeem Failed</Text>}
                {item?.operationStatus === 3 && <Text>Stake Request</Text>}
                {item?.operationStatus === 4 && <Text>Stake Successful</Text>}
                {item?.operationStatus === 5 && <Text>Stake Failed</Text>}
                {item?.operationStatus === 6 && <Text>Interest</Text>}
                {item?.operationStatus === 7 && <Text>Unknown</Text>}
              </Text>
            </View>
          </View>
        </>
      ))}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171A23',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A3363D',
  },
});
