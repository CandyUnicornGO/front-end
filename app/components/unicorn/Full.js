import React, { Component } from 'react';

import Tags from '../ui/Tags';

import UserPreview from '../user/Preview';

import UnicornLikesViewsComments from './LikesViewsComments';
import UnicornPreview from './Preview';
import UnicornGen from './Gen';
import UnicornName from './Name';
import UnicornShare from './Share';
import UnicornComments from './Comments';


class UnicornFull extends Component {
  render() {
    return (
      <div id="content-block">
    		<div className="container custom-container be-detail-container">
    			<div className="row">
    				<div className="col-md-9 col-md-push-3">
    					<div className="row"><div id="chartContainer"></div></div>
    					<div className="be-large-post">

    						<UnicornLikesViewsComments />

    						<div className="blog-content popup-gallery be-large-post-align">

                  <UnicornName />

    							<span className="just_part">
    								<span><i className="fa fa-line-chart"></i> +23.4453</span>
    								<span><i className="fa fa-cubes"></i> Gen-3</span>
    								<span><i className="fa fa-clock-o"></i> May 27, 2015</span>
    								<span><i className="fa fa-transgender"></i> Swift</span>
    								<span><i className="fa fa-globe"></i> USA</span>
    							</span>
    							<div className="clear"></div>
    							<img src="img/unicorn.png" alt="" />
    						</div>
    						<div className="be-large-post-align">
    							<div className="row">
    								<div className="col-xs-12 col-sm-6">
    									<div className="be-bottom">
    										<h4 className="be-bottom-title">Tags</h4>

                        <Tags />

    									</div>
    								</div>
    								<div className="col-xs-12 col-sm-6">

                      <UnicornShare />

    								</div>
    							</div>
    						</div>

                <UnicornGen />

    					</div>

    					<UnicornComments />
    				</div>
    				<div className="col-md-3 col-md-pull-9 left-feild">
    					<a href="#" className="be-button-vidget like-btn blue-style"><i className="fa fa-heart-o"></i>LIKE ME</a>
    					<a href="#" className="be-button-vidget like-btn blue-style"><i className="fa fa-bullhorn"></i> <small>promote for</small> <span> 0.00000012 <i className="fa fa-btc"></i></span></a>
    					<a href="#" className="be-button-vidget like-btn blue-style"><i className="fa fa-tag"></i> <small>buy for</small> <span> 0.042 <i className="fa fa-btc"></i> <i className="fa fa-cog"></i></span></a>
    					<a href="#" className="be-button-vidget add-btn grey-style"><i className="fa fa fa-venus-mars"></i> <small>modify for</small> <span> 0.000027 <i className="fa fa-btc"></i> <i className="fa fa-cog"></i></span></a>

    					<div className="info-block style-2">
    						<h3 className="info-block-label"><i className="fa fa-child"></i> Owner</h3>
    					</div>

              <UnicornPreview />

    					<br /><br />

    					<h3 className="letf-menu-article text-center">Parents</h3>
    					<div  className="swiper-container" data-loop="1" data-speed="500" data-center="0" data-slides-per-view="1">
    						<div className="swiper-wrapper">
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    						</div>
    						<div className="pagination">

    						</div>
    					</div>

    					<h3 className="letf-menu-article text-center">Children</h3>
    					<div  className="swiper-container" data-loop="1" data-speed="500" data-center="0" data-slides-per-view="1">
    						<div className="swiper-wrapper">
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    							<div className="swiper-slide">
    								<UnicornPreview />
    							</div>
    						</div>
    						<div className="pagination">

    						</div>
    					</div>

    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default UnicornFull;
