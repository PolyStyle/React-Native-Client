import React, { PropTypes,Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Animated } from 'react-native'
import { colors, fontSizes } from './../../styles'
import MenuButton  from './MenuButton'
import AddToCollectionView  from './AddToCollectionView'

const { height,width } = Dimensions.get('window')

class ExpandInFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      openingAnimation: new Animated.Value(),
      menuView: true,
      addToCollectionView: false,
    }

  }

  componentDidMount() {
    this.toggleOpening()
  }


  toggleOpening(){
    this.setState({
        expanded : !this.state.expanded  //Step 2
    });
    this.state.openingAnimation.setValue(0);  //Step 3
    Animated.spring(     //Step 4
        this.state.openingAnimation,
        {toValue: 45}
    ).start();  //Step 5
  }

  toggleBigScreen(){
    let finalValue = height-200;
    this.setState({
        expanded : !this.state.expanded  //Step 2
    });
    this.state.openingAnimation.setValue(45);  //Step 3
    Animated.spring(     //Step 4
        this.state.openingAnimation,
        {toValue: finalValue}
    ).start();  //Step 5
  }

  addToCollection(){
    this.toggleBigScreen();
    this.setState({
        menuView : false, 
        addToCollectionView: true,
    });
  }


  render () {
    return (
       <Animated.View style={[styles.container,{height: this.state.openingAnimation}]}>
        {this.state.menuView && <View style={styles.menuHolder} >
            <MenuButton onPress={this.addToCollection.bind(this)} description={'Add to Collection'}/>
            <MenuButton description={'Share'}/>
          </View>
        }
        {this.state.addToCollectionView && <View>
            <AddToCollectionView />
          </View>
        }
       </Animated.View>
    )
  }
}



export default ExpandInFeed


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  menuHolder: {
    flex: 1,
    flexDirection: 'row',
  }
})
