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

    const inputs = {};

    const getInput = (child) => {
      const getDefaultValues = ({ valid, value, validate }) => {
        const defaults = {
          valid: valid || !validate,
          value: value || '',
          dirty: false,
          errorMessage: ''
        };
        return { ...defaults, defaults };
      };
      switch (child.type.name) {
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
        case 'DropdownWrapper': inputs[child.props.name] = getDefaultValues(child.props); break;
        case 'CustomInput':
          const customInput = child.props.children;
          inputs[customInput.props.name] = getDefaultValues(customInput.props);
          break;
      }
    };

    for (const x in this.props.children) {
      getInput(this.props.children[x]);
    }

    this.state = { forceDirty: false, inputs };
  }

  componentWillReceiveProps({ resetForm }) {
    if (this.props.resetForm != resetForm && resetForm) {
      this.resetForm();
      this.props.formWasResetted();
    }
  }

  resetForm() {
    const state = { ...this.state };
    const inputs = state.inputs;
    for (const input in state.inputs) {
      const { valid, value, dirty } = this.state.inputs[input].defaults;
      inputs[input] = { ...this.state.inputs[input], valid, value, dirty };
    }
    this.setState({ state, forceDirty: false });
  }

  getCommonMethods(props) {
    const { name, validate, onChange } = props;
    const { inputs, forceDirty } = this.state;
    const { value, valid, dirty, errorMessage } = inputs[name];
    return {
      value, valid, dirty, errorMessage, forceDirty,
      onChange: (value) => {
        const state = { ...this.state };
        state.inputs[name].value = value;
        this.setState(state);
        if (onChange) {
          onChange(value);
        }
      },
      validate: (value, extra = {}) => {
        const state = { ...this.state };
        if (validate) {
          const validateObj = validate(value, extra);
          state.inputs[name] = {
            ...state.inputs[name],
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          };
        } else {
          state.inputs[name] = {
            ...state.inputs[name],
            valid: true,
            errorMessage: '',
            dirty: true
          };
        }
        this.setState({ state });
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
              disabled: child.props.disabledUntilFormIsValidated
                ? some(this.state.inputs, (input) => !input.valid)
                : false,
              onClick: (event) => {
                event.preventDefault();
                const state = { ...this.state };
                //check if all the inputs are valid
                if (!some(state.inputs, (input) => !input.valid)) {
                  const inputs = {};
                  for (const input in state.inputs) {
                    inputs[input] = state.inputs[input].value;
                  }
                  // proceed with the flow
                  child.props.onClick({ ...inputs });
                } else {
                  const inputs = state.inputs;
                  for (const input in inputs) {
                    inputs[input] = { ...inputs[input], dirty: true };
                  }
                  this.setState({ ...state, forceDirty: true });
                }
              }
            });
            break;
          case 'ResetButton':
            component = React.cloneElement(child, {
              onClick: (event) => {
                event.preventDefault();
                this.resetForm();
                if (child.props.onClick) {
                  child.props.onClick();
                }
              }
            });
            break;
          case 'Input':
          case 'DropdownWrapper':
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
      <form className={this.props.className}>
        {childrenWithProps}
      </form>
    );
  }
}

Form.propTypes = {
  className: React.PropTypes.string,
  resetForm: React.PropTypes.bool,
  formWasResetted: React.PropTypes.func
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
