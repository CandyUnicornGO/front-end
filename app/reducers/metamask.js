import {
  TOGGLE_METAMASK,
  SET_METAMASK_ACCOUNT,
  SET_METAMASK_NETWORK
} from '../actions/metamask'

const initialState = {
  account: undefined,
  network: 'main',
  isOn: false
}

function metamaskReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_METAMASK:
      return Object.assign({}, state, {
        isOn: action.state
      })
    case SET_METAMASK_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account
      })
    case SET_METAMASK_NETWORK:
      return Object.assign({}, state, {
        network: action.network
      })
    default:
      return state
  }
}

export default metamaskReducer
