import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,TouchableHighlight} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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



class Item extends Component {
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
    // TODO THIS IS TOOO TIME CONSUMING. 
    Image.getSize(this.props.picture, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height; // or something else
      const maxWidth = Dimensions.get('window').width;
      const imageRatio = srcWidth/srcHeight;
      this.setState({ width: width, height: width/imageRatio });
    }, error => {
      console.log('error:', error);
    });
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
      title: this.props.User.displayName,
      passProps: this.props.User,
      passState: this.state
    })
  }

  _navigateToBrand(brandData){
  this.props.navigator.push({
      name: 'Brand',
      title: brandData.displayName,
      passProps: brandData,
    })
  }

  _navigateToCollection(collectionData){
  this.props.navigator.push({
      name: 'Collection',
      title: collectionData.displayName,
      passProps: collectionData,
      passState: this.state
    })
  }


/*
Array[0]
Products
:
Array[0]
Tags
:
Array[0]
UserId
:
1
createdAt
:
"2016-12-25T20:26:19.000Z"description:"Marcos favorite outfit"
id:20
picture:"https://s-media-cache-ak0.pinimg.com/474x/1a/eb/2e/1aeb2eff3242f5884a8a23e4bdb7946f.jpg"
updatedAt:"2016-12-25T20:26:19.000Z"

*/
  render(){
    return (
      <View  shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} style={styles.container}>
        <TouchableHighlight onPress={this._navigateToPost.bind(this)}>
          <Image onPress={this._navigateToPost.bind(this)} source={{uri:this.props.picture}} style={{ width: this.state.width, height: this.state.height }} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.avatarContainer} onPress={this._navigateToUser.bind(this)}>
        <View style={styles.avatarContainer}>
            <Text style={styles.avatarName}> {this.props.User.displayName} </Text>
            <Image style={styles.avatar} source={{uri:this.props.User.avatar}} /> 
        </View>
        </TouchableHighlight>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.state.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>{this.props.description}</Text>
        {this.props.Tags.length > 0 && <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          {this.props.Tags.map(function(object, i){
                return <TagLabel onPress={this._navigateToCollection.bind(this, object)} description={object.displayName} key={i}/>
          }, this)}
        </View>} 
        {this.props.Brands.length > 0 &&<View style={styles.tagList}>
          <Text style={styles.tagTitle}>Brands: </Text>
          {this.props.Brands.map(function(object, i){
                return <TagLabel onPress={this._navigateToBrand.bind(this, object)} description={object.displayName} key={i} /> 
          }, this)}
        </View>
      }
       </View>
      </View>
    )
  }
}

export default Item