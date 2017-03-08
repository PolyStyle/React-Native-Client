import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text, BackAndroid, RefreshControl } from 'react-native';
import FeedItem from './../Stream/FeedItem';
import CollectionGroupItem from './CollectionGroupItem'
import CollectionCreateNewItem from './CollectionCreateNewItem'
import { fetchUserCollections } from './../../redux/modules/users'
import { addPostToCollection } from './../../redux/modules/collections'

const styles = StyleSheet.create({
  container: {

  },
  list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
  listViewStyle: {
  }
});

class CollectionListView extends React.Component {

  static propTypes = {
    userId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    var self = this
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id || r1.updatedAt !== r2.updatedAt});
     this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
    console.log('--------------');
    this.props.dispatch(fetchUserCollections(this.props.userId)).then(function(){

      console.log('callback to fetch User COllections');
       self.updateListView();
    })
  }

  _onRefresh() {
    this.setState({refreshing: true}, function(){
        this.props.dispatch(fetchUserCollections(this.props.userId))

    });

  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    console.log('INFO ABOUT AT THIS STAGE');
    console.log(this.props)
    this.updateListView();

  }

  componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
      //this.updateListView();
  }

  handleBackButton() {
      if (this.props.navigator) {
          this.props.navigator.pop();
          return true;
      }
      return true;
  }




  updateListView(){
    console.log('CURRENT COLLECTION LISTS: ', this.props.collections)

    if(!this.props.collections) return;

    // ADD AN EMPTY COLLECTION AS PLACEHOLDER FOR THE 'CREATE A NEW ONE'
    var newCollectionPlaceholder = {
      displayName : "Create New Collection"
    }
    const collections = [newCollectionPlaceholder].concat(this.props.collections)
    // NOW THE DATA IS ORDER
    const newDataStore = this.state.dataSource.cloneWithRows(collections);
    console.log(newDataStore);
    // TODO: the stop condition to avoid loop updates is really naive, to be fixed

      this.setState({
        dataSource: newDataStore,
      });



  }
  handlerScroll(position){
    console.log(this.listView.getScrollResponder());
    this.listView.getScrollResponder().scrollTo(position)
  }
  handlerAddToExistingCollection(id){

    if(this.props.itemType == 'POST'){
      // I'm trying to add a POST.
      this.props.dispatch(addPostToCollection(id, this.props.item));
    }

    this.props.taskAchievedCallback();
  }

  handlerCreateNewCollection(){
    this.props.onCreateNewCollection();
  }

  render() {
    if(!this.state.dataSource){
      return(<View />)
    }
    return (
      <ListView
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            enableEmptySections={true}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            title="Loading..."
            titleColor="#000000"
          />}
        ref={ref => this.listView = ref}
        enableEmptySections={true}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data, sectionID, rowID) =>
          rowID > 0 ?
          <CollectionGroupItem
            navigator={this.props.navigator}
            index={rowID}
            {...data}
            selectItem={this.handlerAddToExistingCollection.bind(this,data.id)}
            active={false}
            scrollTo={this.handlerScroll.bind(this)}
          /> :
          <CollectionCreateNewItem
            {...data}
            selectItem={this.handlerCreateNewCollection.bind(this)}
          />
        }
      />
    );
  }
}

function mapStateToProps ({users},ownProps) {
  return {
    collections: users[ownProps.userId].collections,
  }
}


export default connect(mapStateToProps)(CollectionListView)
