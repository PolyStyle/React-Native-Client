import { getPosts,getPost } from './../../api/api_proxy'

const ADD_POST = 'ADD_POST'
const ADD_POSTS = 'ADD_POSTS' 
const IS_FATCHING = 'IS_FATCHING' 
const SET_CURRENT_POST = 'SET_CURRENT_POST'

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
      dispatch(setCurrentPost(post))
    })
  }
}

 
const initialState = {
  isFetching: false,
  posts: []
}

export default function posts (state = initialState, action) { 
  console.log(action)
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        isFetching: false,
        // posts: [action.post]
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        isFetching: false,
        currentPost: action.post
      }
    case ADD_POSTS :
      return {
        ...state,
        isFetching: false,
        posts: action.posts
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