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
    name: 'buildSystem',
    message: 'Which build system would you like to use?',
    choices: ['Gulp', 'Grunt'],
    filter: function(val) { return val.toLowerCase(); }
  },
  {
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
    function hasFeature(feat, item) { return item.indexOf(feat) !== -1; }
    // console.log('props', props);
    // console.log('buildSystem', props.buildSystem);
    this.buildSystem = props.buildSystem;
    this.gulp = hasFeature('gulp', props.buildSystem);  // Set boolean for buildSystem
    this.grunt = hasFeature('grunt', props.buildSystem);  // Set boolean for buildSystem
    this.framework = props.framework;
    this.foundation = hasFeature('foundation', props.framework);  // Set boolean for framework
    this.bootstrap = hasFeature('bootstrap', props.framework);  // Set boolean for framework
    this.modernizr = props.modernizr;
    this.backbone = props.backbone;
    this.jade = props.jade;

    cb();
  }.bind(this));
};

BrowserifyGenerator.prototype.followUp = function followUp() {
  var cb = this.async();
  // If user is using foundation and grunt let them choose between using libsass and compass
  if (this.foundation && this.grunt) {

    var prompts = [{
      type: 'list',
      name: 'compiler',
      message: 'Which Sass compiler do you want to use for Foundation?',
      choices: ['Libsass', 'Compass'],
      filter: function(val) { return val.toLowerCase(); }
    }
    ];

    this.prompt(prompts, function (props) {
      function hasFeature(feat) { return props.compiler.indexOf(feat) !== -1; }

      this.compiler = props.compiler;
      this.libsass = hasFeature('libsass');  // Set boolean for compiler
      this.compass = hasFeature('compass');  // Set boolean for compiler

      cb();
    }.bind(this));
  } else if (this.bootstrap) {
    this.libsass = false;
    this.compass = false;
    cb();
  } else {
    this.libsass = true;
    this.compass = false;
    cb();
  }

};

BrowserifyGenerator.prototype.buildSystemfile = function buildSystemfile() {
  if (this.grunt) {
    this.template('Gruntfile.js');
  } else {
    this.template('gulpfile.js', 'gulpfile.js');
    this.mkdir('gulp');
    this.copy('gulp/index.js', 'gulp/index.js');
    this.copy('gulp/config.js', 'gulp/config.js');
    // this.copy('gulp/config.js', 'gulp/config.js');
    this.mkdir('gulp/util');
    this.copy('gulp/util/scriptFilter.js', 'gulp/util/scriptFilter.js');

    this.mkdir('gulp/tasks');
    this.copy('gulp/tasks/browserify.js', 'gulp/tasks/browserify.js');
    this.template('gulp/tasks/build.js', 'gulp/tasks/build.js');
    this.copy('gulp/tasks/clean.js', 'gulp/tasks/clean.js');
    this.copy('gulp/tasks/default.js', 'gulp/tasks/default.js');
    this.copy('gulp/tasks/dev.js', 'gulp/tasks/dev.js');
    if (!this.jade) this.copy('gulp/tasks/html.js', 'gulp/tasks/html.js');
    this.copy('gulp/tasks/images.js', 'gulp/tasks/images.js');
    if (this.jade) this.copy('gulp/tasks/jade.js', 'gulp/tasks/jade.js');
    this.copy('gulp/tasks/jshint.js', 'gulp/tasks/jshint.js');
    if (this.bootstrap) this.copy('gulp/tasks/less.js', 'gulp/tasks/less.js');
    if (this.libsass) this.copy('gulp/tasks/sass.js', 'gulp/tasks/sass.js');
    this.copy('gulp/tasks/serve.js', 'gulp/tasks/serve.js');
    this.template('gulp/tasks/watch.js', 'gulp/tasks/watch.js');

  }
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
  this.mkdir('dist');
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/images');
  if (this.jade) this.mkdir('app/jade');

  this.copy('main.js', 'app/scripts/main.js');
  this.copy('app.js', 'app/scripts/app.js');


};

BrowserifyGenerator.prototype.styles = function styles() {
  if (this.foundation) {
    this.mkdir('app/scss');
    this.mkdir('app/scss/components');
    this.mkdir('app/scss/mixins');
    this.copy('scss/app.scss', 'app/scss/app.scss');
    this.copy('scss/_foundation.scss', 'app/scss/_foundation.scss');
    this.copy('scss/_settings.scss', 'app/scss/_settings.scss');
    this.copy('scss/_base.scss', 'app/scss/components/_base.scss');
  } else if (this.bootstrap) {
    this.mkdir('app/less');
    this.mkdir('app/less/components');
    this.mkdir('app/less/mixins');
    this.copy('less/app.less', 'app/less/app.less');
    this.copy('less/bootstrap.less', 'app/less/bootstrap.less');
    this.copy('less/variables.less', 'app/less/variables.less');
    this.copy('less/base.less', 'app/less/components/base.less');
  }

};

BrowserifyGenerator.prototype.index = function index() {
  if (this.jade) {
    if (this.foundation) {
      this.copy('jade/foundation.jade', 'app/jade/index.jade');
    } else if (this.bootstrap) {
      this.copy('jade/bootstrap.jade', 'app/jade/index.jade');
    }
  } else {
    if (this.foundation) {
      this.copy('html/foundation.html', 'app/index.html');
    } else if (this.bootstrap) {
      this.copy('html/bootstrap.html', 'app/index.html');
    }
  }
};
