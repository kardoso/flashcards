import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FlipCard from 'react-native-flip-card'

export default function Card({ frontText, backText, flip }) {
  return (
    <View style={styles.cardContainer}>
      <FlipCard
        friction={8}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={true}
        flip={flip}
        clickable={false}
        onFlipEnd={(isFlipEnd) => {
          console.log('isFlipEnd', isFlipEnd)
        }}
      >
        {/* Face Side */}
        <View style={[styles.face, styles.card]}>
          <Text style={[styles.label, styles.label1]}>{frontText}</Text>
        </View>
        {/* Back Side */}
        <View style={[styles.back, styles.card]}>
          <Text style={[styles.label, styles.label2]}>{backText}</Text>
        </View>
      </FlipCard>
    </View>
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
    borderRadius: 16,
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8a61cc',
  },
  back: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
