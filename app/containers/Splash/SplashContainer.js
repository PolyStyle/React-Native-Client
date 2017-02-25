import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet , Dimensions, Image} from 'react-native'
import { LogIn }  from './../../components'
import { connect } from 'react-redux'
import { handleAuthRemotely } from './../../redux/modules/authentication'

const { height,width } = Dimensions.get('window')

class SplashContainer extends Component {
  handleLoginFinished = (error, result) => {
    console.log('LOGIN FINISHED')
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      console.log(result)
      this.props.dispatch(handleAuthRemotely())
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundColorContainer}>  
          <View>
            <Image style={styles.image} source={require('../../images/logoType.png')} />
          </View>
          <LogIn />
        </View>
      </View>
    )
  }
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
 
  image: {
    marginLeft: 0,
    marginRight: 0,
    width: width,
    resizeMode: 'contain',
    marginTop: height/10,
    height: height * .4 > 300 ? 300 : height * .6
  }, 
})
export default connect()(SplashContainer)
