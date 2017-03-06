import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, Image, ListView, Dimensions, TouchableOpacity, InteractionManager} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage} from './../../components';
import {  hasLikedPost,unlikePost , likePost } from './../../redux/modules/posts';
import {  trackScreenView } from './../../api/tracking'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingBottom: 30,
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 30,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'column',
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    maxHeight: 30,
  },
  heartIcon: {
    flexDirection: 'row',
    height: 30,
  },
  addIcon: {
    flexDirection: 'row',
    height: 30,
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
    marginRight: 5,
    marginTop: 5
  },
  tagList:{
    marginTop: 8,
    flexDirection: 'row'
  },
  tagTitle: {
    fontSize: 12
  },

  productHolder: {
    height: 120,
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  roundedProduct: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  roundedBrand: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20
  },
  productItemHolder: {
    width: 120,
    height: 120,
    marginRight: 20,
    borderRadius: 60,
  },
  brandItemHolder: {
    width: 40,
    height: 40,
    right: 0,
    position: 'absolute',
    zIndex: 20,
  }
});



class PostContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
        active: false,
        currentIndexInPosts: -1,
      };
  }

  componentDidMount() {
    trackScreenView('Post Screen', {label: 'id', value: this.props.id})
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
    //this.props.dispatch(fetchPost(this.props.id));
  }


  componentDidUpdate(prevProps, prevState){

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



  _navigateToBrand(brandData){
  this.props.navigator.push({
      name: 'Brand',
      title: brandData.displayName,
      passProps: brandData,
    })
  }

  _navigateToProduct(rowData){
  this.props.navigator.push({
      name: 'Product',
      title: 'Product',
      passProps: rowData,
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
    let currentPost = null;
    if(this.state.currentIndexInPosts > -1){
      currentPost = this.props.posts[this.state.currentIndexInPosts];
    }
    if(!currentPost){
      return (<View />)
    }
    return (
      <ScrollView style={styles.container}>
       <TouchableOpacity onPress={()=>{}}>
          <ScaledImage
            id={currentPost.ImageId}
            width={width}
          />
       </TouchableOpacity>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={currentPost.isLiking} style={styles.heartIcon} onPress={this.likePost.bind(this)}/>
          <MoreDots style={styles.addIcon} />
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>Posted by: {currentPost.User.displayName} </Text>
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          {currentPost.Tags.map(function(tag, i){
            return <TagLabel onPress={this._navigateToCollection.bind(this, tag)} key={i} description={tag.displayName} />
          }, this)}
        </View>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Brands: </Text>
           {currentPost.Brands.map(function(brand, i){
            return <TagLabel onPress={this._navigateToBrand.bind(this, brand)} key={i} description={brand.displayName} />
          }, this)}
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.tagTitle}>In this post: </Text>
        {this.state.allProducts && <ListView horizontal={true}
            showsHorizontalScrollIndicator={false}
              style={styles.productHolder}
              dataSource={this.state.allProducts}
              renderRow={(rowData) => <View>
                  <TouchableOpacity onPress={this._navigateToProduct.bind(this, rowData)} style={styles.productItemHolder}>
                   <ScaledImage
                      styles={styles.roundedProduct}
                      id={rowData.ImageId}
                      width={120}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._navigateToBrand.bind(this, rowData.Brand)} style={styles.brandItemHolder}>
                    <ScaledImage
                      styles={styles.roundedBrand}
                      id={rowData.Brand.AvatarImageId}
                      width={40}
                    />
                  </TouchableOpacity>
                </View>}
              />
        }
        <View style={styles.separationLine} />
       </View>
      </ScrollView>
    )
  }
}

//onPress={this._navigateToProduct.bind(this,rowData)}>

function mapStateToProps ({posts}) {
  return {
    posts: posts.posts,
  }
}


export default connect(mapStateToProps)(PostContainer)
