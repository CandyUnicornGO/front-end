import React, { Component } from 'react';

class PageAbout extends Component {
  render() {
    return (
      <div id="content-block">
    		<div className="head-bg style-3 ab-us">
    			<div className="swiper-container" data-autoplay="2000" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="1">
                    <div className="swiper-wrapper">
                    	<div className="swiper-slide head-bg-img " data-val="0">
                    		<img className="center-image" src="img/bg-3.jpg" alt="" />
                    	</div>
                    	<div className="swiper-slide head-bg-img" data-val="1">
                    		<img className="center-image" src="img/bg-2.jpg" alt="" />
                    	</div>
                    	<div className="swiper-slide head-bg-img" data-val="2">
                    		<img className="center-image" src="img/bg-5.jpg" alt="" />
                    	</div>
                    </div>
                    <div className="pagination hidden"></div>
                </div>
    			<div className="head-bg-content">
                    <div className="swiper-arrow-left type-2 be-out"></div>
                    <div className="swiper-arrow-right type-2 be-out"></div>
    				<h1>Some Information about our Company</h1>
    				<p>Donec in rhoncus tortor. Sed tristique auctor ligula vel viverra</p>
    				<a className="be-register btn color-3 size-1 hover-6"><i className="fa fa-lock"></i>join now</a>
    			</div>
    		</div>
    		<div className="container">
    			<div className="about-description">
    				<img className="img-responsive" src="img/about.jpg" alt="" />
    				<div className="row">
    					<div className="col-xs-12 col-md-10 col-md-offset-1">
    						<div className="about-text">Duis pretium diam auctor velit tempus imperdiet. Duis velit ipsum, consequat vitae bibendum in, vestibulum sit amet turpis. Fusce venenatis egestas ultrices. Nam nec porttitor metus. Ut eros arcu, pretium at nunc eu, vulputate efficitur tellus. Vivamus tempus sem et metus euismod, a facilisis est egestas. Ut nunc eros, suscipit vitae tincidunt ut, dapibus a eros. Cras euismod dui sapien.Vestibulum varius ultrices arcu. Sed semper leo ex, sit amet rutrum est blandit sit amet. Ut magna neque, congue at augue eget, ullamcorper luctus ligula. Cras scelerisque nisi at nibh gravida consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nulla nunc. Curabitur risus sapien, convallis non tortor eget, interdum tempus ligula. </div>
    					</div>
    				</div>
    			</div>
    			<div className="block">
    				<h3 className="block-title">Our Team As They Are</h3>
    				<div className="block-subtitle">Cras vel dui tempor lorem ultrices eleifend non nec enim. Aliquam condimentum at diam vitae vulputate.</div>
    				<div className="row">
    					<div className="col-ml-12 col-xs-6 col-sm-6 col-md-3">
    						<div className="team-entry">
    							<a href="blog-detail-2.html"><img className="img-responsive img-full" src="img/team_1.jpg" alt="" /></a>
    							<h4 className="team-name">Marcus Finderman</h4>
    							<div className="team-position">
    								<a href="blog-detail-2.html" className="be-post-tag">Art Director</a>,
    								<a href="blog-detail-2.html" className="be-post-tag">Creative  Designer</a>
    							</div>
    							<div className="team-social">
    								<a href="blog-detail-2.html"><i className="fa fa-facebook"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-twitter"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-google-plus"></i></a>
    							</div>
    						</div>
    					</div>
    					<div className="col-ml-12 col-xs-6 col-sm-6 col-md-3">
    						<div className="team-entry">
    							<a href="blog-detail-2.html"><img className="img-responsive img-full" src="img/team_2.jpg" alt="" /></a>
    							<h4 className="team-name">Boney mcFannin</h4>
    							<div className="team-position">
    								<a href="blog-detail-2.html" className="be-post-tag">Web Developer</a>
    							</div>
    							<div className="team-social">
    								<a href="blog-detail-2.html"><i className="fa fa-facebook"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-twitter"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-google-plus"></i></a>
    							</div>
    						</div>
    					</div>
    					<div className="col-ml-12 col-xs-6 col-sm-6 col-md-3">
    						<div className="team-entry">
    							<a href="blog-detail-2.html"><img className="img-responsive img-full" src="img/team_5.jpg" alt="" /></a>
    							<h4 className="team-name">Jerremy Dawson</h4>
    							<div className="team-position">
    								<a href="blog-detail-2.html" className="be-post-tag">Illustrator</a>
    							</div>
    							<div className="team-social">
    								<a href="blog-detail-2.html"><i className="fa fa-facebook"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-twitter"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-google-plus"></i></a>
    							</div>
    						</div>
    					</div>
    					<div className="col-ml-12 col-xs-6 col-sm-6 col-md-3">
    						<div className="team-entry">
    							<a href="blog-detail-2.html"><img className="img-responsive img-full" src="img/team_4.jpg" alt="" /></a>
    							<h4 className="team-name">Jhon Makauer</h4>
    							<div className="team-position">
    								<a href="blog-detail-2.html" className="be-post-tag">Manager</a>
    							</div>
    							<div className="team-social">
    								<a href="blog-detail-2.html"><i className="fa fa-facebook"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-twitter"></i></a>
    								<a href="blog-detail-2.html"><i className="fa fa-google-plus"></i></a>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div className="counters-block number-counters">
    			<img className="center-image" src="img/bg-5.jpg" alt="" />
    			<div className="container">

    				<div className="row">
    					<div className="col-xs-12 col-sm-6 col-md-3">
    						<div className="counter-entry">
    							<div className="stat-number" data-to="135" data-speed="3000">0</div>
    							<div className="counter-label">SME Resolution</div>
    							<div className="counter-text">Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat</div>
    							<a className="btn color-3 size-2 hover-8">read more</a>
    						</div>
    					</div>
    					<div className="col-xs-12 col-sm-6 col-md-3">
    						<div className="counter-entry">
    							<div className="stat-number" data-to="75" data-speed="3000">0</div>
    							<div className="counter-label">Actions</div>
    							<div className="counter-text">Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc. Proin fermentum</div>
    							<a className="btn color-3 size-2 hover-8">read more</a>
    						</div>
    					</div>
    					<div className="col-xs-12 col-sm-6 col-md-3">
    						<div className="counter-entry">
    							<div className="stat-number" data-to="41" data-speed="3000">0</div>
    							<div className="counter-label">Purchases in year</div>
    							<div className="counter-text">Donec sed lobortis tortor. Ut nec lacinia sapien, sit amet dapibus magna</div>
    							<a className="btn color-3 size-2 hover-8">read more</a>
    						</div>
    					</div>
    					<div className="col-xs-12 col-sm-6 col-md-3">
    						<div className="counter-entry">
    							<div className="stat-number" data-to="66" data-speed="3000">0</div>
    							<div className="counter-label">Handworks</div>
    							<div className="counter-text">Sed ultricies luctus ipsum in placerat. Mauris ultrices pharetra lectus sit amet</div>
    							<a className="btn color-3 size-2 hover-8">read more</a>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div className="container">
    			<div className="block">
    				<h3 className="block-title">Services</h3>
    				<div className="block-subtitle">Nulla id risus urna. Ut commodo leo quis </div>

    				<div className="swiper-container" data-autoplay="5000" data-loop="0" data-speed="300" data-center="0" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="2" data-md-slides="3" data-lg-slides="3" data-add-slides="3">
                        <div className="swiper-wrapper">
                        	<div className="swiper-slide" data-val="0">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_1.png" alt="" />
    								<h4 className="service-title">Ideas for everyone</h4>
    								<div className="service-text">Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        	<div className="swiper-slide" data-val="1">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_2.png" alt="" />
    								<h4 className="service-title">Developing pages</h4>
    								<div className="service-text">Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        	<div className="swiper-slide" data-val="2">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_3.png" alt="" />
    								<h4 className="service-title">Easy in touch</h4>
    								<div className="service-text">Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        	<div className="swiper-slide" data-val="3">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_1.png" alt="" />
    								<h4 className="service-title">Ideas for everyone</h4>
    								<div className="service-text">Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        	<div className="swiper-slide" data-val="4">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_2.png" alt="" />
    								<h4 className="service-title">Developing pages</h4>
    								<div className="service-text">Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        	<div className="swiper-slide" data-val="5">
    							<div className="service-entry">
    								<img className="service-icon" src="img/service_3.png" alt="" />
    								<h4 className="service-title">Easy in touch</h4>
    								<div className="service-text">Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa</div>
    								<a className="btn color-1 size-2 hover-1">read more</a>
    							</div>
                            </div>
                        </div>
                        <div className="pagination">

                        </div>
                    </div>
    			</div>
    		</div>
    		<div className="container-fluid">
    			<div className="info-blocks">
    				<div className="info-entry left table-block">
    					<div className="row table-row">
    						<div className="table-cell col-xs-12 col-sm-6">
    							<img className="img-responsive img-full" src="img/info_block_1.jpg" alt="" />
    						</div>
    						<div className="table-cell col-xs-12 col-sm-6">
    							<div className="info-text">
    								<h3 className="block-title">Work With Us</h3>
    								<div className="row">
    									<div className="col-xs-12 col-sm-6">
    										<h4>Why our team</h4>
    										<p>Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum.</p>
    									</div>
    									<div className="col-xs-12 col-sm-6">
    										<h4>Your career</h4>
    										<p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

    										<p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>
    									</div>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    				<div className="info-entry right table-block">
    					<div className="row table-row">
    						<div className="table-cell col-xs-12 col-sm-6">
    							<div className="info-text">
    								<h3 className="block-title">Work With Us</h3>
    									<h4><i className="fa fa-camera"></i> Photoshoot as work</h4>
    									<p>Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum.</p>

    									<h4><i className="fa fa-thumb-tack"></i> Pushpin to desk in a room</h4>
    									<p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

    									<p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>
    							</div>
    						</div>
    						<div className="table-cell col-xs-12 col-sm-6">
    							<img className="img-responsive img-full" src="img/info_block_2.jpg" alt="" />
    						</div>
    					</div>
    				</div>

    			</div>
    		</div>
    		<div className="container">
    			<div className="team-block block">
    				<h3 className="block-title">Testimonials</h3>
    				<div className="block-subtitle">Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque.</div>
    				<div className="swiper-container" data-autoplay="5000" data-loop="0" data-speed="300" data-center="0"  data-slides-per-group="2" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="2" data-md-slides="2" data-lg-slides="2" data-add-slides="2">
                        <div className="swiper-wrapper">
                        	<div className="swiper-slide">
                            	<div className="testimonals-block">
                            		<div className="testimonals-entry">
                            			<img className="testimonals-img" src="img/testimonals_1.jpg" alt="" />
                            			<div className="testimonals-name">Samara Kechton</div>
                            			<div className="testimonals-text profes">Make-up designer</div>
                            			<div className="testimonals-text">Nulla id risus urna. Ut commodo leo quis dolor sollicitudin, nec elementum ipsum porta. Duis in nisi nisi. Vestibulum in mauris vitae odio sagittis interdum a ut purus. Suspendisse in molestie leo, at pulvinar massa. Aenean convallis nunc eros, nec efficitur nulla congue sed</div>
                            		</div>
                            	</div>
                            </div>
                        	<div className="swiper-slide">
                            	<div className="testimonals-block">
                            		<div className="testimonals-entry">
                            			<img className="testimonals-img" src="img/testimonals_2.jpg" alt="" />
                            			<div className="testimonals-name">Jhon Makauer</div>
                            			<div className="testimonals-text profes">Philosopher</div>
                            			<div className="testimonals-text">Phasellus sem massa, scelerisque at libero sit amet, laoreet placerat erat. Donec dictum sapien ac accumsan luctus. Fusce id euismod diam, quis venenatis ipsum.Quisque lacinia non dui id fermentum. Ut libero nulla</div>
                            		</div>
                            	</div>
                            </div>
                        	<div className="swiper-slide">
                            	<div className="testimonals-block">
                            		<div className="testimonals-entry">
                            			<img className="testimonals-img" src="img/testimonals_1.jpg" alt="" />
                            			<div className="testimonals-name">Samara Kechton</div>
                            			<div className="testimonals-text profes">Make-up designer</div>
                            			<div className="testimonals-text">Nulla id risus urna. Ut commodo leo quis dolor sollicitudin, nec elementum ipsum porta. Duis in nisi nisi. Vestibulum in mauris vitae odio sagittis interdum a ut purus. Suspendisse in molestie leo, at pulvinar massa. Aenean convallis nunc eros, nec efficitur nulla congue sed</div>
                            		</div>
                            	</div>
                            </div>
                        	<div className="swiper-slide">
                            	<div className="testimonals-block">
                            		<div className="testimonals-entry">
                            			<img className="testimonals-img" src="img/testimonals_2.jpg" alt="" />
                            			<div className="testimonals-name">Jhon Makauer</div>
                            			<div className="testimonals-text profes">Philosopher</div>
                            			<div className="testimonals-text">Phasellus sem massa, scelerisque at libero sit amet, laoreet placerat erat. Donec dictum sapien ac accumsan luctus. Fusce id euismod diam, quis venenatis ipsum.Quisque lacinia non dui id fermentum. Ut libero nulla</div>
                            		</div>
                            	</div>
                            </div>
                        </div>
                        <div className="pagination">

                        </div>
                    </div>
    			</div>
    			<div className="clients-block">
    				<div className="row">
    					<div className="col-xs-4 col-sm-2">
    						<img className="img-responsive img-full" src="img/client_1.jpg" alt="" />
    					</div>
    					<div className="col-xs-4  col-sm-2">
    						<img className="img-responsive img-full" src="img/client_2.jpg" alt="" />
    					</div>
    					<div className="col-xs-4  col-sm-2">
    						<img className="img-responsive img-full" src="img/client_3.jpg" alt="" />
    					</div>
    					<div className="clearfix visible-xs-block"></div>
    					<div className="col-xs-4  col-sm-2">
    						<img className="img-responsive img-full" src="img/client_4.jpg" alt="" />
    					</div>
    					<div className="col-xs-4  col-sm-2">
    						<img className="img-responsive img-full" src="img/client_5.jpg" alt="" />
    					</div>
    					<div className="col-xs-4  col-sm-2">
    						<img className="img-responsive img-full" src="img/client_6.jpg" alt="" />
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default PageAbout;
