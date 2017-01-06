import React, { PropTypes, Component } from 'react'
import { ListView, Text,   } from 'react-native'
import { Leaderboard } from './../../components'
import { connect } from 'react-redux' 
import Leader from './../../components/Leaderboard/Leader'
import Header from './../../components/Leaderboard/Header'

let goldenUsers = [
    { 
      displayName: "Cookie", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/0b/fd/74/0bfd747f5f9ebe76273b01e56717bb20.jpg", 
      score: 1992, 
      category: "Local Top"
    },
    { 
      displayName: "Marco Ziccardi", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/f7/fb/a1/f7fba18994c65d1fc95d20d7fe63389f.jpg", 
      score: 392, 
      category: "Local Top"
    }, 
    { 
      displayName: "Cookie", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/0b/fd/74/0bfd747f5f9ebe76273b01e56717bb20.jpg", 
      score: 1992, 
      category: "Local Top"
    },
    { 
      displayName: "Marco Ziccardi", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/f7/fb/a1/f7fba18994c65d1fc95d20d7fe63389f.jpg", 
      score: 392, 
      category: "Local Top"
    },
    { 
      displayName: "Cookie", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/0b/fd/74/0bfd747f5f9ebe76273b01e56717bb20.jpg", 
      score: 1992, 
      category: "Local Top"
    },
    { 
      displayName: "Marco Ziccardi", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/f7/fb/a1/f7fba18994c65d1fc95d20d7fe63389f.jpg", 
      score: 392, 
      category: "Local Top"
    }, 
    { 
      displayName: "Giasone",  
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/ed/4b/eb/ed4bebea45471dc9fd28b53f6baad32c.jpg", 
      score: 22, 
      category: "Mutual Friend"
    },
    {
      displayName: "Gastone", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/8d/3e/12/8d3e1278ad54befd782577f7706141fb.jpg", 
      score: 33, 
      category: "Mutual Friend"
    },
    { 
      displayName: "Giasone",  
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/ed/4b/eb/ed4bebea45471dc9fd28b53f6baad32c.jpg", 
      score: 22, 
      category: "Mutual Friend"
    },
    {
      displayName: "Gastone", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/8d/3e/12/8d3e1278ad54befd782577f7706141fb.jpg", 
      score: 33, 
      category: "Mutual Friend"
    },
    { 
      displayName: "Giasone",  
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/ed/4b/eb/ed4bebea45471dc9fd28b53f6baad32c.jpg", 
      score: 22, 
      category: "Mutual Friend"
    },
    {
      displayName: "Gastone", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/8d/3e/12/8d3e1278ad54befd782577f7706141fb.jpg", 
      score: 33, 
      category: "Mutual Friend"
    },
    {
      displayName: "Freja", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/4d/e0/52/4de052037d01a4fb872d2c3336f361f0.jpg",
      score: 44,  
      category: "Following"
    },
    {
      displayName: "Freja", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/4d/e0/52/4de052037d01a4fb872d2c3336f361f0.jpg",
      score: 44,  
      category: "Following"
    },
    {
      displayName: "Freja", 
      photoURL: "https://s-media-cache-ak0.pinimg.com/236x/4d/e0/52/4de052037d01a4fb872d2c3336f361f0.jpg",
      score: 44,  
      category: "Following"
    }
  ];

class LeaderboardContainer extends Component {
   
  static propTypes = { 
    leaders: PropTypes.array.isRequired,
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
    this.state = {
      modal: false,
      dataSource: this.dataSource.cloneWithRowsAndSections(this.convertListArrayToMap())
    }
  }

  componentDidMount () {
    if (this.props.listenerSet === false) {
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.leaders !== this.props.leaders) {
      this.setState({
        // replace food with nextProps.leaders
        dataSource: this.dataSource.cloneWithRowsAndSections(this.convertListArrayToMap())
      })
    }
  }

  renderRow = ({displayName, photoURL, score}) => {
    return (
        <Leader openProfileFunction={this._seeProfile.bind(this)} name={displayName} avatar={photoURL} score={score} />
      )
  }

  renderSectionHeader(sectionData, category) {
    console.log('----header ----')
    console.log(sectionData, category)
    return <Header name={category} />
 
  } 

  handleToSettings = () => {
    this.props.navigator.push({
      settings: true
    })
  }

  convertListArrayToMap = () =>  {
    var goldenCategoryMap = {}; // Create the blank map
    const FRIENDS = 'Friends';
    const FOLLOWING = 'Following';
    console.log('FROM THE LEADERBOARD PANNEL -------------')
    console.log(this.props.friends);
    console.log(this.props.subscribing);

    // ADD FRIENDS 
    this.props.friends.forEach(function(friend) {
      if (!goldenCategoryMap[FRIENDS]) {
        // Create an entry in the map for the category if it hasn't yet been created
        goldenCategoryMap[FRIENDS] = [];
      } 
      friend.photoURL = 'https://s-media-cache-ak0.pinimg.com/236x/f7/fb/a1/f7fba18994c65d1fc95d20d7fe63389f.jpg';
      friend.score = 1234;
      goldenCategoryMap[FRIENDS].push(friend);
    });

    // ADD SUBSCRIBING 
    this.props.subscribing.forEach(function(subscribing) {
      if (!goldenCategoryMap[FOLLOWING]) {
        // Create an entry in the map for the category if it hasn't yet been created
        goldenCategoryMap[FOLLOWING] = [];
      } 
      subscribing.photoURL = 'https://s-media-cache-ak0.pinimg.com/236x/f7/fb/a1/f7fba18994c65d1fc95d20d7fe63389f.jpg';
      subscribing.score = 4321;
      goldenCategoryMap[FOLLOWING].push(subscribing);
    });


    console.log('finished')
    return goldenCategoryMap;
  }

  _seeProfile(){
    this.setState({
        modal: true
      })
  }

  _closeProfile(){
    this.setState({
        modal: false
      })
  }

  render () {
    return (
      <Leaderboard  
        modal={this.state.modal}
        closeModal={this._closeProfile.bind(this)}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader} 
        openDrawer={this.props.openDrawer}
        handleToSettings={this.handleToSettings} />
    )
  }
}

function mapStateToProps ({scores, users}) {
  return { 
    friends: users.friends,
    subscribing: users.subscribing,
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        score: 10,
        ...users[uid],
      }
    })
  }
}

export default connect(
  mapStateToProps
)(LeaderboardContainer)