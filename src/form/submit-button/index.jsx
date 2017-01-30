import React, { Component } from 'react';
import Button from '../button';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children = 'Submit' } = this.props;
    return (
      <Button {...this.props}>{children}</Button>
    );
  }
}

SubmitButton.propTypes = {
  children: React.PropTypes.string.isRequired
};

export default SubmitButton;
