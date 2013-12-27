/**
 * scripts/app.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

module.exports = App;

function App() {
  console.log('app initialized');
};

App.prototype.beep = function() {
  console.log('boop');
};
