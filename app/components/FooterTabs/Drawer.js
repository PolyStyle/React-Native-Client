import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontAwsome from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { colors, fontSizes } from './../../styles'

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export default function Drawer (props) {
  return (
    <View style={styles.container}>
      <DrawerHeader />
      <DrawerTab
        title='Stream'
        selected={props.activeFooterTab === 'stream'}
        onPress={() => {
          props.onTabSelect('stream')
          props.close()
        }}
        icon={<IconEntypo name={'documents'} size={35}  />}
        />
      <DrawerTab
        title='Take Selfy'
        selected={props.activeFooterTab === 'takeSelfy'}
        onPress={() => {
          props.onTabSelect('takeSelfy')
          props.close()
        }}
        icon={<IconIonicons name={'ios-camera'} size={35}  />}
        />
      <DrawerTab
        title='Me'
        selected={props.activeFooterTab === 'home'}
        onPress={() => {
          props.onTabSelect('home')
          props.close()
        }}
        icon={<IconIonicons name={'ios-person'} size={35}  />}
          />
      <DrawerTab
        title='Friends'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => {
          props.onTabSelect('leaderboard')
          props.close()
        }}
        icon={<IconFontAwsome name={'fire'} size={35}   />}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff'
  }
})
