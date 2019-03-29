import React from 'react';

import Stars from './stars.jsx';


export default class TotalReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div id="totalRevsContainer">
          <div>{this.props.reviews.length} Reviews</div>
          <div><Stars rating={this.props.criteria.totalRating}/></div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}