import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text} from 'react-native'
import { connect } from 'react-redux';
import { FollowButton, ScaledImage} from './../../components'

const { height,width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {

  },
 backgroundHeader: {
    backgroundColor: '#000',
    width: width,
    height: 210
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  avatar: {
    flexDirection: 'row',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
followUser: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});


class UserContainer extends Component {


  constructor (props) {
    super(props)
  };

 render(){
  console.log(this.props.user.id, this.props.users[this.props.user.id] );
    return (
    <View style={styles.container} >
      <View style={styles.backgroundHeader} >
        <View style={styles.avatarContainer} >
          <ScaledImage
            styles={styles.avatar}
            id={this.props.users[this.props.user.id].ImageId}
            width={150}
          />
          </View>
                <View style={styles.followUser}>
          {this.props.users[this.props.id] &&
            <FollowButton
              cta={"Following"} active={this.props.users[this.props.id].isFollowing}
              onPress={this.handleFollowing.bind(this)} /> }
          </View>
      </View>
   </View>
    )
  }

}


function mapStateToProps ({users}) {
  return {
    users: users,
    user: users.currentUser,
  }
}

export default connect(mapStateToProps)(UserContainer)
