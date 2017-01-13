import React from 'react';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

class Input extends InputBaseComponent {
  constructor(props) {
    super(props);
  }

  changeValue(value) {
    this.props.onChange(value);
  }

  validate(value) {
    const { validate = () => true } = this.props;
    const validateInput = validate(value);
    this.setState({
      valid: validateInput.valid,
      dirty: true,
      errorMessage: validateInput.errorMessage
    });
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
      startValidatingWhenIsPristine = false
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
          className={
            classnames(
              !this.inputIsValid() ? invalidClassName : '',
              className
            )
          }
          ref={name}
          onChange={(evt) => {
            this.changeValue(evt.target.value);
            if (startValidatingWhenIsPristine) {
              this.validate(evt.target.value);
            } else {
              if (!this.isPristine()) {
                this.validate(evt.target.value);
              }
            }
          }}
          onBlur={(evt) => {
            this.changeValue(evt.target.value);
            this.validate(evt.target.value);
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
  startValidatingWhenIsPristine: React.PropTypes.bool
};

export default Input;
