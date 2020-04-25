import { saveDeck, deleteDeck, saveCard } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

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
    return deleteDeck(id).then(() => {
      dispatch(removeDeck(id))
    })
  }
}

export function addCard(deckId, question, answer) {
  return {
    type: ADD_CARD,
    deckId,
    question,
    answer,
  }
}

export function handleAddCard(deckId, question, answer) {
  return (dispatch) => {
    return saveCard({ deckId, question, answer }).then(() => {
      dispatch(addCard(deckId, question, answer))
    })
  }
}
