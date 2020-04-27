import React, { Component, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { white, purple, black, gray } from '../utils/colors'

const shadowOpt = {
  width: 300,
  height: 65,
  color: purple,
  border: 2,
  radius: 16,
  opacity: 0.45,
  x: 0,
  y: 3,
  style: { marginTop: 60 },
}

class NewDeck extends Component {
  state = {
    name: '',
    submitDisabled: false,
  }

  saveDeck = async () => {
    this.setState(() => ({ name: '', submitDisabled: true }))

    const { dispatch } = this.props
    await dispatch(handleAddDeck({ name: this.state.name }))

    this.setState(() => ({ name: '', submitDisabled: false }))
  }

  showDeck = () => {
    const { decks, navigation } = this.props
    const deck = decks[Object.keys(decks)[Object.keys(decks).length - 1]]
    navigation.navigate('Deck', { id: deck.id, name: deck.name })
  }

  submitDeck = async (e) => {
    e.preventDefault()
    this.saveDeck().then(this.showDeck)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ name: text })}
          value={this.state.name}
          maxLength={32}
        />

        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.submitDeck}
            disabled={this.state.submitDisabled}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </BoxShadow>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  title: {
    color: white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: 300,
  },
  button: {
    width: 300,
    backgroundColor: purple,
    borderRadius: 16,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 30,
  },
  input: {
    width: 300,
    fontSize: 18,
    backgroundColor: white,
    padding: 20,
    borderRadius: 16,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: gray,
  },
})

function mapStateToProps({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(NewDeck)
