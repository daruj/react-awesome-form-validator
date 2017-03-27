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
      disableInputs: false,
      serverErrors: {}
    };
  }

  _onSubmit(formData) {
    console.log('Form ready to be submitted', formData);
    this.setState({ disableInputs: true, serverErrors: {} });
    // Disable the inputs for 5 seconds emulating an async requests.
    setTimeout(() => {
      const serverErrors = {};
      if (formData.email == 'aruj.damian@gmail.com') {
        serverErrors.email = 'This email exist, please use another one';
      }
      this.setState({
        disableInputs: false,
        serverErrors
      });
    }, 1000);
  }

  _onReset() {
    alert('The form was resetted');
  }

  _renderServerError() {
    if (Object.keys(this.state.serverErrors).length) {
      return (
        <div className={styles.errorWrapper}>We found Errors!!</div>
      );
    } else {
      return '';
    }
  }

  render() {
    return (
      <Form
        resetForm={this.state.resetForm}
        formWasReset={() => this.setState({ resetForm: false })}
        onSubmit={(formData) => this._onSubmit(formData)}
        onReset={() => this._onReset()}
        clearValuesOnReset
        serverErrors={this.state.serverErrors}
        disableInputs={this.state.disableInputs}
      >
        {this._renderServerError()}
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
        <Form.CustomResetButton>
          <a href='#'>Custom Reset Form</a>
        </Form.CustomResetButton>
        <span>  -  </span>
        <Form.CustomResetButton clearValues>
          <a href='#'>Custom Clear All Values Form</a>
        </Form.CustomResetButton>
      </Form>
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
