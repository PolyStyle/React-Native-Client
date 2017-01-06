import { ref } from './../config/constants'

export function setTimer (duration, uid) {
    return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 0.1,
            restDuration: 22
          }
          resolve(settings);
        });
}

export function setRest (duration, uid) {
    return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 0.1,
            restDuration: 22
          }
          resolve(settings);
        });
}

export function fetchSettings (uid) {
  console.log('fetchin settings for ', uid)
  return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 13,
            restDuration: 29
          }
          resolve(settings);
        });

}