import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet,  Text} from 'react-native'

const styles = StyleSheet.create({
  labelContainer: {
    borderRadius: 5,
    backgroundColor: '#333333',
    marginRight: 2,
  },
  touchArea: {
    backgroundColor: 'transparent'
  },
  labelText: {
    color: "#ffffff", 
    fontSize: 12
  }

});


class TagLabel extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func,
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
    <View style={styles.labelContainer} >
      <TouchableOpacity style={styles.touchArea}  onPress={this.onPress.bind(this)}>
        <Text  style={styles.labelText}> {this.props.description} </Text>
     </TouchableOpacity>
   </View>
    )
  }

}

export default TagLabel