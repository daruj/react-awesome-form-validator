import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class MyCustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      dirty: false
    };
  }

  componentDidMount() {
    this.props.setValidInputToUndefined();
  }

  componentWillReceiveProps({ forceDirty }) {
    if (this.props.forceDirty != forceDirty && forceDirty) {
      const value = this.refs[this.props.name].value;
      const validateInput = this.props.validate(value);
      this.setState({
        dirty: true,
        valid: validateInput.valid,
        errorMessage: validateInput.errorMessage
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.valid != nextState.valid) {
      this.props.isValid(nextState.valid);
    }
  }

  inputIsValid() {
    return this.state.valid || this.isPristine();
  }

  isDirty() {
    return this.state.dirty;
  }

  isPristine() {
    return !this.state.dirty;
  }

  renderError() {
    if (this.state.errorMessage && !this.isPristine() && !this.state.valid) {
      return (
        <p>
          <span>{this.state.errorMessage}</span>
        </p>
      );
    }
  }

  renderLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }

  render() {
    const {
      fieldClassName = styles.wrapperField,
      type = 'text',
      placeHolder = '',
      name,
      className = styles.input,
      invalidClassName = styles.invalidField,
      validate = () => true
    } = this.props;
    return (
      <div
        className={fieldClassName}
      >
        {this.renderLabel()}
        <input
          type={type}
          name={name}
          placeholder={placeHolder}
          className={
            classnames(
              !this.inputIsValid() ? invalidClassName : '',
              className
            )
          }
          ref={name}
          onKeyUp={(evt) => {
            const validateInput = validate(evt.target.value);
            this.setState({
              valid: validateInput.valid,
              dirty: true,
              errorMessage: validateInput.errorMessage
            });
          }}
          onBlur={(evt) => {
            const validateInput = validate(evt.target.value);
            this.setState({
              valid: validateInput.valid,
              dirty: true,
              errorMessage: validateInput.errorMessage
            });
          }}
        />
        {this.renderError()}
      </div>
    );
  }
}

MyCustomInput.propTypes = {
  fieldClassName: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  setValidInputToUndefined: React.PropTypes.func,
  forceDirty: React.PropTypes.bool,
  isValid: React.PropTypes.func
};

export default MyCustomInput;
