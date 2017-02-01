import requireDir from 'require-dir';

require('babel-register')({
  extensions: ['.js', '.jsx']

});
require('babel-polyfill');

requireDir('./gulp', { recurse: false });
