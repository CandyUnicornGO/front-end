import React, { Component } from 'react';

import UserFull from '../components/user/Full';

class PageUser extends Component {
  render() {
    return (
      <div id="content-block">
    		<div className="container be-detail-container">
    			<div className="row">

          <UserFull />

    				<div className="col-xs-12 col-md-8">
                        <div className="tab-wrapper style-1">
                            <div className="tab-nav-wrapper">
                                <div  className="nav-tab  clearfix">
                                    <div className="nav-tab-item active">
                                        <span>all_Unicorns</span>
                                    </div>
                                    <div className="nav-tab-item ">
                                        <span>on_Modification</span>
                                    </div>
                                    <div className="nav-tab-item ">
                                        <span>for_Sale</span>
                                    </div>
    																<div className="nav-tab-item ">
                                        <span>for_Modification</span>
                                    </div>
    																<div className="nav-tab-item ">
                                        <span><i className="fa fa-heart-o" aria-hidden="true"></i> favorites</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tabs-content clearfix">
                                <div className="tab-info active">
    								<div className="row">
    									<div className="col-ml-12 col-xs-6 col-sm-4">
    										<div className="be-post">
    											<div className="info-block">
    												<span><i className="fa fa-tag"></i> 0.042 <i className="fa fa-btc"></i></span>
    												<span>fast <i className="fa fa-venus-mars"></i> 0.00093 <i className="fa fa-btc"></i></span>
    											</div>
    											<a href="#" className="be-img-block">
    											<img src="img/p1.jpg" alt="omg" />
    											</a>
    											<a href="#" className="be-post-title">Mr. Incredible Unicorn</a>
    											<span className="just_part">
    												<span><i className="fa fa-line-chart"></i> +23.4453</span>
    												<span><i className="fa fa-cubes"></i> Gen-1</span>
    											</span>
    											<span>
    												<a href="#" className="be-post-tag">Nice</a>,
    												<a href="#" className="be-post-tag">Gute</a>,
    												<a href="#" className="be-post-tag">Usual</a>,
    												<a href="#" className="be-post-tag">Just</a>,
    												<a href="#" className="be-post-tag">Angry</a>
    											</span>
    											<div className="info-block">
    												<span><i className="fa fa-heart-o" aria-hidden="true"></i> 360</span>
    												<span><i className="fa fa-eye"></i> 789</span>
    												<span><i className="fa fa-comment-o"></i> 20</span>
    											</div>
    										</div>
    									</div>
    									<div className="col-ml-12 col-xs-6 col-sm-4">
    										<div className="be-post">
    											<div className="info-block">
    												<span><i className="fa fa-tag"></i> 0.042 <i className="fa fa-btc"></i></span>
    												<span>extra <i className="fa fa-venus-mars"></i><i className="fa fa-clock-o"></i> 10min. </span>
    											</div>
    											<a href="#" className="be-img-block">
    											<img src="img/p1.jpg" alt="omg" />
    											</a>
    											<a href="#" className="be-post-title">Mr. Incredible Unicorn</a>
    											<span className="just_part">
    												<span><i className="fa fa-line-chart"></i> +23.4453</span>
    												<span><i className="fa fa-cubes"></i> Gen-1</span>
    											</span>
    											<span>
    												<a href="#" className="be-post-tag">Nice</a>,
    												<a href="#" className="be-post-tag">Gute</a>,
    												<a href="#" className="be-post-tag">Usual</a>,
    												<a href="#" className="be-post-tag">Just</a>,
    												<a href="#" className="be-post-tag">Angry</a>
    											</span>
    											<div className="info-block">
    												<span><i className="fa fa-heart-o" aria-hidden="true"></i> 360</span>
    												<span><i className="fa fa-eye"></i> 789</span>
    												<span><i className="fa fa-comment-o"></i> 20</span>
    											</div>
    										</div>
    									</div>
    									<div className="col-ml-12 col-xs-6 col-sm-4">
    										<div className="be-post">
    											<div className="info-block">
    												<span><i className="fa fa-tag"></i> 0.042 <i className="fa fa-btc"></i></span>
    												<span>slow <i className="fa fa-venus-mars"></i> 0.00093 <i className="fa fa-btc"></i></span>
    											</div>
    											<a href="#" className="be-img-block">
    											<img src="img/p1.jpg" alt="omg" />
    											</a>
    											<a href="#" className="be-post-title">Mr. Incredible Unicorn</a>
    											<span className="just_part">
    												<span><i className="fa fa-line-chart"></i> +23.4453</span>
    												<span><i className="fa fa-cubes"></i> Gen-1</span>
    											</span>
    											<span>
    												<a href="#" className="be-post-tag">Nice</a>,
    												<a href="#" className="be-post-tag">Gute</a>,
    												<a href="#" className="be-post-tag">Usual</a>,
    												<a href="#" className="be-post-tag">Just</a>,
    												<a href="#" className="be-post-tag">Angry</a>
    											</span>
    											<div className="info-block">
    												<span><i className="fa fa-heart-o" aria-hidden="true"></i> 360</span>
    												<span><i className="fa fa-eye"></i> 789</span>
    												<span><i className="fa fa-comment-o"></i> 20</span>
    											</div>
    										</div>
    									</div>
    								</div>
                                </div>
                                <div className="tab-info">
    								<div className="row">
    									...
    								</div>
                                </div>
                                <div className="tab-info">
    								<div className="row">
    									...
    								</div>
                                </div>
                                <div className="tab-info">
                                	<div className="row">
    									...
    								</div>
                                </div>
                            </div>
                        </div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default PageUser;
