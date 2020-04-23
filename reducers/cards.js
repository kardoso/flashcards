import { ADD_CARD } from '../actions/cards'

export default function cards(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          [action.cards]: state[action.deckId].cards.concat({
            question,
            answer,
          }),
        },
      }
    default:
      return state
  }
}
