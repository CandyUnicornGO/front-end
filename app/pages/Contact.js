import React, { Component } from 'react';

class PageContact extends Component {
  render() {
    return (
      <div id="content-block">
    		<div className="head-bg style-2">
    			<div className="head-bg-img"><img className="center-image" src="img/bg-4.jpg" alt="" /></div>
    			<div className="head-bg-content">
    				<h1>You may find us easily</h1>
    				<p>Donec in rhoncus tortor. Sed tristique auctor ligula vel viverra</p>
    			</div>
    		</div>
    		<div className="container be-detail-container">
    			<div className="block">
    				<h2 className="content-title">Contact Information</h2>
    				<div className="block-subtitle">className aptent taciti sociosqu ad litora torquent per conubia nostra</div>
    				<div className="contact-info block">
    					<div className="contact-header">
    						<div className="row">
    							<div className="col-xs-12 col-sm-4">
    								<div className="contact-entry">
    									<h4 className="contact-label"><img src="img/marker.png" alt="" /> Contact address</h4>
    									<div className="contact-text">
    										<p>Beverly Hills 42, California</p>
    										<p>New York, Guerlain Street 87</p>
    									</div>
    								</div>
    							</div>
    							<div className="col-xs-12 col-sm-4">
    								<div className="contact-entry">
    									<h4 className="contact-label"><img src="img/phone-ico.png" alt="" /> Phones</h4>
    									<div className="contact-text">
    										<p><a href="tel:+99123456789001">+99 (123) 456 789 001</a></p>
    										<p><a href="tel:+1234556789">+1 (23) 45 567 89</a></p>
    									</div>
    								</div>
    							</div>
    							<div className="col-xs-12 col-sm-4">
    								<div className="contact-entry">
    									<h4 className="contact-label"><img src="img/mail-ico.png" alt="" /> Email</h4>
    									<div className="contact-text">
    										<p><a href="mailto:#">info@unicorn.go</a></p>
    										<p><a href="mailto:#">support@unicorn.go</a></p>
    									</div>
    								</div>
    							</div>
    						</div>
    					</div>
    	                <div id="map-canvas" data-lat="40.669096" data-lng="-73.987733" data-zoom="15"></div>
    	                <div className="addresses-block">
    	                    <a data-lat="40.669096" data-lng="-73.987733" data-string="1. Here is some address or email or phone or something else..."></a>
    	                </div>
    				</div>
    			</div>

    			<div className="block">
    				<h2 className="content-title">Leave a message</h2>
    				<div className="block-subtitle">Maecenas et mollis ligula. Donec finibus feugiat laoreet.</div>
    				<div className="contect-form">
    					<form className="form-block">
    						<div className="row">
    							<div className="col-xs-12 col-sm-6">
    								<div className="form-group fl_icon">
    									<div className="icon"><img src="img/user-g-ico.png" alt="" /></div>
    									<input className="form-input" type="text" required="" placeholder="Your name" />
    								</div>
    							</div>
    							<div className="col-xs-12 col-sm-6 fl_icon">
    								<div className="form-group fl_icon">
    									<div className="icon"><img src="img/subject-ico.png" alt="" /></div>
    									<input className="form-input" type="text" required="" placeholder="Subject" />
    								</div>
    							</div>
    							<div className="col-xs-12 col-sm-6 fl_icon">
    								<div className="form-group fl_icon">
    									<div className="icon"><img src="img/mail-g-ico.png" alt="" /></div>
    									<input className="form-input" type="text" required="" placeholder="Your email" />
    								</div>
    							</div>
    							<div className="col-xs-12 col-sm-6 fl_icon">
    								<div className="form-group fl_icon">
    									<div className="icon"><img src="img/phone-g-ico.png" alt="" /></div>
    									<input className="form-input" type="text" required="" placeholder="Your phone" />
    								</div>
    							</div>
    							<div className="col-xs-12">
    								<div className="form-group">
    									<textarea className="form-input" required="" placeholder="Your message"></textarea>
    								</div>
    							</div>
    							<button className="btn color-1 size-2 hover-1 pull-right">submit</button>
    						</div>
    					</form>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default PageContact;
