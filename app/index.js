import React, { Component } from 'react';
import { StyleSheet, View, Text  } from 'react-native';
// import { AppContainer } from './containers'
 
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux'
import devTools from 'remote-redux-devtools'
//import { LOGGING_OUT } from './redux/modules/authentication'
//import { USER_ONBOARDED } from './redux/modules/users'
/*
const appReducer = combineReducers(reducers)

function rootReducer (state, action) {
  if (action.type === LOGGING_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devTools()
  )
)
*/
export default class RNFashion extends Component {
  /*render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  } 
  */

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
