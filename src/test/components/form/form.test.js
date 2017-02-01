import React, { Component } from 'react';
import { mount } from 'enzyme';
import Form from '../../../form/';
import { isAlpha }    from 'validator';
import {
  getStateOnBackendErrors,
  getStateOnResetForm,
  getStateWithNewInputValues,
  getInputsValues
} from '../../../form/form.js';

const MyForm = (props) => {
  return (
    <Form
      resetForm={false}
      formWasResetted={() => {}}
      onSubmit={() => {}}
      onReset={() => {}}
      disableInputs={false}
      { ...props }
    >
      <h2>Basic Form</h2>
      <Form.Wrapper className='formWrapper'>
        <h3>Group 1</h3>
        <Form.Input
          name='name'
          placeHolder='Type your name here...'
          type='text'
          invalidClassName='invalidField'
          label='Name * (this field will will start beeing validated from the moment you start typing)'
          startValidatingWhenIsPristine
          validate={(value) => {
            let valid = true;
            let errorMessage = '';
            if (!value.length) {
              valid = false;
              errorMessage = 'This field is required';
            } else if (!isAlpha(value.replace(/\s/g, ''))) {
              valid = false;
              errorMessage = 'You must enter only characters';
            }
            return { valid, errorMessage };
          }}
          fieldClassName='inputField inputNameWrapper'
        />
        <Form.Dropdown
          name='color'
          placeHolder='Choose a color...'
          label='Choose a fruit *'
          invalidClassName='invalidField'
          options={[
            { value: 'blue', text: 'Blue' },
            { value: 'orange', text: 'Orange' },
            { value: 'red', text: 'Red' }
          ]}
          validate={(value) => {
            let valid = true;
            let errorMessage = '';
            if (!value.length) {
              valid = false;
              errorMessage = 'This field is required';
            }
            return { valid, errorMessage };
          }}
          fieldClassName='inputField inputColorWrapper'
        />
        <Form.Input
          name='lastName'
          placeHolder='Type your lastName here...'
          label='Last Name * (this field will will start beeing validated when the user leaves the input (onBlur))'
          type='text'
          invalidClassName='invalidField'
          startValidatingWhenIsPristine
          validate={(value) => {
            let valid = true;
            let errorMessage = '';
            if (!value.length) {
              valid = false;
              errorMessage = 'This field is required';
            } else if (!isAlpha(value.replace(/\s/g, ''))) {
              valid = false;
              errorMessage = 'You must enter only characters';
            }
            return { valid, errorMessage };
          }}
          fieldClassName='inputField inputLastNameWrapper'
        />
      </Form.Wrapper>
      <Form.SubmitButton
        fieldClassName='buttonField'
        className='button'
      >
        Submit Form
      </Form.SubmitButton>
      <Form.ResetButton
        fieldClassName='buttonField'
        className='button'
      >
        Reset Form
      </Form.ResetButton>
    </Form>
  )
}

const state = {
  forceDirty: false,
  inputs: {
    name: {
      value: 'Damian',
      valid: true,
      errorMessage: '',
      dirty: true,
      defaults: {
        value: 'Damian',
        valid: true,
        errorMessage: '',
        dirty: true
      },
      resetValue: false,
      disabled: false
    },
    lastName: {
      value: 'Aruj',
      valid: true,
      errorMessage: '',
      dirty: true,
      defaults: {
        value: 'Aruj',
        valid: true,
        errorMessage: '',
        dirty: true
      },
      resetValue: false,
      disabled: false
    },
    email: {
      value: 'aruj.damian@gmail.com',
      valid: true,
      errorMessage: '',
      dirty: true,
      defaults: {
        value: 'aruj.damian@gmail.com',
        valid: true,
        errorMessage: '',
        dirty: true
      },
      resetValue: false,
      disabled: false
    }
  }
};

