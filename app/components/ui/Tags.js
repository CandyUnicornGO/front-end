import React, { Component } from 'react';

class Tags extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="be-vidget">
        <h3 className="letf-menu-article">
          {this.props.title}
        </h3>
        <div className="tags_block clearfix">
          <ul>
            <li><a href="#" className="be-post-tag">Nice</a> </li>
            <li><a href="#" className="be-post-tag">Gute</a> </li>
            <li><a href="#" className="be-post-tag">Usual</a></li>
            <li><a href="#" className="be-post-tag">Just</a> </li>
            <li><a href="#" className="be-post-tag">Angry</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Tags;
