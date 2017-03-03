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
const UPDATE_BRAND_FOLLOW = 'UPDATE_BRAND_FOLLOW'

function addBrand( brand ) {
  return {
    type: ADD_BRAND,
    brand: brand
  }
}
function addBrandStream(id, brandStream) {
  return {
    type: ADD_BRAND_STREAM,
    id,
    brandStream
  }
}

export function fetchBrand(id){
  return function(dispatch){
    return getBrand(id).then(function(brand){
      dispatch(addBrand(brand))
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
      dispatch(addBrandStream(id,brandStream))
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
  let currentIndex;
  let i;
  switch (action.type) {
    case UPDATE_BRAND_FOLLOW:
      currentIndex = -1;
      for (key in state.brands) {
        if(state.brands[key].id == action.id){
          currentIndex = key
        }
      }
      if(currentIndex > -1){
        return {
        ...state,
          brands: {
            ...state.brands,
            [currentIndex]: {
              ...state.brands[currentIndex],
              isFollowing: action.isFollowing
             }
          }
        }
      } else {
        return {
          ...state,
          brands: {
            ...state.brands,
            [action.id]: {
              isFollowing: action.isFollowing
            }
          }
        }
      }
    case ADD_BRAND_STREAM:
      currentIndex = -1;
      for (key in state.brands) {
        console.log(state.brands[key]);
        console.log(key);
        if(state.brands[key].id == action.id){
          currentIndex = key
        }
      }
      if(currentIndex > -1){
        // there is a brand with this id, add to it,

        return {
          ...state,
          brands: {
            ...state.brands,
            [currentIndex]: {
              ...state.brands[currentIndex],
              brandStream: action.brandStream
             }
          }
        }
      } else {
        return {
          ...state,
          brands: {
            ...state.brands,
            [action.id]: {
              brandStream: action.brandStream
            }
          }
        }
      }


      return {
        ...state,
        brandStreams: [action.brandStream]
      }
    case ADD_BRAND:
      return {
        ...state,
        brands: {
          ...state.brands,
          [action.brand.id]: {
            ...state.brands[action.brand.id],
            ...action.brand},
           }
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
