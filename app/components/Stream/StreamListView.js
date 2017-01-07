import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text, BackAndroid } from 'react-native';
import Item from './Item';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});

class StreamListView extends React.Component {

   

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     

    this.state = {
      dataSource: ds.cloneWithRows(this.props.posts),
    };
  
  }

  componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton() {
      console.log('Handle navigator ', this.props.navigator)
        if (this.props.navigator) {
          console.log('need to pop out something ')
            this.props.navigator.pop();
            return true;
        }
        return true;
    }


 
  componentDidUpdate(props){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(this.props.posts);
    // TODO: the stop condition to avoid loop updates is really naive, to be fixed
    if(this.state.dataSource._cachedRowCount !=  newDataStore._cachedRowCount){
      this.setState({
        dataSource: newDataStore,
      });
    }
     
  } 
  handlerSelection(id,active){
    //this.props.handlerSelection(id,active);
  }


  render() {
    return ( 
      <ListView 
        removeClippedSubviews={true} 
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Item navigator={this.props.navigator} {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
      /> 
    );
  }
}

function mapStateToProps ({posts}) {
  return { 
    posts: posts.posts,
  }
}


export default connect(mapStateToProps)(StreamListView)