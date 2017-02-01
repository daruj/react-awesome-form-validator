const getInitialState = ({ valid, value, validate, disabled = false }) => {
  // default values
  let defaults = {
    valid: !validate,
    value: '',
    dirty: false,
    errorMessage: ''
  };
  if (value) {
    if (validate) {
      // default values when the input has a value and a validate prop
      const validateObj = validate(value);
      defaults = {
        value,
        valid: validateObj.valid,
        errorMessage: validateObj.errorMessage,
        dirty: true
      };
    } else {
      // default values when the input has a value but has not a validate prop
      defaults = {
        valid: true,
        value,
        dirty: true,
        errorMessage: ''
      };
    }
  }

  return { ...defaults, defaults, resetValue: false, disabled, needToValidate: validate };
};

const getStateOnBackendErrors = (state = {}, errors = {}) => {
  const { inputs } = state;
  for (const input in errors) {
    inputs[input] = {
      ...inputs[input],
      valid: false,
      errorMessage: errors[input]
    };
  }
  return { ...state };
};

const getStateOnResetForm = (state = {}, clearValues = false) => {
  const { inputs } = state;
  for (const input in inputs) {
    const { valid, value, dirty } = inputs[input].defaults;
    inputs[input] = {
      ...inputs[input],
      resetValue: true,
      valid: clearValues ? !inputs[input].needToValidate : valid,
      dirty: clearValues ? false : dirty,
      value: clearValues ? '' : value
    };
  }
  return {
    ...state,
    forceDirty: false
  };
};

const getStateWithNewInputValues = (state = {}, newValues = {}, input) => {
  const { inputs } = state;
  if (input) {
    inputs[input] = {
      ...inputs[input],
      ...newValues
    };
  } else {
    for (const input in inputs) {
      inputs[input] = { ...inputs[input], ...newValues };
    }
  }

  return { ...state };
};

const getInputsValues = (inputs = {}) => {
  for (const input in inputs) {
    inputs[input] = inputs[input].value;
  }
  return inputs;
};

export {
  getInitialState,
  getStateOnBackendErrors,
  getStateOnResetForm,
  getStateWithNewInputValues,
  getInputsValues
};
