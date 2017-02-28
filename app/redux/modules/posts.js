import {
  getPosts,
  getPost,
  getFeed,
  hasLikedPost as hasLikedPostAPI,
  likePost as likePostAPI,
  unlikePost as unlikePostAPI
} from './../../api/api_proxy'

const ADD_POST = 'ADD_POST'
const FETCH_FEED = 'FETCH_STREAM'
const IS_FATCHING = 'IS_FATCHING'
const SET_CURRENT_POST = 'SET_CURRENT_POST'
const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE'

function addPost( post ) {
  return {
    type: ADD_POST,
    post: post
  }
}

function setFeed( posts ) {
  console.log('received all the posts ')
  console.log(posts)
  return {
    type: FETCH_FEED,
    posts: posts
  }
}

function setCurrentPost( post ) {
  return {
    type: SET_CURRENT_POST,
    post: post
  }
}


export function fetchFeed() {
  console.log('called fetch all posts ------');
    return function (dispatch) {
    console.log('DISPATCH ')
    return getFeed().then(function (posts) {
      console.log('RETURNED --- ', posts)
      dispatch(setFeed(posts))
    })
  }
}

export function fetchPost(id){
  return function(dispatch){
    return getPost(id).then(function(post){

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
  let currentIndex;
  let i;
  switch (action.type) {
    case ADD_POST:
      currentIndex = -1;
      i = state.posts.length - 1;
      for (; i >= 0; i -= 1) {
        if (state.posts[i].id === action.post.id) {
          currentIndex = i;
        }
      }
      console.log('I FOUND THE INDEX', currentIndex)
      if(currentIndex > -1){
        //the object already exists, just update it.
        return {
          ...state,
          posts:
            state.posts.slice(0, currentIndex)
            .concat([{
              ...state.posts[currentIndex],
              ...action.post
            }])
            .concat(state.posts.slice(currentIndex + 1)),
        };
      } else {
        return {
          ...state,
          posts: state.posts.concat([action.post])
        }

      }
      break;
    case UPDATE_POST_LIKE:
      currentIndex = -1;
      i = state.posts.length - 1;
      for (; i >= 0; i -= 1) {
        console.log('SEARCHING FOR THE ITEM TO ADD IS LIKED', state.posts[i].id , action.id)
        if (state.posts[i].id == action.id) {
          currentIndex = i;
        }
      }
      console.log('INDEX ', currentIndex);

      if(currentIndex > -1){
        return {
          ...state,
          posts:
            state.posts.slice(0, currentIndex)
            .concat([
              {
                ...state.posts[currentIndex],
                isLiking: action.isLiking
              }
            ])
            .concat(state.posts.slice(currentIndex + 1)),
        }
      } else {
        return {
          ...state,
          posts: state.posts.concat([{
            id: action.id,
            isLiking: action.isLiking
          }])
        }
      }
      break;
    case SET_CURRENT_POST:
      return {
        ...state,
        isFetching: false,
        currentPost: action.post
      }
    case FETCH_FEED:
      // TODO REWRITE THIS WITH A MAP
      return {
        ...state,
        isFetching: false,
        feed : action.posts
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
