import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.smart.make(this.state.value)
    console.log('formed NOW')
  }

  render() {
    const {head, hair, corn, ears, eyes} = this.props.gen;
    const {color} = this.props;

    const colorValue = (hue) => `hsl(${hue}, 50%, 50%)`;

    return (
      <div className="unicorn">

  			<div className="head">
  				<svg xmlnsXlink="http://www.w3.org/2000/svg" height="322" width="252">

            {head === 1 && <path fill={colorValue(color.head)} d="m41.979998,202.12l20.86,68.29s41.36,22.27 62.16,32.59c20.8,-10.32 62.17,-32.59 62.17,-32.59l20.85,-68.29l-83.02,-112.19l-83.02,112.19zm136.86,-201.12l-107.68,0l-54.67,117.63l25.49,83.49l83.02,-112.19l83.02,112.19l25.49,-83.49l-54.67,-117.63z"/>}

            {head === 2 && <path fill={colorValue(color.head)} d="m184.91,0.01l-174.27,0c-0.53,50.74 -4.64,101.86 -4.64,152.87c0,29.37 0.84,53.8 2.7,74.12c25.74,-35.67 73.54,-46.98 116.3,-45.68c42.76,-1.3 90.56,10.01 116.3,45.68c1.86,-20.32 2.7,-44.75 2.7,-74.12c0,-51.01 -4.12,-102.13 -4.64,-152.87l-54.45,0z"/>}

            {head === 3 && <path fill={colorValue(color.head)} d="m197.26,117.58c0.53,-0.26 1.03,-0.53 1.53,-0.82c0.73,-19.1 4.43,-38.01 12.16,-54.11c-23.05,-11.19 -41.26,-31.82 -45.9,-56.5c-13.38,-0.31 -26.76,-2.06 -40.05,-4.15c-13.29,2.09 -26.67,3.84 -40.05,4.15c-4.64,24.68 -22.85,45.31 -45.9,56.5c7.49,15.6 11.2,33.83 12.08,52.32c36.85,34.12 103.1,25.12 146.13,2.61zm1.39,6.27c0,-2.36 0.05,-4.73 0.14,-7.09c-0.5,0.29 -1,0.56 -1.53,0.82c-43.03,22.51 -109.28,31.51 -146.13,-2.61c0.14,2.96 0.22,5.92 0.22,8.88c0,72.49 -26.85,78.53 -26.85,109.81c0,43.81 51.55,81.34 95.84,81.34c1.56,0 3.11,-0.06 4.66,-0.16c1.55,0.1 3.1,0.16 4.66,0.16c44.29,0 95.84,-37.53 95.84,-81.34c0,-31.28 -26.85,-37.32 -26.85,-109.81z"/>}

          </svg>
  			</div>

  			<div className="hair">
  				<svg xmlnsXlink="http://www.w3.org/2000/svg" height="162" width="282">

            {hair === 1 && <path fill={colorValue(color.hair)} d="m139.994997,68.2l-123.49,19.8l60.62,-88l125.75,0l60.62,88l-123.5,-19.8z"/>}

            {hair === 2 && <path fill={colorValue(color.hair)} d="m140.000003,106.02a37.981,37.981 0 0 1 -8.82,-9.27a37.424,37.424 0 0 1 -13.39,11.67c-1.95,-9.37 -6.78,-19.21 -15.18,-22.7a27.381,27.381 0 0 1 2.9,12.04a21.172,21.172 0 0 1 -2.59,10.4a19.575,19.575 0 0 0 -17.07,-9.19a18.555,18.555 0 0 0 -8.25,1.72c5.57,3.24 9.34,9.63 9.34,14.86c0,5.1 -3.13,9.63 -7.25,13.21c-0.71,-3.54 -3.1,-6.28 -6.37,-6.28c-11.75,0 -17.78,12.98 -24.44,22.92a53.454,53.454 0 0 0 -3.8,6.6a50.884,50.884 0 0 1 -3.96,-20.06a60.441,60.441 0 0 1 1.71,-14.14a41.609,41.609 0 0 0 -20.1,27.34a64.028,64.028 0 0 1 -3.98,-20.8a37.759,37.759 0 0 1 3.87,-17.43a47.355,47.355 0 0 0 -19.62,5.21a59.6,59.6 0 0 1 14.46,-19.35c10.27,-9.19 22.34,-15.5 34.96,-19.93c6.91,-2.42 12.3,-10.47 12.3,-18.77a17.7,17.7 0 0 0 -2.33,-8.89c5.5,2.35 11.07,5.26 13.27,11.14a50.905,50.905 0 0 0 1.34,-11.54c0,-8.11 -2.05,-16.21 -7.17,-21.9a31.315,31.315 0 0 1 19.5,7.66c3.74,-12.64 11.3,-24 21.71,-30.55a44.3,44.3 0 0 0 -5.07,20.28a59.584,59.584 0 0 1 -1.73,15.82a33.256,33.256 0 0 0 9.95,-11.7a17.313,17.313 0 0 0 11,10.27a36.131,36.131 0 0 1 14.81,-12.8a36.131,36.131 0 0 1 14.81,12.8a17.336,17.336 0 0 0 11,-10.27a33.256,33.256 0 0 0 9.95,11.7a59.584,59.584 0 0 1 -1.73,-15.82a44.3,44.3 0 0 0 -5.07,-20.28c10.41,6.55 17.97,17.91 21.71,30.55a31.315,31.315 0 0 1 19.5,-7.66c-5.12,5.69 -7.18,13.79 -7.18,21.9a50.907,50.907 0 0 0 1.35,11.54c2.2,-5.88 7.77,-8.79 13.27,-11.14a17.7,17.7 0 0 0 -2.33,8.89c0,8.3 5.39,16.35 12.3,18.77c12.62,4.43 24.68,10.74 34.96,19.93a59.6,59.6 0 0 1 14.46,19.35a47.355,47.355 0 0 0 -19.62,-5.21a37.759,37.759 0 0 1 3.87,17.43a64.028,64.028 0 0 1 -3.98,20.8a41.609,41.609 0 0 0 -20.1,-27.34a60.441,60.441 0 0 1 1.71,14.14a50.884,50.884 0 0 1 -3.96,20.06a53.454,53.454 0 0 0 -3.8,-6.6c-6.66,-9.94 -12.69,-22.92 -24.44,-22.92c-3.27,0 -5.66,2.74 -6.37,6.28c-4.12,-3.58 -7.25,-8.11 -7.25,-13.21c0,-5.23 3.77,-11.62 9.34,-14.86a18.555,18.555 0 0 0 -8.25,-1.72a19.562,19.562 0 0 0 -17.07,9.19a21.172,21.172 0 0 1 -2.59,-10.4a27.381,27.381 0 0 1 2.9,-12.04c-8.4,3.49 -13.23,13.33 -15.18,22.7a37.424,37.424 0 0 1 -13.39,-11.67a37.981,37.981 0 0 1 -8.82,9.27z"/>}

            {hair === 3 && <path fill={colorValue(color.hair)} d="m140.44884,85a97.459,97.459 0 0 1 -22.2,-3.36c1.1,0.3 -18.56,-8.83 -14.42,-1.75c-1.78,-3.06 -4.54,-6.11 -4.99,-10.46c-4.64,1.47 -7.99,5.45 -9.79,10.28c-3.86,-5.14 -3.16,-11.65 -2.36,-17.59c-4.4,1.56 -6.08,1.87 -8.02,7.08c-2.5,-4.8 2.96,-69.2 0.3,-69.2l15.61,0q53.685,0 107.35,0c0.38,8.66 -0.76,17.21 -1.31,25.83c-0.57,8.95 2.24,19.82 -0.83,28.2c-1.18,-2.66 -6.64,-4.39 -7.14,-5.71c1.74,4.62 3.07,10.88 1.78,15.75c-2.38,-1.33 -4.54,-4.34 -7.65,-5.18c2.11,3.25 1.16,7.23 0,10.71c-1.54,-9.85 -12.67,4.71 -17.25,7.41c-8.8,5.21 -18.91,7.61 -29.08,7.99z"/>}

  				</svg>
  			</div>

        <div className={`corn type-${corn}`}></div>
        <div className={`ears type-${ears}`}></div>
        <div className={`eyes type-${eyes}`}></div>

        <form onSubmit={this.handleSubmit}><input type="text" onChange={this.handleChange} /><button>buy</button></form>
  		</div>
    );
  }
}

export default Item;
