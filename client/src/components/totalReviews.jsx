import React from 'react';

import StarRatings from 'react-star-ratings';


export default class TotalReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div id="totalRevsContainer">
          <div>{this.props.reviews.length} Reviews</div>
          <div>
            <StarRatings
              rating={Math.round(this.props.criteria.totalRating)}
              starDimension="18.5px"
              starSpacing="3px"
              starRatedColor="#008080"
              starEmptyColor="#B8B8B8"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}