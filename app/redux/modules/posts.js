import {
  getPosts,
  getPost,
  hasLikedPost as hasLikedPostAPI,
  likePost as likePostAPI,
  unlikePost as unlikePostAPI
} from './../../api/api_proxy'

const ADD_POST = 'ADD_POST'
const ADD_POSTS = 'ADD_POSTS'
const IS_FATCHING = 'IS_FATCHING'
const SET_CURRENT_POST = 'SET_CURRENT_POST'
const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE'

function addPost( post ) {
  return {
    type: ADD_POST,
    post: post
  }
}

function addPosts( posts ) {
  console.log('received all the posts ')
  console.log(posts)
  return {
    type: ADD_POSTS,
    posts: posts
  }
}

function setCurrentPost( post ) {
  return {
    type: SET_CURRENT_POST,
    post: post
  }
}


export function fetchAllPosts() {
  console.log('called fetch all posts ------');
    return function (dispatch) {
    console.log('DISPATCH ')
    return getPosts().then(function (posts) {
      console.log('RETURNED --- ', posts)
      dispatch(addPosts(posts))
    })
  }
}

export function fetchPost(id){
  return function(dispatch){
    return getPost(id).then(function(post){
      console.log('POST REDUX ')
      console.log(post)
      dispatch(addPost(post))
    })
  }
}

export function hasLikedPost(id){
  return function(dispatch){
    return hasLikedPostAPI(id).then(function(result){

      if(result){
        dispatch(updateIsLiking(id, true));
      } else {
        dispatch(updateIsLiking(id, false));
      }
    })
  }
}

export function likePost(id){
  return function(dispatch){
    return likePostAPI(id).then(function(result){
      dispatch(updateIsLiking(id, true));
    })
  }
}

export function unlikePost(id){
  return function(dispatch){
    return unlikePostAPI(id).then(function(result){
      dispatch(updateIsLiking(id, false));
    })
  }
}

function updateIsLiking( id, isLiking) {
  return {
    type: UPDATE_POST_LIKE,
    id,
    isLiking
  }
}



const initialState = {
  isFetching: false,
  posts: []
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      console.log('TRYING TO ADD A SINGLE POST ' ,action.post)
      var posts = [];
      posts[action.post.id] = action.post;

      return {
        ...state,
        isFetching: false,
        posts: {
          ...state.posts,
          ...posts
        }
      }
    case UPDATE_POST_LIKE:
      console.log('redux updates ', action.id, action.isLiking)
      return {
        ...state,
        posts : {
          ...state.posts,
          [action.id] : {
            ...state.posts[action.id],
            isLiking: action.isLiking
          }
        }
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        isFetching: false,
        currentPost: action.post
      }
    case ADD_POSTS :
      // TODO REWRITE THIS WITH A MAP
      var posts = [];
      for (var i =0; i< action.posts.length; i++) {
        posts[action.posts[i].id] = action.posts[i];
      }
      return {
        ...state,
        isFetching: false,
        posts : {
          ...state.posts,
          ...posts
        }

      }
    case IS_FATCHING:
      return {
        ...state,
        isFetching: true,
      }
    default :
      return state
  }
}
