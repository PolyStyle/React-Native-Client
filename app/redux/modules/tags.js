import { getTagStream,getTag } from './../../api/api_proxy'

const ADD_TAG = 'ADD_TAG'
const SET_CURRENT_TAG = 'SET_CURRENT_TAG'
const IS_FATCHING = 'IS_FATCHING'
const ADD_TAG_STREAM = 'ADD_TAG_STREAM'
const SET_CURRENT_TAG_STREAM = 'SET_CURRENT_TAG_STREAM'

function addTag( tag ) {
  return {
    type: ADD_TAG,
    tag: tag
  }
}
function addTagStream( tagStream) {
  return {
    type: ADD_TAG_STREAM,
    tagStream: tagStream
  }
}

function setCurrentTagStream( tagStream) {
  return {
    type: SET_CURRENT_TAG_STREAM,
    tagStream: tagStream
  }
}
export function fetchTag(id){
  return function(dispatch){
    return getTag(id).then(function(tag){
      dispatch(addTag(tag))
      dispatch(setCurrentTag(tag))
    })
  }
}

export function fetchTagStream(id){
  return function(dispatch){
    return getTagStream(id).then(function(tagStream){
      console.log('RECEIVED TAG STREAM')
      dispatch(addTagStream(tagStream))
      dispatch(setCurrentTagStream(tagStream))
    })
  }
}



function setCurrentTag( tag ) {
  return {
    type: SET_CURRENT_TAG,
    tag: tag
  }
}

 
const initialState = {
  isFetching: false,
  tags: [],
  currentTag: null
}

export default function tags (state = initialState, action) { 
  switch (action.type) {
    case SET_CURRENT_TAG_STREAM:
      return {
        ...state,
        currentTagStream: action.tagStream
      }
    case ADD_TAG_STREAM:
      // TODO : needs to be added to an array, not just reinizialed every time
      // ideally using the tag id as key to access the dictionary
      return {
        ...state,
        tagStream: [action.tagStream]
      }
    case ADD_TAG:
      return {
        ...state,
        isFetching: false,
        tags: [action.tag]
      }
    case SET_CURRENT_TAG:
      return {
        ...state,
        isFetching: false,
        currentTag: action.tag
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