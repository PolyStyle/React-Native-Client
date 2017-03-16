import React, { PropTypes, Component } from 'react'
import { TouchableHighlight, StyleSheet, Text, View ,Dimensions, Platform, Navigator, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Navbar, StreamListView , CustomButton, Gear, Hamburger}  from './../../components'
import { userOnboarded } from './../../redux/modules/users'
import { PostContainer, UserProfileContainer, ProductContainer, BrandContainer, CollectionContainer} from  './../../containers'
import DrawerLayout from 'react-native-drawer-layout';

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
      hamburgerMenuOpen: false,
      needed: 3, // the number of categories needed
      readyToFinish: false, // when the user has selected at least x needed categories
      openingMenuAnimation: new Animated.Value(),
    }

    // console.log('FETCH ALL POSTS')
  }

  closeHamburger(){
    this.setState({
      hamburgerMenuOpen: false,
    })

      Animated.spring(     //Step 4
          this.state.openingMenuAnimation,
          {toValue: 0}
      ).start();  //Step 5
  }

  openHamburger(){
    this.setState({
      hamburgerMenuOpen: true,
    })
     this.state.openingMenuAnimation.setValue(0);  //Step 3
      Animated.spring(     //Step 4
          this.state.openingMenuAnimation,
          {toValue: height}
      ).start();  //Step 5
  }

  render () {
    var self = this;
    const NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableHighlight
                style={styles.leftNavButton }
                underlayColor="transparent"
                onPress={() => { if (index > 0) { navigator.pop() } }}>
              <Text style={styles.leftNavButtonText }>Back</Text>
            </TouchableHighlight>
        )}
        else { return null }
      },
      RightButton(route, navigator, index, navState) {
          /*
<TouchableHighlight

                                    onPress={ () => route.onPress() }>
                                    <Text style={ styles.rightNavButtonText }>
                                        { route.rightText || 'Right Button' }
                                    </Text>
                                  </TouchableHighlight>
          */

          return (<Hamburger style={styles.rightNavButton } active={true}  onPress={self.openHamburger.bind(self)} />)
      },
      Title(route, navigator, index, navState) {
        return <View style={styles.titleHolder}><Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={ styles.textTitle}>{route.title}</Text></View>
      }
    };


    return (
      <View style={styles.container}>
       <Animated.View style={[styles.hamburgerMenu,{height: this.state.openingMenuAnimation}]}>
        {this.state.hamburgerMenuOpen && <View>
           <Hamburger style={styles.closeHamburger } active={true}  onPress={this.closeHamburger.bind(this)} />

        </View>}
       </Animated.View>
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
  },
  closeHamburger: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  hamburgerMenu: {
    backgroundColor: '#0fc',
    height: 200,
    width: width,
    position: 'absolute',
    opacity: .8,
    zIndex: 100,
  },
  leftNavButton:{
    width: 50,
    marginTop: (Platform.OS === 'android' ? 22 : 0),
    height: 35,
    alignItems: 'center'
  },
  rightNavButton:{
    width: 50,
    marginTop: (Platform.OS === 'android' ? 22 : 0),
    height: 35,
    margin: 0,
    right: 0,
    alignItems: 'center'
  },
  leftNavButtonText: {
    fontFamily: 'AvenirNextLTW01RegularRegular',
    fontSize: (Platform.OS === 'android' ? 14 : 12),
    color: '#000000',
    marginLeft: 10
  },
  titleHolder: {
    width: width-140 ,
    alignItems: 'center'
  },
  textTitle: {
      marginTop: (Platform.OS === 'android' ? 15 : 0),
      fontSize: (Platform.OS === 'android' ? 17 : 15),
      fontFamily: (Platform.OS === 'android' ? 'AvenirNextLTW01RegularRegular' :'AvenirNextLTW01BoldRegular'),
      color: '#000000'
  },
  header: {
      width: width,
      height: 60,
      position: 'absolute',
      top: 0,
      borderColor: '#000000',
      borderBottomWidth: 1,
      padding: 0,
      margin: 0,
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
