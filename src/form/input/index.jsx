import React from 'react';
import InputBaseComponent from '../InputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

class Input extends InputBaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setValidInputToUndefined();
  }

  renderError() {
    if (this.state.errorMessage && !this.isPristine() && !this.state.valid) {
      return (
        <p>
          <span>{this.state.errorMessage}</span>
        </p>
      );
    }
  }

  renderLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
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
      validate = () => true
    } = this.props;
    return (
      <div
        className={fieldClassName}
      >
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
          onKeyUp={(evt) => {
            const validateInput = validate(evt.target.value);
            this.setState({
              valid: validateInput.valid,
              dirty: true,
              errorMessage: validateInput.errorMessage
            });
          }}
          onBlur={(evt) => {
            const validateInput = validate(evt.target.value);
            this.setState({
              valid: validateInput.valid,
              dirty: true,
              errorMessage: validateInput.errorMessage
            });
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
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  setValidInputToUndefined: React.PropTypes.func
};

export default Input;
