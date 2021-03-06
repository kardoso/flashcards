import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/decks'
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

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    submitDisabled: false,
  }

  saveCard = async (e) => {
    e.preventDefault()
    this.setState(() => ({ submitEnabled: true }))

    const { question, answer } = this.state
    const { dispatch, navigation, deckId } = this.props

    await dispatch(handleAddCard(deckId, question, answer))

    this.setState(() => ({ question: '', answer: '' }))

    navigation.navigate('Deck', { deckId })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ question: text })}
          value={this.state.question}
          maxLength={32}
          placeholder="Question"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.name}
          maxLength={32}
          placeholder="Answer"
        />

        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.saveCard}
            disabled={this.state.submitEnabled}
          >
            <Text style={styles.buttonText}>Add Card</Text>
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
    margin: 10,
    borderRadius: 16,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: gray,
  },
})

function mapStateToProps({}, { route }) {
  return {
    deckId: route.params.deckId,
  }
}

export default connect(mapStateToProps)(NewCard)
