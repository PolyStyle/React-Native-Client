import React, { PropTypes, Component } from 'react'
import { View, Navigator, Platform, StatusBar } from 'react-native'
import { SplashContainer, OnboardingContainer, FooterTabsContainer, SettingsContainer } from './../../containers'

export default class AppNavigator extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isNew: PropTypes.bool.isRequired
  }
  renderScene = (route, navigator) => {
    console.log(this.props.isAuthed, route.settings, this.props.isNew)
    if (this.props.isAuthed === false) {
      return <SplashContainer  style={{flex: 1, backgroundColor: '#00ccff'}} navigator={navigator} />
    } else if (route.settings === true) {
      console.log('Show Settings')
      return <SettingsContainer  style={{flex: 1, backgroundColor: '#ffcc00'}} navigator={navigator} />
    } else if( this.props.isAuthed === true && this.props.isNew === true) {
      return <OnboardingContainer  style={{flex: 1, backgroundColor: '#ff0000'}} navigator={navigator} />
    }

    return <FooterTabsContainer navigator={navigator} />
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }

    if (route.settings === true) {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    

    return Navigator.SceneConfigs.FloatFromRight
  }
  render () {
    return (
       <View style={{flex: 1}}>
        <Navigator
          initialRoute={{ }}
          renderScene={this.renderScene}
          configureScene={this.configureScene} />
      </View>
    )
  }
}
