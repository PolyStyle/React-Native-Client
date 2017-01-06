import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d7d7d7'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    flex: 1,
    width: width,
    height: 250, 
    marginBottom: 1,
  },
  labelDeactive: {
    borderRadius: 2,
    alignItems: 'center',    
    justifyContent: 'center',
    top: 183,
    height: 42,
    width: width-50,
    marginLeft: 25,
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
  },
  labelActive: {
    borderRadius: 2,
    alignItems: 'center',    
    justifyContent: 'center',
    top: 183,
    height: 42,
    width: width-50,
    marginLeft: 25,
    backgroundColor: '#333',
    borderColor: '#333',
  },
  textDeactive: {
    fontFamily: 'AvenirNext-Bold',
    color: '#333'
  },
  textActive: {
    fontFamily: 'AvenirNext-Bold',
    color: '#fff'
  }
});


class Row extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    active: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      active: props.active,
    }
  }

  onPress = () =>{
    console.log(this.props);
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
      <View style={styles.container}>
      <TouchableOpacity onPress={this.onPress.bind(this)} >
        <Image source={this.state.active ? {uri:this.props.picture.active} : {uri:this.props.picture.deactive}} style={styles.photo}>
          <View style={this.state.active ? styles.labelActive : styles.labelDeactive} >
            <Text style={this.state.active ? styles.textActive : styles.textDeactive}>{`${this.props.name}`}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    </View>
    )
  }
}

export default Row