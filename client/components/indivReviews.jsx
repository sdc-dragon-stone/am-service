import React from 'react';

import styled from 'styled-components';


const Wrapper = styled.div`
  font-weight: 400
  font-size: 16px
  color: #484848
`;

const RevWrapper = styled.div`
  display:inline-block
  height: auto
  width: 600px
  padding-top: 14px
  border-bottom: 1px solid #d2d2d2
`;
RevWrapper.displayName = 'RevWrapper';

const RevPic = styled.div`
  padding-top: 12px;
`;
RevPic.displayName = 'RevPic';

const RevName = styled.div`
  position: relative
  left: 65px
  bottom: 65px
  padding-top: 12px;
  font-weight: 600
  font-size: 16px
  color: #484848
`;
RevName.displayName = 'RevName';

const RevDate = styled.div`
  position: relative
  left: 65px
  bottom: 65px
  padding-top: 4px;
  font-weight: 400
  font-size: 16px
  color: #484848
`;
RevDate.displayName = 'RevDate';

const RevText = styled.div`
  display:flex
  position: relative
  bottom: 42px
  padding-top: 2px;
  font-weight: 400
  font-size: 16px
  color: #484848
`;
RevText.displayName = 'RevText';

export default class IndivReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.reviews.length) {
      return (
        <Wrapper>
          {this.props.reviews.map((review, i) => {
            if (i < 7) {
              return <RevWrapper key={i}>
                <RevPic>
                  <img src={review.picture} width="45px" height="45px" style={{ borderRadius: '50%' }}></img>
                </RevPic>
                <RevName>{review.name}</RevName>
                <RevDate>{review.shortDate}</RevDate>
                <RevText>{review.text}</RevText>
              </RevWrapper>;
            }
          })}
        </Wrapper>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}