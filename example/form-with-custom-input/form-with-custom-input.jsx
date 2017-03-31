import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import Form                    from '../../src/form';
import { isAlpha }             from 'validator';
import MyCustomInput           from './inputs/my-custom-input';
import MultipleInputs          from './inputs/multiple-inputs';

class FormWithCustomInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form
        onSubmit={(data) => console.log(data)}
      >
        <h2>Form with custom input</h2>
        <Form.CustomInput>
          <MyCustomInput
            name='name'
            placeHolder='Type your name here...'
            type='text'
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
          />
        </Form.CustomInput>
        <Form.CustomInput>
          <MultipleInputs
            name='goals'
            label='Enter your Goals here'
            placeHolder='Type your goal here...'
            goals={['Goal 1', 'Goal 2', 'Goal 3']}
            validate={(value) => {
              let valid = true;
              let errorMessage = '';
              if (!value.length) {
                valid = false;
                errorMessage = 'This field is required';
              }
              return { valid, errorMessage };
            }}
          />
        </Form.CustomInput>
        <Form.SubmitButton>
          Submit Form
        </Form.SubmitButton>
        <Form.ResetButton>
          Reset Form
        </Form.ResetButton>
      </Form>
    );
  }
}

export default FormWithCustomInput;
