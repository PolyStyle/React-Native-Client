
import React from 'react';
import { connect } from 'react-redux';
import { View, ListView, StyleSheet, Text } from 'react-native';
import { Item }  from './../../components'
import { fetchTag,fetchTagStream  } from './../../redux/modules/tags';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});

class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
    };
    this._renderList();
  }

  componentDidMount() {
    this.props.dispatch(fetchTag(this.props.id));
    this.props.dispatch(fetchTagStream(this.props.id));
  }
  componentDidUpdate(props){
    this._renderList();
  }

  _renderList(){
     if(!this.props.tagStream) return;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(this.props.tagStream);
    // TODO: the stop condition to avoid loop updates is really naive, to be fixed
     if(this.state.dataSource == null || (this.state.dataSource._cachedRowCount != newDataStore._cachedRowCount)){
      this.setState({
        dataSource: newDataStore,
      });
    }     
  }

  handlerSelection(id,active){
    console.log('bubble up')
  }

  render() {
    if( this.props.tag && this.state.dataSource){
      return (
        <ListView 
          initialListSize ={2}
          removeClippedSubviews={true} 
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Item navigator={this.props.navigator} {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
        />
      );
    } else {
      return (<View />)
    }
  }
}

function mapStateToProps ({tags}) {
  return { 
    tag: tags.currentTag,
    tagStream: tags.currentTagStream
  }
}

export default connect(mapStateToProps)(CollectionContainer);