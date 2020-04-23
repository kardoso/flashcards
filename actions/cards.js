import { saveCard } from '../utils/api'

export const ADD_CARD = 'ADD_CARD'

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  }
}

export function handleAddCard(deckId, question, answer) {
  return (dispatch) => {
    return saveCard({ deckId, question, answer }).then(() => {
      dispatch(addCard(deckId, { question, answer }))
    })
  }
}
