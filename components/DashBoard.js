import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

const shadowOpt = {
  width: 300,
  height: 100,
  color: '#8a61cc',
  border: 2,
  radius: 16,
  opacity: 0.45,
  x: 0,
  y: 23,
  style: { marginBottom: 30 },
}

function DeckItem({ deckId, name, itemsAmount, onPress }) {
  return (
    <BoxShadow setting={shadowOpt}>
      <TouchableOpacity style={styles.btn} onPress={() => onPress({ deckId })}>
        <Text style={styles.textTitle}>{name}</Text>
        <Text style={styles.textDescription}>{itemsAmount} Cards</Text>
      </TouchableOpacity>
    </BoxShadow>
  )
}

class DashBoard extends Component {
  handleLoadDeck = (id, name) => {
    // TODO: Redirect to deck page
    console.log('Still to implement')
    this.props.navigation.push('Deck', { id, name })
  }

  render() {
    const { decks } = this.props
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
    backgroundColor: '#1b1d20',
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
    backgroundColor: '#333435',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 16,
    color: '#8a61cc',
  },
})

function mapStateToProps({ decks }) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DashBoard)
