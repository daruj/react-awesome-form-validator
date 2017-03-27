import React, { Component, PropTypes } from 'react';
import Input from './input';
import TextArea from './textarea';
import Dropdown from './dropdown';
import SubmitButton from './submit-button';
import ResetButton from './reset-button';
import Wrapper from './wrapper';
import CustomInput from './custom-input';
import CustomResetButton from './custom-reset-button';
import CustomSubmitButton from './custom-submit-button';

import {
  getInitialState,
  getStateOnBackendErrors,
  getStateOnResetForm,
  getStateWithNewInputValues,
  getInputsValues
} from './form';
import { some } from 'lodash';

class Form extends Component {
  constructor(props) {
    super(props);

    const inputs = {};

    const getInput = (child) => {
      const displayName = child.props ? child.type.displayName : '';

      switch (displayName) {
        case 'Wrapper':
          if (child.props.children) {
            if (child.props.children.length) {
              for (const x in child.props.children) {
                getInput(child.props.children[x]);
              }
            } else {
              getInput(child.props.children);
            }
          }
          break;
        case 'TextArea':
        case 'Input':
        case 'DropdownWrapper': inputs[child.props.name] = getInitialState(child.props); break;
        case 'CustomInput':
          const customInput = child.props.children;
          inputs[customInput.props.name] = getInitialState(customInput.props);
          break;
      }
    };

    const formElements = this.props.children;
    for (const x in formElements) {
      if (this.props.children.length) {
        getInput(this.props.children[x]);
      } else {
        getInput(this.props.children);
      }
    }
    this.state = { forceDirty: false, inputs };
  }

  componentWillReceiveProps({ resetForm, disableInputs, clearValuesOnReset, serverErrors }) {
    if (this.props.resetForm != resetForm && resetForm) {
      this.resetForm({ clearValues: clearValuesOnReset });
      this.props.formWasReset();
    }

    if (this.props.disableInputs != disableInputs) {
      this.setInputsValues({ disabled: disableInputs });
    }

    if (this.props.serverErrors != serverErrors && Object.keys(serverErrors).length) {
      this.setBackendErrors(serverErrors);
    }
  }

  setBackendErrors(errors = {}) {
    this.setState({ ...getStateOnBackendErrors({ ...this.state }, errors) });
  }

  resetForm({ clearValues }) {
    this.setState({ ...getStateOnResetForm({ ...this.state }, clearValues) });
  }

  getResetButtonProps(props) {
    return {
      disabled: this.props.disableInputs,
      onClick: (event) => {
        event.preventDefault();
        this.resetForm({ clearValues: props.clearValues });
        // proceed to call the onReset prop from the Form.
        if (this.props.onReset) {
          this.props.onReset();
        }
      }
    };
  }

  getSubmitButtonProps(props) {
    return {
      disabled: this.props.disableInputs || (props.disabledUntilFormIsValidated
        ? some(this.state.inputs, (input) => !input.valid)
        : false),
      onClick: (event) => {
        event.preventDefault();
        const inputs = { ...this.state.inputs };
        //check if all the inputs are valid
        if (!some(inputs, (input) => !input.valid)) {
          // proceed to call the onSubmit prop from the Form.
          this.props.onSubmit({ ...getInputsValues(inputs) });
        } else {
          this.setInputsValues({ dirty: true });
          this.setState({ forceDirty: true });
        }
      }
    };
  }


  setInputsValues(newValues = {}, input) {
    this.setState({ ...getStateWithNewInputValues({ ...this.state }, newValues, input) });
  }

  getInputsCommonProps(props) {
    const { name, validate, onChange, onBlur } = props;
    const input = name;
    const { inputs, forceDirty } = this.state;
    const { value, valid, dirty, errorMessage, resetValue, disabled } = inputs[input];
    return {
      value, valid, dirty, errorMessage, forceDirty, resetValue, disabled,
      onChange: (value) => {
        this.setInputsValues({ value }, input);
        if (onChange) {
          onChange(value);
        }
      },
      onBlur: (value) => {
        this.setInputsValues({ value }, input);
        if (onBlur) {
          onBlur(value);
        }
      },
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          this.setInputsValues({
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          }, input);
        } else {
          this.setInputsValues({
            valid: true,
            errorMessage: '',
            dirty: true
          }, input);
        }
      },
      valueWasResetted: () => {
        this.setInputsValues({ resetValue: false }, input);
      }
    };
  }

  getChildrenComponents(children) {
    return React.Children.map(children,
      (child) => {
        let component = child;
        const displayName = child.props ? child.type.displayName : '';
        switch (displayName) {
          case 'Wrapper':
            component = (
              <Wrapper {...child.props}>
                {this.getChildrenComponents(child.props.children)}
              </Wrapper>
            );
            break;
          case 'SubmitButton':
            component = React.cloneElement(child, this.getSubmitButtonProps(child.props));
            break;
          case 'ResetButton':
            component = React.cloneElement(child, this.getResetButtonProps(child.props));
            break;
          case 'TextArea':
          case 'Input':
          case 'DropdownWrapper':
            component = React.cloneElement(child, this.getInputsCommonProps(child.props));
            break;
          case 'CustomInput':
            const customInput = child.props.children;
            component = React.cloneElement(customInput, this.getInputsCommonProps(customInput.props));
            break;
          case 'CustomSubmitButton':
            const customSubmitButton = child.props.children.props
              ? child.props.children : (<span>{child.props.children}</span>);
            component = React.cloneElement(customSubmitButton, this.getSubmitButtonProps(child.props));
            break;
          case 'CustomResetButton':
            const customResetButton = child.props.children.props
              ? child.props.children : (<span>{child.props.children}</span>);
            component = React.cloneElement(customResetButton, this.getResetButtonProps(child.props));
            break;
        }
        return component;
      }
    );
  }

  render() {
    return (
      <form className={this.props.className}>
        {this.getChildrenComponents(this.props.children)}
      </form>
    );
  }
}

Form.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  resetForm: React.PropTypes.bool,
  clearValuesOnReset: React.PropTypes.bool,
  formWasReset: React.PropTypes.func,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func,
  disableInputs: React.PropTypes.bool,
  serverErrors: React.PropTypes.shape({})
};

Form.CustomInput = CustomInput;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = Input;
Form.Input.displayName = 'Input';

Form.TextArea = TextArea;
Form.TextArea.displayName = 'TextArea';

Form.Dropdown = Dropdown;
Form.Dropdown.displayName = 'DropdownWrapper';

Form.SubmitButton = SubmitButton;
Form.SubmitButton.displayName = 'SubmitButton';

Form.ResetButton = ResetButton;
Form.ResetButton.displayName = 'ResetButton';

Form.CustomSubmitButton = CustomSubmitButton;
Form.CustomSubmitButton.displayName = 'CustomSubmitButton';

Form.CustomResetButton = CustomResetButton;
Form.CustomResetButton.displayName = 'CustomResetButton';

Form.Wrapper = Wrapper;
Form.Wrapper.displayName = 'Wrapper';

export default Form;
