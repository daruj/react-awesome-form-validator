'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptySpan = function EmptySpan(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'span',
    null,
    children
  );
};

EmptySpan.propTypes = {
  children: _react2.default.PropTypes.string.isRequired
};

exports.default = EmptySpan;
//# sourceMappingURL=index.jsx.map
