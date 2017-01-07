import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager, ListView} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, UserItem, FollowButton} from './../../components'
import { fetchUser,fetchUserStream} from './../../redux/modules/users';
import { connect } from 'react-redux';


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
    height: 115,

  },
  roundedProduct: { 
    width: 100,
    height: 100,
    borderRadius: 50,
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
    width: 110,
    height: 130,
    marginRight: 5, 
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
    width: width,
    height: 210
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});



class UserProfileContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }


  constructor(props) {
    super(props);    this.state = {
      dataSource: null
    }
    this._renderList();
  }

  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.id));
    this.props.dispatch(fetchUserStream(this.props.id));

    Image.getSize(this.props.avatar, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height; // or something else
      const maxWidth = Dimensions.get('window').width;
      const imageRatio = srcWidth/srcHeight;
      this.setState({ width: width, height: width/imageRatio });
    }, error => {
    });
  }

  componentDidUpdate(prevProps, prevState){
    this._renderList();
  }

  _renderList(){
    if(!this.props.userStream) return;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(this.props.userStream);
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

  handleFollowing(){
    var isFollowing = this.state.isFollowing;
    isFollowing = !isFollowing;
    this.setState({
      isFollowing: isFollowing
    })
  }

  _renderHeader(){
   return ( 
    <Image style={styles.backgroundHeader} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:'https://s-media-cache-ak0.pinimg.com/474x/11/bc/0f/11bc0f45fb59d504151d6cd7f8d4c3ce.jpg'}} >
      <View style={styles.avatarContainer} >
      <Image style={styles.avatar} source={{uri: this.props.avatar}} /> 
      </View>
            <View style={styles.followUser}>
      <FollowButton  cta={"Following"} active={this.state.isFollowing} onPress={this.handleFollowing.bind(this)} />
      </View>
    </Image>

    )
  }

  _renderSectionHeader(){
    return ( 
    <View style={styles.sectionHeaderContainer}>
          <ListView horizontal={true}
            style={styles.productHolder}
            removeClippedSubviews={false}
            initialListSize ={10}
            showsHorizontalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => 
              <TouchableOpacity style={styles.productViewItem}  > 
              <View style={styles.productViewItem}>
                <Image style={styles.roundedProduct} source={{uri:'https://s-media-cache-ak0.pinimg.com/564x/2b/ec/48/2bec48e780adf4de0139984ff956c2b6.jpg' }} />
                <Text style={styles.productText}> Last Week Likes </Text>
              </View>
              </TouchableOpacity>
            }
          />
    </View>)
  }

  render() {
    if( this.props.user && this.state.dataSource){
    return ( 
        <ListView 
          renderHeader={this._renderHeader.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)} 
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <UserItem navigator={this.props.navigator} {...data} active={false}  />}
        /> 
    )
    } else {
      return (<View/>)
    }
  }
}
function mapStateToProps ({users}) {
  return { 
    user: users.currentUser,
    userStream: users.currentUserStream
  }
}

export default connect(mapStateToProps)(UserProfileContainer)