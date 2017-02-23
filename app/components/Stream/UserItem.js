import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,TouchableHighlight} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage} from './../../components'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 30,
    paddingRight: 10
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5
  },
  heartIcon: {
    flexDirection: 'row',
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 12
  },
  avatar: {
    flexDirection: 'row', 
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatarName: {
    flexDirection: 'row', 
    backgroundColor: "#000000",
    color: '#ffffff',
    marginTop: 15,
    marginRight: 5,
    height: 20,
    borderRadius: 2
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 5,
    top: 5,
    position: 'absolute' 
  },
  tagList:{
    marginTop: 8,
    flexDirection: 'row'
  },
  tagTitle: {
    fontSize: 12
  }
 
});



class UserItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    active: PropTypes.bool,
    navigator: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      active: props.active,
    }
  }
  componentDidMount() {
    // Set a ratio. We should allow picture with the height between 1/2 and 3/2 of the width
  }

  onPress = () =>{ 
    const newState = !this.state.active;
    this.setState({
          active: newState
        }, function(){
    if(this.props.onPress) {
      this.props.onPress()
    } 

  });
  }

  _navigateToPost(){
  this.props.navigator.push({
      name: 'Post',
      title: 'Post',
      passProps: this.props,
      passState: this.state
    })
  }

  _navigateToUser(){
  this.props.navigator.push({
      name: 'User',
      title: this.props.username,
      passProps: this.props,
      passState: this.state
    })
  }

  _navigateToBrand(){
  this.props.navigator.push({
      name: 'Brand',
      title: 'Brand name',
      passProps: {...this.props, itemPicture: this.props.picture},
      passState: this.state
    })
  }

  _navigateToProduct(){
  this.props.navigator.push({
      name: 'Product',
      title: 'Product Name',
      passProps: {...this.props, itemPicture: this.props.picture},
      passState: this.state
    })
  }

  _navigateToCollection(){
  this.props.navigator.push({
      name: 'Collection',
      title: 'Black & White',
      passProps: this.props,
      passState: this.state
    })
  }


  render(){
    if(this.props){
      console.log('trying to load', this.props.ImageId);
    }
    return (
      <View  shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} style={styles.container}>
        <TouchableOpacity onPress={this._navigateToPost.bind(this)}>
          <ScaledImage
            id={this.props.ImageId}
            width={width}
          />
        </TouchableOpacity>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.state.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} />
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>   
       </View>
      </View>

    )
  }
}

export default UserItem