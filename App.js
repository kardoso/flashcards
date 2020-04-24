import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashBoard from './components/DashBoard'
import NewDeck from './components/NewDeck'
import DeckPage from './components/DeckPage'

const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: true }}>
    <HomeStack.Screen
      name="Decks"
      component={DashBoard}
      options={{
        headerStyle: {
          backgroundColor: '#333435',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
    <HomeStack.Screen
      name="Deck"
      component={DeckPage}
      options={{
        headerStyle: {
          backgroundColor: '#333435',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </HomeStack.Navigator>
)

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        <Tabs.Navigator>
          <Tabs.Screen name="Decks" component={HomeStackScreen} />
          <Tabs.Screen name="New" component={NewDeck} />
        </Tabs.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect()(App)
