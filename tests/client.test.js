import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import TotalReviews from '../client/src/components/totalReviews.jsx';
import ReviewCriteria from '../client/src/components/reviewCriteria.jsx';
import IndivReviews from '../client/src/components/indivReviews.jsx';
import Stars from '../client/src/components/stars.jsx';

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

  it('Should display sixteen divs if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div')).to.have.length(16);
  });

  it('Should display correct labels for review criteria', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 3}}}/>);
    expect(wrapper.find('div').at(2).text()).to.equal('Accuracy');
    expect(wrapper.find('div').at(4).text()).to.equal('Location');
    expect(wrapper.find('div').at(7).text()).to.equal('Communication');
    expect(wrapper.find('div').at(9).text()).to.equal('Check-in');
    expect(wrapper.find('div').at(12).text()).to.equal('Cleanliness');
    expect(wrapper.find('div').at(14).text()).to.equal('Value');
  });

  it('Should display six Stars components if reviews are present', () => {
    const wrapper = shallow(<ReviewCriteria reviews={[{}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find(Stars)).to.have.length(6);
  });

});


describe('<IndivReviews/>', () => {

  var review1 = {name: 'testName', shortDate: 'January 2019', text: 'Test text'};
  var review2 = {name: 'testName2', shortDate: 'March 2019', text: 'Test text two'};

  it('Should display one div if no reviews are present', () => {
    const wrapper = shallow(<IndivReviews reviews={[]}/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('Should display five divs for each review (plus one) if reviews are present', () => {
    const wrapper = shallow(<IndivReviews reviews={[{}, {}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div')).to.have.length(11);
  });

  it('Should display one image for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[{}, {}, {}]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('img')).to.have.length(3);
  });

  it('Should display a name for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div').at(3).text()).to.equal('testName');
    expect(wrapper.find('div').at(8).text()).to.equal('testName2');
  });

  it('Should display a date for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div').at(4).text()).to.equal('January 2019');
    expect(wrapper.find('div').at(9).text()).to.equal('March 2019');
  });

  it('Should display review text for each review present', () => {
    const wrapper = shallow(<IndivReviews reviews={[review1, review2]} criteria={{criteria: {totalRating: 4}}}/>);
    expect(wrapper.find('div').at(5).text()).to.equal('Test text');
    expect(wrapper.find('div').at(10).text()).to.equal('Test text two');
  });

});