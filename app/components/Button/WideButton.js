import React, { PropTypes, Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  default:{
    flex: 1,
    padding: 5,
  },
  active: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  activeText: {
    fontSize: 14,
    color: '#cccccc',
    fontFamily: 'AvenirNextLTW01RegularRegular',
    textAlign: 'center'
  },
  
});



class WideButton extends Component {
  static defaultProps = {
    backgroundColor: '#363636',
  };

  static propTypes = {

    cta: PropTypes.string,
    active: PropTypes.bool,
    backgroundColor: PropTypes.string,
  };
  
  constructor (props) {
    super(props)
  };

  onPress() {
    if(this.props.onPress) {
      this.props.onPress()
    }
  }

   render(){

    return (
    <TouchableOpacity onPress={this.onPress.bind(this)} style={[styles.active, {'backgroundColor': this.props.backgroundColor || '#363636'}]}  >
        <Text style={ styles.activeText}> {this.props.cta} </Text>
    </TouchableOpacity>
    )
  }
}

export default WideButton
