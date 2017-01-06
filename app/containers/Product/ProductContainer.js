import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, ListView, Dimensions, TouchableOpacity, InteractionManager} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components'
import { fetchProduct, fetchSameProducts } from './../../redux/modules/products';
import { connect } from 'react-redux';


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
    paddingRight: 10
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
    height: 90,
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  roundedProduct: { 
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  roundedBrand: { 
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0
  },
  productItem: {
    width: 90,
    height: 90,
    marginRight: 10, 
  }
});



class ProductContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchProduct(this.props.id));
    this.props.dispatch(fetchSameProducts(this.props.id));
    // Set a ratio. We should allow picture with the height between 1/2 and 3/2 of the width
    // TODO: too time consuming, needs to be refactored.
       Image.getSize(this.props.picture, (srcWidth, srcHeight) => {
        const maxHeight = Dimensions.get('window').height; // or something else
        const maxWidth = Dimensions.get('window').width;
        const imageRatio = srcWidth/srcHeight;
        this.setState({
        currentImage: this.props.itemPicture,
         width: width, height: width/imageRatio });
      }, error => {
        console.log('error:', error);
      });
  }

  componentDidUpdate(prevProps, prevState){
    console.log(this.props);
    if(!this.props.sameProductsList || 
        this.props.sameProductsList.length == 0) {
      return
    } // Don't render similar products if this is unique


    // add the current product to the list of all the other products,
    // in this way this will always be rendered as first option
      
    let newList = [this.props.product].concat(this.props.sameProductsList)
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(newList);
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
  _selectProduct(rowData){
    this.setState({
      currentImage: rowData.picture
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
    if( this.props.product){
      return (
        <ScrollView style={styles.container}>
         <Image shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri: this.state.currentImage || this.props.picture }} style={{ width: this.state.width, height: this.state.height }}>
         </Image>
         <View>
            {this.state.dataSource &&
              <ListView horizontal={true}
              style={styles.productHolder}
              removeClippedSubviews={false}
              showsHorizontalScrollIndicator={false}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                  <TouchableOpacity style={styles.productItem} onPress={this._selectProduct.bind(this,rowData)}> 
                  <View style={styles.productItem}>
                    <Image style={styles.roundedProduct} source={{uri:rowData.picture }} />
                  </View>
                  </TouchableOpacity>
                }
              />
            }
          </View>
         <View style={styles.descriptions}>
          <View style={styles.iconContainer}>
            <Heart active={this.props.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
            <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
          </View>
          <View style={styles.separationLine} />
          <Text style={styles.descriptionText}>By: {this.props.product.Brand.displayName} </Text>
          <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
          <View style={styles.tagList}>
            <Text style={styles.tagTitle}>Tags: </Text>
            <TagLabel onPress={this._navigateToCollection.bind(this)} description="Sneakers" />
            <TagLabel onPress={this._navigateToCollection.bind(this)} description="Daily Fashion" />
            <TagLabel onPress={this._navigateToCollection.bind(this)} description="Trendy" />
          </View>
          <View style={styles.separationLine} />
         </View>
        </ScrollView>
      )
    } else {
    return (<View />)
    }
  }
}


function mapStateToProps ({products}) {
  return { 
    product: products.currentProduct,
    sameProductsList: products.sameProductsList,
  }
}


export default connect(mapStateToProps)(ProductContainer)