import {
  addCollection,
  addPostToCollection as addPostToCollectionAPI,
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
      return addPostToCollectionAPI(collectionId,postObject).then(function(postCollection){
        return postCollection;
      })
    })
  }
}

export function addPostToCollection(CollectionId, Post){
   return function(dispatch){
     return addPostToCollectionAPI(CollectionId, Post).then(function(postCollection){
        return postCollection;
      })
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
