import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
import { Navbar, Gear, Hamburger, ScaledImage } from './../../components'
const { height } = Dimensions.get('window')

UserProfile.propTypes = {
  user: PropTypes.object,
  openDrawer: PropTypes.func,
  handleToSettings: PropTypes.func.isRequired,
}

export default function UserProfile (props) {
  return (
    <View>

    
     <Image style={styles.container} source={{uri:'https://s-media-cache-ak0.pinimg.com/564x/02/ba/b1/02bab1edd5d7a0c09f5d3ee1677581c0.jpg'}}  >
       
      <Navbar
        title='Me'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Gear onPress={props.handleToSettings}/>} />
      
    
    </Image>
     <View style={styles.container2} >

    </View>
     <Text style={styles.profileText}> {props.user.displayName} </Text>
      <Text style={styles.scoreText}> score : {props.user.score} </Text> 
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: height/2
  },
  container2: {
    flex: 1, 
    backgroundColor: '#49579e',
      height: height/2
  },
  profileText: {
    position: 'absolute',
    top: height/3 - 40,
    left: 5,
    fontSize: 30,
    color: '#fff',
    fontFamily: 'AvenirNext-Bold',
    textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2, 
    textShadowColor: '#1f2b68'
  },
  scoreText: {
    position: 'absolute',
    top: height/3 -  5,
    left: 15,
    fontSize: 10,
    color: '#fff',
    fontFamily: 'AvenirNext-Bold', 
    textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2, 
    textShadowColor: '#1f2b68'
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  image: {
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
})
