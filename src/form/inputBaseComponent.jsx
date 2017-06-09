import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputBaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ forceDirty, resetValue, valueWasResetted, serverValue }) {
    if (!this.isDirty() && this.props.forceDirty != forceDirty && forceDirty) {
      const value = this.refs[this.props.name].value;
      this.props.validate(value);
    }

    if (this.props.serverValue !== serverValue) {
      this.props.onChange(serverValue);
      this.props.validate(serverValue);
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
    if (this.props.customLabel) {
      return (<this.props.customLabel />);
    }
  }

  renderError() {
    if (this.props.errorMessage && !this.isPristine() && !this.props.valid) {
      return (<p><span>{this.props.errorMessage}</span></p>);
    }
  }

}

InputBaseComponent.propTypes = {
  forceDirty: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  label: PropTypes.string,
  customLabel: PropTypes.node,
  valid: PropTypes.bool,
  dirty: PropTypes.bool,
  errorMessage: PropTypes.string,
  resetValue: PropTypes.bool,
  serverValue: PropTypes.string,
  onChange: PropTypes.func
};

export default InputBaseComponent;
