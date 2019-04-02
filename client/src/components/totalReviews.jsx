import React from 'react';

import Stars from './stars.jsx';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex
  padding-top: 16px;
  padding-bottom: 22px;
  font-weight: 800
  font-size: 24px
  color: #484848
  border-top: 1px solid #d2d2d2
  border-bottom: 1px solid #d2d2d2
`;

const TotalRevs = styled.div`
  margin-top: 20px;
  margin-right: 15px;
`;
TotalRevs.displayName = 'TotalRevs';

const StarRating = styled.div`
  margin-top: 20px;
  margin-right: 155px;
`;
StarRating.displayName = 'StarRating';

const SearchBar = styled.input`
  margin-top: 15px;
`;
SearchBar.displayName = 'SearchBar';


export default class TotalReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <Wrapper>
          <TotalRevs>{this.props.reviews.length} Reviews</TotalRevs>
          <StarRating><Stars rating={this.props.criteria.totalRating} size={'21px'}/></StarRating>
          <SearchBar type="text" id="search" placeholder="  Search reviews"></SearchBar>
        </Wrapper>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}