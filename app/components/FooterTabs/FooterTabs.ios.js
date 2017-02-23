import React, { PropTypes } from 'react'
import { TabBarIOS, Text } from 'react-native'
import { colors } from './../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwsome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { UserProfileContainer , LeaderboardContainer, SwipeContainer, TakeSelfyContainer, StreamContainer} from './../../containers'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,
}

export default function FooterTabs (props) {
  return (
          <StreamContainer navigator={props.navigator}/>
  )
}