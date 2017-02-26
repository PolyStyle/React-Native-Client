import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { OnboardingListView , CustomButton}  from './../../components'
import { connect } from 'react-redux'
import { userOnboarded } from './../../redux/modules/users'
const { height,width } = Dimensions.get('window')

class OnboardingContainer extends Component {
  handleOnboardFinished = () => {
  	if(this.state.needed <= 0){
    	this.props.dispatch(userOnboarded())
  	}
  }
  handlerSelection (id,active){
  	console.log(id,active, '000')
    const newCounter = active ? this.state.needed-1 : this.state.needed+1;
    const isFinished = (newCounter <= 0); // if we have selected enough categories
    this.setState({
      needed: newCounter,
      readyToFinish: isFinished
    });
    console.log(newCounter);
  }


  constructor (props) {
    super(props)
    this.state = {
      needed: 3, // the number of categories needed
      readyToFinish: false, // when the user has selected at least x needed categories
    }
  }

  render () {
    return (
    	<View style={styles.container}>
    		<View style={styles.header}>
    			{this.state.needed > 0 &&
    				<Text style={{fontFamily: 'AvenirNext-Bold'}}> Select {this.state.needed} more categor{this.state.needed == 1 ? 'y' : 'ies'}</Text>
    				||
    				<Text style={{fontFamily: 'AvenirNext-Bold'}}> Add more categories, press Next when done</Text>
    			}
    		</View>
    		<View style={styles.categoriesList}>
    			<OnboardingListView handlerSelection={this.handlerSelection.bind(this)}/>
    		</View>
    		<View style={styles.footer}>
    			<CustomButton cta={"Next"} active={this.state.readyToFinish} onPress={this.handleOnboardFinished.bind(this)} />
    		</View>
		</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  header: {
  	width: width,
  	height: 50,
    justifyContent: 'center',
  	borderColor: '#111111',
  	borderBottomWidth: 1,
  	alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
  	width: width,
  	height: 80,
  	borderColor: '#111111',
  	borderTopWidth: 1,
  	alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
  	flex: 1,
  	width: width,
    height: height-100,
  }
})

export default connect()(OnboardingContainer)
