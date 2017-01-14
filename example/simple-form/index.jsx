import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import Form                    from '../../src/form';
import { isAlpha, isEmail }    from 'validator';
import styles                  from './styles.scss';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resetForm: false
    };
  }

  _onSubmit(formData) {
    console.log('Form ready to be submitted', formData);
    this.setState({ resetForm: true });
  }

  _onReset() {
    alert('The form was resetted');
  }

  render() {
    return (
      <Form
        resetForm={this.state.resetForm}
        formWasResetted={() => this.setState({ resetForm: false })}
      >
        <h2>Basic Form</h2>
        <Form.Wrapper className={styles.wrapper}>
          <h3>Group 1</h3>
          <Form.Input
            name='name'
            placeHolder='Type your name here...'
            type='text'
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
            fieldClassName={styles.inputField}
          />
          <Form.Input
            name='lastName'
            placeHolder='Type your lastName here...'
            label='Last Name * (this field will will start beeing validated when the user leaves the input (onBlur))'
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
            fieldClassName={styles.inputField}
          />
        </Form.Wrapper>
        <Form.Wrapper className={styles.wrapper}>
          <h3>Group 2</h3>
          <Form.Input
            name='email'
            placeHolder='Type your email here...'
            label='Email *'
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
            fieldClassName={styles.inputField}
          />
          <Form.Dropdown
            name='fruit'
            placeHolder='Choose a fruit...'
            label='Choose a fruit *'
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
            fieldClassName={styles.inputField}
          />
        </Form.Wrapper>
        <Form.SubmitButton
          onClick={(formData) => this._onSubmit(formData)}
          disabledUntilFormIsValidated
          fieldClassName={styles.buttonField}
          className={styles.button}
        >
          Submit Form
        </Form.SubmitButton>
        <Form.ResetButton
          onClick={() => this._onReset()}
          fieldClassName={styles.buttonField}
          className={styles.button}
        >
          Reset Form
        </Form.ResetButton>
      </Form>
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
