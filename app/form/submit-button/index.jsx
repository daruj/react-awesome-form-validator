import React, { Component } from 'react';
import styles from './styles.scss';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children = 'Submit',
      fieldClassName = styles.wrapperField,
      className = styles.button,
      onClick
    } = this.props;
    return (
      <div
        className={fieldClassName}
      >
        <button
          className={className}
          onClick={onClick}
        >{children}</button>
      </div>
    );
  }
}

SubmitButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  fieldClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

export default SubmitButton;
