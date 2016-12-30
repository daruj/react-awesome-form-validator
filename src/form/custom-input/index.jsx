import React, { Component } from 'react';

class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

CustomInput.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default CustomInput;
