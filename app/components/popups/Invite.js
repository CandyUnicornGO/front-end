import React, { Component } from 'react';

class PopupInvite extends Component {
  render() {
    return (
      <div className="large-popup login">
    		<div className="large-popup-fixed"></div>
    		<div className="container large-popup-container">
    			<div className="row">
    				<div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3  large-popup-content">
    					<div className="row">
    						<div className="col-md-12">
    							<i className="fa fa-times close-button"></i>
    							<h5 className="large-popup-title">Exit</h5>
    						</div>
    						<form action="./" className="popup-input-search">
    						<div className="col-md-12">
    							<input className="input-signtype" type="text" required="" placeholder="Email" />
    						</div>
                <div className="col-md-12">
    							<input className="input-signtype" type="text" required="" placeholder="Email" />
    						</div>
                <div className="col-md-12">
    							<input className="input-signtype" type="text" required="" placeholder="Email" />
    						</div>
                <div className="col-md-12">
    							<input className="input-signtype" type="text" required="" placeholder="Email" />
    						</div>
    						<div className="col-xs-6">
    							<div className="be-checkbox">
    								<span className="large-popup-text">
    									Tollaty you have 100 points
    								</span>
    							</div>
    						</div>
    						<div className="col-xs-6 for-signin">
    							<input type="submit" className="be-popup-sign-button" value="send Invitation" />
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

export default PopupInvite;
