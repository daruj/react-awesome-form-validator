import React, { Component, PropTypes } from 'react';
import Input from './input';
import Dropdown from './dropdown';
import SubmitButton from './submit-button';
import ResetButton from './reset-button';
import Wrapper from './wrapper';
import CustomInput from './custom-input';
import { some } from 'lodash';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);

    const validInputs = {};
    const inputValues = {};
    const defaultValues = {
      validInputs: {},
      inputValues: {}
    };
    const getInput = (child) => {
      switch (child.type.name) {
        case 'Wrapper':
          getInput(child.props.children);
          break;
        case 'Input':
        case 'Dropdown':
          validInputs[child.props.name] = child.props.valid || false;
          inputValues[child.props.name] = child.props.value || '';
          defaultValues.validInputs[child.props.name] = child.props.valid || false;
          defaultValues.inputValues[child.props.name] = child.props.value || '';
          break;
        case 'CustomInput':
          const customInput = child.props.children;
          validInputs[customInput.props.name] = customInput.props.valid || false;
          inputValues[customInput.props.name] = customInput.props.value || '';
          defaultValues.validInputs[customInput.props.name] = customInput.props.valid || false;
          defaultValues.inputValues[customInput.props.name] = customInput.props.value || '';
          break;
      }
    };

    for (const x in this.props.children) {
      getInput(this.props.children[x]);
    }

    this.state = {
      forceDirty: false,
      resetForm: false,
      validInputs,
      inputValues,
      defaultValues
    };
  }

  getCommonMethods(props) {
    const { name, validate } = props;
    const { validInputs, inputValues, resetForm } = this.state;
    return {
      resetValue: resetForm,
      valueWasResetted: () => this.setState({ resetForm: false }),
      value: inputValues[name],
      valid: validInputs[name],
      forceDirty: this.state.forceDirty,
      setInputValue: (value) => {
        const state = { ...this.state };
        state.inputValues[name] = value;
        this.setState(state);
      },
      validate: (value) => {
        if (validate) {
          const validateObj = validate(value);
          const state = { ...this.state };
          state.validInputs[name] = validateObj.valid;
          return validateObj;
        } else {
          return {
            valid: true,
            errorMessage: ''
          };
        }
      }
    };
  }

  getComponent(children) {
    return React.Children.map(children,
      (child) => {
        let component = child;
        switch (child.type.name) {
          case 'Wrapper':
            component = (
              <Wrapper {...child.props}>
                {this.getComponent(child.props.children)}
              </Wrapper>
            );
            break;
          case 'SubmitButton':
            component = React.cloneElement(child, {
              onClick: (event) => {
                event.preventDefault();
                if (!some(this.state.validInputs, (x) => !x)) {
                  child.props.onClick(this.state.inputValues);
                } else {
                  this.setState({ forceDirty: true });
                }
              }
            });
            break;
          case 'ResetButton':
            component = React.cloneElement(child, {
              onClick: (event) => {
                event.preventDefault();
                const validInputs = {};
                const inputValues = {};
                const defaultValues = { ...this.state.defaultValues };

                for (const input in this.state.inputValues) {
                  inputValues[input] = defaultValues.inputValues[input] || '';
                  validInputs[input] = defaultValues.validInputs[input] || false;
                }
                this.setState({ ...this.state, resetForm: true, validInputs, inputValues });
                if (child.props.onClick) {
                  child.props.onClick();
                }
              }
            });
            break;
          case 'Input':
          case 'Dropdown':
            component = React.cloneElement(child, this.getCommonMethods(child.props));
            break;
          case 'CustomInput':
            const customInput = child.props.children;
            component = React.cloneElement(customInput, this.getCommonMethods(customInput.props));
            break;
        }
        return component;
      }
    );
  }

  render() {
    const childrenWithProps = this.getComponent(this.props.children);
    return (
      <form
        className={this.props.className}
      >
        {childrenWithProps}
      </form>
    );
  }
}

Form.propTypes = {
  className: React.PropTypes.string,
  resetForm: React.PropTypes.bool
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

Form.Wrapper = Wrapper;
Form.Wrapper.displayName = 'Wrapper';

export default Form;
