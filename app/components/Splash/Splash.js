import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
const { height,width } = Dimensions.get('window')

Splash.propTypes = {
  onLoginFinished: PropTypes.func.isRequired,
}

export default function Splash (props) {
  return (
    <View style={styles.container}>
      <Image source={ require('../../images/openingBackground.jpg')} resizeMode='cover' style={styles.backgroundColorContainer}>  
        <View>
          <Image style={styles.image} source={require('../../images/logoType.png')} />
        </View>
        <View style={styles.loginContainer}>
          <LoginButton
            readPermissions={['email','public_profile']}
            style={{
              height: 30,
              width: 180,
              marginBottom: 15,
            }}
            onLoginFinished={props.onLoginFinished}/>
          <Text style={styles.assuranceText}>
            Don't worry. We don't post anything.
          </Text>
        </View>
      </Image>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundColorContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    flex: 1,
    backgroundColor:'#713ef1',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    width: width-20,
    resizeMode: 'contain',
    height: height * .4 > 300 ? 300 : height * .4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  assuranceText: {
    color: '#ffffff',
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
})
