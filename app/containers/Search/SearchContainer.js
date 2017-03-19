import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text} from 'react-native'
import { SearchBox }  from './../../components'
const { height,width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: width,
    height: height,
  },


});


export default class SearchContainer extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props)
  };

 render(){
    return (
    <View style={styles.container} >
      <SearchBox />
   </View>
    )
  }

}

