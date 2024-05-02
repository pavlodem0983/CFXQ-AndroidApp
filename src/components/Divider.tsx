import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@hooks';

const Divider = () => {
  const { Layout, Gutters, Colors } = useTheme();
  return (
    <View style={[Layout.fullWidth, Gutters.tinyVMargin, { backgroundColor: Colors.borderColor, height: 1.2 }]} />
  )
}

export default Divider