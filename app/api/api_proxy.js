'use strict';
import { AccessToken as FacebookAccessToken, LoginManager } from 'react-native-fbsdk';
var onAuthStateChangedCallbacks = [];
/* proxy for all the api calls on the node server */

//var baseUrl = 'http://104.155.46.72/api/v1'
var baseUrl = 'http://127.0.0.1:3000'

var AccessToken = null;

function isSuccess(code) {
    return code >= 200 && code < 300;
}

/**
 * Executes a call to the APIs. If the token expired (the API call returns 401 with
 * reason = TOKEN_EXPIRED) then this function tries to refresh the token first and then execute the
 * API call again.
 *
 * apiCall                  - The function that wraps the API call, must return a promise
 *
 * Returns:
 * On Success               - The result of apiCall
 *
 * On Error                 - A JSON object containing the following fields
 *                            status  - HTTP status code
 *                            message - Human readable error message
 *                            details - Error details (optional)
 */
function runWithRefresh(apiCall) {
  return function() {
    const self = this;
    const selfArguments = arguments;
    return apiCall.apply(self, selfArguments).catch(function(error) {
      console.log(error);
      if (error.status === 401 && error.reason === "TOKEN_EXPIRED") {
        return refreshToken(AccessToken).then(function(accessToken) {
          AccessToken = accessToken;
          return apiCall.apply(self, selfArguments);
        });
      } else {
        throw error;
      }
    });
  };
}

/**
 * Refreshes an access token, this method should be called only when the token
 * expired (i.e. a previous request return 401 with reason = TOKEN_EXPIRED).
 *
 * accessToken.accessToken    - The expired access token
 * accessToken.refreshToken   - The refresh token
 *
 * Returns:
 * On Success               - A JSON object containing the following fields:
 *                            accessToken   - a JWT token for the current user
 *                            refreshToken  - a token to refresh the JWT
 *                            expiresIn     - time in seconds before the JWT expires
 *
 * On Error                 - A JSON object containing the following fields
 *                            status  - HTTP status code
 *                            message - Human readable error message
 *                            details - Error details (optional)
 */
function refreshToken(accessToken) {
  var endpoint = baseUrl + '/users/me/token';
  return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken: accessToken.refreshToken })
  }).then(function(res) {
      if (!isSuccess(res.status)) {
          return res.json().then(function(json) {
              return Promise.reject(json);
          });
      }
      return res.json();
  }).catch(function(error) {
      throw error;
  });
}

/**
 * Gets all the posts
 */
function getPosts() {
    var self = this;
    var endpoint = baseUrl + '/posts';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch((error) => {

        console.error(error);
    });
};

exports.getPosts = runWithRefresh(getPosts);

function getFeed() {
    var self = this;
    var endpoint = baseUrl + '/posts/feed';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch((error) => {

        console.error(error);
    });
};

exports.getFeed = runWithRefresh(getFeed);

function getPost(id) {
    var self = this;
    var endpoint = baseUrl + '/posts/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {

        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch(function(error) {
        // ADD THIS THROW error
        throw error;
    });
};

exports.getPost = runWithRefresh(getPost);

// LIKE POSTS

