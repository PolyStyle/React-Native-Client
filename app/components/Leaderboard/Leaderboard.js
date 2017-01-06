import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform, ActivityIndicator, ListView, TouchableOpacity, Modal} from 'react-native'
import { Navbar, Hamburger, Gear, Exit, OverlayProfile } from './../../components'
import { colors } from './../../styles'

Leaderboard.propTypes = {
  listenerSet: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func.isRequired,
  handleToSettings: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default function Leaderboard (props) {
  return (
    <View style={styles.container}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={props.modal}
          onRequestClose={props.closeModal}
        >
          <OverlayProfile />
          <Exit onPress={props.closeModal} />  
       </Modal>

      <Navbar
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Gear onPress={props.handleToSettings} />} 
        title='Friends'/>
      {props.listenerSet === false
        ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary}/>
        : <ListView renderRow={props.renderRow} renderSectionHeader={props.renderSectionHeader} dataSource={props.dataSource}  />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141420',
  },
  activityIndicator: {
    marginTop: 30,
  },
})
