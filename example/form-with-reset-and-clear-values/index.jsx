import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import Form                    from '../../src/form';
import { isAlpha, isEmail }    from 'validator';
import styles                  from './styles.scss';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resetForm: false,
      disableInputs: false
    };
  }

  _onSubmit(formData) {
    console.log('Form ready to be submitted', formData);
    this.setState({ disableInputs: true });
    // Disable the inputs for 5 seconds emulating an async requests.
    setTimeout(() => {
      this.setState({ resetForm: true, disableInputs: false });
    }, 1000);
  }

  _onReset() {
    alert('The form was resetted');
  }

  render() {
    return (
      <Form
        resetForm={this.state.resetForm}
        formWasResetted={() => this.setState({ resetForm: false })}
        onSubmit={(formData) => this._onSubmit(formData)}
        onReset={() => this._onReset()}
        clearValuesOnReset
        disableInputs={this.state.disableInputs}
      >
        <h2>Basic Form</h2>
        <Form.Wrapper className={styles.wrapper}>
          <h3>Basic Information</h3>
          <Form.Input
            name='name'
            placeHolder='Type your name here...'
            type='text'
            label='Name * (this field will will start beeing validated from the moment you start typing)'
            startValidatingWhenIsPristine
            value='Damian'
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
            fieldClassName={styles.inputField}
          />
          <Form.Input
            name='lastName'
            placeHolder='Type your lastName here...'
            label='Last Name * (this field will will start beeing validated when the user leaves the input (onBlur))'
            type='text'
            value='Aruj'
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
            fieldClassName={styles.inputField}
          />
        </Form.Wrapper>
        <Form.Wrapper className={styles.wrapper}>
          <h3>Advance Information</h3>
          <Form.Input
            name='email'
            placeHolder='Type your email here...'
            label='Email *'
            type='email'
            value='aruj.damian@gmail.com'
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
            fieldClassName={styles.inputField}
          />
        </Form.Wrapper>
        <Form.CustomSubmitButton>
          <a href='#'>Custom Submit Form</a>
        </Form.CustomSubmitButton>
        <span>  -  </span>
        <Form.CustomResetButton clearValues>
          <a href='#'>Custom Reset Form</a>
        </Form.CustomResetButton>
      </Form>
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
