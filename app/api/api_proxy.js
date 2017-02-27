'use strict';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
var onAuthStateChangedCallbacks = [];
/* proxy for all the api calls on the node server */

// var baseUrl = 'https://104.155.46.72/api/v1'
var baseUrl = 'http://10.48.28.150:3000'

var AppAuthToken = null;

function isSuccess(code) {
    return code >= 200 && code < 300;
}
/**
 * Gets all the posts
 */
export function getPosts() {
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


export function getPost(id) {
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

// LIKE POSTS

export function hasLikedPost(id) {
    console.log('GET LIKE  LIKE POST')
    console.log(AppAuthToken);
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/like';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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


export function likePost(id) {
    console.log('CALLING LIKE POST')
    console.log(AppAuthToken);
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/like';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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

export function unlikePost(id) {
    var self = this;
    var endpoint = baseUrl + '/posts/' + id + '/unlike';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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

export function getBrand(id) {
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


export function isFollowingBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/follow';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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


export function followBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/follow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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

export function unfollowBrand(id) {
    var self = this;
    var endpoint = baseUrl + '/brands/' + id + '/unfollow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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


export function isFollowingUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/follow';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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


export function followUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/follow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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

export function unfollowUser(id) {
    var self = this;
    var endpoint = baseUrl + '/users/' + id + '/unfollow';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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






export function getBrandStream(id) {
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

export function getTag(id) {
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



export function getTagStream(id) {
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



export function getUser(id) {
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


export function getUserStream(id) {
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


export function getProduct(id) {
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


export function getSameProducts(id) {
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


// LIKE PRODUCT

export function hasLikedProduct(id) {
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/like';
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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


export function likeProduct(id) {
    console.log('CALLING LIKE POST')
    console.log(AppAuthToken);
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/like';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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

export function unlikeProduct(id) {
    var self = this;
    var endpoint = baseUrl + '/products/' + id + '/unlike';
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppAuthToken
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




/* authentication part */
export function getAccessToken() {
    console.log('get access token', AccessToken.getCurrentAccessToken());
    // TODO RIPRISTINATE THE JS ACCESS TOKEN PART
    //LoginManager.logOut();
    return AccessToken.getCurrentAccessToken()
}


export function onAuthStateChanged(callback) {
    onAuthStateChangedCallbacks.push(callback);
}

export function setAuthToken(token){
  AppAuthToken = token;
  console.log('set auth token');
  console.log(AppAuthToken)
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
            body: JSON.stringify({ accessToken: accessToken })
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
            setAuthToken(user.accessToken.accessToken);
            return user;
        })
        .catch((error) => {
            throw error;
            console.error(error);
        });
};
