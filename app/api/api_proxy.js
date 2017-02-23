'use strict';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
var onAuthStateChangedCallbacks = [];
 /* proxy for all the api calls on the node server */

// var baseUrl = 'https://104.155.46.72/api/v1'
var baseUrl = 'http://127.0.0.1:3000'

var AppAuthToken = null;

function isSuccess(code) {
  return code >= 200 && code < 300;
}
/**
 * Gets all the posts
 */
export function getPosts() {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/posts';
  return fetch(endpoint, {
  	method: 'GET',
  	headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + 'TOKEN'}
	}).then(function(res) {
			if(!isSuccess(res.status)){
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
  }).catch((error) => {
    console.log('something went wrong here');
     console.error(error);
  });
};


export function getPost(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/posts/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('1 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });

};


export function getBrand(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/brands/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('2 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};


export function followBrand(id) {
  var self = this;
  var endpoint = baseUrl + '/followBrand/' +id;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + AppAuthToken
    }
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  })
};




export function getBrandStream(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/brands/stream/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('3 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};

export function getTag(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/tags/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('4 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};



export function getTagStream(id) {
  var self = this;
  var endpoint = baseUrl + '/tags/stream/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('5 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};



export function getUser(id) {
  var self = this;
  var endpoint = baseUrl + '/users/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('6 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};


export function getUserStream(id) {
  var self = this;
  var endpoint = baseUrl + '/users/stream/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('7 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};


export function getProduct(id) {
  var self = this;
  var endpoint = baseUrl + '/products/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('8 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};


export function getSameProducts(id) {
  var self = this;
  var endpoint = baseUrl + '/products/sameproducts/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {
      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  }).catch(function(error) {
          console.log('9 There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
};

/* authentication part */
export function getAccessToken () {
  console.log('get access token', AccessToken.getCurrentAccessToken());
  // TODO RIPRISTINATE THE JS ACCESS TOKEN PART
  //LoginManager.logOut();
  return AccessToken.getCurrentAccessToken()
}


export function onAuthStateChanged(callback) {
  onAuthStateChangedCallbacks.push(callback);
}

export function authWithFacebook(accessToken) {
  var endpoint = baseUrl + '/users/login/facebook';
  console.log('endpoint', endpoint);
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({accessToken: accessToken})
  })
  .then((response) => {
    return response.json();
  })
  .then((user) => {
    for (var i = onAuthStateChangedCallbacks.length - 1; i >= 0; i--) {
        // we callback all the subscriber to this event.
      onAuthStateChangedCallbacks[i](user);
    }

    // SAVE THE TOKEN FOR FUTURE CALLS
    AppAuthToken = user.accessToken.accessToken;
    return user;
  })
  .catch((error) => {
    throw error;
    console.error(error);
  });
};




