import React, { useMemo } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks';
import Text from '../Text';
import { PhoneInputProps } from './type';
import { FontFamilies } from '@theme/Variables';

const PhoneNumber = ({ label, error, containerStyle, onChange, ...props}: PhoneInputProps) => {

  const { Colors, Fonts, Gutters } = useTheme();

  const inputStyles = useMemo(() => {
    return StyleSheet.create({
      inputContainer: {
        backgroundColor: Colors.inputBackground,
        color: Colors.white,
        borderWidth: 1.2,
        borderColor: error ? Colors.error : Colors.inputBackground,
        height: 45,
        paddingHorizontal: 10,
        borderRadius: 5,
        shadowColor: error ? Colors.error : Colors.buttonPrimary,
        shadowOffset: {
          width: 1,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2.5,
        elevation: 5,
        width: "100%"
      },
      input: {
        backgroundColor: Colors.inputBackground,
        height: 40,
        fontFamily: FontFamilies['regular'],
        color: 'white'
      },
      textContainerStyle: {
        height: 40,
        backgroundColor: 'transparent',
      },
      codeText: {
        color: 'white', 
        fontFamily:FontFamilies['regular'], 
        fontSize: 16, 
        height: 20, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      error: {
        position: 'absolute',
        right: 0,
      },
    });
  }, [Colors]);

  return (
    <View style={[Gutters.smallTMargin, containerStyle]}>
      {label && (
        <Text mb={8} weight="bold" color="white">
          {label}
        </Text>
      )}
      <PhoneInput
        defaultCode="IT"
        layout="first"
        onChangeText={(text) => {
          console.log(text)
        }}
        onChangeFormattedText={(text) => {
          onChange && onChange(text)
        }}
        withDarkTheme
        withShadow
        autoFocus
        containerStyle={inputStyles.inputContainer}
        textInputStyle={inputStyles.input}
        textContainerStyle={inputStyles.textContainerStyle}
        codeTextStyle={inputStyles.codeText}
        textInputProps={{
          placeholderTextColor: Colors.highlight,
          keyboardType: 'number-pad'
        }}
      />
    </View>
  )
}

export default PhoneNumber

const styles = StyleSheet.create({})