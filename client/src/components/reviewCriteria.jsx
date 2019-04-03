import React from 'react';

import Stars from './stars.jsx';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 14px;
  padding-bottom: 15px;
  font-weight: 400
  font-size: 16px
  color: #484848
  border-bottom: 1px solid #d2d2d2
`;

const SingleLine = styled.div`
  display: flex
  padding-top: 4px;
  padding-bottom: 10px;
  font-weight: 400
  font-size: 16px
  color: #484848
`;
SingleLine.displayName = 'SingleLine';

const Category = styled.div`
  display: flex
  width: 150px
`;
Category.displayName = 'Category';

const StarPosLeft = styled.div`
  display: flex
  padding-left: 20px
  padding-right: 30px
`;
StarPosLeft.displayName = 'StarPosLeft';

const StarPosRight = styled.div`
  display: flex
  padding-left: 20px
`;
StarPosRight.displayName = 'StarPosRight';


export default class ReviewCriteria extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <Wrapper>

          <SingleLine>
            <Category>Accuracy</Category>
            <StarPosLeft><Stars rating={this.props.criteria.accuracy}/></StarPosLeft>

            <Category>Location</Category>
            <StarPosRight><Stars rating={this.props.criteria.location}/></StarPosRight>
          </SingleLine>

          <SingleLine>
            <Category>Communication</Category>
            <StarPosLeft><Stars rating={this.props.criteria.communication}/></StarPosLeft>

            <Category>Check-in</Category>
            <StarPosRight><Stars rating={this.props.criteria.checkin}/></StarPosRight>
          </SingleLine>

          <SingleLine>
            <Category>Cleanliness</Category>
            <StarPosLeft><Stars rating={this.props.criteria.cleanliness}/></StarPosLeft>

            <Category>Value</Category>
            <StarPosRight><Stars rating={this.props.criteria.value}/></StarPosRight>
          </SingleLine>

        </Wrapper>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}