import React, { Component, PropTypes } from 'react';
import Input from './input';
import SubmitButton from './submit-button';
import { some } from 'lodash';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      forceDirty: false,
      validInputs: {}
    };
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        let component = child;
        switch (child.type.name) {
          case 'SubmitButton':
            component = React.cloneElement(child, {
              onClick: (event) => {
                event.preventDefault();
                if (!some(this.state.validInputs, (x) => !x)) {
                  child.props.onClick();
                } else {
                  this.setState({ forceDirty: true });
                }
              }
            });
            break;
          case 'Input':
            component = React.cloneElement(child, {
              forceDirty: this.state.forceDirty,
              isValid: (valid) => {
                const state = { ...this.state };
                state.validInputs[child.props.name] = valid;
                this.setState(state);
              },
              setValidInputToUndefined: () => {
                const state = { ...this.state };
                state.validInputs[child.props.name] = undefined;
                this.setState(state);
              },
              validate: (value) => {
                if (child.props.validate) {
                  return child.props.validate(value);
                } else {
                  return {
                    valid: true,
                    errorMessage: ''
                  };
                }
              }
            });
            break;
        }
        return component;
      }
    );
    return (<form>{childrenWithProps}</form>);
  }
}

Form.Input = Input;
Form.Input.displayName = 'Input';

Form.SubmitButton = SubmitButton;
Form.SubmitButton.displayName = 'SubmitButton';

export default Form;
