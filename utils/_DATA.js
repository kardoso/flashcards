let decks = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    name: 'Sample Deck',
    cards: [
      {
        question: "What's the result of 2 + 2?",
        answer: '4',
      },
    ],
  },
}

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...decks }), 1000)
  })
}

function formatDeck({ name }) {
  return {
    id: generateUID(),
    name,
    cards: [],
  }
}

export function _saveDeck(deck) {
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck)

    setTimeout(() => {
      decks = {
        ...decks,
        [formattedDeck.id]: formattedDeck,
      }

      res(formattedDeck)
    }, 1000)
  })
}

function removeKey(obj, deleteKey) {
  let clone = Object.assign({}, obj)
  delete clone[deleteKey]
  return clone
}

export function _deleteDeck(deckId) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let filtered = Object.keys(decks).filter((k) => decks[k].id !== deckId)
      let result = {}
      filtered.forEach(
        (id) => (result = { ...result, [filtered[id]]: decks[filtered[id]] })
      )
      decks = decks

      res(decks)
    }, 1000)
  })
}

export function _saveCard({ deckId, question, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = {
        ...decks,
        [deckId]: {
          ...decks[deckId],
          cards: decks[deckId].cards.concat([
            [
              {
                question,
                answer,
              },
            ],
          ]),
        },
      }
      res(decks)
    }, 1000)
  })
}
