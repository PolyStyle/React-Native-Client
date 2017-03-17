import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'

Exit.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

Exit.defaultProps = {
  size: 40,
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
        name='ios-close-outline'
        size={props.size}
        color={'#222'} />
    </TouchableOpacity>
  )
}
