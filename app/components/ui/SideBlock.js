import React, { Component } from 'react';

class SideBlock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    return (

      <div>

        {this.props.children}

      </div>
    );
  }
}

export default SideBlock;
