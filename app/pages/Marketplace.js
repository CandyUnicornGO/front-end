import React, { Component } from 'react'
import { connect } from 'react-redux'

import Hero from './Hero';
import Filter from './Filter';

const mapStateToProps = (state) => {
  return {
    metamask: state.metamask,
    account: state.account,
    loginPopup: state.loginPopup
  }
}

class Marketplace extends Component {
  render() {
    const {account, dispatch, metamask, loginPopup} = this.props
    return (
      <div id="content-block">
        {!account &&
          <Hero
            dispatch={dispatch}
            metamask={metamask}
            loginPopup={loginPopup}
        />}
        <Filter />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Marketplace);
