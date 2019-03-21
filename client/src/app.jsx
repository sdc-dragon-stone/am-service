import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import TotalReviews from './components/totalReviews.jsx';
import ReviewCriteria from './components/ReviewCriteria.jsx';

//test
import StarRatings from 'react-star-ratings';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
  }

  componentWillMount() {
    $.ajax({
      url: '/totalReviews',
      method: 'GET',
      success: (reviews) => { this.setState({reviews}); },
      error: (err) => { console.log('get reviews error: ', err); }
    });
  }


  render() {
    return (
      <div>
        <StarRatings
          rating= {4}
          starRatedColor="green"
          starDimension="50px"
          numberOfStars={5}
          name='rating'
        />
        <TotalReviews reviews={this.state.reviews}/>
        <ReviewCriteria reviews={this.state.reviews}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


// react star icons
// https://www.npmjs.com/package/react-star-ratings