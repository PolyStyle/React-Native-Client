import React, { PropTypes } from 'react'
import { TouchableOpacity,StyleSheet,View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'

FooterIcon.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

FooterIcon.defaultProps = {
  size: 30,
}

const styles = StyleSheet.create({
  selectedHighlight: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#222',
    width: 10,
    marginLeft: 8,
    height: 2,
  },
})

export default function FooterIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name={props.iconName || 'ios-wifi'}
        size={props.size}
        color={'#333'} />
      {this.props.isActive && <View style={styles.selectedHighlight} /> }
    </TouchableOpacity>
  )
}
