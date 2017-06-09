import React from 'react';
import PropTypes from 'prop-types';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';

class Input extends InputBaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fieldClassName = '',
      type = 'text',
      placeHolder = '',
      name,
      className = '',
      invalidClassName = '',
      value,
      startValidatingWhenIsPristine = false,
      disabled,
      readOnly
    } = this.props;
    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <input
          type={type}
          name={name}
          value={value}
          autoComplete='off'
          placeholder={placeHolder}
          disabled={disabled}
          readOnly={readOnly}
          className={
            classnames(
              !this.inputIsValid() ? invalidClassName : '',
              className
            )
          }
          ref={name}
          onChange={(evt) => {
            const value = evt.target.value;
            this.props.onChange(value);
            if (startValidatingWhenIsPristine) {
              this.props.validate(value);
            } else {
              if (!this.isPristine()) {
                this.props.validate(value);
              }
            }
          }}
          onBlur={(evt) => {
            const value = evt.target.value;
            this.props.onBlur(value);
            this.props.validate(value);
          }}
        />
        {this.renderError()}
      </div>
    );
  }
}

Input.propTypes = {
  fieldClassName: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  invalidClassName: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  startValidatingWhenIsPristine: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default Input;
