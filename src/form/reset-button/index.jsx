import React, { Component } from 'react';
import Button from '../button';

class ResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children = 'Reset Form' } = this.props;
    return (
      <Button {...this.props}>{children}</Button>
    );
  }
}

ResetButton.propTypes = {
  children: React.PropTypes.string.isRequired
};

export default ResetButton;
