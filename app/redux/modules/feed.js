import {
  getFeed,
} from './../../api/api_proxy'

const FETCH_FEED = 'FETCH_STREAM'




function setFeed( posts ) {

  return {
    type: FETCH_FEED,
    posts: posts
  }
}



export function fetchFeed() {
  return function (dispatch) {
    return getFeed().then(function (posts) {
      dispatch(setFeed(posts))
    })
  }
}



const initialState = {
  isFetching: false,
  feed: []
}

export default function posts (state = initialState, action) {
  let currentIndex;
  let i;
  switch (action.type) {
    case FETCH_FEED:
      // TODO REWRITE THIS WITH A MAP
      return {
        ...state,
        isFetching: false,
        feed : action.posts
      }
    default :
      return state
  }
}
