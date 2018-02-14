import {combineReducers} from 'redux'
import accountReducer from './account'
import metamaskReducer from './metamask'
import loginPopupReducer from './login-popup'

export default combineReducers({
  account: accountReducer,
  metamask: metamaskReducer,
  loginPopup: loginPopupReducer
})
