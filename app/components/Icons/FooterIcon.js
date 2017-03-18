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
    marginLeft: 10, 
    height: 2,
  },
  container: {
    width: 30,
    alignItems:'center', 
  }
})

export default function FooterIcon (props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon
          name={!props.isActive && props.iconName+'-outline' || props.iconName}
          size={props.size}
          color={'#333'} />
        
      </TouchableOpacity>
      {props.isActive && <View style={styles.selectedHighlight} /> }
    </View>
  )
}
