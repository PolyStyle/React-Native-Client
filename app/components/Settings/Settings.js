import React, {PropTypes, Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Switch, Image, Alert} from 'react-native'
import { Navbar, Close } from './../../components'
import { colors, fontSizes } from './../../styles'
import Slider from 'react-native-slider' 
import { connect } from 'react-redux'

class Settings extends Component {


  static propTypes = {
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onTimerChange: PropTypes.func.isRequired,
    onRestChange: PropTypes.func.isRequired,
    onRestComplete: PropTypes.func.isRequired,
    onTimerComplete: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      avatarSource: null
    }
  }

  onValueChange(value){
    this.setState({switchValue: value});
  }

  render() {
    return (
 
    <View style={styles.container}>
      <Navbar
        title='Settings'
        leftButton={<Close onPress={this.props.onBack}/>} />
 
         <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <View style={styles.sliderContainer}>
            <Text style={styles.titleText}>Distance</Text>
            <Text style={styles.valueText}>{this.props.timerDuration}</Text>
            <Text style={styles.minutes}>{this.props.timerDuration === 1 ? 'Kilometer' : 'Kilometers'}</Text>
            <Slider
              minimumValue={1}
              maximumValue={60}
              onSlidingComplete={this.props.onTimerComplete}
              thumbTintColor={colors.border}
              step={1}
              minimumTrackTintColor={colors.blue}
              value={this.props.timerDuration}
              onValueChange={this.props.onTimerChange} />
          </View>
         </View>


           <View style={styles.sliderContainer}>
              <Text style={styles.titleText}>Age Range</Text>
              <Text style={styles.valueText}>{this.props.restDuration}</Text>
              <Text style={styles.minutes}>{this.props.restDuration === 1 ? 'Year' : 'Years'}</Text>
              <Slider
                minimumValue={18}
                maximumValue={60}
                onSlidingComplete={this.props.onRestComplete}
                thumbTintColor={colors.border}
                step={1}
                minimumTrackTintColor={colors.blue}
                value={this.props.restDuration}
                onValueChange={this.props.onRestChange} />
            </View>
       
      <TouchableOpacity onPress={this.props.onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 50,
    color: colors.blue,
    textAlign: 'center',
    padding: 15,
  },
  minutes: {
    color: colors.secondary,
    textAlign: 'center',
  },
  logout: {
    backgroundColor: colors.blue,
    alignItems: 'stretch',
    borderRadius: 25,
    margin: 25,
    padding: 10,
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  }
})
export default connect()(Settings)
