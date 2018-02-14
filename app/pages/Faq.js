import React, { Component } from 'react';

import SidebarMenu from '../components/ui/SidebarMenu';
import ToggleSlide from '../components/ui/ToggleSlide';

class PageFaq extends Component {
  render() {
    return (
      <div id="content-block">
    		<div className="container be-detail-container">
    			<h2 className="content-title">FAQs</h2>
    			<div className="row">
    				<div className="left-feild col-xs-12 col-sm-3">

    					<SidebarMenu />

    				</div>
    				<div className="col-xs-12 col-sm-9">
              <div className="accordion style-2">

                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />
                  <ToggleSlide />

              </div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default PageFaq;
