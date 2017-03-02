import React, { Component } from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { AppContainer } from './containers'
import { PreSplash } from './components'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './redux'
import devTools from 'remote-redux-devtools'
import { LOGGING_OUT } from './redux/modules/authentication'
import { USER_ONBOARDED } from './redux/modules/users'
import { composeWithDevTools } from 'remote-redux-devtools';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'


const appReducer = reducers

function rootReducer (state, action) {
  if (action.type === LOGGING_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
    autoRehydrate()
  )
)

export default class RNFashion extends Component {
   constructor(props) {
    super(props)
    this.state = {
      restoredPersistentStore: false
    }
  }

  componentDidMount () {
      console.log('Component Mounted');
      _self = this;
      var persistor = persistStore(store, {storage: AsyncStorage}, () => {
        console.log('Rehydrated');
        this.setState({
          restoredPersistentStore: true
        })

    }).purge()
  }

  render(){
    if(this.state.restoredPersistentStore){
      return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      )
    } else {
      return(<PreSplash/>)
    }

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
