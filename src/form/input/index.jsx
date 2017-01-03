import React from 'react';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

class Input extends InputBaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setValidInputToUndefined();
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
      invalidClassName = styles.invalidField
    } = this.props;
    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <input
          type={type}
          name={name}
          placeholder={placeHolder}
          className={
            classnames(
              !this.inputIsValid() ? invalidClassName : '',
              className
            )
          }
          ref={name}
          onKeyUp={(evt) => this.changeValue(evt.target.value)}
          onBlur={(evt) => this.changeValue(evt.target.value)}
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
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  setValidInputToUndefined: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default Input;
