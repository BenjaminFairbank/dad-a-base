import { displayAlertMessage } from './alertMessage.js'
import { closeAlertMessage } from './alertMessage.js'

const initialState = {
  currentUser: null,
  isFetching: false
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case CHECK_FOR_CURRENT_USER_REQUEST:
      return {...state, isFetching: true }
    case CHECK_FOR_CURRENT_USER_REQUEST_SUCCESS:
      return {...state, isFetching: false, currentUser: action.userData}
    case CHECK_FOR_CURRENT_USER_REQUEST_FAILURE:
      return {...state, isFetching: false}
    case ASSIGN_CURRENT_USER:
      return {...state, currentUser: action.userData}
    default:
      return state
  }
}

const CHECK_FOR_CURRENT_USER_REQUEST = 'CHECK_FOR_CURRENT_USER_REQUEST'

const currentUserRequest = () => {
  return {
    type: CHECK_FOR_CURRENT_USER_REQUEST
  }
}

const CHECK_FOR_CURRENT_USER_REQUEST_SUCCESS = 'CHECK_FOR_CURRENT_USER_REQUEST_SUCCESS'

const currentUserRequestSuccess = userData => {
  return {
    type: CHECK_FOR_CURRENT_USER_REQUEST_SUCCESS,
    userData
  }
}

const CHECK_FOR_CURRENT_USER_REQUEST_FAILURE = 'CHECK_FOR_CURRENT_USER_REQUEST_FAILURE'

const currentUserRequestFailure = () => {
  return {
    type: CHECK_FOR_CURRENT_USER_REQUEST_FAILURE
  }
}

const ASSIGN_CURRENT_USER = 'ASSIGN_CURRENT_USER'

const assignCurrentUser = userData => {
  return {
    type: ASSIGN_CURRENT_USER,
    userData
  }
}

const checkForUser = () => {
  return dispatch => {
    dispatch(currentUserRequest())

    return fetch(`/api/v1/users/check_for_user`,
      {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(currentUserRequestFailure())
        dispatch(displayAlertMessage('Something went wrong while fetching data.'))
        return { error: 'Something went wrong while fetching data.' }
      }
    })
    .then(userData => {
      if(!userData.error) {
        dispatch(currentUserRequestSuccess(userData))
      } else {
        dispatch(currentUserRequestFailure())
        dispatch(displayAlertMessage(userData.error))
        setTimeout(() => { dispatch(closeAlertMessage()) }, 5000);
      }
    })
  }
}

export {
  user,
  checkForUser,
  assignCurrentUser
}