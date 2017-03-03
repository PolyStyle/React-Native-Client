import {
  getSameProducts,
  getProduct,
  unlikeProduct as unlikeProductAPI,
  likeProduct as likeProductAPI,
  hasLikedProduct as hasLikedProductAPI} from './../../api/api_proxy'

const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const IS_FATCHING = 'IS_FATCHING'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'
const ADD_SIMILAR_PRODUCT = 'ADD_SIMILAR_PRODUCT'
const UPDATE_PRODUCT_LIKE = 'UPDATE_PRODUCT_LIKE'

function addProduct( product ) {
  return {
    type: ADD_PRODUCT,
    product: product,
    id: product.id
  }
}

function addProducts( products ) {
  return {
    type: ADD_PRODUCTS,
    products: products
  }
}

function setCurrentProduct( product ) {
  return {
    type: SET_CURRENT_PRODUCT,
    product: product
  }
}

function addSimilarProduct(id, products){
  return {
    type: ADD_SIMILAR_PRODUCT,
    id,
    products
  }
}


export function fetchProduct(id){
  return function(dispatch){
    return getProduct(id).then(function(product){
      dispatch(addProduct(product))
    })
  }
}


export function fetchSameProducts(id){
  return function(dispatch){
    return getSameProducts(id).then(function(products){
      dispatch(addSimilarProduct(id, products))
    })
  }
}

export function hasLikedProduct(id){
  return function(dispatch){
    return hasLikedProductAPI(id).then(function(result){
      if(result){
        dispatch(updateIsLiking(id, true));
      } else {
        dispatch(updateIsLiking(id, false));
      }
    })
  }
}

export function likeProduct(id){
  return function(dispatch){
    return likeProductAPI(id).then(function(result){
      dispatch(updateIsLiking(id, true));
    })
  }
}

export function unlikeProduct(id){
  return function(dispatch){
    return unlikeProductAPI(id).then(function(result){
      dispatch(updateIsLiking(id, false));
    })
  }
}


function updateIsLiking( id, isLiking) {
  return {
    type: UPDATE_PRODUCT_LIKE,
    id,
    isLiking
  }
}


const initialState = {
  isFetching: false,
  products: []
}

export default function products (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.id]: {
            ...state.products[action.id],
            ...action.product,
          }
        }
      }
      break;
    case ADD_SIMILAR_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.id]: {
            ...state.products[action.id],
            similarProduct: action.products,
          }
        }
      }
    case ADD_PRODUCTS :
      return {
        ...state,
        isFetching: false,
        products: action.products
      }
    case IS_FATCHING:
      return {
        ...state,
        isFetching: true,
      }
    case UPDATE_PRODUCT_LIKE:
      return {
        ...state,
         products: {
          ...state.products,
          [action.id]: {
            ...state.products[action.id],
            isLiking: action.isLiking,
          }
        }
      }
    default :
      return state
  }
}
