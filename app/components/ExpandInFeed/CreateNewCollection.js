import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text,Dimensions, TextInput } from 'react-native';
import {ScaledImage, WideButton} from './../../components'
import FeedItem from './../Stream/FeedItem';
import CollectionGroupItem from './CollectionGroupItem'
import { createNewUserCollectionWithPost } from './../../redux/modules/collections'
import { fetchUserCollections } from './../../redux/modules/users'
const { height,width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {

  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  previewImageContainer: {
    width: width-40,
    height: 250,
    borderRadius: 7,
    margin: 10,
  },
  previewImage: {
    width: width-40,
    height: 250,
    borderRadius: 7,

  },
  inputHolder: {
    backgroundColor: '#252525',
    width: width-40,
    borderRadius: 4,
    margin: 10,
    paddingLeft: 5,
  },
  inputText: {
    color: '#fff',
    fontFamily: 'AvenirNextLTW01RegularRegular',
    width: width-80,
    margin: 2,
    height: 30,
  },
  buttonHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    marginTop: 10,
  },
  creatingNewCollection: {
    backgroundColor: '#333',
    position: 'absolute',
    opacity: .8,
    right: 0,
    zIndex: 2,
    width: width-40,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creatingNewCollectionText: {

    fontFamily: 'AvenirNext-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  }
});

class CreateNewCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'New Collection',
      isCreating: false,
    };
  }

  componentWillUpdate(){
  }
  componentDidMount() {
  }

  componentWillUnmount() {

  }


  createNewCollection(){
    var self = this;
    this.setState({
      isCreating: true,
    }, function(){
      if(this.props.itemType == 'POST'){
      // I'm trying to add a POST.
        this.props.dispatch(
          createNewUserCollectionWithPost(this.props.userId, this.props.item.id, this.state.text))
            .then(function(){
              console.log('CREATE NEW USER COLLECTION WITH POST')
             self.props.dispatch(fetchUserCollections(self.props.userId)) .then(function(){
                          console.log('FETCH USER COLLECTION')
                self.props.backToPrevious();
             });
        });
      }
    })
  }

  render() {

    return (
      <View>
        <View style={styles.inputHolder}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View style={styles.previewImageContainer}>
          {this.state.isCreating && <View style={styles.creatingNewCollection}>
            <Text style={styles.creatingNewCollectionText}>Creating new Collection</Text>
          </View>}
          <ScaledImage
            styles={styles.previewImage}
            id={this.props.item.ImageId}
            width={200}
          />
        </View>
        <View style={styles.buttonHolder}>
            <WideButton
              onPress={this.props.backToPrevious.bind(this)}
              opacity={.5}
              backgroundColor={'#202020'}
              cta="Cancel"
            />
            <WideButton
              cta="Create"
              onPress={this.createNewCollection.bind(this)}
            />
        </View>
      </View>
    );
  }
}

function mapStateToProps () {
  return {

  }
}


export default connect(mapStateToProps)(CreateNewCollection)
