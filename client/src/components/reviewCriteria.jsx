import React from 'react';

import StarRatings from 'react-star-ratings';


export default class ReviewCriteria extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div id="revCriteriaContainer">
          <div id="line1">
            <div>Accuracy</div>
            <div id="AccStars">
              <StarRatings
                rating={Math.round(this.props.criteria.accuracy)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
            <div>Location</div>
            <div id="locStars">
              <StarRatings
                rating={Math.round(this.props.criteria.location)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
          </div>
          <div id="line2">
            <div>Communication</div>
            <div id="comStars">
              <StarRatings
                rating={Math.round(this.props.criteria.communication)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
            <div>Check-in</div>
            <div id="checkStars">
              <StarRatings
                rating={Math.round(this.props.criteria.checkin)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
          </div>
          <div id="line3">
            <div>Cleanliness</div>
            <div id="cleanStars">
              <StarRatings
                rating={Math.round(this.props.criteria.cleanliness)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
            <div>Value</div>
            <div id="valStars">
              <StarRatings
                rating={Math.round(this.props.criteria.value)}
                starDimension="18px"
                starSpacing="3px"
                starRatedColor="#008080"
                starEmptyColor="#B8B8B8"
              />
            </div>
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