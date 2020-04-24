import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import Card from './Card'

function Button({ text, onPress }) {
  return (
    <TouchableOpacity
      disabled={true}
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
    >
      <Text style={styles.BtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class CardPage extends Component {
  handlePrevious = () => {
    // TODO: Go to previous card
    console.log('Still to implement')
  }

  handleNext = () => {
    // TODO: Go to next card
    console.log('Still to implement')
  }

  render() {
    return (
      <View style={styles.container}>
        <Card frontText="Question" backText="Answer" />
        <View style={styles.buttonsContainer}>
          <Button text="Previous" onPress={this.handlePrevious} />
          <Button text="Next" onPress={this.handleNext} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 80,
    justifyContent: 'space-between',
    width: '100%',
  },
  iosBtn: {
    flex: 1,
    backgroundColor: '#8a61cc',
    padding: 10,
    borderRadius: 32,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  androidBtn: {
    flex: 1,
    width: '100%',
    backgroundColor: '#8a61cc',
    padding: 10,
    borderRadius: 16,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: '#1b1d20',
  },
})

export default CardPage
