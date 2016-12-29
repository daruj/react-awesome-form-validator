import React, { Component, PropTypes } from 'react';
import Input from './input';
import SubmitButton from './submit-button';
import Wrapper from './wrapper';
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

Form.Input = Input;
Form.Input.displayName = 'Input';

Form.SubmitButton = SubmitButton;
Form.SubmitButton.displayName = 'SubmitButton';

Form.Wrapper = Wrapper;
Form.Wrapper.displayName = 'Wrapper';

export default Form;
