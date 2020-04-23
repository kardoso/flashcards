import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from '../actions/decks'

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      }
    case REMOVE_DECK:
      return {
        [action.deck.id]: omit,
        ...state,
      }
    default:
      return state
  }
}
