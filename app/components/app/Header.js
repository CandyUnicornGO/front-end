import React, { Component } from 'react';
import {connect} from 'react-redux'

import Logo from './Logo';
import Menu from './Menu';
import UserPreview from '../user/Preview';

import {showLoginPopup} from '../../actions/login-popup'

const mapStateToProps = (state) => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (event) => {
    event.preventDefault()
    dispatch(showLoginPopup())
  }
})

export const Header = ({account, handleLogin}) => {
  const isLoggedIn = account !== undefined
  return (
    <header>
      <div className="container-fluid custom-container">
        <div className="row no_row row-header">
          <Logo />
          <Menu isFull={isLoggedIn}/>
          <UserPreview account={account} onLogin={handleLogin}/>
        </div>
      </div>
    </header>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
