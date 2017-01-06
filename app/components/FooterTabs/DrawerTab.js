import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, fontSizes } from './../../styles'

DrawerTab.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
}

export default function DrawerTab (props) {
  const color = props.selected === true ? colors.blue : colors.primary;
  const icon = React.cloneElement(props.icon, { color: color })
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      {icon} 
      <Text style={[{color}, styles.titleText]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: fontSizes.secondary,
    marginLeft: 10,
  }
})
