import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { colors } from './../../styles'
const { height,width } = Dimensions.get('window')

export default class PreSplash extends Component {
  static propTypes = {}

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.image]}
          source={require('../../images/logoLoading.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    width: width-20,
    resizeMode: 'contain',
  }
})