import React, { Component }    from 'react';
import Form                    from '../../src/form';
import { isAlpha, isEmail }    from 'validator';
import styles                  from './styles.scss';

class SimpleForm extends Component {

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
    }, 5000);
  }

  _onReset() {
    alert('The form was resetted');
  }

  render() {
    return (
      <Form
        resetForm={this.state.resetForm}
        formWasReset={() => this.setState({ resetForm: false })}
        onSubmit={(formData) => this._onSubmit(formData)}
        onReset={() => this._onReset()}
        disableInputs={this.state.disableInputs}
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
            onBlur={(value) => console.log(`On Blur value: ${value}`)}
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
          <Form.TextArea
            name='description'
            placeHolder='Insert your Description...'
            label='Description'
            onBlur={(value) => console.log(`On Blur value: ${value}`)}
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
          <Form.Dropdown
            name='color'
            placeHolder='Choose a color...'
            label='Choose a color *'
            onBlur={(value) => console.log(`On Blur value: ${value}`)}
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
        </Form.Wrapper>
        <Form.SubmitButton
          fieldClassName={styles.buttonField}
          className={styles.button}
        >
          Submit Form
        </Form.SubmitButton>
        <Form.ResetButton
          fieldClassName={styles.buttonField}
          className={styles.button}
        >
          Reset Form
        </Form.ResetButton>
      </Form>
    );
  }
}

export default SimpleForm;
