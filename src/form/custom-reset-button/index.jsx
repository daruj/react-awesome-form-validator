import React, { Component } from 'react';

class CustomResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomResetButton.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default CustomResetButton;
