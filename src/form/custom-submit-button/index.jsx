import React, { Component } from 'react';

class CustomSubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomSubmitButton.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default CustomSubmitButton;
