import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
import Swiper from 'react-native-swiper'
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
       <Swiper style={styles.wrapper} 
        loop={false}
        ref="swiper" 
        dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
        activeDot={<View style={{backgroundColor: '#ea254f', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
        showsButtons = {this.state.showButtons}
        nextButton = {<Text style={styles.buttonText}>›</Text>}
        prevButton = {<Text style={styles.buttonText}>‹</Text>}
        onMomentumScrollEnd={this.handleComplexSwipe.bind(this)}
        showsPagination = {this.state.showButtons}
        >
        <View style={styles.slide1}>
         <Image style={styles.image} source={require('../../images/logo.png')} />
          <Text style={styles.text}>Welcome</Text>
        </View>
        <View style={styles.slide2}>
          <Image style={styles.image} source={{uri: 'https://pbs.twimg.com/profile_images/600358273351622657/D6r3E4NB.jpg'}} />
          <Text style={styles.text}>This is Marco!</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Think you can do</Text>
          <Text style={styles.text}> better than this? </Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>We too!</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Let's take your</Text>
          <Text style={styles.text}> first Selfy! </Text>
        </View>
        <View style={styles.slide3}>
            <Button style={styles.takeSnapshot} onPress={this.takeSnapshot.bind(this)}>
               Take Selfy!
            </Button>
             <Button style={styles.takeSnapshot} onPress={this.skipSelfy.bind(this)}>
               Take Later
            </Button>
        </View>
         <View style={styles.slide3}>
            { this.state.avatarSource &&
              (<View style={styles.flexContainer}>
                <Image style={styles.avatar} source={this.state.avatarSource} />
                <Text style={styles.text}>Beautiful, you are set!</Text>
                <Button style={styles.takeSnapshot} onPress={this.props.onOnboardFinished.bind(this)}>
               Take Me to the App
            </Button>
              </View>)
            }
             { !this.state.avatarSource &&
              (<View style={styles.flexContainer}>
                <Image style={styles.avatar} source={{uri: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214'}} />
                <Text style={styles.text}>This is sad, but ok!</Text>
                <Button style={styles.takeSnapshot} onPress={this.takeSnapshot.bind(this)}>
                Ok, I take a selfy!
                </Button>
                <Button style={styles.takeSnapshot} onPress={this.props.onOnboardFinished.bind(this)}>
               Take Me to the App
            </Button>
              </View>)
            }

 

        </View>
      </Swiper>
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
