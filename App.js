import React, { Component } from 'react'
import { StatusBar, Text } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { setLocalNotification } from './utils/helpers'
import DashBoard from './components/DashBoard'
import NewDeck from './components/NewDeck'
import DeckPage from './components/DeckPage'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

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
      component={Quiz}
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
    setLocalNotification()
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
        <Tabs.Navigator
          initialRouteName="Decks"
          tabBarOptions={{
            activeTintColor: '#8a61cc',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#333435',
            inactiveBackgroundColor: '#333435',
            labelStyle: { fontSize: 14 },
          }}
        >
          <Tabs.Screen
            name="Decks"
            component={HomeStackScreen}
            options={({ route }) => ({
              tabBarVisible: this.getTabBarVisibility(route),
              tabBarLabel: 'Your Decks',
              tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faLayerGroup} color="#fff" size={24} />
              ),
            })}
          />
          <Tabs.Screen
            name="New"
            component={NewDeck}
            options={() => ({
              tabBarLabel: 'Add Decks',
              tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faPlus} color="#fff" size={24} />
              ),
            })}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect()(App)
