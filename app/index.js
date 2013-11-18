'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BrowserifyGenerator = module.exports = function BrowserifyGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BrowserifyGenerator, yeoman.generators.Base);

BrowserifyGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'list',
    name: 'framework',
    message: 'Which front-end framework would you like to use?',
    choices: ['Foundation', 'Bootstrap'],
    filter: function(val) { return val.toLowerCase(); }
  },
  {
    type: 'confirm',
    name: 'modernizr',
    message: 'Would you like to include Modernizr?',
    default: true
  },
  // {
  //   type: 'confirm',
  //   name: 'backbone',
  //   message: 'Would you like to include Backbone, Lo-dash, and jQuery?',
  //   default: true
  // },
  {
    type: 'confirm',
    name: 'jade',
    message: 'Would you like to include Jade templating?',
    default: true
  }
  ];

  this.prompt(prompts, function (props) {
    function hasFeature(feat) { return props.framework.indexOf(feat) !== -1; }

    this.framework = props.framework;
    this.foundation = hasFeature('foundation');  // Set boolean for framework
    this.bootstrap = hasFeature('bootstrap');  // Set boolean for framework
    this.modernizr = props.modernizr;
    this.backbone = props.backbone;
    this.jade = props.jade;

    cb();
  }.bind(this));
};

BrowserifyGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BrowserifyGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

BrowserifyGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

BrowserifyGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

BrowserifyGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

BrowserifyGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

BrowserifyGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/images');
  if (this.jade) this.mkdir('app/jade');

};

BrowserifyGenerator.prototype.styles = function styles() {
  this.mkdir('app/styles');
  this.mkdir('app/styles/components');

  if (this.foundation) {
    this.mkdir('app/styles/mixins');
    this.copy('scss/app.scss', 'app/styles/app.scss');
    this.copy('scss/_foundation.scss', 'app/styles/_foundation.scss');
    this.copy('scss/_variables.scss', 'app/styles/_variables.scss');
    this.copy('scss/_base.scss', 'app/styles/components/_base.scss');
  } else if (this.bootstrap) {

  }

};

BrowserifyGenerator.prototype.tests = function tests() {
  // Generate test suite here
};


