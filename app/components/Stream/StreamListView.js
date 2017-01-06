import React from 'react';
import { connect } from 'react-redux'
import { View, ListView, StyleSheet, Text } from 'react-native';
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
    /*

    const demoData = data = [
    {
      "name": 'theUserName',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/17/e8/5c/17e85c532bb2e46b8b25b051da535de4.jpg",
      "avatar": "https://d13yacurqjgara.cloudfront.net/users/40224/screenshots/2589124/adidas_illustration.jpg",
      "username": 'Adidas',
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    }
    ];
    console.log('------ compoennt constructed ', this.props)
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log(ds.cloneWithRows(this.props.posts));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.posts),
    });
  }
  */



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