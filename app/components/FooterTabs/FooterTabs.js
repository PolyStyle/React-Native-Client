import React, { PropTypes, Component } from 'react'
import { TabBarIOS, Text,View, StyleSheet, Dimensions,Platform } from 'react-native'
import { colors } from './../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwsome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { UserProfileContainer , LeaderboardContainer, SwipeContainer, TakeSelfyContainer, StreamContainer,SearchStack} from './../../containers'
import { FooterIcon}  from './../../components'


const { height,width } = Dimensions.get('window')
const FEED = 'Feed';
const SEARCH = 'Search';
const EXPLORE = 'Explore';
const USERPROFILE = 'User Profile';
const ADDPHOTO = 'Add Photo';


const styles = StyleSheet.create({
  container: {
    width: width,
    height: height, 
  },
  closeHamburger: {
    position: 'absolute',
    right: 8,
    top: 10,
  },
  hamburgerMenu: {
    backgroundColor: '#fff',
    height: 200,
    width: width,
    position: 'absolute',
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
  bottomMenu: {
  	position: 'absolute',
  	width: width,
  	zIndex: 100,
  	backgroundColor: '#fff',
  	top: height-42,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 42,
    borderTopWidth: 1,
    borderColor: '#111111'
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerView: {
 		width: width,
 		height: height,
 		opacity: 1, 
  },
  // This pushes the view out of the viewport, but why the negative bottom?
  hiddenContainer: {
  	opacity: 0,
  	width: 0,
  	height: 0, 
  }
})

export default class FooterTabs extends Component {
	 static propTypes = {
	 	activeFooterTab: PropTypes.string.isRequired,
	  navigator: PropTypes.object.isRequired,
	  onTabSelect: PropTypes.func.isRequired,
	 }
	constructor (props) {
	    super(props)
	    this.state = {
	      currentSection: FEED,
	    }
	    // console.log('FETCH ALL POSTS')
	  }
	 goToSearch(){
    this.setState({
      currentSection: SEARCH,
    })
  }
  goToFeed(){
    this.setState({
      currentSection: FEED,
    })
  }
  /*
	<StreamContainer navigator={this.props.navigator}/>
  <SearchContainer  navigator={this.props.navigator}/>
  */

  render(){
  	return (
  		<View style={styles.container}> 
  				<View style={this.state.currentSection == FEED ? styles.containerView : styles.hiddenContainer}>
          	 <StreamContainer navigator={this.props.navigator}/>
          </View>
 					<View style={this.state.currentSection == SEARCH ? styles.containerView : styles.hiddenContainer}>
	           <SearchStack navigator={this.props.navigator}/>
	  			</View>
          <View style={styles.bottomMenu}>
	          <View style={styles.buttonContainer}>
	            <FooterIcon isActive={this.state.currentSection == SEARCH} iconName={'ios-search'}  active={true}  onPress={this.goToSearch.bind(this)} />
	            <FooterIcon  isActive={this.state.currentSection == FEED} iconName={'ios-glasses'}  active={true}  onPress={this.goToFeed.bind(this)} />
	            <FooterIcon isActive={this.state.currentSection ==  ADDPHOTO}  iconName={'ios-add-circle'}  active={true}  onPress={this.goToSearch.bind(this)} />
	            <FooterIcon isActive={this.state.currentSection == EXPLORE} iconName={'ios-compass'}  active={true}  onPress={this.goToSearch.bind(this)} />
	            <FooterIcon isActive={this.state.currentSection == USERPROFILE} iconName={'ios-contact'}  active={true}  onPress={this.goToSearch.bind(this)} />
	          </View>
	        </View>
     </View>
  )}
}