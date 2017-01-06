import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './../../styles'

Exit.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

Exit.defaultProps = {
  size: 30,
}

export default function Exit (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={{
      right: 10,
      top: 5,
      elevation: 2,
      position: 'absolute',
      backgroundColor: 'transparent'
    }}>
      <Icon
        name='close'
        size={props.size}
        color={colors.white} />
    </TouchableOpacity>
  )
}
