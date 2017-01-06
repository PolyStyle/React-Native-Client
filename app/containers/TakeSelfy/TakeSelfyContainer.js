import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { TakeSelfy }  from './../../components'
import { connect } from 'react-redux'
import { handleAuthRemotely } from './../../redux/modules/authentication'
import { uploadPicture } from './../../redux/modules/images'

class TakeSelfyContainer extends Component {
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
       <TakeSelfy 
        handleToSettings={this.handleToSettings}
        uploadImage={uploadPicture}
        openDrawer={this.props.openDrawer} 
        style={{flex: 1}} />
    )
  }
}

export default connect()(TakeSelfyContainer)
