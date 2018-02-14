import React, { Component } from 'react';

class Dropdown extends Component {

	constructor(props) {
		super(props)
		this.state = this.props.values[this.props.default];
		this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
		e.preventDefault();
		if(e.target.tagName == 'LI'){
			this.setState(this.props.values[e.target.data.filter]);
		}else if(e.target.tagName == 'A'){
			let eId = e.target.parentNode.getAttribute('data-filter');
			this.setState(this.props.values[eId]);
		}
    try{
      this.props.onChange(e.target.data.filter);
    }catch(e){
      //console.log(e);
    }
	}


	
  render() {

    const dropList = this.props.values.map((val) => (
      <li key={val.id} className={["filter", val.id == this.state.id ? " active" : ""].join("")} data-filter={val.id}>
				<a>{val.value}</a>
			</li>
    ))

    return (
			<div className="be-drop-down active">
				<i className={this.props.iconClass}></i>
				<span className="be-dropdown-content">{this.state.value}
				</span>
				<ul className="drop-down-list" onClick={this.handleChange}>
					{dropList}
				</ul>
			</div>
    );
  }
}

export default Dropdown;
