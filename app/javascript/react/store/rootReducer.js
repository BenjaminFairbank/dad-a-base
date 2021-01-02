import { combineReducers } from 'redux'

import { app } from '../modules/app'
import { user } from '../modules/user'
import { alertMessage } from '../modules/alertMessage'

const rootReducer = combineReducers({
  app,
  user,
  alertMessage
})

export default rootReducer
