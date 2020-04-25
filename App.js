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
import NewCard from './components/NewCard'
import CardPage from './components/CardPage'

const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: true }}>
    <HomeStack.Screen
      name="Decks"
      component={DashBoard}
      options={{
        headerShown: false,
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
      options={({ route }) => ({
        title: route.params.name,
        tabBarVisible: false,
        headerStyle: {
          backgroundColor: '#333435',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    />

    <HomeStack.Screen
      name="NewCard"
      component={NewCard}
      options={{
        headerTitle: 'New Card',
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
      name="Quiz"
      component={CardPage}
      options={{
        headerTitle: 'Quiz',
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

  getTabBarVisibility(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : ''
    if (['Deck', 'NewCard', 'Quiz'].includes(routeName)) {
      return false
    }
    return true
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar translucent barStyle={'light-content'} />
        <Tabs.Navigator>
          <Tabs.Screen
            name="Decks"
            component={HomeStackScreen}
            options={({ route }) => ({
              tabBarVisible: this.getTabBarVisibility(route),
            })}
          />
          <Tabs.Screen name="New" component={NewDeck} />
        </Tabs.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect()(App)
