import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Splash }  from './../../components'
import { connect } from 'react-redux'
import { handleAuthRemotely } from './../../redux/modules/authentication'

class SplashContainer extends Component {
  handleLoginFinished = (error, result) => {
    console.log('LOGIN FINISHED')
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      console.log(result)
      this.props.dispatch(handleAuthRemotely())
    }
  }
  render () {
    return (
      <Splash onLoginFinished={this.handleLoginFinished} />
    )
  }
}

export default connect()(SplashContainer)
