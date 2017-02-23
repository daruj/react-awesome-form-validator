import React from 'react';
import { mount } from 'enzyme';
import styles from '../../../../form/input/styles.scss';
import Input from '../../../../form/input';

describe('Testing Input Component', () => {
  let wrapper;
  const validate = (value, extra = {}) => {
    let valid = true;
    let errorMessage = '';
    if (!value.length) {
      valid = false;
      errorMessage = 'This field is required';
    }
    return { valid, errorMessage };
  };

  beforeEach(() => {
    wrapper = mount(
      <Input
        type='text'
        placeHolder='-'
        label=''
        name='myInput'
        className='input'
        fieldClassName='InputWrapper'
        value=''
        valid={false}
        dirty={false}
        errorMessage=''
        forceDirty={false}
        startValidatingWhenIsPristine
        onChange={(value) => {}}
        validate={(value, extra = {}) => {}}
      />
    );
  });

  it('properly renders the input', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });

  describe('Testing Input Props', () => {
    it('should set a className to the div that wraps the input', () => {
      expect(wrapper.find('div').props().className).to.be.equal('InputWrapper');
    });
    it('should set a className to the input', () => {
      expect(wrapper.find('input').props().className).to.be.equal('input');
    });
    it('should disable the input when the disable props is true', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('input').props().disabled).to.be.equal(true);
    });
    it('should receive name as a prop', () => {
      expect(wrapper.find('input').props().name).to.be.equal('myInput');
    });
    it('should receive type as a prop', () => {
      expect(wrapper.find('input').props().type).to.be.equal('text');
    });
  });

  describe('Testing Input Actions', () => {
    it('should change its value when we trigger its onChange prop', () => {
      const value = 'test';
      wrapper.setProps({ onChange: (value) => wrapper.setProps({ value }) });
      wrapper.find('input').simulate('change', { target: { value } });
      expect(wrapper.find('input').props().value).to.be.equal(value);
    });
    it('should change its value when we trigger its onBlur prop', () => {
      const value = 'test';
      wrapper.setProps({ onChange: (value) => wrapper.setProps({ value }) });
      wrapper.find('input').simulate('blur', { target: { value } });
      expect(wrapper.find('input').props().value).to.be.equal(value);
    });
    it('should add an invalid class to the input when the user leaves the input empty', () => {
      wrapper.setProps({
        onChange: (value) => wrapper.setProps({ value }),
        validate: (value, extra = {}) => {
          if (validate) {
            const validateObj = validate(value, extra);
            wrapper.setProps({
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
          } else {
            wrapper.setProps({
              valid: true,
              errorMessage: '',
              dirty: true
            });
          }
        }
      });
      wrapper.find('input').simulate('blur', { target: { value: '' } });
      expect(wrapper.find('input').props().className).to.contain(styles.invalidField);
    });
    it('should display an error text when the user leaves the input empty', () => {
      wrapper.setProps({
        onChange: (value) => wrapper.setProps({ value }),
        validate: (value, extra = {}) => {
          if (validate) {
            const validateObj = validate(value, extra);
            wrapper.setProps({
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
          } else {
            wrapper.setProps({
              valid: true,
              errorMessage: '',
              dirty: true
            });
          }
        }
      });
      wrapper.find('input').simulate('blur', { target: { value: '' } });
      expect(wrapper.find('span').props().children).to.be.equal('This field is required');
    });
    it('should not start validating if startValidatingWhenIsPristine prop is not set or is set to false until the user leaves the input', () => {
      wrapper.setProps({
        onChange: (value) => wrapper.setProps({ value }),
        startValidatingWhenIsPristine: false,
        validate: (value, extra = {}) => {
          if (validate) {
            const validateObj = validate(value, extra);
            wrapper.setProps({
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
          } else {
            wrapper.setProps({
              valid: true,
              errorMessage: '',
              dirty: true
            });
          }
        }
      });
      wrapper.find('input').simulate('change', { target: { value: '' } });
      expect(wrapper.find('input').props().className).to.not.contain(styles.invalidField);
      wrapper.find('input').simulate('blur');
      expect(wrapper.find('input').props().className).to.contain(styles.invalidField);
    });
  });
});
