import React, { Component } from 'react';

class PopupRegister extends Component {
  render() {
    return (
      <div className="large-popup register">
    		<div className="large-popup-fixed"></div>
    		<div className="container large-popup-container">
    			<div className="row">
    				<div className="col-md-10 col-md-push-1 col-lg-8 col-lg-push-2 large-popup-content">
    					<div className="row">
    						<div className="col-md-12">
    							<i className="fa fa-times close-button"></i>
    							<h5 className="large-popup-title">Register</h5>
    						</div>
    						<form action="./" className="popup-input-search">
    						<div className="col-md-12">
    							<input className="input-signtype" type="text" required="" placeholder="Wallet" />
    						</div>
    						<div className="col-md-6">
    							<input className="input-signtype" type="text" required="" placeholder="Nick Name" />
    						</div>
    						<div className="col-md-6">
    							<input className="input-signtype" type="text" required="" placeholder="Email" />
    						</div>
    						<div className="col-md-6">
    							<div className="be-checkbox">
    								<label className="check-box">
    								    <input className="checkbox-input" type="checkbox" required="" value="" /> <span className="check-box-sign"></span>
    								</label>
    								<span className="large-popup-text">
    									I have read and agree to the <a className="be-popup-terms" href="blog-detail-2.html">Terms of Use</a> and <a className="be-popup-terms" href="blog-detail-2.html">Privacy Policy</a>.
    								</span>
    							</div>
    						</div>
    						<div className="col-md-6 for-signin">
    							<input type="submit" className="be-popup-sign-button" value="SIGN IN" />
    						</div>
    						</form>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default PopupRegister;
