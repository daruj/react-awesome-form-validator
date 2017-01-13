import React, { Component } from 'react';
import styles from './styles.scss';

class ResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children = 'Reset Form',
      disabled = false,
      fieldClassName = styles.wrapperField,
      className = styles.button,
      onClick
    } = this.props;
    return (
      <div
        className={fieldClassName}
      >
        <button
          disabled={disabled}
          className={className}
          onClick={onClick}
        >{children}</button>
      </div>
    );
  }
}

ResetButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  fieldClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool
};

export default ResetButton;
