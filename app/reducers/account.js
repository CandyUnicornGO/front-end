import {LOGIN, LOGOUT, UPDATE} from '../actions/account'

function accountReducer(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.account
    case LOGOUT:
      return null
    case UPDATE:
      return action.account
    default:
      return state
  }
}

export default accountReducer
