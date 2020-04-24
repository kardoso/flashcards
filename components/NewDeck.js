import React, { Component, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'

class NewDeck extends Component {
  state = {
    name: '',
  }

  saveDeck = async (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(handleAddDeck({ name: this.state.name }))
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
        <TouchableOpacity style={styles.button} onPress={this.saveDeck}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    backgroundColor: '#1b1d20',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: 300,
  },
  button: {
    width: 300,
    backgroundColor: '#8a61cc',
    padding: 30,
    borderRadius: 16,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 30,
  },
  input: {
    width: 300,
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
  },
})

export default connect()(NewDeck)
