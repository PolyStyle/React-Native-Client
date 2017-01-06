import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'

Nan.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

Nan.defaultProps = {
  size: 80,
}

export default function Nan (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name='ios-close'
        size={props.size}
        color={'#6b6490'} />
    </TouchableOpacity>
  )
}
