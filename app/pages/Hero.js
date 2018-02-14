import React, { Component } from 'react';
import {showLoginPopup} from '../actions/login-popup';
import {signUp} from '../actions/account';

const signUpStep = (metamask, loginPopup) => {
  if (loginPopup.isOpen) {
    if (metamask.isOn) {
      if (metamask.network === 'main') {
        if (metamask.account !== undefined) {
          return 4
        } else {
          return 5
        }
      } else {
        return 3
      }
    } else {
      return 2
    }
  } else {
    return 1
  }
}

const heroHeader = {
  1: [
    '#1 Welcome to KickAss blockchain game',
    '#1 Do not miss the revolution that is happening right now with UnicornGO!'
  ],
  2: [
    '#2 Welcome to KickAss blockchain game',
    '#2 Do not miss the revolution that is happening right now with UnicornGO!'
  ],
  3: [
    '#3 Welcome to KickAss blockchain game',
    '#3 Do not miss the revolution that is happening right now with UnicornGO!'
  ],
  4: [
    '#4 Welcome to KickAss blockchain game',
    '#4 Do not miss the revolution that is happening right now with UnicornGO!'
  ],
  5: [
    '#5 Welcome to KickAss blockchain game',
    '#5 Do not miss the revolution that is happening right now with UnicornGO!'
  ]
}

class Hero extends Component {
  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: '',
      email: ''
    }
  }

  handleSignUp(event) {
    event.preventDefault()
    this.props.dispatch(showLoginPopup())
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {name, email} = this.state
    const wallet = this.props.metamask.account
    this.props.dispatch(signUp(name, email, wallet))
  }

  render() {
    const {metamask, loginPopup} = this.props
    const step = signUpStep(metamask, loginPopup)
    return (
      <div className="head-bg">
        <div className="head-bg-img"></div>
        <div className="head-bg-content">
          <h1>{heroHeader[step][0]}</h1>
          <p>{heroHeader[step][1]}</p>

          {step === 1 && <div className="step">
            <a className="be-register btn color-3 size-1 hover-6" onClick={this.handleSignUp}>
              <i className="fa fa-lock"></i>sign up now
            </a>
          </div>}

          {step === 2 && <div className="step">
            <div className="head-bg-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tfETpi-9ORs?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe></div>
            <a className="be-register btn color-1 size-1 hover-6"><i className="fa fa-cloud-download"></i>install metamask</a>
            <a className="be-register btn color-3 size-1 hover-6"><i className="fa fa-thumbs-up"></i>i had metamask</a>
          </div>}

          {step === 3 && <div className="step">
            <img src="img/wrong-network.png" alt="" />
          </div>}

          {step === 4 && <div className="step">
            <form className="form-block register_me" onSubmit={this.handleSubmit}>
    					<div className="row">
    						<div className="col-xs-12 col-sm-12">
    							<div className="form-group fl_icon">
                    <div className="icon"><img src="img/subject-ico.png" alt="" /></div>
    								<input
                      className="form-input"
                      type="text"
                      required=""
                      readOnly
                      placeholder="Your Wallet"
                      value={metamask.account}
                    />
    							</div>
    						</div>
    						<div className="col-xs-12 col-sm-6 fl_icon">
    							<div className="form-group fl_icon">
    								<div className="icon"><img src="img/user-g-ico.png" alt="" /></div>
    								<input
                      className="form-input"
                      name="name"
                      type="text"
                      required=""
                      value={this.state.name}
                      placeholder="Your Name"
                      onChange={this.handleChange}
                    />
    							</div>
    						</div>
    						<div className="col-xs-12 col-sm-6 fl_icon">
    							<div className="form-group fl_icon">
    								<div className="icon"><img src="img/mail-g-ico.png" alt="" /></div>
    								<input
                      className="form-input"
                      name="email"
                      type="text"
                      required=""
                      value={this.state.email}
                      placeholder="Your email"
                      onChange={this.handleChange}
                    />
    							</div>
    						</div>
    						<button className="btn color-1 size-2 hover-1 pull-right">submit</button>
    					</div>
    				</form>
          </div>}

          {step === 5 && <div className="step">
            <img src="img/login-metamask.png" alt="" />
          </div>}

        </div>
      </div>
    );
  }
}

export default Hero;
