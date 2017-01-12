import React, { Component } from 'react';

class InputBaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: this.props.valid,
      dirty: false
    };
  }

  componentWillReceiveProps({ forceDirty, resetValue, valueWasResetted }) {
    if (this.props.forceDirty != forceDirty && forceDirty) {
      const value = this.refs[this.props.name].value;
      const validateInput = this.props.validate(value);
      this.setState({
        dirty: true,
        valid: validateInput.valid,
        errorMessage: validateInput.errorMessage
      });
    }

    if (this.props.resetValue != resetValue && resetValue) {
      this.setState({ dirty: false });
      valueWasResetted();
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

  renderLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
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

}

InputBaseComponent.propTypes = {
  forceDirty: React.PropTypes.bool.isRequired,
  setValidInputToUndefined: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  validate: React.PropTypes.func,
  label: React.PropTypes.string,
  valid: React.PropTypes.bool,
  resetValue: React.PropTypes.bool
};

export default InputBaseComponent;
