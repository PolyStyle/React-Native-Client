import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage, ExpandInFeed} from './../../components'

import { fetchPost, hasLikedPost,unlikePost , likePost } from './../../redux/modules/posts'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerLeft: {
    height: 140,
    width: width/2 - 25,
    backgroundColor: '#252525',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5
  },
  containerRight: {
    height: 140,
    width: width/2 - 25,
    backgroundColor: '#252525',
    marginTop: 15,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingBottom: 30,
    paddingRight: 10
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1,

  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  heartIcon: {
    flexDirection: 'row',
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 12,
    marginBottom: 12,
    fontSize: 11,
    color: '#666666'
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
  },
  textTitle: {
      color: '#cccccc',
      fontFamily: 'AvenirNextLTW01RegularRegular',
      fontSize: 13, 
      lineHeight: 12,
  },
  previewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 200,
  },
  bigImageContainer: {
    width: 73,
    height: 73,
    borderRadius: 3,
    overflow: 'hidden',
  },
  smallImageContainer: {
    width: 32,
    height: 33,
    marginLeft: 7,
    marginBottom: 7,
    borderRadius: 2,
  }
});



class CollectionGroupItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    active: PropTypes.bool,
    navigator: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      currentIndexInPosts: -1,
      exapndedMoreMenu: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.id));
    this.props.dispatch(hasLikedPost(this.props.id));
  }
  componentWillReceiveProps(nextProps){
    if((this.props.id !== nextProps.id) || (this.props.updatedAt !== nextProps.updatedAt)){
      // retrive new props in case there has been a change in the information about this item
      // usualing coming from the container
      this.props.dispatch(fetchPost(nextProps.id));
      this.props.dispatch(hasLikedPost(nextProps.id));
    }


    let currentPost = null;
    let index = -1;
    for(var i = 0; i < this.props.posts.length; i++){
      if(this.props.posts[i].id == this.props.id){
        index = i;
      }
    }

    this.setState({
      currentIndexInPosts : index,
    })

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
    if(this.props.posts[this.state.currentIndexInPosts].isLiking){
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

  _navigateToUser(user){
  this.props.navigator.push({
      name: 'User',
      title: user.displayName,
      passProps: {
        id: user.id,
        users: {
          [user.id]: user
        }
      },
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

  expandMoreMenu(){
    //this.props.scrollTo({y:-50})
    this.setState({
      exapndedMoreMenu: !this.state.exapndedMoreMenu
    })
  }

  render(){
    let currentPost;
    if(this.state.currentIndexInPosts > -1){
      currentPost = this.props.posts[this.state.currentIndexInPosts];
    }
    if(currentPost && currentPost.User && currentPost.ImageId) {
      return (
        <View 
          shouldRasterizeIOS={true} 
          renderToHardwareTextureAndroid={true} 
          style={(this.props.index % 2) ? styles.containerRight : styles.containerLeft}>
          <Text style={styles.textTitle}>Collection name with 30 chars</Text>
          <Text style={styles.descriptionText}>125 Products, 120 Posts</Text>
          <View style={styles.previewContainer}>
             <ScaledImage
                styles={styles.bigImageContainer}
                id={1045}
                width={50}
              />
 
             <View style={styles.previewContainer}>
              <ScaledImage
                styles={styles.smallImageContainer}
                id={8999}
                width={20}
              />
              <ScaledImage
                styles={styles.smallImageContainer}
                id={10999}
                width={20}
              />
              <ScaledImage
                styles={styles.smallImageContainer}
                id={3009}
                width={20}
              />
              <ScaledImage
                styles={styles.smallImageContainer}
                id={10009}
                width={20}
              />
           
            </View>
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


export default connect(mapStateToProps)(CollectionGroupItem)


