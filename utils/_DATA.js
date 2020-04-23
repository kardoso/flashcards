let decks = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    name: 'Sample Deck',
    cards: ['m1lws477u4c6yg8ylqlc7o'],
  },
}

let cards = {
  m1lws477u4c6yg8ylqlc7o: {
    id: 'm1lws477u4c6yg8ylqlc7o',
    deckId: '8xf0y6ziyjabvozdd253nd',
    question: "What's the result of 2 + 2?",
    answer: '4',
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

export function _getCards() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...cards }), 1000)
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

function formatCard({ deckId, question, answer }) {
  return {
    id: generateUID(),
    deckId,
    question,
    answer,
  }
}

export function _saveCard(card) {
  return new Promise((res, rej) => {
    const deckId = card.deckId
    const formattedCard = formatCard(card)

    setTimeout(() => {
      cards = {
        ...cards,
        [formattedCard.id]: formattedCard,
      }

      decks = {
        ...decks,
        [deckId]: {
          ...decks[deckId],
          cards: decks[deckId].cards.concat([formattedCard.id]),
        },
      }

      res(formattedCard)
    }, 1000)
  })
}
