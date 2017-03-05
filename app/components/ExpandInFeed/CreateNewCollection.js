import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text,Dimensions, TextInput } from 'react-native';
import {ScaledImage, WideButton} from './../../components'
import FeedItem from './../Stream/FeedItem';
import CollectionGroupItem from './CollectionGroupItem'


const { height,width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
 
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  previewImage: {
    width: width-40,
    borderRadius: 7,
    margin: 10,
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
  }
});

class CreateNewCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Some Text',
    };
  }

  componentWillUpdate(){
  }
  componentDidMount() {
  }

  componentWillUnmount() {
      
  }

  handlerSelectItem(index){

    if(index == 0){
      this.props.onCreateNewCollection();
    }
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
        <ScaledImage
          styles={styles.previewImage}
          id={Math.floor(Math.random()*6000+1000)}
          width={200}
        />
        <View style={styles.buttonHolder}> 
            <WideButton onPress={this.props.backToPrevious.bind(this)} opacity={.5} backgroundColor={'#202020'} cta="Cancel" />
            <WideButton    cta="Create" />
        </View>
      </View>
    );
  }
}


export default CreateNewCollection
