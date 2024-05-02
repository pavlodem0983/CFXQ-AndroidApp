import React, { useMemo } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text';
import { InputProps } from './type';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input = ({
  style,
  containerStyle,
  label,
  icon,
  placCol,
  error,
  ...props
}: InputProps) => {
  const { Colors, Fonts, Gutters } = useTheme();

  const inputStyles = useMemo(() => {
    return StyleSheet.create({
      input: {
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
      <TextInput
        {...props}
        style={[Fonts.fontRegular, inputStyles.input, style]}
        placeholderTextColor={placCol}
      />
      {error && (
        <Text
          color="error"
          mt={8}
          ml={2}
          size="tiny"
          weight="bold"
          style={inputStyles.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
