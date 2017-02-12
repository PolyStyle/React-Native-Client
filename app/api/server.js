'use strict';
 
var baseUrl = 'https://192.168.0.5/api/v1/'
/*
fetch(baseUrl + '/users/1/profile')
	.then(function(res) {
        return res.text();
    }).then(function(body) {
        //console.log(body);
    });
*/
// see http://doochik.com/2015/11/27/FormData-in-React-Native.html
var image = {
	uri: 'file:///Users/nicolabortignon/Downloads/IMG_0783.jpg',
	type: 'image/jpeg',
	name: 'photo.jpg',
};

var latlng = {
	latitude: '90',
	longitude: '90'
}
/*
var data = new FormData();
data.append('image', {
	uri: 'file:///Users/mziccardi/Pictures/3-in-1Kabelanschluss.jpg',
	name: 'image.jpg',
	type: 'image/jpg'})
body.append('latlng', JSON.stringify(latlng));

fetch(baseUrl + '/images', {
  method: 'POST',
  body: body
}).then(function(res) {
	console.log("RECEIVED");
    console.log(res);
}).catch(function(err) {
	console.log("ERROR");
    console.log(err);
});
*/

function makeQuery(params) {
	params = params ? params : {};
	return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

/**
 * Client to access Selfie APIs.
 *
 * @param {object} options - Configuration object.
 * @param {string} options.email - User email (used to login) [optional].
 * @param {string} options.password - User password (used to login) [optional].
 * @param {string} options.facebookToken - Facebook access token (used to login) [optional].
 * @param {object} options.selfieToken - Selfie access token (used to authenticate) [optional].
 * @param {object} options.selfieToken.token - Selfie access token.
 * @param {number} options.selfieToken.expiresIn - Token's TTL.
 * @param {String} options.selfieToken.refreshToken - Selfie refresh token.
 * @param {String} options.selfieToken.type - Type of token.
 */
function Selfie(options) {
	 if (!options) {
    throw new Error('A name is required to create a bucket.');
  }
  if (!options.facebookToken && !options.email) {
  	this.tokenPromise = Promise.resolve(options.accessToken);
  } else {
  	var endpoint = baseUrl;
  	var body = {};
  	if (!options.facebookToken) {
  		endpoint += '/login/plain';
  		body = {
  			email: options.email,
  			password: options.password,
  		};
  	} else {
  		endpoint += '/login/facebook';
  		body = {
  			accessToken: options.facebookToken
  		};
  	}
  	// todo(mziccard) login with username and password
  	this.tokenPromise = fetch(endpoint, {
  		method: 'POST',
  		body: JSON.stringify(body),
  		headers: {'Content-Type': 'application/json'}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		});
	}
}

function isSuccess(code) {
	return code >= 200 && code < 300;
}

/**
 * Gets the user's profile information.
 */
Selfie.prototype.profile = function(user) {
  var self = this;
  var endpoint = baseUrl + '/me/profile';
  if (user) {
		endpoint = baseUrl + '/users/' + user + '/profile'
  }
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(endpoint, {
  		method: 'GET',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)
) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Gets the user's followers.
 *
 * @param {number} user - ID of the user for which to return followers [Optional].
 *												If not set the followers of the authenticated user are returned.
 */
Selfie.prototype.followers = function(user) {
  var self = this;
  var endpoint = baseUrl + '/me/followers';
  if (user) {
		endpoint = baseUrl + '/users/' + user + '/followers'
  }
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(endpoint, {
  		method: 'GET',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Gets all users followed by the user.
 *
 * @param {number} user - ID of the user for which to return followed users [Optional].
 *												If not set follower users for the authenticated user are returned.
 */
Selfie.prototype.followed = function(user) {
  var self = this;
  var endpoint = baseUrl + '/me/followed';
  if (user) {
		endpoint = baseUrl + '/users/' + user + '/followed'
  }
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(endpoint, {
  		method: 'GET',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Gets all friends of the user. Friends are all people followed by the user that also
 * follow back.
 *
 * @param {number} user - ID of the user for which to return friends [Optional].
 *												If not set friends for the authenticated user are returned.
 * @param {number} options - Listing options [Optional].
 * @param {number} options.pageSize - How many friends to be returned [Optional].
 * @param {number} options.pageToken - From where to start listing friends [Optional].
 */
Selfie.prototype.friends = function(user, options) {
  var self = this;
  var endpoint = baseUrl + '/me/friends';
  if (user) {
		endpoint = baseUrl + '/users/' + user + '/friends'
  }
  var query = makeQuery(options);
  query = query ? '?' + query : '';
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(endpoint + query, {
  		method: 'GET',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Gets all subscribed of the user. People that are followed by the user that are not
 * follow him/her back.
 *
 * @param {number} user - ID of the user for which to return subscribers [Optional].
 *                        If not set subscribers for the authenticated user are returned.
 * @param {number} options - Listing options [Optional].
 * @param {number} options.pageSize - How many subscribers to be returned [Optional].
 * @param {number} options.pageToken - From where to start listing friends [Optional].
 */
Selfie.prototype.subscribing = function(user, options) {
  var self = this;
  var endpoint = baseUrl + '/me/subscribing';
  if (user) {
    endpoint = baseUrl + '/users/' + user + '/subscribing'
  }
  var query = makeQuery(options);
  query = query ? '?' + query : '';
  return self.tokenPromise.then(function(selfieToken) {
    return fetch(endpoint + query, {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + selfieToken.token}
    }).then(function(res) {
      if (!isSuccess(res.status)) {
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
    })
  });
};


/**
 * Follows the provided user.
 *
 * @param {number} user - ID of the user to follow.
 */
Selfie.prototype.follow = function(user) {
  var self = this;
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(baseUrl + '/users/' + user + '/follow', {
  		method: 'POST',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Unfollows the provided user.
 *
 * @param {number} user - ID of the user to unfollow.
 */
Selfie.prototype.unfollow = function(user) {
  var self = this;
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(baseUrl + '/users/' + user + '/unfollow', {
  		method: 'POST',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return Promise.accept();
		})
  });
};

/**
 * Upvotes the provided image.
 *
 * @param {number} image - ID of the image to upvote.
 */
Selfie.prototype.upvote = function(image) {
  var self = this;
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(baseUrl + '/images/' + image + '/upvote', {
  		method: 'POST',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Downvotes the provided image.
 *
 * @param {number} image - ID of the image to downvote.
 */
Selfie.prototype.upvote = function(image) {
  var self = this;
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(baseUrl + '/images/' + image + '/downvote', {
  		method: 'POST',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

/**
 * Publishes a new image for the authenticated user.
 *
 * @param {String} fileURI - URI pointing to the image to upload.
 * @param {Object} params - Parameters for the POST call.
 */
Selfie.prototype.publishImage = function(fileURI, params) {
  var self = this;
  var data = new FormData()

  if (fileURI) {
    console.log('I HAVE FILE URI')
    data.append('file':{uri: fileURI, name: 'image.jpg', type: 'image/jpg'})
  }
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = params[key];
      if (value instanceof Date) {
        data.append(key, value.toISOString())
      } else {
        data.append(key, String(value))
      }
    }
  }

  return self.tokenPromise.then(function(selfieToken) {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        'Authorization': 'Bearer ' + selfieToken.token
      },
      body: data
    };
    console.log('CONFIG -----')
    console.log(config)

  	return fetch(baseUrl + '/images', config).then(function(res) {
      return res;
		});
  });
};

/**
 * Gets all images of the user. Friends are all people followed by the user that also
 * follow back.
 *
 * @param {number} user - ID of the user for which to return images [Optional].
 *												If not set images for the authenticated user are returned.
 * @param {number} options - Listing options [Optional].
 * @param {number} options.pageSize - How many images to be returned [Optional].
 * @param {number} options.pageToken - From where to start listing images [Optional].
 */
Selfie.prototype.images = function(user, options) {
	var self = this;
  var endpoint = baseUrl + '/me/images';
  if (user) {
		endpoint = baseUrl + '/users/' + user + '/images'
  }
  var query = makeQuery(options);
  query = query ? '?' + query : '';
  return self.tokenPromise.then(function(selfieToken) {
  	return fetch(endpoint + query, {
  		method: 'GET',
  		headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + selfieToken.token}
		}).then(function(res) {
			if (!isSuccess(res.status)) {
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
		})
  });
};

module.exports = Selfie;