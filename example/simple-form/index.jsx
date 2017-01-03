import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import Form                    from '../../src/form';
import { isAlpha, isEmail }    from 'validator';

class Root extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <h2>Basic Form</h2>
        <Form.Input
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
        <Form.Input
          name='lastName'
          placeHolder='Type your lastName here...'
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
        <Form.Input
          name='email'
          placeHolder='Type your email here...'
          type='email'
          validate={(value) => {
            let valid = true;
            let errorMessage = '';
            if (!value.length) {
              valid = false;
              errorMessage = 'This field is required';
            } else if (!isEmail(value.replace(/\s/g, ''))) {
              valid = false;
              errorMessage = 'You must enter a valid email';
            }
            return { valid, errorMessage };
          }}
        />
        <Form.Dropdown
          name='fruit'
          placeHolder='Choose a fruit...'
          options={[
            { value: 'banana', text: 'Banana' },
            { value: 'apple', text: 'Apple' },
            { value: 'pinaple', text: 'Pinaple' }
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
        />
        <Form.SubmitButton
          onClick={(formData) => console.log('Form Data', formData)}
        >Submit Form</Form.SubmitButton>
      </Form>
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
