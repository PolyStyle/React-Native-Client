import React, { PropTypes, Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './../../styles'



class MoreDots extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    size: 25,
  };

  constructor (props) {
    super(props)
    this.state = {
      active: props.active,
    }
  };

  onPress() {
    const newState = !this.state.active;
     this.setState({
          active: newState
        });
 
    if(this.props.onPress) {
      this.props.onPress(this.props.email,newState)
    } 
  }

 render(){
    return (
    <TouchableOpacity onPress={this.onPress.bind(this)}>
      {!this.state.active && <Icon name='ios-more-outline' size={this.props.size} color={'#666'} />}
      {this.state.active && <Icon name='ios-more' size={this.props.size} color={'#19181b'} />}
    </TouchableOpacity>
    )
  }

}

export default MoreDots