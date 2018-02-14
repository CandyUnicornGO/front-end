import React, { Component } from 'react';

class UnicornShare extends Component {
  render() {
    return (
      <div className="be-bottom right">
        <h4 className="be-bottom-title">Share</h4>
        <ul className="soc_buttons light">
          <li><a href=""><i className="fa fa-facebook"></i></a></li>
          <li><a href=""><i className="fa fa-twitter"></i></a></li>
          <li><a href=""><i className="fa fa-google-plus"></i></a></li>
          <li><a href=""><i className="fa fa-pinterest-p"></i></a></li>
          <li><a href=""><i className="fa fa-instagram"></i></a></li>
          <li><a href=""><i className="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
    );
  }
}

export default UnicornShare;
