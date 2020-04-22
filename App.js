import React from 'react'
import { StyleSheet, View } from 'react-native'
import Card from './components/Card'

export default function App() {
  return (
    <View style={styles.container}>
      <Card frontText="Question" backText="Answer" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1d20',
  },
})
