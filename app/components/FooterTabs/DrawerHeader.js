import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { colors, fontSizes } from './../../styles'

DrawerHeader.propTypes = {
  photoURL: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

function DrawerHeader (props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: props.photoURL}}/>
      <Text style={styles.nameText}>{props.displayName}</Text>
      <Text style={styles.scoreText}>Score: {props.score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 500,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    paddingTop: 120,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    fontSize: fontSizes.primary,
    color: colors.primary,
    marginTop: 8,
    marginBottom: 3,
  },
  scoreText: {
    fontSize: fontSizes.secondary,
    color: colors.secondary,
  }
})

function mapStateToProps ({users, authentication, scores}) {
  const { authedId } = authentication
  return {
    photoURL: 'https://s-media-cache-ak0.pinimg.com/236x/a2/30/5b/a2305b74f056e7d02feb60b29363211c.jpg',
    displayName: 'users[authedId].displayName',
    score: 22,
  }
}

export default connect(
  mapStateToProps
)(DrawerHeader)
