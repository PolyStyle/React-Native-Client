import {getFriends, getSubscribing } from './../../api/auth'
import {
  getUser,
  getUserStream,
  followUser as followUserAPI,
  unfollowUser as unfollowUserAPI,
  isFollowingUser as isFollowingUserAPI,
  getUserCollections,
  addCollection,
  uploadImage,
  saveUserProfile
} from './../../api/api_proxy'




// OLD PART
const ADD_USER = 'ADD_USER'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'
const USER_ONBOARDED = 'USER_ONBOARDED'
const UPDATE_FRIENDS = 'UPDATE_FRIENDS'

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_CURRENT_USER_STREAM = 'SET_CURRENT_USER_STREAM'
const ADD_USER_STREAM = 'ADD_USER_STREAM'

const UPDATE_USER_FOLLOW = 'UPDATE_USER_FOLLOW'
const ADD_USER_COLLECTIONS = 'ADD_USER_COLLECTIONS'
const ADD_TEMPORARY_PROFILE_IMAGE = 'ADD_TEMPORARY_PROFILE_IMAGE'
const SAVE_TEMPORARY_PROFILE = 'SAVE_TEMPORARY_PROFILE'
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
  console.log('SEt current user', user)
  return {
    type: SET_CURRENT_USER,
    user
  }
}

function updateIsFollowing( id, isFollowing) {
  return {
    type: UPDATE_USER_FOLLOW,
    id,
    isFollowing
  }
}

export function addUser(user) {
  console.log('ADD USER ', user);
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

export function fetchUserCollections(userId){
  console.log('RECEIVED CALL ON REDUX')
  return function(dispatch){
    return getUserCollections(userId).then(function(collections){
      dispatch(addUserCollections(userId, collections))
    })
  }
}

export function uploadProfilePicture(source){
  return function(dispatch){
    return uploadImage(source,[
        { width: 100, height: 100 },
        { width: 500, height: 500 },
        { width: 1000, height: 1000 }
      ]).then(function(ImageResult){
        console.log(ImageResult, ImageResult.id)
        dispatch(addTemporaryProfileImage(ImageResult.id))
    })
  }
}


function addTemporaryProfileImage(id){
  return {
    type: ADD_TEMPORARY_PROFILE_IMAGE,
    id: id,
  }
}


export function saveTemporaryProfile(tempProfile){
  return function(dispatch){
    return saveUserProfile(tempProfile).then(function(user){
        dispatch(setCurrentUser(user))

    })
  }
}




function addUserCollections(userId, collections){
  console.log('ADD USER COLLECTIONS ACTION', userId, collections)
  return {
    type: ADD_USER_COLLECTIONS,
    id: userId,
    collections: collections
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
     case SET_CURRENT_USER_STREAM:
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
    case ADD_USER_COLLECTIONS:
      let version = 0;
      console.log(state[action.id])
      if(state[action.id].collections){
        version = state[action.id].collections.version + 1
      }
      console.log(version)
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          collections: {
            version: version,
            collections: action.collections
          }
        }
      }
    case UPDATE_USER_FOLLOW:
      console.log('update the state');
      console.log(state[action.id]);
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          isFollowing: action.isFollowing
        }
      }
    case ADD_TEMPORARY_PROFILE_IMAGE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          temporaryProfile: {
            ImageId: action.id
          }
        }
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        [action.user.id]: {
          ...state[action.user.id],
          ...action.user,
        },
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
