import React, { PropTypes } from 'react'
import { Platform,StyleSheet,Dimensions } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import NavigationBar from 'react-native-navbar'
import { colors } from './../../styles'
const { height,width } = Dimensions.get('window')

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

export default function Navbar (props) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      width: width,
      flex: 1,
      height: 50,
      borderColor: '#111111',
      borderBottomWidth: 1,
    },
    textTitle: {
      color: '#ffcc00',
      fontFamily: 'AvenirNext-Bold'
    }
  })
  let optionalAttrs = {}
  props.leftButton && (optionalAttrs.leftButton = React.cloneElement(props.leftButton, {
    style: {marginLeft: 10, justifyContent: 'center'}
  }))
  props.rightButton && (optionalAttrs.rightButton = React.cloneElement(props.rightButton, {
    style: {marginRight: 10, justifyContent: 'center'}
  }))
  return (
    <NavigationBar
      {...optionalAttrs}
      statusBar={{hidden:false}}
      style={styles.header}
      tintColor={'transparent'}
      navigationStyles={Navigator.NavigationBar.StylesIOS}
      title={{title: props.title, style: styles.textTitle, tintColor: '#333333' }}/>
  )
}



