import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text, BackAndroid, RefreshControl } from 'react-native';
import Item from './Item';

import { fetchAllPosts } from './../../redux/modules/posts'

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ffffff',
    paddingTop: 46,
  },
  listViewStyle: {
    paddingTop: 46,
  }
});

class StreamListView extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true}, function(){
        this.props.dispatch(fetchAllPosts());

    });

  }

  componentWillUpdate(){
    if(this.state.refreshing){
      console.log('KILL the refreshing');
      this.setState({refreshing: false}, function(){
        console.log(this.state.refreshing);
      });
    }
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    this.updateListView(this.props);
  }

  componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  handleBackButton() {
      if (this.props.navigator) {
        console.log('need to pop out something ')
          this.props.navigator.pop();
          return true;
      }
      return true;
  }


  orderByTimeDesc(a,b) {
    if (a.createdAt < b.createdAt)
      return 1;
    if (a.createdAt > b.createdAt)
      return -1;
    return 0;
  }

  updateListView(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataList = [];
    console.log('FOR OFFFF')
    console.log(this.props.posts);
    // ORDER BY createdAT
    for (var key in this.props.posts) {
      dataList.push(this.props.posts[key])
    }
    dataList = dataList.sort(this.orderByTimeDesc)
    // NOW THE DATA IS ORDER
    const newDataStore = ds.cloneWithRows(dataList);
    console.log(newDataStore);
    // TODO: the stop condition to avoid loop updates is really naive, to be fixed

    if(!this.state.dataSource || this.state.dataSource._cachedRowCount !=  newDataStore._cachedRowCount){
      console.log('I NEED TO RE RENDER')
      this.setState({
        dataSource: newDataStore,
      });
    }

  }
  handlerSelection(id,active){
    //this.props.handlerSelection(id,active);
  }


  render() {
    if(!this.state.dataSource){
      return(<View />)
    }
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            title="Loading..."
            titleColor="#00ff00"
          />}

        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Item navigator={this.props.navigator} {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
      />
    );
  }
}

function mapStateToProps ({posts}) {
  return {
    posts: posts.posts
  }
}


export default connect(mapStateToProps)(StreamListView)
