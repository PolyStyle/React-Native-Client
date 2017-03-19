import React, { PropTypes, Component } from 'react'
import { View, Navigator, Platform, StatusBar, StyleSheet, Dimensions} from 'react-native'
import { SplashContainer, OnboardingContainer, FooterTabsContainer, SettingsContainer } from './../../containers'
import { FooterIcon}  from './../../components'

const { height,width } = Dimensions.get('window')
const FEED = 'Feed';
const SEARCH = 'Search';
const EXPLORE = 'Explore';
const USERPROFILE = 'User Profile';
const ADDPHOTO = 'Add Photo';




export default class AppNavigator extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isNew: PropTypes.bool.isRequired
  }

  

  renderScene = (route, navigator) => {
    console.log('I RENDERED THE MAIN SCENE');
    if (this.props.isAuthed === false) {
      // I NEED TO SHOW THE LOGIN PAGE
      return <SplashContainer  style={{flex: 1, backgroundColor: '#00ccff'}} navigator={navigator} />
    } else if (route.settings === true) {
      return <SettingsContainer  style={{flex: 1, backgroundColor: '#ffcc00'}} navigator={navigator} />
    } else if( this.props.isAuthed === true && this.props.isNew === true) {
      // THIS NEEDS AN ONBOARDING
      return <OnboardingContainer  style={{flex: 1, backgroundColor: '#ff0000'}} navigator={navigator} />
    } else {
    // IF NONE OF THE ABOVE, START THE STANDARD NAVIGATION (which in include the main view. Thanks iOS for this
    // idiotic way
      return <FooterTabsContainer navigator={navigator} />
    }
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    if(route.settings === true) {
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

