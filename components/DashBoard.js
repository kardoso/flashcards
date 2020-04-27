import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import { white, purple, black, gray } from '../utils/colors'

const shadowOpt = {
  width: 300,
  height: 100,
  color: purple,
  border: 2,
  radius: 16,
  opacity: 0.45,
  x: 0,
  y: 23,
  style: { marginBottom: 30 },
}

function DeckItem({ deckId, name, itemsAmount, onPress, opacity }) {
  return (
    <Animated.View style={{ opacity }}>
      <BoxShadow setting={shadowOpt}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onPress({ deckId })}
        >
          <Text style={styles.textTitle}>{name}</Text>
          <Text style={styles.textDescription}>{itemsAmount} Cards</Text>
        </TouchableOpacity>
      </BoxShadow>
    </Animated.View>
  )
}

class DashBoard extends Component {
  state = {
    opacity: new Animated.Value(1),
  }
  handleLoadDeck = async (id, name) => {
    // TODO: Redirect to deck page
    console.log('Still to implement')
    const { opacity } = this.state

    Animated.timing(opacity, { toValue: 0, duration: 1000 }).start()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    this.props.navigation.push('Deck', { id, name })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    Animated.timing(opacity, { toValue: 1, duration: 0 }).start()
  }

  render() {
    const { decks } = this.props
    const { opacity } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.centerList}
          showsVerticalScrollIndicator={false}
          data={Object.keys(decks)}
          keyExtractor={(item) => decks[item].id}
          renderItem={({ item }) => {
            return (
              <DeckItem
                deckId={decks[item].id}
                name={decks[item].name}
                itemsAmount={decks[item].cards.length}
                opacity={opacity}
                onPress={() =>
                  this.handleLoadDeck(decks[item].id, decks[item].name)
                }
              />
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: black,
    width: '100%',
  },
  list: {
    width: '100%',
  },
  centerList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 300,
    height: 100,
    backgroundColor: gray,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 18,
    color: white,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 16,
    color: purple,
  },
})

function mapStateToProps({ decks }) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DashBoard)
