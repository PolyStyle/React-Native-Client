import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet,  Text} from 'react-native'

const styles = StyleSheet.create({
  labelContainer: {
    borderRadius: 5,
    backgroundColor: '#555555',
    marginLeft: 6,
    marginRight: 2,
    padding: 3,
    marginTop: 9,
    minWidth: 50,
    height: 26,
  },
  touchArea: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText: {
    color: "#dfdfdf", 
    fontSize: 15
  },


});


class MenuButton extends Component {
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
        <Text style={styles.labelText}> {this.props.description} </Text>
     </TouchableOpacity>
   </View>
    )
  }

}

export default MenuButton