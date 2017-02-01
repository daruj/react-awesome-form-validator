import React from 'react';
import { mount } from 'enzyme';
import DropdownWrapper from '../../../../form/dropdown';
import Dropdown from '../../../../form/dropdown/dropdown.jsx';

describe('Testing DropdownWrapper Component', () => {

  let wrapper;

  const validate = (value, extra = {}) => {
    let valid = true;
    let errorMessage = '';
    if (!value.length) {
      valid = false;
      errorMessage = 'This field is required';
    }
    return { valid, errorMessage };
  }

  beforeEach(() => {
    wrapper = mount(
      <DropdownWrapper
        name='color'
        placeHolder='Choose a color...'
        label='Choose a fruit *'
        options={[
          { value: 'blue', text: 'Blue' },
          { value: 'orange', text: 'Orange' },
          { value: 'red', text: 'Red' }
        ]}
        onChange={() => {}}
        validate={(value, extra = {}) => {}}
        fieldClassName='dropdown-wrapper'
      />
    );
  });

  it('properly renders the div that wraps the dropdown', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('properly renders the dropdown', () => {
    expect(wrapper.find(Dropdown)).to.have.length(1);
  });
  describe('Testing DropdownWrapper Props', () => {
    it('should set a className to the div that wraps the button', () => {
      expect(wrapper.find('div').props().className).to.be.equal('dropdown-wrapper');
    });
  });
  describe('Testing DropdownWrapper Actions', () => {
    it('should change the dropdown value when trigger onChange function from Dropdown', () => {
      wrapper.setProps({ onChange: (value) => wrapper.setProps({ value }) });
      wrapper.find(Dropdown).simulate('change', { target: { value: 'banana' } });
      expect(wrapper.props().value).to.be.equal('banana');
    });
    it('should return \'This field is required\' when trigger onChange and the value is empty', () => {
      wrapper.setProps({
        validate: (value, extra = {}) => {
          if (validate) {
            const validateObj = validate(value, extra);
            wrapper.setProps({
              value,
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
          } else {
            wrapper.setProps({
              value,
              valid: true,
              errorMessage: '',
              dirty: true
            });
          }
        }
      });
      wrapper.find(Dropdown).simulate('change', { target: { value: '' } });
      expect(wrapper.props().valid).to.be.equal(false);
      expect(wrapper.props().errorMessage).to.be.equal('This field is required');
    });
  });
});
