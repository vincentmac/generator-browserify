/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('browserify generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('browserify:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files for Foundation, Jade', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.editorconfig',
            '.gitattributes',
            '.gitignore',
            '.jshintrc',
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/jade/index.jade',
            'app/scss/app.scss',
            'app/scss/_foundation.scss',
            'app/scss/_variables.scss',
            'app/scss/components/_base.scss'

        ];

        helpers.mockPrompt(this.app, {
            'buildSystem': ['grunt'],
            'framework': ['foundation'],
            'compiler': ['libsass'],
            'foundation': true,
            'modernizr': true,
            'jade': true,
            'libsass': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

    it('creates expected files for Foundation, HTML', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.editorconfig',
            '.gitattributes',
            '.gitignore',
            '.jshintrc',
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/index.html',
            'app/scss/app.scss',
            'app/scss/_foundation.scss',
            'app/scss/_variables.scss',
            'app/scss/components/_base.scss'

        ];

        helpers.mockPrompt(this.app, {
            'buildSystem': ['grunt'],
            'framework': ['foundation'],
            'compiler': ['libsass'],
            'foundation': true,
            'modernizr': true,
            'jade': false,
            'libsass': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

    it('creates expected files for Bootstrap, Jade', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.editorconfig',
            '.gitattributes',
            '.gitignore',
            '.jshintrc',
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/jade/index.jade',
            'app/less/app.less',
            'app/less/bootstrap.less',
            'app/less/variables.less',
            'app/less/components/base.less'

        ];

        helpers.mockPrompt(this.app, {
            'buildSystem': ['grunt'],
            'framework': ['bootstrap'],
            'compiler': [''],
            'foundation': true,
            'modernizr': true,
            'jade': true,
            'libsass': false,
            'compass': false
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

    it('creates expected files for Bootstrap, HTML', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.editorconfig',
            '.gitattributes',
            '.gitignore',
            '.jshintrc',
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/index.html',
            'app/less/app.less',
            'app/less/bootstrap.less',
            'app/less/variables.less',
            'app/less/components/base.less'

        ];

        helpers.mockPrompt(this.app, {
            'buildSystem': ['grunt'],
            'framework': ['bootstrap'],
            'compiler': [''],
            'foundation': true,
            'modernizr': true,
            'jade': false,
            'libsass': false,
            'compass': false
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

    it('creates expected files for Gulp, Foundation, Jade', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            '.editorconfig',
            '.gitattributes',
            '.gitignore',
            '.jshintrc',
            'bower.json',
            'gulpfile.js',
            'package.json',
            'app/scripts/main.js',
            'app/scripts/app.js',
            'app/jade/index.jade',
            'app/scss/app.scss',
            'app/scss/_foundation.scss',
            'app/scss/_variables.scss',
            'app/scss/components/_base.scss'

        ];

        helpers.mockPrompt(this.app, {
            'buildSystem': ['gulp'],
            'framework': ['foundation'],
            'compiler': [''],
            'foundation': true,
            'modernizr': true,
            'jade': true,
            'libsass': true,
            'compass': false
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
