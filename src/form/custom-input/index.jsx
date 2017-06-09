import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomInput.propTypes = {
  children: PropTypes.node.isRequired
};

export default CustomInput;
