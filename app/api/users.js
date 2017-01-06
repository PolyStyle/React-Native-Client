import { ref } from './../config/constants'

export function fetchUser (uid) {
	return new Promise(
        // return a user 
        function(resolve, reject) {
          	user = {
	          displayName: 'nicola',
	          email: 'nicola@selfy.com',
	          emailVerified: true,
	          isAnonymous: false,
	          photoURL: null,  
	          uid: uid
			};
          	resolve(user);
        });
}

export function getFriendsHandler(){
  return  function (dispatch) { 
    return getFriends()
      .then(function(friends){
        dispatch(updateFriends(friends));
      })
  }
}

export function getSubscribingHandler(){
  return function (dispatch) { 
    console.log('HANDLE CALLED')
    return getSubscribing()
      .then(function(subscribing){
        console('GOT SUBSCRIBING REQUEST' + subscribing);
        dispatch(updateSubscribing(subscribing));
      })
  }
}
