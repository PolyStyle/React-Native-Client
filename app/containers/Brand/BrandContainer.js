import React, { PropTypes, Component } from 'react';
import { View, ListView, StyleSheet, Text, Dimensions, Image, TouchableOpacity, InteractionManager} from 'react-native';
import { ProductItem, FilterLabel, ScaledImage, FollowButton }  from './../../components'
import { connect } from 'react-redux';
import { fetchBrand, followBrand, fetchBrandStream, unfollowBrand,isFollowingBrand} from './../../redux/modules/brands';


const { height,width } = Dimensions.get('window')

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  categoriesList: {
    marginTop: 50,
    flex: 1,
    width: width,
    height: height-60,
    padding: 0
  },
  backgroundHeader: {
    width: width,
    height: 290,
    position: 'absolute',
  },
  containerHeader: {
    width: width,
    backgroundColor: "#dfdfdf",
    minHeight: 290
  },
  avatar: {
    flexDirection: 'row',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
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
  sectionHeaderContainer: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionHeaderNameText: {
    paddingLeft: 10,
    fontWeight: "700",
    fontSize: 12,
    color: '#333',
  },
  followUser: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

class BrandContainer extends Component{

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }

  }


  componentDidUpdate(prevProps, prevState){
    this._renderList();
  }

  componentDidMount() {
      this.props.dispatch(fetchBrand(this.props.id));
      this.props.dispatch(fetchBrandStream(this.props.id));
      this.props.dispatch(isFollowingBrand(this.props.id));
      InteractionManager.runAfterInteractions(() => {
        this._renderList();
      })
  }


  _renderList(){
      var stream;
      if(this.props.brands[this.props.id] && this.props.brands[this.props.id].brandStream){
        // start the rendering even if I don't have objects
         stream = this.props.brands[this.props.id].brandStream
      } else {
        stream = []

      }
      var filters = [];
      for(var i=0; i<stream.length; i++){
        for(var j=0; j<stream[i].Tags.length; j++){
          var tag = stream[i].Tags[j];
          if(filters[tag.displayName] == null){
            filters[tag.displayName] = {displayName: tag.displayName, id: tag.id, quantity: 1}
          } else {
            filters[tag.displayName].quantity++;
          }
        }
      }
      var filtersArray = [];
      for (key in filters) {
        filtersArray.push(filters[key]);
      }

      filtersArray = filtersArray.sort(function(a, b) {
        return a.quantity > b.quantity ? -1 : 1;
      });

      const newDataStore = ds.cloneWithRows(stream);
      const newFilterDataStore = ds2.cloneWithRows(filtersArray);

      if(this.state.dataSource == null || (this.state.dataSource._cachedRowCount != newDataStore._cachedRowCount)){
        this.setState({
          filterDataStore :newFilterDataStore,
          dataSource: newDataStore,
        });
      }
  }
  handlerSelection(id,active){
    //this.props.handlerSelection(id,active);
  }


  handleFollowing(){
    var isFollowing = this.props.brands[this.props.id].isFollowing;
    if(isFollowing){
      // remove the follow
      this.props.dispatch(unfollowBrand(this.props.id));
    } else {
      // add the follow
      this.props.dispatch(followBrand(this.props.id));
    }
  }

  _renderHeader(){
   return (
    <View style={styles.containerHeader}>
      <ScaledImage
        id={this.props.brands[this.props.id].BackgroundImageId}
        width={width}
        styles={styles.backgroundHeader}
      />
      <View style={styles.avatarContainer}>
        <ScaledImage
          id={this.props.brands[this.props.id].AvatarImageId}
          width={width}
          styles={styles.avatar}
        />
        <View style={styles.followUser}>
        <FollowButton  cta={"Following"} active={this.props.brands[this.props.id].isFollowing} onPress={this.handleFollowing.bind(this)} />
        </View>
      </View>
      <View style={styles.separationLine} />
    </View>
    )
  }

  _renderSectionHeader(){
    if(this.state.filterDataStore.rowIdentities[0].length <= 0){
      return <View />;
    }
    return (
    <View style={styles.sectionHeaderContainer}>
           <ListView horizontal={true}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            dataSource={this.state.filterDataStore}
            enableEmptySections={true}
            renderRow={(rowData) => <View>
                <TouchableOpacity>
                  <FilterLabel quantity={rowData.quantity} description={rowData.displayName} />
                </TouchableOpacity>
              </View>}
          />
    </View>)
  }



  render() {
    if( this.props.brands && this.state.dataSource){
      return (
          <ListView
            renderHeader={this._renderHeader.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
            initialListSize ={2}
            removeClippedSubviews={true}
            enableEmptySections={true}
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) => <ProductItem navigator={this.props.navigator} {...data} active={false}  />}
          />
      );
    } else {
      return (<View/>)
    }
  }
}

function mapStateToProps ({brands}) {
  return {
    brands: brands.brands,
  }
}

export default connect(mapStateToProps)(BrandContainer)
