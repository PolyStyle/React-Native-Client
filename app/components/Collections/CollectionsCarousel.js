import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager, ListView} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, UserItem, FollowButton, ScaledImage} from './../../components'
import { fetchUser,fetchUserStream, unfollowUser, followUser, isFollowingUser} from './../../redux/modules/users';
import { connect } from 'react-redux';
import { trackScreenView } from './../../api/tracking'


const { height, width } = Dimensions.get('window');

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
        marginTop: 10,
    marginBottom: 10,
    fontSize: 11,
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
        fontSize: 11,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 12
  },
  containerHeader: {
    width: width,
    backgroundColor: "#ffffff",
    height: 290
  },
  avatar: {
    flexDirection: 'row',
    height: 150,
    width: 150,
    borderRadius: 75,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  followUser: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productHolder: {
    flexDirection: 'row',
    width: width,
    height: 75,

  },
  roundedProduct: {
    width: 160,
    height: 160,

  },
  roundedBrand: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0
  },
  productViewItem: {

    width: 100,
    height: 100,
    marginRight: 0,
    alignItems: 'center',
  },
  productText: {
    fontSize: 10,
    color: '#666666'
  },
  productItem: {
    width: 110,
    height: 110,
  },
  backgroundHeader: {
    backgroundColor: '#000',
    width: width,
    height: 210
  },

  carouselContainer: {
    width: width,
    padding: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    height: 200,
  },
  collectionNameText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
  }
});



class CollectionsCarousel extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }


  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }
    this._renderList();
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState){
    this._renderList();
  }

  _renderList(){
    if(!this.props.collection) return;
    console.log(this.props.collection.Products, this.props.collection.Posts)
    const mergeContent = this.props.collection.Products.concat(this.props.collection.Posts);
    console.log('Merge content', mergeContent)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(mergeContent);
    console.log(newDataStore);
    if(this.state.dataSource == null || (this.state.dataSource._cachedRowCount != newDataStore._cachedRowCount)){
      this.setState({
        dataSource: newDataStore,
      });
    }
  }


  onPress = () =>{
    if(this.props.onPress) {
      this.props.onPress()
    }
  }




  render() {

    if(!this.props.collection || !this.state.dataSource){
      return null
    }
    console.log('I SHOULD RENDER COLLECTION',this.props.collection.displayName)
    return(
      <View style={styles.carouselContainer}>
        <Text style={styles.collectionNameText} >{this.props.collection.displayName}</Text>

        <ListView horizontal={true}
          style={styles.productHolder}
          removeClippedSubviews={false}
          initialListSize ={10}
          enableEmptySections={true}
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
              <ScaledImage
                styles={styles.roundedProduct}
                id={rowData.ImageId}
                width={100}
              />

          }
      />
      </View>
    )
  }
}
function mapStateToProps ({users},ownProps) {
  if(users.currentUser == null){
    return {}
  }
  return {
    collection: users[users.currentUser.id].collections.collections[ownProps.collectionIndex]
  }
}

export default connect(mapStateToProps)(CollectionsCarousel)
