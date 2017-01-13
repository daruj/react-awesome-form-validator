import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import InputBaseComponent from './inputBaseComponent';

class MyCustomInput extends InputBaseComponent {

  constructor(props) {
    super(props);
  }

  changeValue(value) {
    const {
      onChange,
      validate = () => true,
      setInputValue
    } = this.props;
    const validateInput = validate(value);
    this.setState({
      valid: validateInput.valid,
      dirty: true,
      errorMessage: validateInput.errorMessage
    });
    // set value to the inputValues form
    setInputValue(value);
    // if we pass onChange as a prop then use it!
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {
      fieldClassName = styles.wrapperField,
      type = 'text',
      placeHolder = '',
      name,
      className = styles.input,
      invalidClassName = styles.invalidField,
      value
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
          onChange={(evt) => this.changeValue(evt.target.value)}
          onBlur={(evt) => this.changeValue(evt.target.value)}
        />
        {this.renderError()}
      </div>
    );
  }
}

MyCustomInput.propTypes = {
  fieldClassName: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default MyCustomInput;
