import React, { Component } from 'react';

class InputBaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      dirty: false
    };
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

}

InputBaseComponent.propTypes = {
  forceDirty: React.PropTypes.bool.isRequired,
  isValid: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  validate: React.PropTypes.func
};

export default InputBaseComponent;
