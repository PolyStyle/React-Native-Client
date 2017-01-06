import React, { PropTypes, Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'



class Heart extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    size: 25,
    active: false
  };

  constructor (props) {
    super(props)

  };

  onPress() {
    if(this.props.onPress) {
      this.props.onPress(this.props.email)
    } 
  }

 render(){
    return (
    <TouchableOpacity onPress={this.onPress.bind(this)}>
      {!this.props.active && <Icon name='ios-heart-outline' size={this.props.size} color={'#666'} />}
      {this.props.active && <Icon name='ios-heart' size={this.props.size} color={'#19181b'} />}
    </TouchableOpacity>
    )
  }

}

export default Heart