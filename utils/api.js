import { _getDecks, _saveDeck, _deleteDeck, _saveCard } from './_DATA.js'

export function getInitialData() {
  return Promise.all([_getDecks()]).then(([decks]) => ({
    decks,
  }))
}

export function saveDeck(info) {
  return _saveDeck(info)
}

export function deleteDeck(deckId) {
  return _deleteDeck(deckId)
}

export function saveCard(info) {
  return _saveCard(info)
}
