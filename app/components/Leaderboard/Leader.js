import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native'
import { colors, fontSizes } from './../../styles'

Leader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  openProfileFunction: PropTypes.func.isRequired
}

export default function Leader (props) {
  return (
    <TouchableHighlight onPress={props.openProfileFunction}>
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.image} source={{uri: props.avatar}}/>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <Text style={styles.scoreText}>Score: {props.score}</Text>
    </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: '#262630',
    borderColor: '#707176',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    padding: 5,
    fontSize: fontSizes.secondary,
    color: colors.secondary,
  },
  scoreText: {
    color: colors.primary,
  },
})
