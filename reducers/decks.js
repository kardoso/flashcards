import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from '../actions/decks'

function removeKey(obj, deleteKey) {
  let clone = Object.assign({}, obj)
  delete clone[deleteKey]
  return clone
}

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
      let filtered = Object.keys(state).filter((k) => state[k].id !== action.id)
      let result = {}
      for (let i = 0; i < filtered.length; i++) {
        result = { ...result, [filtered[i]]: state[filtered[i]] }
      }
      return result
    default:
      return state
  }
}
