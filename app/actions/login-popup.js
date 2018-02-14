export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP'
export const HIDE_LOGIN_POPUP = 'HIDE_LOGIN_POPUP'

export function showLoginPopup() {
  return {type: SHOW_LOGIN_POPUP}
}

export function hideLoginPopup() {
  return {type: HIDE_LOGIN_POPUP}
}
