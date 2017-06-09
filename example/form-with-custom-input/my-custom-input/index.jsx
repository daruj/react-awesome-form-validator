import React from 'react';
import PropTypes from 'prop-types';
import InputBaseComponent from './inputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

class MyCustomInput extends InputBaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fieldClassName = styles.wrapperField,
      type = 'text',
      placeHolder = '',
      name,
      className = styles.input,
      invalidClassName = styles.invalidField,
      value,
      startValidatingWhenIsPristine = false,
      disabled
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

MyCustomInput.propTypes = {
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
  disabled: PropTypes.bool
};

export default MyCustomInput;
