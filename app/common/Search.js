import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    e.preventDefault();
    try{
      this.props.onChange(e.target.value);
    }catch(e){
      //console.log(e);
    }
  }

  render() {
    return (
      <form action="./" className="input-search" onSubmit={this.handleChange}>
        <input type="text" required="" placeholder="Enter Unicorn Name" onChange={this.handleChange}/>
          <i className="fa fa-search"></i>
          <input type="submit" value="" />
      </form>
    );
  }
}

export default Search;
