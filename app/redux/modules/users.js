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

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_CURRENT_USER_STREAM = 'SET_CURRENT_USER_STREAM'
const ADD_USER_STREAM = 'ADD_USER_STREAM'

const UPDATE_IS_FOLLOW = 'UPDATE_IS_FOLLOW'
import {REHYDRATE} from 'redux-persist/constants'


export function fetchUser(id){
  return function(dispatch){
    return getUser(id).then(function(user){
      dispatch(addUser(user))
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


export function setCurrentUser( user ) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

function updateIsFollowing( id, isFollowing) {
  return {
    type: UPDATE_IS_FOLLOW,
    id,
    isFollowing
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  }
}


export function unfollowUser(id){
  return function(dispatch){
    return unfollowUserAPI(id).then(function(result){
      if(result){
        dispatch(updateIsFollowing(id, false));
      }
      return result;
    })
  }
}

export function followUser(id){
  return function(dispatch){
    return followUserAPI(id).then(function(result){
      // TODO IMPROVE THE QUALITY OF THE RESPONSE (CHECK IF IT DOES ACTUALLY CHANGED)
      if(result){
        dispatch(updateIsFollowing(id, true));
      }
      return result;
    })
  }
}

export function isFollowingUser(id){
  return function(dispatch){
    return isFollowingUserAPI(id).then(function(result){
      console.log('UPDATE IS FOLLOW');
      console.log(result)
      if(result){
        dispatch(updateIsFollowing(id, true));
      }

    })
  }
}

function updateFriends(friends){
  return {
    type: UPDATE_FRIENDS,
    friends
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
  currentUser : {
    isNew: true,
  }
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      console.log('RECEIVED REHYDRATE FROM user')
      var incoming = action.payload.myReducer
       console.log(incoming)
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}

      return state
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
    case UPDATE_IS_FOLLOW:
      console.log('update the state');
      console.log(state[action.id]);
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          isFollowing: action.isFollowing
        }
      }
    case SET_CURRENT_USER:
      console.log(action.user.createdAt,action.user.updatedAt)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.user,
          isNew: action.user.createdAt == action.user.updatedAt
        }
      }
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.friends
      }
    case ADD_USER :
      return {
        ...state,
        [action.user.id]: {
          ...state[action.user.id],
          ...action.user},
      }
    case ADD_MULTIPLE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case USER_ONBOARDED:
      console.log('ONBOARDED FINISHED')
      return {
        ...state,
        currentUser : {
          ...state.currentUser,
          isNew: false,
        }
      }
    default :
      return state
  }
}
