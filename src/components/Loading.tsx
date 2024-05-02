import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Text from './Text';

type LoadingPropTypes = {
  text?: string;
};

const Loading = ({ text }: LoadingPropTypes) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="#ffffff" />
      {text && (
        <Text color="white" weight="medium" mt={5}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#33333399',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
