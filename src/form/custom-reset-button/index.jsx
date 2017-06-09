import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomResetButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default CustomResetButton;
