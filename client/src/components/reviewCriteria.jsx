import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class ReviewCriteria extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div>
          <div>Accuracy</div>
          <div>Communication</div>

        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}