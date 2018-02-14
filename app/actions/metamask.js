export const TOGGLE_METAMASK = 'TOGGLE_METAMASK'
export const SET_METAMASK_ACCOUNT = 'SET_METAMASK_ACCOUNT'
export const SET_METAMASK_NETWORK = 'SET_METAMASK_NETWORK'

export function toggleMetamask(state = true) {
  return {type: TOGGLE_METAMASK, state}
}

export function setMetamaskAccount(account) {
  return {type: SET_METAMASK_ACCOUNT, account}
}

export function setMetamaskNetwork(network) {
  return {type: SET_METAMASK_NETWORK, network}
}
