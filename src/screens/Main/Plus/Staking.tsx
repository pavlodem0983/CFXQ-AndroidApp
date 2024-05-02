import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { Text, Button } from '@components';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Staking = () => {
  const { t } = useTranslation();

  const { Layout, Gutters, Colors, Images } = useTheme();
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: Colors.borderColor,
          ...Gutters.smallBPadding,
        }}
      >
        {/* <Text color="white" weight="bold">
          Quanto vuoi mettere in staking
        </Text> */}
        {/* <View style={[Layout.rowHCenter, styles.stakingInputContainer]}>
          <TextInput style={styles.stakingInput} />
          <TouchableOpacity style={{ width: 60 }}>
            <Text color="highlight" weight="bold">
              Tutto
            </Text>
          </TouchableOpacity>

          <Button
            style={{
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text weight="bold"></Text>
          </Button>
        </View> */}
        <View style={[Layout.alignItemsEnd, Gutters.tinyTMargin]}>
          {/* <Text size="tiny">Token liberi: 33.92 ZONE</Text> */}
        </View>
        <Text weight="bold" mt={10}>
          {t('allTxts.stakingText')}
        </Text>
        {/* <Text weight='bold' mt={10}>Puoi vedere i tempi del Plus qui:</Text>
        <Text color="textGray200" mt={10}>Il Plus sarà distribuito ogni primo giorno del mese.</Text>
        <Text color="error" weight='semibold' mt={10}>"GUARDA LA STORIA DEI PLUS RICEVUTI QUI"</Text> */}
      </View>

      {/* 2023 Dec 4, according to Sofia's feedback */}
      {/* <View style={[Gutters.smallTMargin, Gutters.smallPadding, styles.card]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Text weight='bold'>MODALITA COMPOUNDING:</Text>
          <Switch 
            value={true}
            trackColor={{false: '#767577', true: Colors.error}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={console.log}
          />
        </View>
        <View style={[Gutters.smallTMargin, Layout.row]}>
          <Checkbox  
            boxType="square"
            tintColor="#D9D9D9"
            onTintColor="#D9D9D9"
            style={{ width: 18, height: 18, backgroundColor: '#D9D9D9', marginTop: 5}}
          />
          <Text ml={10} weight='bold'>Ho letto, compreso e sono d'accordo con <Text color="highlight" weight='bold'>il Accordo con l'utente Zeroone Staking</Text></Text>
        </View>

        <View style={[Gutters.smallTMargin, Gutters.smallLMargin]}>
          <View style={[Layout.row]}>
            <Text color="textGray200">1.</Text>
            <Text ml={5} color="textGray200">Se attivi la modalità Compounding, il tuo Plus verrà automaticamente messo in staking e aggiunto ai tuoi fondi iniziali</Text>
          </View>
          <View style={[Layout.row, Gutters.tinyTMargin]}>
            <Text color="textGray200">2.</Text>
            <Text ml={5} color="textGray200">Se non attivi il Compounding o lo disattivi, l&apos;intero importo di Plus verrà accreditato sul tuo Wallet il primo giorno del mese di calendario successIvo.</Text>
          </View>
        </View>
      </View> */}

      <Button
        style={{
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DB2734',
          marginTop: 55,
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate('GurdaScreen')}
      >
        <Text style={{ color: 'white' }} weight="bold">
          {t('allTxts.stakingSimulTitle')}
        </Text>
      </Button>
      <View style={[Layout.alignItemsCenter, Gutters.smallVMargin]}>
        <Image
          style={{ width: 280, height: 280 }}
          source={Images.main.bigCoinWithShadow}
        />
      </View>
    </ScrollView>
  );
};

export default Staking;

const styles = StyleSheet.create({
  stakingInputContainer: {
    backgroundColor: '#171A23',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    shadowColor: '#2AA9FB88',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 10,
  },
  stakingInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'white',
    fontFamily: 'Mulish-Regular',
  },
  card: {
    backgroundColor: '#171A23',
    borderRadius: 4,
  },
});
