// NOTE: This should only be required in gulp/test.js and karma.conf.js

// chai is installed globally by karma.
if (typeof chai === 'undefined') {
  // otherwise, require it.
  const chai = require('chai');
  if (typeof window === 'undefined') {
    global.chai = chai;
  } else {
    window.chai = chai;
  }
}

if (typeof window === 'undefined') {
  global.expect = chai.expect;
} else {
  window.expect = window.chai.expect;
}
