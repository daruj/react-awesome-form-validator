import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.string.isRequired
};

export default SubmitButton;
