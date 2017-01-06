'use strict';

import React from 'react'
import
{
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Platform,
    Dimensions,
    TouchableHighlight
} from 'react-native'
import { Navbar, Gear, Hamburger } from './../../components'
import { colors } from './../../styles'
import SwipeCards from './SwipeCards';

const {height, width} = Dimensions.get('window');

let Card = React.createClass({

  render() {
     
    return (
      <View style={styles.card} elevation={6}>
        <TouchableHighlight onPress={this.props.handleTouch}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        </TouchableHighlight>
        <View style={styles.textHolder}>
          <Text style={styles.text}>This is card {this.props.name}</Text>
        </View>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
        <Text>Come back soon, we have more for you</Text>
      </View>
    )
  }
})

const CardsArray = [
  {name: '1', image: 'https://s-media-cache-ak0.pinimg.com/474x/63/93/3c/63933c3e01fdea429ff86646ab8939d6.jpg'},
  {name: '2', image: 'https://s-media-cache-ak0.pinimg.com/474x/25/6a/8f/256a8f69b3ec7d149295e50053e2c398.jpg'},
  {name: '3', image: 'https://s-media-cache-ak0.pinimg.com/474x/32/8b/3f/328b3febdb59628b99f321b664e94de8.jpg'},
  {name: '4', image: 'https://s-media-cache-ak0.pinimg.com/474x/37/2c/a9/372ca9a9705c28450440c811b32d3a2c.jpg'},
  {name: '5', image: 'https://s-media-cache-ak0.pinimg.com/474x/c6/dd/81/c6dd818fccc9bab499d38c7df8fc283b.jpg'},
  {name: '6', image: 'https://s-media-cache-ak0.pinimg.com/474x/47/06/8a/47068a866bb549d9933754ee3f117335.jpg'},
  {name: '7', image: 'https://s-media-cache-ak0.pinimg.com/474x/97/65/57/976557ee968bb435e8ecbd5bd394c1eb.jpg'},
  {name: '8', image: 'https://s-media-cache-ak0.pinimg.com/474x/2b/eb/8d/2beb8dd54af804a627047d5fe5e280fa.jpg'},
  {name: '9', image: 'https://s-media-cache-ak0.pinimg.com/474x/f8/86/24/f88624f8c4f80706f4f0e479d543a49a.jpg'},
  {name: '10', image: 'https://s-media-cache-ak0.pinimg.com/474x/0c/0c/1c/0c0c1c74691f4d25b2573111de50406d.jpg'},
  {name: '11', image: 'https://s-media-cache-ak0.pinimg.com/474x/b2/25/35/b22535bbb0190e62028bbfe2d444e46f.jpg'},
  {name: '12', image: 'https://s-media-cache-ak0.pinimg.com/474x/8c/e7/bd/8ce7bd6010fa054a1d99f105570fb513.jpg'},  
]

const Cards2 = [
  {name: '10', image: 'http://www.golden-retriever.com/wp-content/uploads/2015/06/cute-golden-retriever-happy-puppies.jpg'},
 // {name: '11', image: 'https://barkpost.com/wp-content/uploads/2014/05/6gold2-600x388.jpg'},
 // {name: '12', image: 'https://s-media-cache-ak0.pinimg.com/564x/4e/d3/66/4ed366b268b317276fcf5622059ce205.jpg'},
 // {name: '13', image: 'https://s-media-cache-ak0.pinimg.com/564x/cb/c5/8e/cbc58e5e1b368c69fc812d93a40824e7.jpg'},
]

var styles = StyleSheet.create({
  card: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: (height-width-180)/2,
    marginBottom: 10,
    width: width-60,
    height: width + 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 2
    },
    alignItems: 'center',
    backgroundColor: '#eaf6ee',
    elevation: 5,
  },
  thumbnail: {
    borderRadius: 10,
    flex: 1,
    width: width-60,
    height: width-50,
  },
  textHolder: {
    backgroundColor: '#eaf6ee',
    flex: 1,
    padding: 10,
    width: width-60,
    height: 40,
    bottom:  30,
  },
  text: {
    color: '#947089',
    fontSize: 15, 
  },
  containerStyle:{
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  

})


var Cards = React.createClass({
  getInitialState() {
    return {
      cards: CardsArray,
      outOfCards: false
    }
  },
  handleYup (card) {
    
  },
  handleNope (card) {
    
  },
  cardRemoved (index) {
    
    console.log('CALLED CARD REMOVED CALLBACK')
    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false} 
        renderCard={(cardData, handleTouch) => <Card handleTouch={handleTouch} {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
        handleToSettings={this.props.handleToSettings}
        openDrawer={this.props.openDrawer}
      />
       
    )
  }
})

module.exports = Cards



