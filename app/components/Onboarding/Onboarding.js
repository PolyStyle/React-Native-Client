import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
// import Swiper from 'react-native-swiper'
const { height,width } = Dimensions.get('window') 
const Button = require('apsl-react-native-button')
const ImagePicker = require('react-native-image-picker')

import { connect } from 'react-redux'
 
class Onboarding extends Component {
  static propTypes = {
    onOnboardFinished: PropTypes.func.isRequired, 
  }
  constructor (props) {
    super(props)
    this.state = {
      avatarSource: null,
      showButtons: true,
    }
  }

  takeSnapshot = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     */
    const options = {
      title: 'Let\'s take a Selfy',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
      skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // Reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
        this.skipSelfy()
      }
    });
  };

  handleComplexSwipe = (e, state, context) => {
    console.log('index:', state.index)
    if(state.index === 5){
       this.setState({
          showButtons: false
        });
    } else {
        if(!context.props.showButtons){
        // add again the buttons only if they were not visibile
          this.setState({
            showButtons: true
          });
        }
    }
  }

  skipSelfy = () =>{
    // move to the preview avatar page only if is not there already
    console.log(this.refs.swiper.state.index == 5, this.refs.swiper.state.index)
    if( this.refs.swiper.state.index == 5){
     this.refs.swiper.scrollBy(1,true)
    }
  }


  render() {
    return(
    <View style={styles.container}>
 
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  flexContainer: {
    flex: 1,
        justifyContent: 'center',
    alignItems: 'center',
  },  
  image: {
    width: width,
    resizeMode: 'contain',
    height: height * .4 > 300 ? 300 : height * .4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
   slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 60,
    color: '#ea254f'
  },
   takeSnapshot: {
    width: width/3*2,
    marginLeft: width/6,
    backgroundColor: '#ed532b',
    borderColor: '#ed532b',
  },
    avatar: {
    borderRadius: 150,
    width: 300,
    height: 300
  }
})


export default connect()(Onboarding)
