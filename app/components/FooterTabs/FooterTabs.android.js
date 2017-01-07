import React, { PropTypes , Component} from 'react'
import { View, StyleSheet, Text, DrawerLayoutAndroid, BackAndroid } from 'react-native'
import { UserProfileContainer, LeaderboardContainer, SwipeContainer, TakeSelfyContainer, StreamContainer } from './../../containers'
import Drawer from './Drawer'


export default class FooterTabs extends Component {
  static propTypes = {
    activeFooterTab: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    onTabSelect: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

   
    
  render(){
    return (
      <StreamContainer navigator={this.props.navigator}/> 
    )
  }
}

 