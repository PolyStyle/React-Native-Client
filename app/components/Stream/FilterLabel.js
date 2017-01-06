import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet,  Text} from 'react-native'

const styles = StyleSheet.create({
  labelContainer: {
    borderRadius: 5,
    backgroundColor: '#333333',
    marginLeft: 2,
    padding: 3,
    marginRight: 2,
  },
  touchArea: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText: {
    color: "#cccccc", 
    fontSize: 14
  },
  quantity:{
    color: "#999999",
    fontSize: 10

  }

});


class FilterLabel extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    quantity: PropTypes.string,
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
        <Text style={styles.quantity}> {this.props.quantity} </Text>
        <Text style={styles.labelText}> {this.props.description} </Text>
     </TouchableOpacity>
   </View>
    )
  }

}

export default FilterLabel