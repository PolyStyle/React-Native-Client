import { auth } from './../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
var Selfie = require('./server.js');
var selfie = null;
var onAuthStateChangedCallbacks = [];

export var selfie;

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

// TODO: rewrite this pseudo subscriber-topic pattern. 
// Was part of the initial boilerplate but doesn't make much sense anymore
export function onAuthStateChanged(callback) { 
  onAuthStateChangedCallbacks.push(callback);
}

export function authWithToken (accessToken) {
  selfie = new Selfie({facebookToken: accessToken});
  return selfie.profile().then(function(profile){
      // allign profile to user
      // call onAuthStateChange
      for (var i = onAuthStateChangedCallbacks.length - 1; i >= 0; i--) {
        // we callback all the subscriber to this event.
        onAuthStateChangedCallbacks[i](profile);
      }
      return profile;
  }) 
}

export function getFriends(){ 
  return selfie.friends();
} 

export function getSubscribing(){
 
  return selfie.subscribing();
}

 

// this should update the user when server side. As it is is just mocking it.
export function updateUser (user) { 
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, user);
  }); 
}

export function logout () {
  LoginManager.logOut()
  auth.signOut()
  //ref.off()
}