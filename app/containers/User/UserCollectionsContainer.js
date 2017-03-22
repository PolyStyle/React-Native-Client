import React, { PropTypes, Component } from 'react'
import { View, TouchableOpacity ,StyleSheet, Dimensions, Text} from 'react-native'
import { connect } from 'react-redux';
import { fetchUserCollections } from './../../redux/modules/users'
import { CollectionsCarousel} from './../../components'

const { height,width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fc0',
    height: 200,
    width: width,
  },
 backgroundHeader: {
    backgroundColor: '#000',
    width: width,
    height: 210
  },



});


class UserCollectionsContainer extends Component {


  constructor (props) {
    super(props)
    this.state= {
      isEditing: false,
    }
  };

   componentDidMount() {
    this.props.dispatch(fetchUserCollections(this.props.userId));
    console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS' , nextProps)
  }


 render(){

    if(!this.props.collections || this.props.collections.length <= 0){
      return (<View />)
    }
    console.log('i should render', this.props.collections.length)
    return (
      <View style={styles.container} >
        {this.props.collections.map(function(collection, i){
          return <CollectionsCarousel key={i} collectionIndex={i} />
        }, this)}
     </View>
    )
  }

}


function mapStateToProps({users}) {
  if(!users[users.currentUser.id] ||
    !users[users.currentUser.id].collections ||
    !users[users.currentUser.id].collections.collections){
    return {};
  }
  return {
    collections: users[users.currentUser.id].collections.collections,
  }

}

export default connect(mapStateToProps)(UserCollectionsContainer)
