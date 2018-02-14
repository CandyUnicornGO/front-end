import db from '../utils/db'
import smartUnicorn from '../utils/smart-unicorn'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE = 'UPDATE'

export function login(account) {
  return {type: LOGIN, account}
}

export function logout() {
  return {type: LOGOUT}
}

export function update(account) {
  return {type: UPDATE, account}
}

export function signUp(name, email, wallet) {
  return (dispatch) => {
    db.saveAccount({
      id: wallet, name, email
    }).then((result) => {
      dispatch(login({
        id: wallet, name, email
      }))
    })
  }
}