function hasLikedPost(id) {
    console.log('GET LIKE  LIKE POST')
    console.log(AccessToken.accessToken);
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/like';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.hasLikedPost = runWithRefresh(hasLikedPost);

function likePost(id) {
    console.log('CALLING LIKE POST')
    console.log(AccessToken.accessToken);
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/like';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.likePost = runWithRefresh(likePost);

function unlikePost(id) {
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/unlike';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.unlikePost = runWithRefresh(unlikePost);

function getBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {

        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch(function(error) {
        // ADD THIS THROW error
        throw error;
    });
};

exports.getBrand = runWithRefresh(getBrand);

function isFollowingBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/follow';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.isFollowingBrand = runWithRefresh(isFollowingBrand);

function followBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/follow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.followBrand = runWithRefresh(followBrand);

function unfollowBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/unfollow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.unfollowBrand = runWithRefresh(unfollowBrand);

function isFollowingUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/follow';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.isFollowingUser = runWithRefresh(isFollowingUser);

function followUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/follow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.followUser = runWithRefresh(followUser);

function unfollowUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/unfollow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.unfollowUser = runWithRefresh(unfollowUser);

function getBrandStream(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/stream/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {

        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch(function(error) {
        throw error;
    });
};

exports.getBrandStream = runWithRefresh(getBrandStream);

function getTag(id) {
    var self = this;
    var endpoint = baseUrl + '/tags/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getTag = runWithRefresh(getTag);

function getTagStream(id) {
    var self = this;
    var endpoint = baseUrl + '/tags/stream/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getTagStream = runWithRefresh(getTagStream);

function getUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getUser = runWithRefresh(getUser);

function getUserStream(id) {
    var self = this;
    var endpoint = baseUrl + '/users/stream/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getUserStream = runWithRefresh(getUserStream);

function getProduct(id) {
    var self = this;
    var endpoint = baseUrl + '/products/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getProduct = runWithRefresh(getProduct);

function getSameProducts(id) {
    var self = this;
    var endpoint = baseUrl + '/products/sameproducts/' + id;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
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

exports.getSameProducts = runWithRefresh(getSameProducts);

// LIKE PRODUCT

function hasLikedProduct(id) {
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/like';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.hasLikedProduct = runWithRefresh(hasLikedProduct);

function likeProduct(id) {
    console.log('CALLING LIKE POST')
    console.log(AccessToken.accessToken);
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/like';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.likeProduct = runWithRefresh(likeProduct);

function unlikeProduct(id) {
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/unlike';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.unlikeProduct = runWithRefresh(unlikeProduct);


function saveUserProfile(profile){
  console.log('API ENDPOINT',profile)
    var self = this;
    var endpoint = baseUrl + '/users/me';
    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        },
        body: JSON.stringify({profile: profile})
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
}
exports.saveUserProfile = runWithRefresh(saveUserProfile);

/*   Collection part
/   GET /users/:userId/collections
/   GET /collections/:collectionId
/  POST /collections/
/   PUT /collections/:collectionId.  NOT IMPLEMENTED
/  POST /collections/:collectionId/addPost/
/  POST /collections/:collectionId/removePost/
/  POST /collections/:collectionId/addProduct/
/  POST /collections/:collectionId/removeProduct/
*/

exports.getUserCollections = runWithRefresh(getUserCollections);

function getUserCollections(userId) {
    var self = this;
    var endpoint = baseUrl + '/users/' + userId + /collections/;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch(function(error) {
        console.log('Get user collections: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
};

exports.getCollection  = runWithRefresh(getCollection);

function getCollection(collectionId) {
    var self = this;
    var endpoint = baseUrl + '/collections/' + collectionId;
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'TOKEN'
        }
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    }).catch(function(error) {
        console.log('Get collection: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
};

exports.addCollection = runWithRefresh(addCollection);

function addCollection(collection) {
    var self = this;
    var endpoint = baseUrl + '/collections';
    console.log(endpoint)
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        },
        body: JSON.stringify(collection)
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};

exports.addPostToCollection = runWithRefresh(addPostToCollection);

function addPostToCollection(collectionId, post) {
    var self = this;
    var endpoint = baseUrl + '/collections/' + collectionId + '/addPost';
    console.log(endpoint)
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AccessToken.accessToken
        },
        body: JSON.stringify(post)
    }).then(function(res) {
        if (!isSuccess(res.status)) {
            return res.json().then(function(json) {
                return Promise.reject(json);
            });
        }
        return res.json();
    })
};


export function uploadImage(source, sizes){


  let photo = { uri: source.uri}
  let formdata = new FormData();


  formdata.append("sizes", JSON.stringify(sizes))
  formdata.append("file", {uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data'})

  return fetch('http://localhost:3000/images/upload/',{
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata
  }).then(response => {
    return response.json().then(function(json) {

        return  json ;
  });
  }).catch(err => {
    console.log(err)
  })
}


/* authentication part */
export function getAccessToken() {
    console.log('get access token', FacebookAccessToken.getCurrentAccessToken());
    // TODO RIPRISTINATE THE JS ACCESS TOKEN PART
    //LoginManager.logOut();
    return FacebookAccessToken.getCurrentAccessToken()
}


export function onAuthStateChanged(callback) {
    onAuthStateChangedCallbacks.push(callback);
}

export function authWithAccessToken(accessToken){
  AccessToken = accessToken;
  console.log('set auth token');
  console.log(AccessToken)
}

export function authWithFacebook(facebookAccessToken) {
    var endpoint = baseUrl + '/users/login/facebook';
    console.log('endpoint', endpoint);
    return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accessToken: facebookAccessToken })
        })
        .then((response) => {
            console.log('line 378', response);
            return response.json();
        })
        .then((user) => {
            console.log('line 381', user);
            for (var i = onAuthStateChangedCallbacks.length - 1; i >= 0; i--) {
                // we callback all the subscriber to this event.
                onAuthStateChangedCallbacks[i](user);
            }

            // SAVE THE TOKEN FOR FUTURE CALLS
            authWithAccessToken(user.accessToken);
            return user;
        })
        .catch((error) => {
            throw error;
            console.error(error);
        });
};
