import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../../form/button';

describe('Testing Button Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Button
        fieldClassName='ButtonWrapper'
        className='button'
        onClick={() => {}}
        disabled={false}
      >Submit Button</Button>
    );
  });
  it('properly renders the button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  describe('Testing Button Props', () => {
    it('should set a className to the div that wraps the button', () => {
      expect(wrapper.find('div').props().className).to.be.equal('ButtonWrapper');
    });
    it('should set a className to the button', () => {
      expect(wrapper.find('button').props().className).to.be.equal('button');
    });
    it('should disable the button when the disable props is true', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('button').props().disabled).to.be.equal(true);
    });
  });
  describe('Testing Button Actions', () => {
    it('should disable the button when the user click on the button', () => {
      wrapper.setProps({ onClick: () => wrapper.setProps({ disabled: true }) });
      wrapper.find('button').simulate('click');
      expect(wrapper.find('button').props().disabled).to.be.equal(true);
    });
  });
});
