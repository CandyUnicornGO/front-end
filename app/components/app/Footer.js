import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import Dates from './Dates';

class Footer extends Component {
  render() {
    return (
    	<footer>
        <Dates />
    		<div className="footer-main">
    			<div className="container-fluid custom-container">
    				<div className="row">
    					<div className="col-md-3 col-xl-4">
    						<div className="footer-block">
    							<h1 className="footer-title">About Us</h1>
    							<p>Vestibulum tincidunt, augue fermentum accumsan viverra, eros dui rutrum libero, nec imperdiet felis sem in augue luctus <a href="#">diam a porta</a> iaculis. Vivamus sit amet fermentum nisl. Duis id <a href="#">massa id purus</a> tristique varius a sit amet est. Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc.</p>
    							<ul className="soc_buttons">
    								<li><a href=""><i className="fa fa-github"></i></a></li>
    								<li><a href=""><i className="fa fa-facebook"></i></a></li>
    								<li><a href=""><i className="fa fa-twitter"></i></a></li>
    								<li><a href=""><i className="fa fa-google-plus"></i></a></li>
    								<li><a href=""><i className="fa fa-pinterest-p"></i></a></li>
    								<li><a href=""><i className="fa fa-instagram"></i></a></li>
    								<li><a href=""><i className="fa fa-linkedin"></i></a></li>
    							</ul>
    						</div>
    					</div>
    					<div className="col-md-3 col-xl-2">
    						<div className="footer-block">
    							<h1 className="footer-title">Some Links</h1>
    							<div className="row footer-list-footer">
    							<div className="col-md-6">
    							<ul className="link-list">
    								<li><Link to='/about'>About Us</Link></li>
    								<li><Link to='/contact'>Contacts</Link></li>
    								<li><a href="#">We hire</a></li>
    							</ul></div>
    							<div className="col-md-6">
    							<ul className="link-list">
    								<li><Link to='/faq'>FAQ</Link></li>
    								<li><a href="#">Help & Support</a></li>
    							</ul>
    							</div>
    							</div>
    						</div>
    					</div>
    					<div className="col-md-3 galerry">
    						<div className="footer-block">
    							<h1 className="footer-title">Most active users</h1>
    							<a href="#"><img src="img/g1.jpg" alt="" /></a>
    							<a href="#"><img src="img/g2.jpg" alt="" /></a>
    							<a href="#"><img src="img/g3.jpg" alt="" /></a>
    							<a href="#"><img src="img/g4.jpg" alt="" /></a>
    							<a href="#"><img src="img/g5.jpg" alt="" /></a>
    							<a href="#"><img src="img/g6.jpg" alt="" /></a>
    							<a href="#"><img src="img/g7.jpg" alt="" /></a>
    							<a href="#"><img src="img/g8.jpg" alt="" /></a>
    							<a href="#"><img src="img/g9.jpg" alt="" /></a>
    							<a href="#"><img src="img/g10.jpg" alt="" /></a>
    							<a href="#"><img src="img/g11.jpg" alt="" /></a>
    							<a href="#"><img src="img/g12.jpg" alt="" /></a>
    						</div>
    					</div>
    					<div className="col-md-3">
    						<div className="footer-block">
    							<h1 className="footer-title">Subscribe On Our News</h1>
    							<form action="./" className="subscribe-form">
    								<input type="text" placeholder="Your E-mail" required />
    								<div className="submit-block">
    									<i className="fa fa-envelope-o"></i>
    									<input type="submit" value="" />
    								</div>
    							</form>
    							<div className="soc-activity">
    								<div className="soc_ico_triangle">
    									<i className="fa fa-twitter"></i>
    								</div>
    								<div className="message-soc">
    									<div className="date">16h ago</div>
    									<a href="#" className="account">@faq</a> vestibulum accumsan est <a href="#" className="heshtag">hello world</a> sem auctor, eu aliquet nisi ornare leo sit amet varius egestas.
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div className="footer-bottom">
    			<div className="container-fluid custom-container">
    				<div className="col-md-12 footer-end clearfix">
    					<div className="left">
    						<span className="copy">© 2018. All rights reserved. <span className="white"><a href="#"> UnicornGO</a></span></span>
    						<span className="created">Created with LOVE by <span className="white"><a href="#"> DreamTEAM</a></span></span>
    					</div>
    					<div className="right">
    						<a className="btn color-7 size-2 hover-9">About Us</a>
    						<a className="btn color-7 size-2 hover-9">Help</a>
    						<a className="btn color-7 size-2 hover-9">Privacy Policy</a>
    					</div>
    				</div>
    			</div>
    		</div>
    	</footer>
    );
  }
}

export default Footer;
