import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Cards }  from './../../components'
import { connect } from 'react-redux'
import { handleAuthRemotely } from './../../redux/modules/authentication'

class SwipeContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  handleToSettings = () => {
    this.props.navigator.push({
      settings: true
    })
  }
  render () {
    return (
      <Cards 
	      handleToSettings={this.handleToSettings}
	      openDrawer={this.props.openDrawer} 
	      style={{flex: 1}} />
    )
  }
}

export default connect()(SwipeContainer)
