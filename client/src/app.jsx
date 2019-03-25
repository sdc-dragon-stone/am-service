import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import TotalReviews from './components/totalReviews.jsx';
import ReviewCriteria from './components/reviewCriteria.jsx';
import IndivReviews from './components/indivReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      criteria: {}
    };
  }

  componentWillMount() {
    $.ajax({
      url: '/totalReviews',
      method: 'GET',
      success: (reviewData) => {
        this.setState({
          reviews: reviewData.reviews,
          criteria: reviewData.criteria
        });
      },
      error: (err) => { console.log('get reviews error: ', err); }
    });
  }


  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// pass in this.state to components

// react star icons
// https://www.npmjs.com/package/react-star-ratings