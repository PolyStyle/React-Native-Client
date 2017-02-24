import {getFriends, getSubscribing } from './../../api/auth'
import {
  getUser,
  getUserStream,
  followUser as followUserAPI,
  unfollowUser as unfollowUserAPI,
  isFollowingUser as isFollowingUserAPI
} from './../../api/api_proxy'




// OLD PART
const ADD_USER = 'ADD_USER'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'
const USER_ONBOARDED = 'USER_ONBOARDED'
const UPDATE_FRIENDS = 'UPDATE_FRIENDS'
const UPDATE_SUBSCRIBING = 'UPDATE_SUBSCRIBING'

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_CURRENT_USER_STREAM = 'SET_CURRENT_USER_STREAM'
const ADD_USER_STREAM = 'ADD_USER_STREAM'



export function fetchUser(id){
  return function(dispatch){
    return getUser(id).then(function(user){
      dispatch(setCurrentUser(user))
    })
  }
}
export function fetchUserStream(id){
  return function(dispatch){
    return getUserStream(id).then(function(userStream){
      dispatch(addUserStream(userStream))
      dispatch(setCurrentUserStream(userStream))
    })
  }
}

function addUserStream(userStream) {
  return {
    type: ADD_USER_STREAM,
    userStream: userStream
  }
}

function setCurrentUserStream(userStream) {
  return {
    type: SET_CURRENT_USER_STREAM,
    userStream: userStream
  }
}


function setCurrentUser( user ) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function addUser(id, user) {
  return {
    type: ADD_USER,
    id,
    user,
  }
}

export function unfollowUser(id){
  return function(dispatch){
    return unfollowUserAPI(id).then(function(result){
      return result;
    })
  }
}

export function followUser(id){
  return function(dispatch){
    return followUserAPI(id).then(function(result){
      return result;
    })
  }
}

export function isFollowingUser(id){
  return function(dispatch){
    return isFollowingUserAPI(id).then(function(result){
      return result;
    })
  }
}

function updateFriends(friends){
  return {
    type: UPDATE_FRIENDS,
    friends
  }
}
function updateSubscribing(subscribing){
  return {
    type: UPDATE_SUBSCRIBING,
    subscribing
  }
}

export function friends(){
  return  function (dispatch) {
    return getFriends()
      .then(function(friends){
        dispatch(updateFriends(friends));
      })
  }
}

export function subscribing(){
  return function (dispatch) {
    return getSubscribing()
      .then(function(subscribing){
        dispatch(updateSubscribing(subscribing));
      })
  }
}

export function addMultipleUsers (users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
  }
}
export function userOnboarded(){
  return {
    type: USER_ONBOARDED
  }
}

// this state is for isNew.
const initialState = {
  isNew: false,
}

export default function users (state = {}, action) {
  switch (action.type) {
     case SET_CURRENT_USER_STREAM:
     console.log('+++++')
     console.log(action.userStream);
      return {
        ...state,
        currentUserStream: action.userStream
      }
    case ADD_USER_STREAM:
      // TODO : needs to be added to an array, not just reinizialed every time
      // ideally using the brand id as key to access the dictionary
      return {
        ...state,
        userStreams: [action.userStream]
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
        [action.user.id]: action.user,
      }
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.friends
      }
    case UPDATE_SUBSCRIBING:{
      return {
        ...state,
        subscribing: action.subscribing
      }
    }
    case ADD_USER :
      return {
        ...state,
        [action.id]: action.user,
        isNew: false,
      }
    case ADD_MULTIPLE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case USER_ONBOARDED:
      return {
        ...state,
        isNew: false
      }
    default :
      return state
  }
}
