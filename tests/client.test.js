import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import TotalReviews from '../client/src/components/totalReviews.jsx';
import ReviewCriteria from '../client/src/components/ReviewCriteria.jsx';
import IndivReviews from '../client/src/components/IndivReviews.jsx';

Enzyme.configure({ adapter: new Adapter()} );


describe('<TotalReviews/>', () => {
  it('Should display one div if no reviews are present', () => {
    const wrapper = shallow(<TotalReviews reviews={[]}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('Should display three divs if reviews are present', () => {
    const wrapper = shallow(<TotalReviews reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div')).to.have.length(3);
  });

  it('Should display correct number of total reviews', () => {
    const wrapper = shallow(<TotalReviews reviews={[{}, {}, {}, {}]} criteria={{criteria: {totalRating: 3}}}/>);
    expect(wrapper.find('div').at(1).text()).to.equal('4 Reviews');
  });

});
