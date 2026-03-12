import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function streak() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg.primary }}>
      <Text style={{ color: Colors.text.primary }}>streak</Text>
    </View>
  )
}