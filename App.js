import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import DashBoard from './components/DashBoard'

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={'#1b1d20'} barStyle="light-content" />
        <DashBoard />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1d20',
  },
})

export default connect()(App)
