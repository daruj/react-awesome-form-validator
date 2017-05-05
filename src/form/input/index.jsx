import React from 'react';
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
      readonly
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
          readonly={readonly}
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
  fieldClassName: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  startValidatingWhenIsPristine: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool
};

export default Input;
