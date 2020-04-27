import { AppRegistry } from 'react-native'
import React from 'react'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

const FlashCards = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('main', () => FlashCards)
