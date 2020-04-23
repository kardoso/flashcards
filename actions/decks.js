import { saveDeck, deleteDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function handleAddDeck(deck) {
  return (dispatch) => {
    return saveDeck(deck).then((deck) => {
      dispatch(addDeck(deck))
    })
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}

export function handleRemoveDeck(id) {
  return (dispatch) => {
    deleteDeck(id).then(() => {
      dispatch(removeDeck(id))
    })
  }
}
