import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import { handleRemoveDeck } from '../actions/decks'
import { white, purple, red, black, gray } from '../utils/colors'

const shadowOpt = {
  width: 300,
  height: 60,
  color: purple,
  border: 2,
  radius: 16,
  opacity: 0.45,
  x: 0,
  y: 3,
  style: { marginBottom: 30 },
}

class DeckPage extends Component {
  state = {
    deleteDisabled: false,
    addCardDisabled: false,
    startQuizDisabled: false,
  }

  handleStartQuiz = async (e) => {
    e.preventDefault()
    this.setState(() => ({ startQuizDisabled: true }))

    const { navigation, deckId } = this.props

    navigation.push('Quiz', { deckId })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.setState(() => ({ startQuizDisabled: false }))
  }

  handleAddCard = async (e) => {
    e.preventDefault()
    this.setState(() => ({ addCardDisabled: true }))

    const { navigation, deckId } = this.props

    navigation.push('NewCard', { deckId })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.setState(() => ({ addCardDisabled: false }))
  }

  handleDeleteDeck = async (e) => {
    e.preventDefault()
    this.setState(() => ({
      deleteDisabled: true,
      startQuizDisabled: true,
      addCardDisabled: true,
    }))

    const { dispatch, deckId, route, navigation } = this.props

    await dispatch(handleRemoveDeck(deckId ?? route.params.id))

    navigation.goBack()
  }

  render() {
    const { name, cardsCount } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {cardsCount} {cardsCount === 1 ? 'card' : 'cards'}
        </Text>

        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity
            style={[styles.button, styles.btnStart]}
            onPress={this.handleStartQuiz}
            disabled={this.state.startQuizDisabled}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </BoxShadow>

        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity
            style={[styles.button, styles.btnAdd]}
            onPress={this.handleAddCard}
            disabled={this.state.addCardDisabled}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </BoxShadow>

        <TouchableOpacity
          style={[styles.button, styles.btnDelete]}
          onPress={this.handleDeleteDeck}
          disabled={this.state.deleteDisabled}
        >
          <Text style={[styles.buttonText, styles.txtDelete]}>Delete Deck</Text>
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
  subtitle: {
    color: purple,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
    textTransform: 'capitalize',
    textAlign: 'center',
    width: 300,
  },
  button: {
    width: 300,
    height: 30,
    backgroundColor: gray,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 16,
    marginBottom: 30,
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
  btnStart: {
    backgroundColor: purple,
  },
  btnDelete: {
    backgroundColor: 'transparent',
    borderColor: red,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  txtDelete: {
    color: red,
  },
})

function mapStateToProps({ decks }, props) {
  const deck = decks[props.route.params.id]
  if (typeof deck !== 'undefined') {
    const deckId = deck.id
    const name = deck.name
    const cardsCount = deck.cards.length

    return {
      deckId,
      name,
      cardsCount,
    }
  }
}

export default connect(mapStateToProps)(DeckPage)
