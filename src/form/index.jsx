import React, { Component, PropTypes } from 'react';
import Input from './input';
import Dropdown from './dropdown';
import SubmitButton from './submit-button';
import ResetButton from './reset-button';
import Wrapper from './wrapper';
import CustomInput from './custom-input';
import CustomResetButton from './custom-reset-button';
import CustomSubmitButton from './custom-submit-button';
import emptySpan from './empty-span';

import { some } from 'lodash';


class Form extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);

    const inputs = {};

    const getInput = (child) => {
      const getDefaultValues = ({ valid, value, validate, disabled = false }) => {
        // default values
        let defaults = {
          valid: !validate,
          value: '',
          dirty: false,
          errorMessage: ''
        };
        if (value) {
          if (validate) {
            // default values when the input has a value and a validate prop
            const validateObj = validate(value);
            defaults = {
              value,
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            };
          } else {
            // default values when the input has a value but has not a validate prop
            defaults = {
              valid: true,
              value,
              dirty: true,
              errorMessage: ''
            };
          }
        }

        return { ...defaults, defaults, resetValue: false, disabled, needToValidate: validate };
      };
      switch (child.type.displayName) {
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
        case 'Input':
        case 'Dropdown': inputs[child.props.name] = getDefaultValues(child.props); break;
        case 'CustomInput':
          const customInput = child.props.children;
          inputs[customInput.props.name] = getDefaultValues(customInput.props);
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

  componentWillReceiveProps({ resetForm, disableInputs, clearValuesOnReset }) {
    if (this.props.resetForm != resetForm && resetForm) {
      this.resetForm({ clearValues: clearValuesOnReset });
      this.props.formWasResetted();
    }

    if (this.props.disableInputs != disableInputs) {
      this.setInputsValues({ disabled: disableInputs });
    }
  }

  resetForm({ clearValues }) {
    const state = { ...this.state };
    const inputs = state.inputs;
    for (const input in state.inputs) {
      const { valid, value, dirty } = state.inputs[input].defaults;
      inputs[input] = {
        ...state.inputs[input],
        resetValue: true,
        valid: clearValues ? !state.inputs[input].needToValidate : valid,
        dirty: clearValues ? false : dirty,
        value: clearValues ? '' : value
      };
    }
    this.setState({ state, forceDirty: false });
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
        //check if all the inputs are valid
        if (!some(this.state.inputs, (input) => !input.valid)) {
          // proceed to call the onSubmit prop from the Form.
          this.props.onSubmit({ ...this.getInputsAndTheirValues() });
        } else {
          this.setInputsValues({ dirty: true });
          this.setState({ forceDirty: true });
        }
      }
    };
  }

  getInputsAndTheirValues() {
    const inputs = {};
    for (const input in this.state.inputs) {
      inputs[input] = this.state.inputs[input].value;
    }
    return inputs;
  }

  setInputsValues(newValues) {
    const state = { ...this.state };
    const inputs = state.inputs;
    for (const input in state.inputs) {
      inputs[input] = { ...state.inputs[input], ...newValues };
    }
    this.setState({ state });
  }

  setInputValues(inputName, newValues) {
    const state = { ...this.state };
    state.inputs[inputName] = {
      ...state.inputs[inputName],
      ...newValues
    };
    this.setState({ state });
  }

  getInputsCommonProps(props) {
    const { name, validate, onChange } = props;
    const input = name;
    const { inputs, forceDirty } = this.state;
    const { value, valid, dirty, errorMessage, resetValue, disabled } = inputs[input];
    return {
      value, valid, dirty, errorMessage, forceDirty, resetValue, disabled,
      onChange: (value) => {
        this.setInputValues(input, { value });
        if (onChange) {
          onChange(value);
        }
      },
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          this.setInputValues(input, {
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          });
        } else {
          this.setInputValues(input, {
            valid: true,
            errorMessage: '',
            dirty: true
          });
        }
      },
      valueWasResetted: () => {
        this.setInputValues(input, { resetValue: false });
      }
    };
  }

  getChildrenComponents(children) {
    return React.Children.map(children,
      (child) => {
        let component = child;
        switch (child.type.displayName) {
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
          case 'Input':
          case 'Dropdown':
            component = React.cloneElement(child, this.getInputsCommonProps(child.props));
            break;
          case 'CustomInput':
            const customInput = child.props.children;
            component = React.cloneElement(customInput, this.getInputsCommonProps(customInput.props));
            break;
          case 'CustomSubmitButton':
            const customSubmitButton = child.props.children.props
              ? child.props.children : emptySpan({ children: child.props.children });
            component = React.cloneElement(customSubmitButton, this.getSubmitButtonProps(child.props));
            break;
          case 'CustomResetButton':
            const customResetButton = child.props.children.props
              ? child.props.children : emptySpan({ children: child.props.children });
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
  className: React.PropTypes.string,
  resetForm: React.PropTypes.bool,
  clearValuesOnReset: React.PropTypes.bool,
  formWasResetted: React.PropTypes.func,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func,
  disableInputs: React.PropTypes.bool
};

Form.CustomInput = CustomInput;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = Input;
Form.Input.displayName = 'Input';

Form.Dropdown = Dropdown;
Form.Dropdown.displayName = 'Dropdown';

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
