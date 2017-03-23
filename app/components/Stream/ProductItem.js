import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage, ExpandInFeed} from './../../components'
import { connect } from 'react-redux'
import { fetchProduct,unlikeProduct,likeProduct, hasLikedProduct } from './../../redux/modules/products'

const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: width,
    minHeight: 300,

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
  },
  imageContainer: {
    minHeight: 350,
        justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    minHeight: 300,
    backgroundColor: '#dfdfdf',
    marginBottom: 120,
  }

});



class ProductItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    navigator: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      exapndedMoreMenu: false,
    }

  }

  componentDidMount() {
    this.props.dispatch(fetchProduct(this.props.id));
    this.props.dispatch(hasLikedProduct(this.props.id));
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
      title: this.props.displayName,
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

  likeProduct(){
    if(this.props.products[this.props.id].isLiking){
      // remove the follow
      this.props.dispatch(unlikeProduct(this.props.id));
    } else {
      // add the follow
      this.props.dispatch(likeProduct(this.props.id));
    }
  }

  expandMoreMenu(){
    //this.props.scrollTo({y:-50})
    this.setState({
      exapndedMoreMenu: !this.state.exapndedMoreMenu
    })
  }

  render(){
    if (this.props.products[this.props.id] && this.props.products[this.props.id].ImageId) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.imageContainer}
            onPress={this._navigateToProduct.bind(this)}>
            <ScaledImage
              setNativeProps
              id={this.props.ImageId}
              width={width}
            />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <Heart active={this.props.products[this.props.id].isLiking} style={styles.heartIcon}  onPress={this.likeProduct.bind(this)}/>
            <MoreDots ref="moreButton" active={this.state.exapndedMoreMenu} style={styles.addIcon} onPress={this.expandMoreMenu.bind(this)}/>
          </View>
          {this.state.exapndedMoreMenu && <ExpandInFeed taskAchievedCallback={this.expandMoreMenu.bind(this)} itemType={'PRODUCT'} item={this.props.products[this.props.id]}/>}
        <View style={styles.descriptions}>
          <View style={styles.separationLine} />
          <Text style={styles.descriptionText}> {this.props.productCode} This is a detail description of something long.</Text>
         </View>
        </View>
      )
    } else {
      return (<View style={styles.boxContainer} />)
    }
  }
}


function mapStateToProps ({products}) {
  return {
    products: products.products
  }
}


export default connect(mapStateToProps)(ProductItem)
