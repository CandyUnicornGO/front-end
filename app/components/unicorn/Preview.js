import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import Tags from '../ui/Tags';

import UnicornLikesViewsComments from './LikesViewsComments';
import UnicornName from './Name';

class UnicornPreview extends Component {
  render() {
    return (
      <div className="be-post">
        <div className="info-block">
          <span><i className="fa fa-tag"></i> 0.042 <i className="fa fa-btc"></i></span>
          <span>extra <i className="fa fa-info-circle"></i><i className="fa fa-venus-mars"></i> 0.00093 <i className="fa fa-btc"></i></span>
        </div>
        <span className="be-img-block">
        <Link to='/unicorn'><img src="img/p1.jpg" alt="omg" /></Link>
        </span>

        <UnicornName />

        <span className="just_part">
          <span><i className="fa fa-line-chart"></i> +23.4453</span>
          <span><i className="fa fa-cubes"></i> Gen-1</span>
        </span>
        <Tags />
        <div className="author-post">
          <img src="img/a1.png" alt="" className="ava-author" />
          <span>by <a href="page1.html">Alex Alexeev <span><i className="fa fa-globe"></i> USA</span></a></span>
        </div>
        <UnicornLikesViewsComments />
      </div>
    );
  }
}

export default UnicornPreview;
