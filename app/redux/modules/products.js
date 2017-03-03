import { getSameProducts, getProduct } from './../../api/api_proxy'

const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const IS_FATCHING = 'IS_FATCHING'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'
const SET_SAME_PRODUCTS = 'SET_SAME_PRODUCTS'

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

function setSameProductList( products){
  return {
    type: SET_SAME_PRODUCTS,
    products: products
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
      dispatch(setSameProductList(products))
    })
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
          [action.id]: action.product
        }
      }
      break;
    case SET_SAME_PRODUCTS:
      return {
        ...state,
        sameProductsList: action.products
      }
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        isFetching: false,
        currentProduct: action.product
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
    default :
      return state
  }
}
