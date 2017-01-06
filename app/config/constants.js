// Mocking the wonderful API that marco is going to put together! 

/*
firebase.initializeApp({
  apiKey: "AIzaSyA6E2n8ZhpRgNFcY6hol472mLUD7zZ-kdU",
  authDomain: "reactmodoro.firebaseapp.com",
  databaseURL: "https://reactmodoro.firebaseio.com",
  storageBucket: "reactmodoro.appspot.com",
})
*/

// the array with all the callbacks that needs to be call once we change the Auth State.
var onAuthStateChangedCallbacks = [];

const ref = function(){
	console.log(' REF CALLLED -----')
}
const auth = {
	  // allow to register a callback. The callback is called passing the user informations.
	  // TODO(nicola): create a class for the object user. 
	  onAuthStateChanged: function(callback) { 
	  	console.log('Registering a new callback on Auth State changed' , callback);
	  	onAuthStateChangedCallbacks.push(callback);
	  },
	  signInWithCredential: function(token){
	  	console.log(' EXECUTING SIGN IN WITH TOKEN ')
	  	user = {
          displayName: 'mZiccard',
          email: 'info@mziccard.com',
          emailVerified: true,
          isAnonymous: false,
          photoURL: null,  
          uid: token
		};
	  	for (var i = onAuthStateChangedCallbacks.length - 1; i >= 0; i--) {
	  		console.log('calling callbacks',onAuthStateChangedCallbacks[i]);
	  		onAuthStateChangedCallbacks[i](user);
	  	}
	  	return user;
	  },
	  signOut: function(){
	  	return {}
	  }
}



const facebookProvider = function(){
	console.log('firebase FACEBOOK PROVIDER CALLLED -----')
}

export {
  ref,
  auth,
  facebookProvider,
}
