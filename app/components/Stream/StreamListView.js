import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text, BackAndroid, RefreshControl } from 'react-native';
import FeedItem from './FeedItem';
import {  trackScreenView } from './../../api/tracking'
import { fetchStreamFeed } from './../../redux/modules/streamFeed'

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ffffff',
  },
  listViewStyle: {
  }
});

class StreamListView extends React.Component {

  constructor(props) {
    super(props);

    var self = this
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id || r1.updatedAt !== r2.updatedAt});
     this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
    this.props.dispatch(fetchStreamFeed()).then(function(){
      self.updateListView();
    })
  }

  _onRefresh() {
    this.setState({refreshing: true}, function(){
        this.props.dispatch(fetchStreamFeed());
    });

  }

  componentWillUpdate(){
    if(this.state.refreshing){
      console.log('KILL the refreshing');
      this.setState({refreshing: false}, function(){
        console.log(this.state.refreshing);
        this.updateListView()
      });
    }
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    this.updateListView();
    trackScreenView('Stream Page');

  }

  componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
          this.updateListView();
  }

  handleBackButton() {
      if (this.props.navigator) {
        console.log('need to pop out something ')
          this.props.navigator.pop();
          return true;
      }
      return true;
  }




  updateListView(){
    console.log('UPDATE LIST VIEW ')
    if(!this.props.posts) return;
    // NOW THE DATA IS ORDER
    const newDataStore = this.state.dataSource.cloneWithRows(this.props.posts);
    console.log(newDataStore);
    // TODO: the stop condition to avoid loop updates is really naive, to be fixed
    console.log(this.state.dataSource.getRowCount());
    console.log(newDataStore.getRowCount());
      this.setState({
        dataSource: newDataStore,
      });



  }
  handlerSelection(position){
    console.log(this.listView.getScrollResponder());
    this.listView.getScrollResponder().scrollTo(position)
  }


  render() {
    if(!this.state.dataSource){
      return(<View />)
    }
    return (
      <ListView
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
        renderRow={(data) => <FeedItem
          navigator={this.props.navigator}
          {...data}

          active={false}
          scrollTo={this.handlerSelection.bind(this)}
          />
        }
      />
    );
  }
}

function mapStateToProps ({posts}) {
  return {
    posts: posts.feed
  }
}


export default connect(mapStateToProps)(StreamListView)
