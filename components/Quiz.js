import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import Card from './Card'

function Button({ text, onPress, disable }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
        disable && styles.disabledBtn,
      ]}
    >
      <Text style={styles.BtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  state = {
    cardIndex: 0,
  }

  handlePrevious = () => {
    this.setState(() => ({ cardIndex: this.state.cardIndex - 1 }))
    console.log(this.state)
  }

  handleNext = () => {
    this.setState(() => ({ cardIndex: this.state.cardIndex + 1 }))
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          frontText={this.props.cards[this.state.cardIndex].question}
          backText={this.props.cards[this.state.cardIndex].answer}
        />
        <View style={styles.buttonsContainer}>
          <Button
            text="Previous"
            onPress={this.handlePrevious}
            disable={this.state.cardIndex <= 0}
          />
          <Button
            text="Next"
            onPress={this.handleNext}
            disable={this.state.cardIndex >= this.props.cards.length - 1}
          />
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
  disabledBtn: {
    display: 'none',
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

function mapStateToProps({ decks }, props) {
  const deck = decks[props.route.params.deckId]
  if (typeof deck !== 'undefined') {
    const cards = deck.cards
    const cardsCount = deck.cards.length

    return {
      cards,
      cardsCount,
    }
  }
}

export default connect(mapStateToProps)(Quiz)
