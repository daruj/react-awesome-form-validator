import React, { Component } from 'react';

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
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string
};

export default Wrapper;
