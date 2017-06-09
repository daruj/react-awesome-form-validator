import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      className
    } = this.props;
    return (
      <div className={className}>{children}</div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Wrapper;
