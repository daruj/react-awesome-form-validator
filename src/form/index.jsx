import React, { Component, PropTypes } from 'react';
import Input from './input';
import Dropdown from './dropdown';
import SubmitButton from './submit-button';
import Wrapper from './wrapper';
import CustomInput from './custom-input';
import { some } from 'lodash';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      forceDirty: false,
      validInputs: {},
      inputValues: {}
    };
  }

  getCommonMethods(props) {
    const { name, validate } = props;
    return {
      forceDirty: this.state.forceDirty,
      isValid: (valid) => {
        const state = { ...this.state };
        state.validInputs[name] = valid;
        this.setState(state);
      },
      setValidInputToUndefined: () => {
        const state = { ...this.state };
        state.validInputs[name] = undefined;
        state.inputValues[name] = undefined;
        this.setState(state);
      },
      setInputValue: (value) => {
        const state = { ...this.state };
        state.inputValues[name] = value;
        this.setState(state);
      },
      validate: (value) => {
        if (validate) {
          return validate(value);
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
      <form className={this.props.className}>
        {childrenWithProps}
      </form>
    );
  }
}

Form.propTypes = {
  className: React.PropTypes.string
};

Form.CustomInput = CustomInput;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = Input;
Form.Input.displayName = 'Input';

Form.Dropdown = Dropdown;
Form.Dropdown.displayName = 'Dropdown';

Form.SubmitButton = SubmitButton;
Form.SubmitButton.displayName = 'SubmitButton';

Form.Wrapper = Wrapper;
Form.Wrapper.displayName = 'Wrapper';

export default Form;
