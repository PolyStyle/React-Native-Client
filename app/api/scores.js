import { ref } from './../config/constants'

export function fetchScore (uid) {
	console.log(' fetching score of the user ' , uid)
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve({
        score: 100,
        displayName: 'Giasone ' + Math.floor(1000*Math.random()),
        photoURL: 'https://s-media-cache-ak0.pinimg.com/236x/8f/9d/c5/8f9dc59a47a389576776eaef35d16d86.jpg',
      });
    });
}

// we probably don't need this yet
export function increaseScore (uid, amount) {
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve(10);
    });
}
// we probably don't need this yet either 
export function decreaseScore (uid, amount) {
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve(10);
    });
}