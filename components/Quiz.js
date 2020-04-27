import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Card from './Card'
import { white, purple, black, red, green, orange } from '../utils/colors'

function Button({ text, onPress, fail, success, restart }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
        fail && styles.failBtn,
        success && styles.successBtn,
        restart && styles.restartBtn,
      ]}
    >
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  )
}

const quizState = {
  notRevealed: 'notRevealed',
  revealed: 'revealed',
  markGuess: 'markGuess',
  ended: 'ended',
}

class Quiz extends Component {
  state = {
    cardIndex: 0,
    flip: false,
    quizState: quizState.notRevealed,
    failCount: 0,
    successCount: 0,
  }

  handleGuess = async (guess) => {
    this.setState(() => ({
      flip: false,
    }))
    if (guess === true) {
      this.setState(() => ({
        successCount: this.state.successCount + 1,
        flip: false,
      }))
    } else {
      this.setState(() => ({
        failCount: this.state.failCount + 1,
        flip: false,
      }))
    }
    this.setState(() => ({
      quizState:
        this.state.cardIndex + 1 === this.props.cardsCount
          ? quizState.ended
          : quizState.notRevealed,
    }))
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.setState(() => ({
      cardIndex: this.state.cardIndex + 1,
    }))
  }

  handleRestart = () => {
    this.setState(() => ({
      cardIndex: 0,
      flip: false,
      quizState: quizState.notRevealed,
      failCount: 0,
      successCount: 0,
    }))
  }

  handleFinish = () => {
    const { navigation } = this.props

    navigation.goBack()

    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.quizState !== quizState.ended ? (
          <View style={styles.header}>
            <Text style={styles.label}>
              Remaining questions:{this.props.cardsCount - this.state.cardIndex}
            </Text>
            <Text style={styles.label}>
              Fail: <Text style={styles.failText}>{this.state.failCount}</Text>
            </Text>
            <Text style={styles.label}>
              Success:{' '}
              <Text style={styles.successText}>{this.state.successCount}</Text>
            </Text>
          </View>
        ) : (
          <View style={styles.header}>
            <Text style={[styles.label, styles.endLabel]}>
              You got{' '}
              {(
                (this.state.successCount / this.props.cardsCount) *
                100
              ).toFixed(1)}
              % of the questions right.
            </Text>
          </View>
        )}

        {this.state.quizState !== quizState.ended && (
          <Card
            frontText={this.props.cards[this.state.cardIndex].question}
            backText={this.props.cards[this.state.cardIndex].answer}
            flip={this.state.flip}
          />
        )}

        <View style={styles.quizButtons}>
          {this.state.quizState === quizState.notRevealed && (
            <Button
              text="Reveal Answer"
              onPress={() =>
                this.setState({
                  flip: !this.state.flip,
                  quizState: quizState.revealed,
                })
              }
            />
          )}
          {this.state.quizState === quizState.revealed && (
            <Button
              text="Complete Card"
              onPress={() =>
                this.setState({
                  quizState: quizState.markGuess,
                })
              }
            />
          )}
          {this.state.quizState === quizState.markGuess && (
            <Button
              text="I failed it"
              fail={true}
              onPress={() => this.handleGuess(false)}
            />
          )}
          {this.state.quizState === quizState.markGuess && (
            <Button
              text="I nailed it"
              success={true}
              onPress={() => this.handleGuess(true)}
            />
          )}

          {this.state.quizState === quizState.ended && (
            <Button
              text="Restart Quiz"
              restart={true}
              onPress={this.handleRestart}
            />
          )}
          {this.state.quizState === quizState.ended && (
            <Button text="Finish Quiz" onPress={this.handleFinish} />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iosBtn: {
    flex: 1,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 32,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  androidBtn: {
    flex: 1,
    width: '100%',
    backgroundColor: purple,
    padding: 10,
    borderRadius: 16,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  failBtn: {
    backgroundColor: red,
  },
  successBtn: {
    backgroundColor: green,
  },
  restartBtn: {
    backgroundColor: orange,
  },
  failText: {
    color: red,
  },
  successText: {
    color: green,
  },
  label: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
  endLabel: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: black,
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
