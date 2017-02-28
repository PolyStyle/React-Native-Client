import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,TouchableHighlight} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage} from './../../components'

import { fetchPost, hasLikedPost,unlikePost , likePost } from './../../redux/modules/posts'
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
    borderRadius: 25
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
  avatarContainerView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatarContainer: {

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
    console.log('CREATED ITEM', props)
    super(props)
  }
  componentDidMount() {
      console.log('INVOKING COMPONENT DID MOUNT ON ITEM')
    this.props.dispatch(fetchPost(this.props.id));
    this.props.dispatch(hasLikedPost(this.props.id));
  }
  componentWillReceiveProps(nextProps){
    console.log('RECEIVE NEW PPROPS ', nextProps)
    if((this.props.id !== nextProps.id) || (this.props.updatedAt !== nextProps.updatedAt)){
      this.props.dispatch(fetchPost(this.props.id));
      this.props.dispatch(hasLikedPost(this.props.id));
    }

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

  likePost(){
    console.log(this.props.posts);
    var isLiking = this.props.posts[this.props.id].isLiking;
    if(isLiking){
      // remove the follow
      this.props.dispatch(unlikePost(this.props.id));
    } else {
      // add the follow
      this.props.dispatch(likePost(this.props.id));
    }
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

  render(){

    let currentPost = null;
    for(var i = 0; i < this.props.posts.length; i++){
      if(this.props.posts[i].id == this.props.id){
        currentPost = this.props.posts[i];
      }
    }
    console.log(' CURRENT POST ', currentPost)
    if(currentPost && currentPost.User && currentPost.ImageId) {
      return (
        <View  shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} style={styles.container}>
          <TouchableOpacity onPress={this._navigateToPost.bind(this)}>
            <ScaledImage
              id={currentPost.ImageId}
              width={width}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer} onPress={this._navigateToUser.bind(this)}>
            <View style={styles.avatarContainerView}>
                <Text style={styles.avatarName}>
                  {currentPost.User.firstName}
                  {currentPost.User.lastName}
                </Text>
                <ScaledImage
                  styles={styles.avatar}
                  id={currentPost.User.ImageId}
                  width={50}
                />
            </View>
          </TouchableOpacity>
         <View style={styles.descriptions}>
          <View style={styles.iconContainer}>
            <Heart active={currentPost.isLiking} style={styles.heartIcon} onPress={this.likePost.bind(this)}/>
            <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
          </View>
          <View style={styles.separationLine} />
          <Text style={styles.descriptionText}>{currentPost.description}</Text>
          {currentPost.Tags.length > 0 && <View style={styles.tagList}>
            <Text style={styles.tagTitle}>Tags: </Text>
            {currentPost.Tags.map(function(object, i){
                  return <TagLabel onPress={this._navigateToCollection.bind(this, object)} description={object.displayName} key={i}/>
            }, this)}
          </View>}
          {currentPost.Brands.length > 0 &&<View style={styles.tagList}>
            <Text style={styles.tagTitle}>Brands: </Text>
            {currentPost.Brands.map(function(object, i){
                  return <TagLabel onPress={this._navigateToBrand.bind(this, object)} description={object.displayName} key={i} />
            }, this)}
          </View>
        }
         </View>
        </View>
      )
    } else {
      return (<View />)
    }
  }
}



function mapStateToProps ({posts}) {
  return {
    posts: posts.posts
  }
}


export default connect(mapStateToProps)(Item)


