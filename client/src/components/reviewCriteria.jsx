import React from 'react';

import Stars from './Stars.jsx';


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
            <div id="AccStars"><Stars rating={this.props.criteria.accuracy}/></div>

            <div>Location</div>
            <div id="locStars"><Stars rating={this.props.criteria.location}/></div>

          </div>

          <div id="line2">

            <div>Communication</div>
            <div id="comStars"><Stars rating={this.props.criteria.communication}/></div>

            <div>Check-in</div>
            <div id="checkStars"><Stars rating={this.props.criteria.checkin}/></div>

          </div>

          <div id="line3">

            <div>Cleanliness</div>
            <div id="cleanStars"><Stars rating={this.props.criteria.cleanliness}/></div>

            <div>Value</div>
            <div id="valStars"><Stars rating={this.props.criteria.value}/></div>

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