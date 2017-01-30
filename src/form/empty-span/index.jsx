import React from 'react';

const EmptySpan = ({ children }) => {
  return (<span>{children}</span>);
};

EmptySpan.propTypes = {
  children: React.PropTypes.string.isRequired
};

export default EmptySpan;
