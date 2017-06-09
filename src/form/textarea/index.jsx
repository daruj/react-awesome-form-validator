import React from 'react';
import PropTypes from 'prop-types';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';

class TextArea extends InputBaseComponent {
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
      rows = '4',
      cols = '50',
      disabled
    } = this.props;
    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <textarea
          type={type}
          name={name}
          value={value}
          rows={rows}
          cols={cols}
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

TextArea.propTypes = {
  fieldClassName: PropTypes.string,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.string,
  cols: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  invalidClassName: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  startValidatingWhenIsPristine: PropTypes.bool,
  disabled: PropTypes.bool
};

export default TextArea;
