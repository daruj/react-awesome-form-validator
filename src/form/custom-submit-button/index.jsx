import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomSubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomSubmitButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default CustomSubmitButton;
