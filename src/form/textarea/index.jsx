import React from 'react';
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
            this.props.onChange(value);
            this.props.validate(value);
          }}
        />
        {this.renderError()}
      </div>
    );
  }
}

TextArea.propTypes = {
  fieldClassName: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  rows: React.PropTypes.string,
  cols: React.PropTypes.string,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  startValidatingWhenIsPristine: React.PropTypes.bool,
  disabled: React.PropTypes.bool
};

export default TextArea;
