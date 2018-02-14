import React, { Component } from 'react';

const UserLogin = ({onLogin}) => (
  <div className="login-header-block">
    <div className="login_block">
      <a className="btn-login btn color-1 size-2 hover-2" href="" onClick={onLogin}>
        <i className="fa fa-user"></i> Log in
      </a>
    </div>
  </div>
)

export default UserLogin;
