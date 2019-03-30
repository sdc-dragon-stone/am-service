import React from 'react';

export default class IndivReviews extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.reviews.length) {
      return (
        <div id="indivReviewsContainer">
          {this.props.reviews.map((review, i) => {
            if (i < 7) {
              return <div key={i}>
                <div>
                  <img src={review.picture} width="45px" height="45px" style={{ borderRadius: '50%' }}></img>
                </div>
                <div>{review.name}</div>
                <div>{review.shortDate}</div>
                <div>{review.text}</div>
              </div>;
            }
          })}
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}