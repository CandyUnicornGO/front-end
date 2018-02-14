import React, { Component } from 'react';

class SidebarMenu extends Component {

	constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="be-vidget">
						<h3 className="letf-menu-article">
							{this.props.title}
						</h3>
						<div className="creative_filds_block">
							<div className="ul">
								<a  data-filter=".category-1" className="filter">Fast		</a>
								<a data-filter=".category-2" className="filter">Swift			</a>
								<a data-filter=".category-3" className="filter">Snappy	</a>
								<a data-filter=".category-4" className="filter">Brisk		</a>
								<a data-filter=".category-5" className="filter">Plodding		</a>
							</div>
						</div>
					</div>
    );
  }
}

export default SidebarMenu;
