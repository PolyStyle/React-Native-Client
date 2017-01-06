import { selfie } from './../../api/auth'

const READY_TO_UPLOAD = 'READY_TO_UPLOAD'
const UPLOADING_IMAGE = 'UPLOADING_IMAGE'
const UPLOADED_COMPLETED = 'UPLOADED_COMPLETED'

function startUploading () {
  return {
    type: UPLOADING_IMAGE,
  }
}

function uploadFinished () {
  return {
    type: UPLOADED_COMPLETED,
  }
}


export function uploadPicture(url, config) {
  console.log('CLICKED UPOLOAD PICTURe -------')
  console.log(url,config)

  return function (dispatch) {
    console.log('got here --------')
    dispatch(startUploading()) 
    return selfie.publishImage(url,config)
      .then(function (result) {
        console.log(result);
        dispatch(uploadFinished())
      })
      .catch((error) => console.warn('Error in handle auth: ', error))
  }
}
 
const initialState = {
  isUploading: false,
}

export default function authentication (state = initialState, action) { 
  switch (action.type) {
    case READY_TO_UPLOAD :
      return {
        ...state,
        isUploading: false,
      }
    case UPLOADING_IMAGE :
      return {
        isUploading: true, 
      }
    case UPLOADED_COMPLETED :
      return {
        isUploading: false, 
      }
    default :
      return state
  }
}