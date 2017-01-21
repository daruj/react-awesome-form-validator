import React, { Component } from 'react';

class InputBaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ forceDirty, resetValue, valueWasResetted }) {
    if (this.props.forceDirty != forceDirty && forceDirty) {
      const value = this.refs[this.props.name].value;
      this.props.validate(value);
    }

    if (this.props.resetValue != resetValue && resetValue) {
      // do something
      valueWasResetted();
    }
  }


  inputIsValid() {
    return this.props.valid || this.isPristine();
  }

  isDirty() {
    return this.props.dirty;
  }

  isPristine() {
    return !this.props.dirty;
  }

  renderLabel() {
    if (this.props.label) {
      return (<label>{this.props.label}</label>);
    }
  }

  renderError() {
    if (this.props.errorMessage && !this.isPristine() && !this.props.valid) {
      return (<p><span>{this.props.errorMessage}</span></p>);
    }
  }

}

InputBaseComponent.propTypes = {
  forceDirty: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  validate: React.PropTypes.func,
  label: React.PropTypes.string,
  valid: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
  errorMessage: React.PropTypes.string,
  resetValue: React.PropTypes.bool
};

export default InputBaseComponent;
