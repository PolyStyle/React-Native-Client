import {
  addCollection,
  addPostToCollection as addPostToCollectionAPI,
  addProductToCollection as addProductToCollectionAPI,
} from './../../api/api_proxy'




// OLD PART
const ADD_COLLECTION = 'ADD_COLLECTION'
import {REHYDRATE} from 'redux-persist/constants'


export function createNewUserCollectionWithPost(UserId, PostId, displayName){
  console.log('createNewUserCollectionWithPost', UserId, PostId, displayName);
  var collection = {
    displayName: displayName,
    UserId: UserId
  }
  return function(dispatch){
    return addCollection(collection).then(function(collection){
      console.log('added usccessfully the collection', collection);
      const collectionId = collection.id;
      const postObject = {
        id: PostId,
      }
      return addPostToCollectionAPI(collectionId,postObject);
    })
  }
}

export function createNewUserCollectionWithProduct(UserId, ProductId, displayName){

  var collection = {
    displayName: displayName,
    UserId: UserId
  }
  return function(dispatch){
    return addCollection(collection).then(function(collection){
      console.log('added usccessfully the collection', collection);
      const collectionId = collection.id;
      const productObject = {
        id: ProductId,
      }
      return addProductToCollectionAPI(collectionId,productObject);
    })
  }
}


export function addProductToCollection(CollectionId, Product){
   return function(dispatch){
     return addProductToCollectionAPI(CollectionId, Product);
   }
}
export function addPostToCollection(CollectionId, Post){
   return function(dispatch){
     return addPostToCollectionAPI(CollectionId, Post);
   }
}

// this state is for isNew.
const initialState = {

}



export default function users (state = initialState, action) {
  switch (action.type) {
    default :
      return state
  }
}
