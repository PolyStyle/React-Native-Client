import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text} from 'react-native'

const { height,width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff00cc',
    width: width,
    height: height,
  },


});


export default class ExploreContainer extends Component {
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
    <View style={styles.container} >
       <Text> Here everything related to exploring content </Text>
   </View>
    )
  }

}

