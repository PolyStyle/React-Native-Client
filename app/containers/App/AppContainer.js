import React, { PropTypes, Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { AppNavigator } from './../../containers'
import { PreSplash, FlashNotification, StreamContainer } from './../../components'
import { onAuthStateChanged } from './../../api/api_proxy'
import { onAuthChange, handleAuthRemotely } from './../../redux/modules/authentication'
import { hideFlashNotification } from './../../redux/modules/flashNotification'
import { userOnboarded } from './../../redux/modules/users'
import {  authWithAccessToken } from './../../api/api_proxy'
// import { notifications } from  './../../api/notifications'
console.disableYellowBox = true

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    isNew: PropTypes.bool,
    flashNotificationIsPermanent: PropTypes.bool.isRequired,
    flashNotificationLocation: PropTypes.string.isRequired,
    flashNotificationText: PropTypes.string.isRequired,
    showFlashNotification: PropTypes.bool.isRequired,
  }
  componentDidMount () {
    // Attach a callback when you have a change in the user
    onAuthStateChanged((user) => this.props.dispatch(onAuthChange(user)))
    // on bootstrap try to handle an automatic authentication
    // for the time being is handling the case of being logged in with Facebook
    // and the session is still available (no need to go through the auth process)

    // IMPORTANT: by the time this component is loaded, you have a rehydrated reducer with whatever
    // Was saved in the local storage

    // now the options are:
    // A: there is no user.currentUser.accessToken. I need to go through the standard authentication process.
    // B: there is a user.currentUser.accessToken. I don't need to login.


    // in case of A the expectations are:
    // authentication.isAuthed = false
    // authentication.isAuthenticating = false
    // currentUser = null


    // in case of B, the expectations are that the store looks like
    // authentication.isAuthenticating = false
    // authentication.isAuthed = true
    // I can therefore either decide to go through onboarding, if currentUser.isNew, or straight to the app.
    // Be sure to register the accessToken with the API PROXY

    // TODO: verify that accessToken is not empty
    console.log('+++ app mounted info +++')
    console.log(this.props.currentUser)
    if(this.props.currentUser && this.props.currentUser.accessToken && this.props.currentUser.accessToken.accessToken){
      // CASE B. All's good ... move on
      authWithAccessToken(this.props.currentUser.accessToken)
    } else {

      //  I don't need this, yet.
      // this.props.dispatch(handleAuthRemotely())
    }
    // START HANDLING OUT REMOTELY


  }
  handleHideNotification = () => {
    this.props.dispatch(hideFlashNotification())
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          hidden={true}
        />
        <AppNavigator 
          isNew={this.props.currentUser.isNew} 
          isAuthed={this.props.isAuthed} 
        />
        {this.props.showFlashNotification === true
          ? <FlashNotification
              permanent={this.props.flashNotificationIsPermanent}
              location={this.props.flashNotificationLocation}
              text={this.props.flashNotificationText}
              onHideNotification={this.handleHideNotification}/>
          : null}
      </View>
    )
  }
}

function mapStateToProps ({authentication, flashNotification, users}) {
 
  return {
    currentUser : users.currentUser,
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
    flashNotificationIsPermanent: flashNotification.permanent,
    flashNotificationLocation: flashNotification.location,
    flashNotificationText: flashNotification.text,
    showFlashNotification: flashNotification.showFlashNotification,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)