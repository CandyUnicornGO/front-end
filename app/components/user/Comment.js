import React, { Component } from 'react';

class UserComment extends Component {
  render() {
    return (
      <div className="be-comment">
          <div className="be-img-comment">
            <a href="blog-detail-2.html">
              <img src="img/c1.png" alt="" className="be-ava-comment" />
            </a>
          </div>
          <div className="be-comment-content">

              <span className="be-comment-name">
                <a href="blog-detail-2.html">Ravi Sah 111</a>
                </span>
              <span className="be-comment-time">
                <i className="fa fa-clock-o"></i>
                May 27, 2015 at 3:14am
              </span>

            <p className="be-comment-text">
              Pellentesque gravida tristique ultrices.
              Sed blandit varius mauris, vel volutpat urna hendrerit id.
              Curabitur rutrum dolor gravida turpis tristique efficitur.
            </p>
          </div>

        </div>
    );
  }
}

export default UserComment;
