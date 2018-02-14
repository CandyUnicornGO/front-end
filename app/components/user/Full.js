import React, { Component } from 'react';

class UserFull extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-4 left-feild">
        <div className="be-user-block style-3">
          <div className="be-user-detail">
            <span className="be-ava-user style-2">
              <img src="img/ava_10.jpg" alt="" />
              <div>
              <a className="settings" href="#"><i className="fa fa-times"></i></a>
              <a className="settings" href="#"><i className="fa fa-upload"></i></a>
            </div>
            </span>
            <p className="be-use-name">Alex Alexeev <a className="settings" href="#"><i className="fa fa-cog"></i></a></p>
            <div className="form-group">
              <input className="form-input" type="text" placeholder="Alex Alexeev" />
            </div>
            <a className="btn color-1 size-3 hover-1">save</a>
            <a className="btn color-4 size-3 hover-7">cancel</a>
            <div className="clear"></div>

            <div className="be-user-info">
              Barnsley, United Kingdom
              <a className="settings" href="#"><i className="fa fa-times"></i></a>
              <a className="settings" href="#"><i className="fa fa-map-marker"></i></a>
            </div>
            <div className="be-user-social">
              <a className="social-btn color-1" href="#"><i className="fa fa-facebook"></i></a>
              <a className="social-btn color-2" href="#"><i className="fa fa-twitter"></i></a>
              <a className="social-btn color-3" href="#"><i className="fa fa-google-plus"></i></a>
              <a className="social-btn color-4" href="#"><i className="fa fa-pinterest-p"></i></a>
              <a className="social-btn color-5" href="#"><i className="fa fa-instagram"></i></a>
              <a className="social-btn color-6" href="#"><i className="fa fa-linkedin"></i></a>
              <a className="settings" href="#"><i className="fa fa-cog"></i></a>
            </div>

            <div className="dit-user-social">
              <div className="social-input form-group focus-2">
                <div className="s_icon">
                  <div className="social-bars"><i className="fa fa-bars"></i></div>
                  <a className="social-btn color-1" href="#"><i className="fa fa-facebook"></i></a>
                </div>
                <div className="s_input">
                  <input className="form-input" type="text" value="http:// facebook.com/taylor" />
                </div>
              </div>
              <div className="social-input form-group focus-2">
                <div className="s_icon">
                  <div className="social-bars"><i className="fa fa-bars"></i></div>
                  <a className="social-btn color-2" href="#"><i className="fa fa-twitter"></i></a>
                </div>
                <div className="s_input">
                  <input className="form-input" type="text" value="http:// twitter.com/taylor" />
                </div>
              </div>
              <div className="social-input form-group focus-2">
                <div className="s_icon">
                  <div className="social-bars"><i className="fa fa-bars"></i></div>
                  <a className="social-btn color-3" href="#"><i className="fa fa-google-plus"></i></a>
                </div>
                <div className="s_input">
                  <input className="form-input" type="text" value="http:// googleplus.com/taylor" />
                </div>
              </div>
              <div className="social-input form-group focus-2">
                <div className="s_icon">
                  <div className="social-bars"><i className="fa fa-bars"></i></div>
                  <a className="social-btn color-4" href="#"><i className="fa fa-pinterest-p"></i></a>
                </div>
                <div className="s_input">
                  <input className="form-input" type="text" value="http:// pinterest.com/taylor" />
                </div>
              </div>
              <div className="social-input form-group focus-2">
                <div className="s_icon">
                  <div className="social-bars"><i className="fa fa-bars"></i></div>
                  <a className="social-btn color-5" href="#"><i className="fa fa-instagram"></i></a>
                </div>
                <div className="s_input">
                  <input className="form-input" type="text" value="http:// instagram.com/taylor" />
                </div>
              </div>
              <a className="btn color-1 size-3 hover-1">save</a>
              <a className="btn color-4 size-3 hover-7">cancel</a>
              <div className="clear"></div>
            </div>

            <a className="be-user-site" href="http://www.unicorn.go"><i className="fa fa-link"></i> http://www.unicorn.go</a>
            <a className="settings" href="#"><i className="fa fa-cog"></i></a>

            <div className="form-group fg_icon">
              <input className="form-input" type="text" placeholder="http://www.unicorn.go" />
              <i className="form-group-icon fa fa-link"></i>
            </div>
            <a className="btn color-1 size-3 hover-1">save</a>
            <a className="btn color-4 size-3 hover-7">cancel</a>
            <div className="clear"></div>
          </div>
          <div className="be-user-statistic">
            <div className="stat-row clearfix"><i className="stat-icon icon-views"></i> <small>my</small> Views<span className="stat-counter">218098&nbsp;&nbsp;&nbsp;&nbsp; <a className="settings" href="#"> <i className="fa fa-toggle-on"></i></a></span></div>
            <div className="stat-row clearfix"><i className="stat-icon icon-like"></i> <small>my</small> Likes<span className="stat-counter">14335&nbsp;&nbsp;&nbsp;&nbsp; <a className="settings" href="#"> <i className="fa fa-toggle-on"></i></a></span></div>
            <div className="stat-row clearfix"><i className="stat-icon icon-comment"></i> <small>my</small> Comments<span className="stat-counter">14335&nbsp;&nbsp;&nbsp;&nbsp; <a className="settings" href="#"> <i className="fa fa-toggle-on"></i></a></span></div>
            <div className="stat-row clearfix"><i className="stat-icon fa fa-line-chart"></i> <small>my</small> Storage<span className="stat-counter">14335&nbsp;&nbsp;&nbsp;&nbsp; <a className="settings" href="#"> <i className="fa fa-toggle-on"></i></a></span></div>
          </div>
        </div>
        <div className="be-desc-block">
          <div className="be-desc-author">
            <div className="be-desc-label">About Me <a className="settings" href="#"><i className="fa fa-cog"></i></a></div>
            <div className="clearfix"></div>
            <div className="be-desc-text">
              Nam sit amet massa commodo, tristique metus at, consequat turpis. In vulputate justo at auctor mollis. Aliquam non sagittis tortor. Duis tristique suscipit risus, quis facilisis nisl congue vitae. Nunc varius pellentesque scelerisque. Etiam quis massa vitae lectus placerat ullamcorper pellentesque vel nisl.
            </div>

            <div className="form-group">
              <textarea className="form-input" type="text">
                Nam sit amet massa commodo, tristique metus at, consequat turpis. In vulputate justo at auctor mollis. Aliquam non sagittis tortor. Duis tristique suscipit risus, quis facilisis nisl congue vitae. Nunc varius pellentesque scelerisque. Etiam quis massa vitae lectus placerat ullamcorper pellentesque vel nisl.
              </textarea>
              <center>
                <a className="btn color-1 size-3 hover-1">save</a>
                <a className="btn color-4 size-3 hover-7">cancel</a>
              </center>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default UserFull;
