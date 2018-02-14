import React, { Component } from 'react';

class PageLaboratory extends Component {
  render() {
    return (
      <div id="content-block" className="work-box">
    		<div className="editor-menu">
    			<div className="container">
    				<ul className="editor-nav">
    					<li id="content-w" className="en-nav active">1. Content</li>
    					<li id="cover-w" className="en-nav">2. Cover</li>
    					<li id="setting-w" className="en-nav">3. Setting</li>
    				</ul>
    				<div className="buttons-navbar">
    					<button type="button" className="btn btn-default">Previous</button>
    					<button type="button" className="btn btn-primary">Save</button>
    					<button type="button" className="btn btn-success">Next</button>
    				</div>
    			</div>
    		</div>
    		<div className="work-area">
    			<div className="cover-popup">
    				<div className="cover-box">
    					<form action="#">
    						<img src="https://mir-s3-cdn-cf.behance.net/projects/202/b252d929064253.55e0104b21931.png" alt="" />
    						<textarea placeholder="Title Project"></textarea>
    					</form>
    					<a href="#" className="anothel-upload"><i className="fa fa-cloud-upload"></i> Upload New Image</a>
    					<input className="file" type="file" />
    					<br />
    					<div className="btn-row">
    						<button type="button" className="btn btn-primary">Cancel</button>
    						<button type="button" className="btn btn-success">Continue</button>
    					</div>
    				</div>
    			</div>
    			<div className="setting-popup">
    				<div className="cover-box s-cover-box">
    					<div className="setting-form">
    						<form>
    							<div className="form-group">
    								<label htmlFor="in1">Creative Fields</label>
    								<input type="text" className="form-control" id="in1" />
    							</div>
    							<div className="form-group">
    								<label >Project Tags</label>
    								<textarea ></textarea>
    							</div>
    							<div className="form-group">
    								<label >Email address</label>
    								<textarea ></textarea>
    							</div>
    						</form>
    					</div>
    					<div className="setting-block">
    						<div className="settings-row cfix">
    							<div className="left settings-label">Extra Info:</div>
    							<div className="left settings-option">
    								<div className="settings-sub-option cfix">
    									<div className="left settings-note st-label">
    										<span className="grey">For a Brand/Company</span>
    									</div>
    									<div className="right fake-link" id="add-brand">+ Add Brand</div>
    								</div>

    								<div className="settings-sub-option cfix">
    									<div className="left settings-note st-label">
    										<span className="grey">For an Agency</span>
    									</div>
    									<div className="right fake-link" id="add-agency">+ Add Agency</div>
    								</div>

    								<div className="settings-sub-option cfix">
    									<div className="left settings-note st-label">
    										<span className="grey">For a School</span>
    									</div>
    									<div className="right fake-link" id="add-school">+ Add School</div>
    								</div>
    							</div>
    							<div className="left settings-label">Tools Used:</div>
    							<div className="left settings-option">
    								<div className="settings-sub-option cfix">
    									<div className="left settings-note st-label">
    										<span className="grey">Software, Hardware, Materials...</span>
    									</div>
    									<div className="right fake-link" id="tools">+ Add Tools</div>
    								</div>
    							</div>
    							<div className="left settings-label">For a Team:</div>
    							<div className="left settings-option">
    								<div className="settings-sub-option cfix">
    									<div className="left settings-note st-label">
    										<span className="grey">This project isnt on any team.</span>
    									</div>
    									<div className="right fake-link" id="team">+ Add Team</div>
    								</div>
    							</div>
    						</div>
    					</div>
    					<div className="popup-buttons right-buttons">
    						<button type="button" className="btn btn-primary">Save Changes</button>
    						<button type="button" className="btn btn-success">Publish</button>
    					</div>
    				</div>
    			</div>
    			<div className="container be-detail-container">
    				<div className="row">
    					<div className="col-xs-12 col-md-3 st-col left-feild">
    						<div className="be-vidget behance-style" >
    							<h3 className="letf-menu-article">
    								ADD MEDIA
    							</h3>
    							<div className="creative_filds_block">
    								<ul className="ul nav b-work-list">
    									<li ><a href="#"><i className="fa fa-cloud-upload"></i>Upload Files</a><input className="file" type="file" /></li>
    									<li id="media" ><a href="#"><i className="fa fa-pencil-square-o"></i>Embed media</a></li>
    									<li ><a href="#"><i className="fa fa-text-width"></i>Add text</a></li>
    									<li ><a href="#"><i className="fa fa-cloud"></i>Creative cloud</a></li>
    								</ul>
    							</div>
    						</div>
    						<div className="be-vidget  behance-style">
    							<h3 className="letf-menu-article">
    								CUSTOMIZE DESIGN
    							</h3>
    							<div className="creative_filds_block">
    								<ul className="ul nav b-work-list b-work-list-no">
    									<li ><a className="open-custom" href="#">Dividers & Spacing <i className="fa fa-chevron-down"></i></a>
    										<div className="inner-filter-info">
    											<div className="inner-filter-inner inner-d">
    												<input  type="radio" id="d1" className="ch" name="divider" />
    												<label htmlFor="d1">No Divider</label>
    											</div>
    											<div className="inner-filter-inner inner-d">
    												<div className="label-box ">
    													<input  type="radio" id="d2" className="ch" name="divider" />
    													<label htmlFor="d2"></label>
    												</div>
    												<div className="label-box">
    													<input  type="radio" id="d3" className="ch" name="divider" />
    													<label htmlFor="d3"></label>
    												</div>
    												<div className="label-box">
    													<input  type="radio" id="d4" className="ch" name="divider" />
    													<label htmlFor="d4"></label>
    												</div>
    											</div>
    											<div className="inner-filter-inner inner-filter-inner-mod">
    												<span>Spacing</span>
    												<div className="range">
    													<div className="slider-range-max" id="slider-range-max"></div>
    													<input type="text" className="amount" id="amount" readOnly />
    												</div>
    											</div>
    											<div className="inner-filter-inner inner-filter-inner-mod">
    												<span>Header</span>
    												<div className="range">
    													<div className="slider-range-max" id="slider-head"></div>
    													<input type="text" className="amount" id="amount-h" readOnly />
    												</div>
    											</div>
    											<div className="inner-filter-inner">
    												<span>Color</span> <input className="color-i no-alpha" value="#B6BD79" />
    											</div>
    										</div>
    									</li>
    									<li ><a   className="open-custom" href="#">Background <i className="fa fa-chevron-down"></i></a>
    										<div className="inner-filter-info">
    											<div className="inner-filter-inner ">
    												<span>Color</span> <input id="color" className="color-i no-alpha"  value="#B6BD79" />
    											</div>
    											<div className="inner-filter-inner">
    												<span>Image</span>
    												<div className="up-image">image<input className="file" type="file" /></div>
    											</div>
    										</div>
    									</li>
    								</ul>
    							</div>
    						</div>

    					</div>
    					<div className="col-xs-12 col-md-9 _editor-content_">
    						<div className="sec"  data-sec="basic-information">
    							<div className="be-large-post large-area">
    								<div className="info-block style-2">
    									<div className="be-large-post-align "><h3 className="info-block-label">Work name</h3></div>
    								</div>
    								<div className="be-large-post-align">
    									<div className="upload-zone">
    										<i className="fa center-i fa-cloud-upload"></i>
    										<input className="file" type="file" />
    									</div>
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

export default PageLaboratory;
