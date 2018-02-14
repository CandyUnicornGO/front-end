import React, { Component } from 'react';

import UserComment from '../user/Comment';

class UnicornComments extends Component {
  render() {
    return (
      <div className="be-comment-block">
        <h1 className="comments-title">Comments (3)</h1>
        <p className="about-comment-block">
          Price for comment is <a href="#" className="be-signup-link">0.00000054312 <i className="fa fa-btc"></i></a>
        </p>
        <form className="form-block">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <textarea className="form-input" required="" placeholder="Your text"></textarea>
                </div>
              </div>
              <a className="btn color-1 size-2 hover-1 pull-right">submit</a>
            </div>
          </form>

          <UserComment />

        <div className="be-comment">
          <div className="be-img-comment">
              <a href="blog-detail-2.html">
                <img src="img/c2.png" alt="" className="be-ava-comment" />
              </a>
            </div>
            <div className="be-comment-content">

                <span className="be-comment-name">
                  <a href="blog-detail-2.html">Phoenix, the Creative Studio</a>
              </span>
                <span className="be-comment-time">
                  <i className="fa fa-clock-o"></i>
                  May 27, 2015 at 3:14am
                </span>

              <p className="be-comment-text">
                Nunc ornare sed dolor sed mattis. In scelerisque dui a arcu mattis, at maximus eros commodo. Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant. Proin ut ornare lectus, vel eleifend est. Fusce hendrerit dui in turpis tristique blandit.
              </p>
              </div>

          </div>
        <div className="be-comment">
          <div className="be-img-comment">
              <a href="blog-detail-2.html">
                <img src="img/c3.png" alt="" className="be-ava-comment" />
              </a>
            </div>
            <div className="be-comment-content">
                <span className="be-comment-name">
                  <a href="blog-detail-2.html">Dorian Camp</a>
              </span>
                <span className="be-comment-time">
                  <i className="fa fa-clock-o"></i>
                  May 27, 2015 at 3:14am
                </span>
              <p className="be-comment-text">
                Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant
              </p>
            </div>
        </div>

      </div>
    );
  }
}

export default UnicornComments;
