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
      <View style={styles.backgroundColorContainer}>  
        <View>
          <Image style={styles.image} source={require('../../images/logoType.jpg')} />
        </View>
        <View style={styles.loginContainer}>
          <LoginButton
            readPermissions={['email','public_profile']}
            style={{
              height: 30,
              width: 200,
              marginBottom: 15,
            }}
            onLoginFinished={props.onLoginFinished}/>
          <Text style={styles.assuranceText}>
            Don't worry. We don't post anything.
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundColorContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor:'transparent',
    flexDirection:'column',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor:'#fdfdfd',
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
    marginLeft: 0,
    marginRight: 0,
    width: width,
    resizeMode: 'contain',
    marginTop: height/10,
    height: height * .4 > 300 ? 300 : height * .6
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  assuranceText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
})
