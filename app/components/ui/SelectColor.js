import React, { Component } from 'react';

class SelectColor extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="be-vidget">
        <h3 className="letf-menu-article">
          {this.props.title}
        </h3>
        <div className="filter-block">
          <ul>
            <li><a><i className="fa fa-paint-brush"></i>Color</a>
              <div className="be-popup be-color-picker">
                <h3 className="letf-menu-article">
                  Choose color
              </h3>
                <div className="for-colors">
                  <ul className="colors  cfix">
                    <li data-filter=".category-1" className="color filter color-0-0"></li>
                    <li data-filter=".category-2" className="color filter color-0-1"></li>
                    <li data-filter=".category-3" className="color filter color-0-2"></li>
                    <li data-filter=".category-4" className="color filter color-0-3"></li>
                    <li data-filter=".category-5" className="color filter color-0-4"></li>
                    <li data-filter=".category-1" className="color filter color-0-5"></li>
                    <li data-filter=".category-2" className="color filter color-0-6"></li>
                    <li data-filter=".category-3" className="color filter color-0-7"></li>
                    <li data-filter=".category-4" className="color filter color-0-8"></li>
                    <li data-filter=".category-5" className="color filter color-0-9"></li>
                    <li data-filter=".category-1" className="color filter color-0-10"></li>
                    <li data-filter=".category-5" className="color filter color-0-11"></li>
                    <li data-filter=".category-1" className="color filter color-1-0"></li>
                    <li data-filter=".category-2" className="color filter color-1-1"></li>
                    <li data-filter=".category-1" className="color filter color-1-2"></li>
                    <li data-filter=".category-1" className="color filter color-1-3"></li>
                    <li data-filter=".category-1" className="color filter color-1-4"></li>
                    <li data-filter=".category-4" className="color filter color-1-5"></li>
                    <li data-filter=".category-1" className="color filter color-1-6"></li>
                    <li data-filter=".category-1" className="color filter color-1-7"></li>
                    <li data-filter=".category-6" className="color filter color-1-8"></li>
                    <li data-filter=".category-1" className="color filter color-1-9"></li>
                    <li data-filter=".category-1" className="color filter color-1-10"></li>
                    <li data-filter=".category-1" className="color filter color-1-11"></li>
                    <li data-filter=".category-1" className="color filter color-2-0"></li>
                    <li data-filter=".category-1" className="color filter color-2-1"></li>
                    <li data-filter=".category-1" className="color filter color-2-2"></li>
                    <li data-filter=".category-1" className="color filter color-2-3"></li>
                    <li data-filter=".category-1" className="color filter color-2-4"></li>
                    <li data-filter=".category-1" className="color filter color-2-5"></li>
                    <li data-filter=".category-1" className="color filter color-2-6"></li>
                    <li data-filter=".category-1" className="color filter color-2-7"></li>
                    <li data-filter=".category-1" className="color filter color-2-8"></li>
                    <li data-filter=".category-1" className="color filter color-2-9"></li>
                    <li data-filter=".category-1" className="color filter color-2-10"></li>
                    <li data-filter=".category-1" className="color filter color-2-11"></li>
                    <li data-filter=".category-1" className="color filter color-3-0"></li>
                    <li data-filter=".category-1" className="color filter color-3-1"></li>
                    <li data-filter=".category-1" className="color filter color-3-2"></li>
                    <li data-filter=".category-1" className="color filter color-3-3"></li>
                    <li data-filter=".category-1" className="color filter color-3-4"></li>
                    <li data-filter=".category-1" className="color filter color-3-5"></li>
                    <li data-filter=".category-1" className="color filter color-3-6"></li>
                    <li data-filter=".category-1" className="color filter color-3-7"></li>
                    <li data-filter=".category-1" className="color filter color-3-8"></li>
                    <li data-filter=".category-1" className="color filter color-3-9"></li>
                    <li data-filter=".category-1" className="color filter color-3-10"></li>
                    <li data-filter=".category-1" className="color filter color-3-11"></li>
                    <li data-filter=".category-1" className="color filter color-4-0"></li>
                    <li data-filter=".category-1" className="color filter color-4-1"></li>
                    <li data-filter=".category-1" className="color filter color-4-2"></li>
                    <li data-filter=".category-1" className="color filter color-4-3"></li>
                    <li data-filter=".category-1" className="color filter color-4-4"></li>
                    <li data-filter=".category-1" className="color filter color-4-5"></li>
                    <li data-filter=".category-1" className="color filter color-4-6"></li>
                    <li data-filter=".category-1" className="color filter color-4-7"></li>
                    <li data-filter=".category-1" className="color filter color-4-8"></li>
                    <li data-filter=".category-1" className="color filter color-4-9"></li>
                    <li data-filter=".category-1" className="color filter color-4-10"></li>
                    <li data-filter=".category-1" className="color filter color-4-11"></li>
                    <li data-filter=".category-1" className="color filter color-5-0"></li>
                    <li data-filter=".category-1" className="color filter color-5-1"></li>
                    <li data-filter=".category-1" className="color filter color-5-2"></li>
                    <li data-filter=".category-1" className="color filter color-5-3"></li>
                    <li data-filter=".category-1" className="color filter color-5-4"></li>
                    <li data-filter=".category-1" className="color filter color-5-5"></li>
                    <li data-filter=".category-1" className="color filter color-5-6"></li>
                    <li data-filter=".category-1" className="color filter color-5-7"></li>
                    <li data-filter=".category-1" className="color filter color-5-8"></li>
                    <li data-filter=".category-1" className="color filter color-5-9"></li>
                    <li data-filter=".category-1" className="color filter color-5-10"></li>
                    <li data-filter=".category-1" className="color filter color-5-11"></li>
                    <li data-filter=".category-1" className="color filter color-6-0"></li>
                    <li data-filter=".category-1" className="color filter color-6-1"></li>
                    <li data-filter=".category-6" className="color filter color-6-2"></li>
                    <li data-filter=".category-1" className="color filter color-6-3"></li>
                    <li data-filter=".category-1" className="color filter color-6-4"></li>
                    <li data-filter=".category-1" className="color filter color-6-5"></li>
                    <li data-filter=".category-1" className="color filter color-6-6"></li>
                    <li data-filter=".category-1" className="color filter color-6-7"></li>
                    <li data-filter=".category-1" className="color filter color-6-8"></li>
                    <li data-filter=".category-1" className="color filter color-6-9"></li>
                    <li data-filter=".category-1" className="color filter color-6-10"></li>
                    <li data-filter=".category-1" className="color filter color-6-11"></li>
                    <li data-filter=".category-1" className="color filter color-7-0"></li>
                    <li data-filter=".category-1" className="color filter color-7-1"></li>
                    <li data-filter=".category-1" className="color filter color-7-2"></li>
                    <li data-filter=".category-1" className="color filter color-7-3"></li>
                    <li data-filter=".category-1" className="color filter color-7-4"></li>
                    <li data-filter=".category-1" className="color filter color-7-5"></li>
                    <li data-filter=".category-1" className="color filter color-7-6"></li>
                    <li data-filter=".category-1" className="color filter color-7-7"></li>
                    <li data-filter=".category-1" className="color filter color-7-8"></li>
                    <li data-filter=".category-1" className="color filter color-7-9"></li>
                    <li data-filter=".category-1" className="color filter color-7-10"></li>
                    <li data-filter=".category-1" className="color filter color-7-11"></li>
                    <li data-filter=".category-1" className="color filter color-8-0"></li>
                    <li data-filter=".category-1" className="color filter color-8-1"></li>
                    <li data-filter=".category-1" className="color filter color-8-2"></li>
                    <li data-filter=".category-1" className="color filter color-8-3"></li>
                    <li data-filter=".category-1" className="color filter color-8-4"></li>
                    <li data-filter=".category-1" className="color filter color-8-5"></li>
                    <li data-filter=".category-1" className="color filter color-8-6"></li>
                    <li data-filter=".category-6" className="color filter color-8-7"></li>
                    <li data-filter=".category-1" className="color filter color-8-8"></li>
                    <li data-filter=".category-1" className="color filter color-8-9"></li>
                    <li data-filter=".category-1" className="color filter color-8-10"></li>
                    <li data-filter=".category-1" className="color filter color-8-11"></li>
                    <li data-filter=".category-1" className="color filter color-9-0"></li>
                    <li data-filter=".category-1" className="color filter color-9-1"></li>
                    <li data-filter=".category-1" className="color filter color-9-2"></li>
                    <li data-filter=".category-1" className="color filter color-9-3"></li>
                    <li data-filter=".category-6" className="color filter color-9-4"></li>
                    <li data-filter=".category-1" className="color filter color-9-5"></li>
                    <li data-filter=".category-1" className="color filter color-9-6"></li>
                    <li data-filter=".category-1" className="color filter color-9-7"></li>
                    <li data-filter=".category-1" className="color filter color-9-8"></li>
                    <li data-filter=".category-1" className="color filter color-9-9"></li>
                    <li data-filter=".category-1" className="color filter color-9-10"></li>
                    <li data-filter=".category-1" className="color filter color-9-11"></li>
                  </ul>
                </div>
                <i className="fa fa-times"></i>

              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SelectColor;
