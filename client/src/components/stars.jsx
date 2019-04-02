import React from 'react';

import StarRatings from 'react-star-ratings';

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StarRatings
          rating={Math.round(this.props.rating)}
          starDimension={this.props.size || '18px'}
          starSpacing="3px"
          starRatedColor="#008080"
          starEmptyColor="#B8B8B8"
        />
      </div>
    );
  }
}