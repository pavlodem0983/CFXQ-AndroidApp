import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import TextPropTypes from './type';
import { useTheme } from '@hooks';
import { FontFamilies } from '@theme/Variables';

const Text = (props: TextPropTypes) => {
  const { FontSize, Colors } = useTheme();
  const styles = StyleSheet.create({
    style: {
      color: props.color ? Colors[props.color] : Colors.primary,
      fontFamily: props.weight
        ? FontFamilies[props.weight]
        : FontFamilies.regular,
      fontSize: props.size ? FontSize[props.size] : FontSize.small,
      marginTop: props.mt ?? 0,
      marginLeft: props.ml ?? 0,
      marginRight: props.mr ?? 0,
      marginBottom: props.mb ?? 0,
      paddingTop: props.pt ?? 0,
      paddingBottom: props.pb ?? 0,
      paddingRight: props.pr ?? 0,
      paddingLeft: props.pl ?? 0,
      textAlign: props.align ?? 'left',
      lineHeight: props.lineHeight
        ? props.lineHeight
        : props.size
        ? FontSize[props.size]
        : FontSize.medium,
      textDecorationLine: props.underline ? 'underline' : 'none',
      textDecorationStyle: 'solid',
      textDecorationColor: props.color ? Colors[props.color] : Colors.label,
      textTransform: props.uppercase ? 'uppercase' : 'none',
    },
  });
  return (
    <RNText
      style={[styles.style, props.style]}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </RNText>
  );
};

export default Text;