describe('Testing Form Component', () => {
  it('properly renders the form', () => {
    const wrapper = mount(<MyForm />);
    expect(wrapper.find('form')).to.have.length(1);
  });
  describe('Testing Form Actions that changes the state', () => {
    it('should get a new state and the prop valid of the inputs[\'name\'] should be false', () => {
      const newState = getStateWithNewInputValues({ ...state }, { valid: false }, 'name');
      expect(newState.inputs.name.valid).to.be.equal(false);
    });
    it('should get a new state where all the inputs has their prop value set to false', () => {
      const newState = getStateWithNewInputValues({ ...state }, { valid: false });
      expect(newState.inputs.name.valid).to.be.equal(false);
      expect(newState.inputs.lastName.valid).to.be.equal(false);
      expect(newState.inputs.email.valid).to.be.equal(false);
    });
    it('should return a new state where all the inputs have their resetValue set to true and forceDirty is set to false', () => {
      const newState = getStateOnResetForm({ ...state });
      expect(newState.inputs.name.resetValue).to.be.equal(true);
      expect(newState.inputs.lastName.resetValue).to.be.equal(true);
      expect(newState.inputs.email.resetValue).to.be.equal(true);
      expect(newState.forceDirty).to.be.equal(false);
    });
    it('should return a new state where all the inputs have their value set to \'\' and forceDirty is set to false', () => {
      const newState = getStateOnResetForm({ ...state }, true);
      expect(newState.inputs.name.value).to.be.equal('');
      expect(newState.inputs.lastName.value).to.be.equal('');
      expect(newState.inputs.email.value).to.be.equal('');
      expect(newState.forceDirty).to.be.equal(false);
    });
  })
  describe('Testing Form Actions', () => {
    it('should get an object with all the form inputs and their values', () => {
      const inputs = { ...state.inputs };
      inputs.name.value = 'Damian';
      inputs.lastName.value = 'Aruj';
      inputs.email.value = 'aruj.damian@gmail.com';
      const formData = getInputsValues(inputs);
      expect(JSON.stringify(formData) === JSON.stringify({
        name: 'Damian',
        lastName: 'Aruj',
        email: 'aruj.damian@gmail.com'
      })).to.be.equal(true);
    });
    it('should get a new state with serverErrors', () => {
      const emailError = 'This email exist, please use another one';
      const serverErrors = { email: emailError };
      const newState = getStateOnBackendErrors({ ...state }, serverErrors);
      expect(newState.inputs.email.valid).to.be.equal(false);
      expect(newState.inputs.email.errorMessage).to.be.equal(emailError);
    });
    it('should validate the inputs when the user clicks on the Submit button', () => {
      const wrapper = mount(<MyForm />);
      wrapper.find(Form.SubmitButton).find('button').simulate('click');
      expect(wrapper.find('.inputNameWrapper').find('.invalidField')).to.have.length(1);
      expect(wrapper.find('.inputColorWrapper').find('.invalidField')).to.have.length(1);
      expect(wrapper.find('.inputLastNameWrapper').find('.invalidField')).to.have.length(1);
    });
    it('should show error when the value for the input \'name\' is not alpha', () => {
      const wrapper = mount(<MyForm />);
      wrapper.find('.inputNameWrapper').find('input')
        .simulate('change', { target: { value: '132' } });
      expect(wrapper.find('.inputNameWrapper').find('.invalidField')).to.have.length(1)
    });
    it('should show error when the value for the input \'color\' is empty', () => {
      const wrapper = mount(<MyForm />);
      wrapper.find('.inputColorWrapper').find('select')
        .simulate('change', { target: { value: '' } });
      expect(wrapper.find('.inputColorWrapper').find('.invalidField')).to.have.length(1)
    });
    it('should show error when the value for the input \'lastName\' is empty', () => {
      const wrapper = mount(<MyForm />);
      wrapper.find('.inputLastNameWrapper').find('input')
        .simulate('change', { target: { value: '132' } });
      expect(wrapper.find('.inputLastNameWrapper').find('.invalidField')).to.have.length(1)
    });
    it('should disable all inputs when we set disableInputs as true', () => {
      const wrapper = mount(<MyForm />);
      wrapper.setProps({ disableInputs: true });
      expect(wrapper.find('.inputNameWrapper').find('input').props().disabled).to.be.equal(true);
      expect(wrapper.find('.inputColorWrapper').find('select').props().disabled).to.be.equal(true);
      expect(wrapper.find('.inputLastNameWrapper').find('input').props().disabled).to.be.equal(true);
    });
    it('should trigger onSave action when click on the submitButton and all validation pass', () => {
      let submitted = false;
      const wrapper = mount(<MyForm onSubmit={() => submitted = true} />);
      wrapper.find('.inputNameWrapper').find('input')
        .simulate('change', { target: { value: 'Damian' } });
      wrapper.find('.inputLastNameWrapper').find('input')
        .simulate('change', { target: { value: 'Aruj' } });
      wrapper.find('.inputColorWrapper').find('select')
        .simulate('change', { target: { value: 'blue' } });
      wrapper.find(Form.SubmitButton).find('button').simulate('click');
      expect(submitted).to.equal(true);
    });
    it('should trigger onReset action when click on the resetButton', () => {
      let reset = false;
      const wrapper = mount(<MyForm onReset={() => reset = true} />);
      wrapper.find(Form.ResetButton).find('button').simulate('click');
      expect(reset).to.equal(true);
    });
  });
});
