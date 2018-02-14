import {SHOW_LOGIN_POPUP, HIDE_LOGIN_POPUP} from '../actions/login-popup'

const initialState = {
  isOpen: false
}

function loginPopupReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN_POPUP:
      return {isOpen: true}
    case HIDE_LOGIN_POPUP:
      return {isOpen: false}
    default:
      return state
  }
}

export default loginPopupReducer
