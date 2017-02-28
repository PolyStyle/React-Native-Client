import React, { PropTypes, Component } from 'react'
import { TouchableHighlight, StyleSheet, Text, View ,Dimensions, Platform, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { Navbar, StreamListView , CustomButton, Gear}  from './../../components'
import { userOnboarded } from './../../redux/modules/users'
import { PostContainer, UserProfileContainer, ProductContainer, BrandContainer, CollectionContainer} from  './../../containers'
import { fetchFeed } from './../../redux/modules/posts'

const { height,width } = Dimensions.get('window')

class StreamContainer extends Component {
  handleOnboardFinished = () => {
    if(this.state.needed <= 0){
      this.props.dispatch(userOnboarded())
    }
  }


  handlerSelection (id,active){
    console.log(id,active, '000')
    const newCounter = active ? this.state.needed-1 : this.state.needed+1;
    const isFinished = (newCounter <= 0); // if we have selected enough categories
    this.setState({
      needed: newCounter,
      readyToFinish: isFinished
    });
    
  }

  constructor (props) {
    super(props)
    this.state = {
      needed: 3, // the number of categories needed
      readyToFinish: false, // when the user has selected at least x needed categories
    }
    
    // console.log('FETCH ALL POSTS')
  }


  render () {
    const NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableHighlight
                style={styles.leftNavButton }
                underlayColor="transparent"
                onPress={() => { if (index > 0) { navigator.pop() } }}>
              <Text style={ styles.leftNavButtonText }>Back</Text>
            </TouchableHighlight>
        )}
        else { return null }
      },
      RightButton(route, navigator, index, navState) {
        if (route.onPress) return ( <TouchableHighlight
                                    onPress={ () => route.onPress() }>
                                    <Text style={ styles.rightNavButtonText }>
                                        { route.rightText || 'Right Button' }
                                    </Text>
                                  </TouchableHighlight> )
      },
      Title(route, navigator, index, navState) {
        return <View style={styles.titleHolder}><Text style={ styles.textTitle }>{route.title}</Text></View>
      }
    };


    return (
      <View style={styles.container}>
        <Navigator

          navigationBar={
             <Navigator.NavigationBar
               style={ styles.header }
               routeMapper={NavigationBarRouteMapper} />}


          initialRoute={{ title: 'Feed', name: 'Stream', index: 0 }}
          renderScene={(route, navigator) => {
            if(route.name == 'Stream'){
              return (
                <View style={styles.categoriesList}>
                  <StreamListView navigator={navigator}  handlerSelection={this.handlerSelection.bind(this)}/>
                </View>
                )
            }
            if(route.name == 'Post'){
              return (
                <View style={styles.categoriesList}>
                  <PostContainer navigator={navigator} {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'User'){
              return (
                <View style={styles.categoriesList}>
                  <UserProfileContainer navigator={navigator} {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'Product'){
              return (
                <View style={styles.categoriesList}>
                  <ProductContainer  navigator={navigator} {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'Brand'){
              return (
                <View style={styles.categoriesList}>
                  <BrandContainer navigator={navigator} {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'Collection'){
              return (
                <View style={styles.categoriesList}>
                  <CollectionContainer navigator={navigator} {...route.passProps} {...route.passState} />
                </View>
              )
            }
          }}
           />

        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  leftNavButton:{
    marginTop: (Platform.OS === 'android' ? 22 : 0),
    height: 35,
    alignItems: 'center'

  },
  leftNavButtonText: {
    fontFamily: 'AvenirNextLTW01RegularRegular',
    fontSize: (Platform.OS === 'android' ? 14 : 12),
    color: '#000000',
    marginLeft: 10
  },
  titleHolder: {
    //backgroundColor: '#00ffcc',
    width: width-140,
    alignItems: 'center'
  },
  textTitle: {
      marginTop: (Platform.OS === 'android' ? 15 : 0),
      fontSize: (Platform.OS === 'android' ? 18 : 17),
      fontFamily: (Platform.OS === 'android' ? 'AvenirNextLTW01RegularRegular' :'AvenirNextLTW01BoldRegular'),
      color: '#000000'
  },
  header: {
      width: width,
      height: 60,
      borderColor: '#000000',
      borderBottomWidth: 1,

    },
  footer: {
    width: width,
    flex: 1,
    height: 60,
    borderColor: '#111111',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
    marginTop: 60,
    flex: 1,
    width: width,
    height: height-160,
    padding: 0
  },
})


function mapStateToProps ({posts}) {
  return {
    posts: posts,
  }
}


export default connect()(StreamContainer)
