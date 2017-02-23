import React from 'react';
import { mount } from 'enzyme';
import ResetButton from '../../../../form/reset-button';

describe('Testing ResetButton Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ResetButton
        fieldClassName='ResetButtonWrapper'
        className='button'
        onClick={() => {}}
        disabled={false}
      >Submit Form</ResetButton>
    );
  });
  it('properly renders the button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  describe('Testing ResetButton Props', () => {
    it('should set a className to the div that wraps the button', () => {
      expect(wrapper.find('div').props().className).to.be.equal('ResetButtonWrapper');
    });
    it('should set a className to the button', () => {
      expect(wrapper.find('button').props().className).to.be.equal('button');
    });
    it('should disable the button when the disable props is true', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('button').props().disabled).to.be.equal(true);
    });
  });
  describe('Testing ResetButton Actions', () => {
    it('should disable the button when the user click on the button', () => {
      wrapper.setProps({ onClick: () => wrapper.setProps({ disabled: true }) });
      wrapper.find('button').simulate('click');
      expect(wrapper.find('button').props().disabled).to.be.equal(true);
    });
  });
});
