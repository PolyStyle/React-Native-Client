import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text, Platform, Image, ActivityIndicator, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import { CustomButton, ScaledImage, FooterIcon} from './../../components'
import { fetchUser } from './../../redux/modules/users';
import { uploadProfilePicture, saveTemporaryProfile } from './../../redux/modules/users'
import { fetchUserCollections } from './../../redux/modules/users'
import UserCollectionsContainer from './UserCollectionsContainer'

const ImagePicker = require('react-native-image-picker')
import Icon from 'react-native-vector-icons/Ionicons'

const { height,width } = Dimensions.get('window')

const MARGIN_STANDARD = 14;
const AVATAR_SIZE = (width-(MARGIN_STANDARD*3))/5*2;
const TEXT_HEADER_SIZE = (width-(MARGIN_STANDARD*3))/5*3;
const SUBTEXT_HEADER_SIZE = (TEXT_HEADER_SIZE-(MARGIN_STANDARD*2))/3;
const styles = StyleSheet.create({
  container: {

  },
 backgroundHeader: {
    backgroundColor: '#000',
    width: width,
    height: 210
  },
  avatarContainer: {
    marginLeft: MARGIN_STANDARD,
    position: 'absolute',
    zIndex: 2,
  },
  avatar: {
    flexDirection: 'row',
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
  },
  editButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 10,
    },
  saveButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  changeAvatar: {
    position: 'absolute',
    height: Math.floor(AVATAR_SIZE/2)*2,
    width: Math.floor(AVATAR_SIZE/2)*2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(AVATAR_SIZE/2)*2,
    backgroundColor: '#333',
    opacity: .60,
  },
  cameraIcon: {
    backgroundColor: 'transparent'
  },
  productViewItem: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundPicture:{
    position: 'absolute',
    top: 0,
    height: 0,
    width: width,
    height: height,
    opacity: .6,
  },
  headerUserProfileBackground:{
    width: width,
    height: Math.round(width*0.39),
  },

  overlayContent: {
    width: width,
    minHeight: height,
    paddingTop: 80,
  },
  overlayContentBackground: {
    backgroundColor: '#fff',
    width: width,
    height: height,
  },
  userNameText: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 26,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 10,
    zIndex: 4,
    marginTop: 40,
    lineHeight: 32,
    width:  TEXT_HEADER_SIZE,
    height: 32,
    textAlign: 'center',
  },
  subTextStyle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 14,
    position: 'absolute',
    backgroundColor: 'transparent',
    width: SUBTEXT_HEADER_SIZE,
    zIndex: 4,
    lineHeight: 20,
    height: 25,
    textAlign: 'center',
    marginTop: 110,
  },
  subTextValueStyle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    position: 'absolute',
    backgroundColor: 'transparent',
    width: SUBTEXT_HEADER_SIZE,
    zIndex: 4,
    lineHeight: 20,
    height: 25,
    textAlign: 'center',
    marginTop: 98,
  },
  postsNameText:{
    right: 30+SUBTEXT_HEADER_SIZE*2,
  },
  likesNameText:{
    right: 10,
  },
  followersNameText:{
    right: 20+SUBTEXT_HEADER_SIZE,
  },


// MENU
 bottomMenu: {

    width: width,

    backgroundColor: '#fff',
    marginTop: 20,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 42,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: '#111111'
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});


class UserContainer extends Component {


  constructor (props) {
    super(props)
    this.state= {
      isEditing: false,
    }
  };

   componentDidMount() {
    this.props.dispatch(fetchUserCollections(this.props.user.id))
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
        <ScaledImage
          styles={styles.backgroundPicture}
          id={this.props.user.ImageId}
          width={width}
          loading={false}
        />
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
        <ScrollView style={styles.overlayContent} >
          <View style={styles.avatarContainer} >
              { !this.state.avatarSource &&
                <ScaledImage
                  styles={styles.avatar}
                  id={this.props.user.ImageId}
                  width={AVATAR_SIZE}
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
          <Text style={styles.userNameText} >{this.props.user.firstName +' '+this.props.user.lastName} </Text>
          <Text style={[styles.subTextStyle, styles.postsNameText]}>posts</Text>
          <Text style={[styles.subTextStyle, styles.likesNameText]}>likes</Text>
          <Text style={[styles.subTextStyle, styles.followersNameText]}>followers</Text>
          <Text style={[styles.subTextValueStyle , styles.postsNameText]}>1234</Text>
          <Text style={[styles.subTextValueStyle, styles.likesNameText]}>14k</Text>
          <Text style={[styles.subTextValueStyle, styles.followersNameText]}>999M</Text>

          <Image
            style={styles.headerUserProfileBackground}
            source={require('../../images/headerUserProfileBackground.png')}
          />
          <View style={styles.overlayContentBackground}  >
            <View style={styles.bottomMenu}>
              <View style={styles.buttonContainer}>
                <FooterIcon isActive={true} onPress={() =>{}} iconName={'ios-browsers'}  active={true}   />
                <FooterIcon  isActive={false} onPress={() =>{}} iconName={'ios-heart'}  active={true}   />
                <FooterIcon isActive={false} onPress={() =>{}} iconName={'ios-person-add'}  active={true}  />
                <FooterIcon isActive={false} onPress={() =>{}} iconName={'ios-people'}  active={true}   />
                <FooterIcon isActive={false} onPress={() =>{}} iconName={'ios-stats'}  active={true}
                  />
              </View>
            </View>
            <UserCollectionsContainer userId={this.props.user.id} />
          </View>
        </ScrollView>
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
