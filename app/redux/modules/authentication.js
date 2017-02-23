import { updateUser, logout, getFriends, getSubscribing } from './../../api/auth'

import { getAccessToken, authWithFacebook } from './../../api/api_proxy'
import { fetchSettings } from './../../api/settings'
import { addSettingsTimerDuration, addSettingsRestDuration } from './../../redux/modules/settings'
import { addUser, subscribing, friends } from './users'



const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'

export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating () {
  return {
    type: AUTHENTICATING,
  }
}

function notAuthed () {
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed (id) {
  console.log('Im dispatching is authed, with id ', id)
  return {
    type: IS_AUTHED,
    id,
  }
}

function loggingOut () {
  return {
    type: LOGGING_OUT
  }
}


export function handleAuthRemotely () {
  console.log('login');
  return function (dispatch, getState) {
    dispatch(authenticating())
    return getAccessToken()
      .then(function (accessToken) {
        console.log('promised resolve, access token, ',accessToken);
        if(accessToken){
          // I have an access token
          var authResults = authWithFacebook(accessToken.accessToken);
          console.log('AUTH RESULTS');

         authResults.then((responseJson) => {
            console.log('JSON RESPONSE', responseJson);
            return responseJson
        }).catch(function(error) {
          console.log('10 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
        } else {
          // I don't have an access token, I need to relogin via facebook
          dispatch(notAuthed())
        }
      })
      .catch((error) => console.warn('Error in handle auth: ', error))
  }
}





export function onAuthChange (user) {
  console.log('RECEIVED USER', user);
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      // I'm now autenticated. Star fatching all the information needed.
      const { id } = user
      // We have a user.
      dispatch(addUser(id, user));

      // TODO LOGIN FACEBOOK : COMMENT OUT THE FOLLOWIGN TWO LINES
      //dispatch(subscribing());
      //dispatch(friends());

      dispatch(isAuthed(id));
    }
  }
}

export function handleUnauth () {
  return function (dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  id: -1,
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true,
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        authedId: '',
      }
    case IS_AUTHED :
      return {
        isAuthed: true,
        isAuthenticating: false,
        id: action.id,
      }
    default :
      return state
  }
}
