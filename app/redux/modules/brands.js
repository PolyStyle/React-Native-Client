import {
  getBrand,
  getBrandStream,
  followBrand as followBrandAPI,
  unfollowBrand as unfollowBrandAPI,
  isFollowingBrand as isFollowingBrandAPI
} from './../../api/api_proxy'

const ADD_BRAND = 'ADD_BRAND'
const SET_CURRENT_BRAND = 'SET_CURRENT_BRAND'
const IS_FATCHING = 'IS_FATCHING'
const ADD_BRAND_STREAM = 'ADD_BRAND_STREAM'
const SET_CURRENT_BRAND_STREAM = 'SET_CURRENT_BRAND_STREAM'
const UPDATE_BRAND_FOLLOW = 'UPDATE_BRAND_FOLLOW'

function addBrand( brand ) {
  return {
    type: ADD_BRAND,
    brand: brand
  }
}
function addBrandStream( brandStream) {
  return {
    type: ADD_BRAND_STREAM,
    brandStream: brandStream
  }
}

function setCurrentBrandStream( brandStream) {
  return {
    type: SET_CURRENT_BRAND_STREAM,
    brandStream: brandStream
  }
}
export function fetchBrand(id){
  return function(dispatch){
    return getBrand(id).then(function(brand){
      dispatch(addBrand(brand))
      dispatch(setCurrentBrand(brand))
    })
  }
}

export function isFollowingBrand(id){
  return function(dispatch){
    return isFollowingBrandAPI(id).then(function(result){

      if(result){
        dispatch(updateIsFollowing(id, true));
      } else {
        dispatch(updateIsFollowing(id, false));
      }
    })
  }
}

export function unfollowBrand(id){
  return function(dispatch){
    return unfollowBrandAPI(id).then(function(result){
      dispatch(updateIsFollowing(id, false));
    })
  }
}

export function followBrand(id){
  return function(dispatch){
    return followBrandAPI(id).then(function(result){
      dispatch(updateIsFollowing(id, true));
    })
  }
}

export function fetchBrandStream(id){
  return function(dispatch){
    return getBrandStream(id).then(function(brandStream){
      dispatch(addBrandStream(brandStream))
      dispatch(setCurrentBrandStream(brandStream))
    })
  }
}

function setCurrentBrand( brand ) {
  return {
    type: SET_CURRENT_BRAND,
    brand: brand
  }
}

function updateIsFollowing( id, isFollowing) {
  return {
    type: UPDATE_BRAND_FOLLOW,
    id,
    isFollowing
  }
}

const initialState = {
  isFetching: false,
  brands: [],
  currentBrand: null
}

export default function brands (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_BRAND_STREAM:
      return {
        ...state,
        currentBrandStream: action.brandStream
      }
    case UPDATE_BRAND_FOLLOW:
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          isFollowing: action.isFollowing
        }
      }
    case ADD_BRAND_STREAM:
      // TODO : needs to be added to an array, not just reinizialed every time
      // ideally using the brand id as key to access the dictionary
      return {
        ...state,
        brandStreams: [action.brandStream]
      }
    case ADD_BRAND:
      return {
        ...state,
        [action.brand.id]: {
          ...state[action.brand.id],
          ...action.brand},
      }

    case SET_CURRENT_BRAND:
      return {
        ...state,
        isFetching: false,
        currentBrand: action.brand
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
