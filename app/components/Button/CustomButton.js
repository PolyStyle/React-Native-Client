import React, { PropTypes } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  default:{
    flex: 1, 
    padding: 5,
  },
  active: {
    borderRadius: 3, 
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 3,
    borderColor: '#333333',
    borderWidth: 1,
    backgroundColor: '#333333',

  },
  disable:{
    borderRadius: 3, 
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 3,
    borderColor: '#555555',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  activeText: {
    color: '#ffffff',
  },
  disableText: {
    color: '#555555'
  }
});

CustomButton.propTypes = {
  onPress: PropTypes.func,
  cta: PropTypes.string,
  active: PropTypes.bool
}

CustomButton.defaultProps = {
  active: true,
}

export default function CustomButton (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.active ? styles.active : styles.disable}  >
        <Text style={props.active ? styles.activeText : styles.disableText}> {props.cta || 'Buttom to Click'} </Text>
    </TouchableOpacity>
  )
}
