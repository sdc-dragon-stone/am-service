import React from 'react';

import Stars from './stars.jsx';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex
  padding-top: 16px;
  padding-bottom: 16px;
  font-weight: 800
  font-size: 24px
  color: #484848
  border-top: 1px solid #d2d2d2
  border-bottom: 1px solid #d2d2d2
`;


export default class TotalReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <Wrapper>
          <div>{this.props.reviews.length} Reviews</div>
          <div><Stars rating={this.props.criteria.totalRating}/></div>
          <input type="text" placeholder="Search reviews"></input>
        </Wrapper>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}