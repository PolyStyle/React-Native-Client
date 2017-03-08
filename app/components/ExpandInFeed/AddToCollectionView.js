import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity ,StyleSheet,  Text, Dimensions} from 'react-native'
import CollectionListView  from './CollectionListView'
import CollectionGroupItem from './CollectionGroupItem'
import CreateNewCollection from './CreateNewCollection'



const { height,width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  labelContainer: {
    borderRadius: 5,
    backgroundColor: '#555555',
    marginLeft: 6,
    marginRight: 2,
    padding: 3,
    marginTop: 9,
    minWidth: 50,
    height: 26,
  },
  touchArea: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
      color: '#aaaaaa',
      fontFamily: 'AvenirNextLTW01RegularRegular',
      fontSize: 15
  },
  separationLine: {
    marginTop: 20,
    borderColor: '#333333',
    borderBottomWidth: 1,
    width: width-20,
    marginBottom: 10
  },
});


class AddToCollectionView extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  constructor (props) {
    super(props)
     this.state = {
      showListView: true,
      showNewCollection: false,
    };
  };

  onPress() {
    if(this.props.onPress) {
      this.props.onPress()
    }
  }

  createNewCollectionHandler() {
    this.setState({
      showListView: false,
      showNewCollection: true,
    })
  }

  backToPrevious(){
    this.setState({
      showListView: true,
      showNewCollection: false,
    })
  }

 render(){
    if(this.props){
      return (
        <View style={styles.container} >
          <Text style={styles.textTitle}> Add to Collection</Text>
          <View style={styles.separationLine} />
          {this.state.showListView && <CollectionListView
            item={this.props.item}
             itemType={this.props.itemType}
            userId={this.props.userId}
            taskAchievedCallback={this.props.taskAchievedCallback}
            onCreateNewCollection={this.createNewCollectionHandler.bind(this)}/>}
          {this.state.showNewCollection && <CreateNewCollection
            userId={this.props.userId}
            backToPrevious={this.backToPrevious.bind(this)}
            itemType={this.props.itemType}
            item={this.props.item}
            onCreateNewCollection={this.createNewCollectionHandler.bind(this)}/>}
        </View>
      )
    } else {
      return (<View />)
    }
  }
}
function mapStateToProps ({users}) {
  return {
    userId: users.currentUser.id,
  }
}


export default connect(mapStateToProps)(AddToCollectionView)
