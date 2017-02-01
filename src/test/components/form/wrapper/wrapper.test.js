import React from 'react';
import { mount } from 'enzyme';
import Wrapper from '../../../../form/wrapper';

describe('Testing Wrapper Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Wrapper className='wrapper'>
        <h1>Form</h1>
      </Wrapper>
    )
  })
  it('properly renders the div wrapper', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });
  describe('Testing Wrapper Props', () => {
    it('should set a className to the div', () => {
      expect(wrapper.find('div').props().className).to.be.equal('wrapper');
    });
  });
});
