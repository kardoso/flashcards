import { _getDecks, _getCards, _saveDeck, _saveCard } from './_DATA.js'

export function getInitialData() {
  return Promise.all([_getDecks(), _getCards()]).then(([decks, cards]) => ({
    decks,
    cards,
  }))
}

export function saveDeck(info) {
  return _saveDeck(info)
}

export function saveCard(info) {
  return _saveCard(info)
}
