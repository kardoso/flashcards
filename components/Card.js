import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import CardFlip from 'react-native-card-flip'

export default function Card({ frontText, backText }) {
  return (
    <CardFlip style={styles.cardContainer} ref={(card) => (this.card = card)}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.card, styles.card1]}
        onPress={() => this.card.flip()}
      >
        <Text style={[styles.label, styles.label1]}>{frontText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.card, styles.card2]}
        onPress={() => this.card.flip()}
      >
        <Text style={[styles.label, styles.label2]}>{backText}</Text>
      </TouchableOpacity>
    </CardFlip>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    height: 260,
  },
  card: {
    width: 320,
    height: 260,
    backgroundColor: '#8a61cc',
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#8a61cc',
  },
  card2: {
    backgroundColor: '#ffffff',
  },
  label: {
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
    margin: 4,
  },
  label1: {
    color: '#ffffff',
  },
  label2: {
    color: '#8a61cc',
  },
})
