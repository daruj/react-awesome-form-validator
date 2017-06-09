import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children = '',
      disabled = false,
      fieldClassName = '',
      className = '',
      onClick
    } = this.props;
    return (
      <div className={fieldClassName}>
        <button
          disabled={disabled}
          className={className}
          onClick={onClick}
        >{children}</button>
      </div>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  fieldClassName: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
