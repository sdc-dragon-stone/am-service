import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import TotalReviews from './components/totalReviews.jsx';
import ReviewCriteria from './components/reviewCriteria.jsx';
import IndivReviews from './components/indivReviews.jsx';

import styled from 'styled-components';
import faker from 'faker';

const Wrapper = styled.div`
  margin: auto;
  width: 600px;
  font-family: Circular, BlinkMacSystemFont, Roboto,'Helvetica Neue', sans-serif;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      criteria: {}
    };
  }

  get() {
    console.log(window.location);
    var id = window.location.pathname.slice(1);
    if (id === '/') {
      id = '12';
    }
    console.log("from client: ", id);
    $.ajax({
      url: `/totalReviews/${id}`,
      method: 'GET',
      data: { 'id': faker.random.number({min: 1, max: 100}) },
      success: (reviewData) => {
        this.setState({
          reviews: reviewData.subReviews,
          criteria: reviewData.criteria
        });
      },
      error: (err) => { console.log('get reviews error: ', err); }
    });
  }
  componentDidMount() {
    this.get();
  }

  render() {
    return (
      <Wrapper>
        <TotalReviews reviews={this.state.reviews} criteria={this.state.criteria}/>
        <ReviewCriteria reviews={this.state.reviews} criteria={this.state.criteria}/>
        <IndivReviews reviews={this.state.reviews} criteria={this.state.criteria}/>
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));