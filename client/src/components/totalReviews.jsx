import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class TotalReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div>
          {this.props.reviews.length} Reviews

        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}