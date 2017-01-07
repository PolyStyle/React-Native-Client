import React, { PropTypes, Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { AppNavigator } from './../../containers'
import { PreSplash, FlashNotification, StreamContainer } from './../../components'
import { onAuthStateChanged } from './../../api/auth'
import { onAuthChange, handleAuthRemotely } from './../../redux/modules/authentication'
import { hideFlashNotification } from './../../redux/modules/flashNotification'
import { userOnboarded } from './../../redux/modules/users'
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
    
    // TODO FACEBOOK LOGIN : ADD THE FOLLOWING LINE BACK
    //this.props.dispatch(handleAuthRemotely())
    // TODO FACEBOOK LOGIN : REMOVE THE FOLLOWING DISPATCH
    this.props.dispatch(onAuthChange({id: 0}))

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
        {this.props.isAuthenticating === true
            ? <PreSplash />
            // TODO FACEBOOK LOGIN REMOVE THE TRUE BOOLEAN VARIABLE FROM isAuthed condition
            : <AppNavigator isNew={this.props.isNew} isAuthed={this.props.isAuthed} />}
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
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
    isNew: users.isNew || false,
    flashNotificationIsPermanent: flashNotification.permanent,
    flashNotificationLocation: flashNotification.location,
    flashNotificationText: flashNotification.text,
    showFlashNotification: flashNotification.showFlashNotification,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)