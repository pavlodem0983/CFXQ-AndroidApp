import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@hooks';
import { Text } from '@components';
import { ApplicationScreenProps } from 'types/navigation';

const Onboarding = ({ navigation }: ApplicationScreenProps<'Onboarding'>) => {
  const { Layout, Colors, Images, Gutters } = useTheme();
  const slides = [
    {
      text: (
        <Text color="white">
          <Text color="white" size="medium" lineHeight={32}>
            We believe that investing in digital assets must be{' '}
          </Text>
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Easy
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            ,{' '}
          </Text>
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Safe{' '}
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            and{' '}
          </Text>
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Accessible{' '}
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            to all.
          </Text>
        </Text>
      ),
      image: Images.onboarding.first,
    },
    {
      text: (
        <Text color="white">
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Safety{' '}
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            and{' '}
          </Text>
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Confidence{' '}
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            at best with your{' '}
          </Text>
          <Text color="white" weight="bold" size="medium" lineHeight={32}>
            Decentralized Wallet{' '}
          </Text>
          <Text color="white" size="medium" lineHeight={32}>
            Exchange
          </Text>
        </Text>
      ),
      image: Images.onboarding.second,
    },
    // {
    //   text: (
    //     <Text color="white">
    //       <Text color="white" size="medium" lineHeight={32}>Get the </Text>
    //       <Text color="white" weight="bold" size="medium" lineHeight={32}>best price </Text>
    //       <Text color="white" size="medium" lineHeight={32}>and </Text>
    //       <Text color="white" size="medium" lineHeight={32}>liquidity for </Text>
    //       <Text color="white" weight='bold' size="medium" lineHeight={32}>Multiple Assets </Text>
    //     </Text>
    //   ),
    //   image: Images.onboarding.third
    // }
  ];

  const onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          Layout.fill,
          Gutters.smallHPadding,
          Layout.colCenter,
          Gutters.largeTMargin,
        ]}
      >
        <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
          {item.text}
        </View>
        <View style={[Layout.fill, { marginTop: -40 }]}>
          <Image
            source={item.image}
            style={{
              width: 360,
              height: 360,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['rgba(8, 9, 14, 20)', 'rgba(22, 36, 53, 20)']}
      style={[Layout.fill]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Image
        source={Images.onboarding.bg}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />

      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        showNextButton={false}
        renderDoneButton={() => (
          <Text color="white" weight="bold" mt={10}>
            Done
          </Text>
        )}
        dotStyle={{ backgroundColor: Colors.white, width: 10, height: 10 }}
        activeDotStyle={{
          backgroundColor: '#28A9F7',
          shadowColor: '#28A9F7',
          shadowOffset: {
            width: 2,
            height: 11,
          },
          shadowOpacity: 0.85,
          shadowRadius: 25,
          elevation: 12,
          width: 10,
          height: 10,
        }}
      />
    </LinearGradient>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
