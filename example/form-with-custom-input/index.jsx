import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import Form                    from '../../src/form';
import { isAlpha }             from 'validator';
import MyCustomInput           from './my-custom-input';

class Root extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
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
        <Form.SubmitButton
          onClick={() => console.log('Submit Form')}
        >Submit Form</Form.SubmitButton>
      </Form>
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
