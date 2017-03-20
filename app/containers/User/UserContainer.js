import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text, Platform, Image, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux';
import { CustomButton, ScaledImage} from './../../components'
import { fetchUser } from './../../redux/modules/users';
import { uploadProfilePicture, saveTemporaryProfile } from './../../redux/modules/users'
import { TakeSelfy }  from './../../components'

const ImagePicker = require('react-native-image-picker')
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
    backgroundColor: '#61bfad',
  },
  avatar: {
    flexDirection: 'row',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
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
    opacity: .60,
  },
  cameraIcon: {
    backgroundColor: 'transparent'
  },
  productViewItem: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
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
    console.log('USER CONTAINER')
    console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS' , nextProps)
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
  handleSaveEdit(){
    this.props.dispatch(saveTemporaryProfile(this.props.user.temporaryProfile));
    this.setState({
      isEditing: false,
      avatarSource: null
    })


  }
  takeSnapshot() {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     */
    const options = {
      title: 'Select your new profile Image',
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
        console.log(response)
        this.setState({
          avatarSource: source,
          loadingImage: true,
        });
        var ref = this;
        this.props.dispatch(uploadProfilePicture(source)).then(function(){
          ref.setState({
            loadingImage: false,
          })
        })


      }
    });
  };

 render(){
    if(!this.props.user){
      return (<View />)
    }
    return (
    <View style={styles.container} >
      <View style={styles.backgroundHeader} >
        <View style={styles.avatarContainer} >
          { !this.state.avatarSource &&

            <ScaledImage
            styles={styles.avatar}
            id={this.props.user.ImageId}
            width={150}
          />
          }
          { this.state.avatarSource &&
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          {this.state.isEditing &&
            <View style={styles.changeAvatar} >
              {!this.state.loadingImage && <TouchableOpacity style={styles.productViewItem} onPress={this.takeSnapshot.bind(this)} >
                 <Icon
                 style={styles.cameraIcon}
                  name='ios-camera-outline'
                  size={40}
                  color={'#ccc'}
                 />
               </TouchableOpacity>
              }
              {this.state.loadingImage && <ActivityIndicator
                  size="small"
                  color="#ccc"
                />
              }
            </View>
          }
        </View>
        <View style={styles.editButton}>
          {!this.state.isEditing &&
            <CustomButton
              cta={"Edit"}
              onPress={this.handleStartEdit.bind(this)}
            />
          }
          {this.state.isEditing &&
            <CustomButton
              cta={"Cancel"}
              onPress={this.handleCancelEdit.bind(this)}
            />
          }
          </View>
          <View style={styles.saveButton}>
          {this.state.isEditing &&
            <CustomButton
              cta={"Save"}
              onPress={this.handleSaveEdit.bind(this)}
            />
          }

          </View>
      </View>
   </View>
    )
  }

}


function mapStateToProps({users}) {
  return {
    user: users.currentUser,
  }

}

export default connect(mapStateToProps)(UserContainer)
