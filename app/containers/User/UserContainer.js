import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text} from 'react-native'
import { connect } from 'react-redux';
import { CustomButton, ScaledImage} from './../../components'
import { fetchUser } from './../../redux/modules/users';
import Icon from 'react-native-vector-icons/Ionicons'

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
    backgroundColor: '#75ffc0',
  },
  avatar: {
    flexDirection: 'row',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  editButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  changeAvatar: {
    position: 'absolute',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    backgroundColor: '#333',
    opacity: .8,
  },
  cameraIcon: {
    backgroundColor: 'transparent'
  }
});


class UserContainer extends Component {


  constructor (props) {
    super(props)
    this.state= {
      isEditing: false,
    }
  };

   componentDidMount() {
    this.props.dispatch(fetchUser(this.props.user.id));
  }

  handleStartEdit(){
    this.setState({
      isEditing: true,
    })
  }

  handleCancelEdit(){
    this.setState({
      isEditing: false
    })
  }

 render(){
  console.log(this.props.user.id  );
    return (
    <View style={styles.container} >
      <View style={styles.backgroundHeader} >
        <View style={styles.avatarContainer} >
          <ScaledImage
            styles={styles.avatar}
            id={this.props.user.ImageId}
            width={150}
          />
          {this.state.isEditing &&
            <View style={styles.changeAvatar} >
               <Icon
               style={styles.cameraIcon}
                name='ios-camera-outline'
                size={50}
                color={'#fdfdfd'}
               />
            </View>
          }
        </View>
        <View style={styles.editButton}>
          {this.props.users[this.props.user.id] && !this.state.isEditing &&
            <CustomButton
              cta={"Edit"}
              active={this.props.users[this.props.user.id].isFollowing}
              onPress={this.handleStartEdit.bind(this)}
            />
          }
          {this.props.users[this.props.user.id] && this.state.isEditing &&
            <CustomButton
              cta={"Cancel"}
              active={this.props.users[this.props.user.id].isFollowing}
              onPress={this.handleCancelEdit.bind(this)}
            />
          }
          </View>
          <View style={styles.saveButton}>
          {this.props.users[this.props.user.id] && this.state.isEditing &&
            <CustomButton
              cta={"Save"}
              active={this.props.users[this.props.user.id].isFollowing}
              onPress={this.handleCancelEdit.bind(this)}
            />
          }

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
