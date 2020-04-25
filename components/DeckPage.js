import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import { handleRemoveDeck } from '../actions/decks'

const shadowOpt = {
  width: 300,
  height: 60,
  color: '#8a61cc',
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
  }

  handleStartQuiz = (e) => {
    e.preventDefault()
    // TODO: Go to quiz stack
  }

  handleAddCard = (e) => {
    e.preventDefault()

    const { navigation, deckId } = this.props

    navigation.push('NewCard', { deckId })
  }

  handleDeleteDeck = async (e) => {
    e.preventDefault()
    this.setState(() => ({deleteDisabled: true}))

    const { dispatch, deckId, route, navigation } = this.props

    await dispatch(handleRemoveDeck(deckId ?? route.params.id))

    navigation.goBack()
  }

  render() {
    const { name, cardsCount, loading } = this.props
    if (loading === true) {
      return null
    }
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
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </BoxShadow>

        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity
            style={[styles.button, styles.btnAdd]}
            onPress={this.handleAddCard}
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
  subtitle: {
    color: '#8a61cc',
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
    backgroundColor: '#333435',
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
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 30,
  },
  btnStart: {
    backgroundColor: '#8a61cc',
  },
  btnDelete: {
    backgroundColor: 'transparent',
    borderColor: '#db5757',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  txtDelete: {
    color: '#db5757',
  },
})

function mapStateToProps({ decks }, props) {
  //TODO: Remove the forced id
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
