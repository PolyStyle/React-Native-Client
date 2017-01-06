import { getBrand,getBrandStream } from './../../api/api_proxy'

const ADD_BRAND = 'ADD_BRAND'
const SET_CURRENT_BRAND = 'SET_CURRENT_BRAND'
const IS_FATCHING = 'IS_FATCHING'
const ADD_BRAND_STREAM = 'ADD_BRAND_STREAM'
const SET_CURRENT_BRAND_STREAM = 'SET_CURRENT_BRAND_STREAM'

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

 
const initialState = {
  isFetching: false,
  brands: [],
  currentBrand: null
}

export default function brands (state = initialState, action) { 
  console.log(action)
  switch (action.type) {
    case SET_CURRENT_BRAND_STREAM:
      return {
        ...state,
        currentBrandStream: action.brandStream
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
        isFetching: false,
        brands: [action.brand]
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