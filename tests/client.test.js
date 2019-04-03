import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import TotalReviews from '../client/components/totalReviews.jsx';
import ReviewCriteria from '../client/components/reviewCriteria.jsx';
import IndivReviews from '../client/components/indivReviews.jsx';

Enzyme.configure({ adapter: new Adapter()} );


describe('<TotalReviews/>', () => {

  it('Should display one div if no reviews are present', () => {
    const wrapper = shallow(<TotalReviews reviews={[]}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('Should display correct number of total reviews', () => {
    const wrapper = shallow(<TotalReviews reviews={[{}, {}, {}, {}]} criteria={{criteria: {totalRating: 3}}}/>);
    expect(wrapper.find('TotalRevs').text()).to.equal('4 Reviews');
  });

  it('Should contain a Stars component to display ratings stars', () => {
    const wrapper = shallow(<TotalReviews reviews={[{}]} criteria={{criteria: {totalRating: 3}}}/>);
    expect(wrapper.find('StarRating')).to.have.lengthOf(1);
  });

  it('Should contain a search bar', () => {
    const wrapper = shallow(<TotalReviews reviews={[{}]} criteria={{criteria: {totalRating: 3}}}/>);
    expect(wrapper.find('SearchBar')).to.have.lengthOf(1);
  });

});


describe('<ReviewCriteria/>', () => {

  it('Should display one div if no reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[]}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('Should display three lines of categories if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('SingleLine')).to.have.length(3);
  });

  it('Should display six categories if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('Category')).to.have.length(6);
  });

  it('Should display six categories if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('Category')).to.have.length(6);
  });

  it('Should display six total star ratings if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('StarPosLeft')).to.have.length(3);
    expect(wrapper.find('StarPosRight')).to.have.length(3);
  });

});


describe('<IndivReviews/>', () => {

  var review1 = {name: 'testName', shortDate: 'January 2019', text: 'Test text'};
  var review2 = {name: 'testName2', shortDate: 'March 2019', text: 'Test text two'};

  it('Should display one div if no reviews are present', () => {
    const wrapper = shallow(<IndivReviews reviews={[]}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('Should display one image for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[{}, {}, {}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('RevPic')).to.have.length(3);
  });

  it('Should display a name for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('RevName')).to.have.length(2);
    expect(wrapper.find('RevName').at([1]).text()).to.equal(review2.name);
  });

  it('Should display a date for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('RevDate')).to.have.length(2);
    expect(wrapper.find('RevDate').at([1]).text()).to.equal(review2.shortDate);
  });

  it('Should display review text for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('RevText')).to.have.length(2);
    expect(wrapper.find('RevText').at([1]).text()).to.equal(review2.text);
  });

});