import React from 'react'
import { StyleSheet, View } from 'react-native'
import CardPage from './components/CardPage'

export default function App() {
  return (
    <View style={styles.container}>
      <CardPage />
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
