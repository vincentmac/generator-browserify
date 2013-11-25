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

BrowserifyGenerator.prototype.followUp = function followUp() {
  var cb = this.async();
  // If user is using foundation let them choose between using libsass and compass
  if (this.foundation) {

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
  } else {
    this.libsass = false;
    this.compass = false;
    cb();
  }
  
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
    this.copy('scss/_variables.scss', 'app/scss/_variables.scss');
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


