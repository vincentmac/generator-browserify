// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist',
      vendor: '<%%= bowerrc.directory %>'
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },<% if (foundation) { %>
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else if (bootstrap) { %>
      less: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less:server', 'autoprefixer']
      },<% } %>
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% if (jade) { %>
      jade: {
        files: ['<%%= yeoman.app %>/**/*.jade'],
        options: {
          // nospawn: false
        },
        tasks: ['jade:dev']
      },
      browserify: {
        files: ['<%%= yeoman.app %>/scripts/**/*.{js,jade}', 'test/{,*/}*.js'],
        tasks: ['browserify:dev', 'concat:dev']
      },<% } else { %>
      browserify: {
        files: ['<%%= yeoman.app %>/scripts/**/*.js', 'test/{,*/}*.js'],
        tasks: ['browserify:dev', 'concat:dev']
      },<% } %>
      mocha: {
        files: ['test/{,*/}*.js'],
        tasks: ['browserify:test', 'mocha']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35731,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>',
          livereload: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
        }
      }
    },<% if (foundation) { %>
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.vendor %>',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>
    browserify: {
      vendor: {
        src: [
          '<%%= yeoman.vendor %>/jquery/jquery.js',
          '<%%= yeoman.vendor %>/lodash/dist/lodash.js',
          '<%%= yeoman.vendor %>/backbone/backbone.js'
        ],
        dest: '.tmp/scripts/vendor.js',
        options: {
          debug: true,
          shim: {
            jquery: {
              path: '<%%= yeoman.vendor %>/jquery/jquery.js',
              exports: '$'
            },
            lodash: {
              path: '<%%= yeoman.vendor %>/lodash/dist/lodash.js',
              exports: '_'
            },
            backbone: {
              path: '<%%= yeoman.vendor %>/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                jquery: '$',
                lodash: '_'
              }
            }
          },
          alias: [
            '<%%= yeoman.vendor %>/lodash/dist/lodash.js:underscore',
            '<%%= yeoman.vendor %>/backbone/backbone.js:backbone'
          ],
          transform: ['debowerify']
        }
      },
      dev: {
        src: ['<%%= yeoman.app %>/scripts/main.js'],
        dest: '.tmp/scripts/main.js',
        options: {
          debug: true,
          external: ['jquery', 'lodash', 'backbone']<% if (jade) { %>,
          transform: ['browserify-jade']<% } %>
        }
      },
      test: {
        src: ['test/{,*/}*.js'],
        dest: '.tmp/test/test.js',
        options: {
          debug: true,
          external: ['jquery', 'lodash', 'backbone']<% if (jade) { %>,
          transform: ['browserify-jade']<% } %>
          // ignore: ['test/lib/*.js', 'test/spec/*.js']
        }
      }
    },
    <% if (jade) { %>
    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: {
          '.tmp/index.html': '<%%= yeoman.app %>/jade/index.jade'
        }
      },
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          '<%%= yeoman.app %>/index.html': '<%%= yeoman.app %>/index.jade'
        }
      }
    },<% } %>
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    concat: {
      options: {
        banner: '/*!\n * <%%= pkg.name %>-<%%= pkg.version %>\n * <%%= pkg.author %>\n * <%%= grunt.template.today("yyyy-mm-dd") %>\n */\n\n'
      },
      dev: {
        src: ['.tmp/scripts/vendor.js', '.tmp/scripts/main.js'],
        dest: '.tmp/scripts/app.js'
      },
      dist: {
        src: ['.tmp/scripts/vendor.js', '.tmp/scripts/main.js'],
        dest: '.tmp/scripts/app.js'
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
      dist: {}
    },*/
    'bower-install': {
      app: {
        html: '<%%= yeoman.app %>/index.html',
        ignorePath: '<%%= yeoman.app %>/'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // This task is pre-configured if you do not wish to use Usemin
      // blocks for your CSS. By default, the Usemin block from your
      // `index.html` will take care of minification, e.g.
      //
      //     <!-- build:css({.tmp,app}) styles/main.css -->
      //
      // dist: {
      //     files: {
      //         '<%= yeoman.dist %>/styles/main.css': [
      //             '.tmp/styles/{,*/}*.css',
      //             '<%= yeoman.app %>/styles/{,*/}*.css'
      //         ]
      //     }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            'styles/fonts/{,*/}*.*' <% if (bootstrap) { %> ,
            'bower_components/sass-bootstrap/fonts/*.*' <% } %>
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    <% if (modernizr) { %>
    modernizr: {
      devFile: '<%%= yeoman.vendor %>/modernizr/modernizr.js',
      outputFile: '<%%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%%= yeoman.dist %>/styles/{,*/}*.css',
        '!<%%= yeoman.dist %>/scripts/vendor/*'
      ],
      uglify: true
    }, <% } %>
    concurrent: {
      server: [<% if (foundation) { %>
        'compass:server',<% } %>
        'browserify:dev',
        'browserify:vendor',<% if (jade) { %>
        'jade:dev',<% } %>
        'copy:styles'
      ],
      test: [
        'copy:styles',
        'jshint',
        'browserify:vendor',
        'browserify:dev',
        'browserify:test'
      ],
      dist: [<% if (foundation) { %>
        'compass',<% } %>
        'browserify',<% if (jade) { %>
        'jade',<% } %>
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:dev',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'mocha',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',<% if (modernizr) { %>
    'modernizr',<% } %>
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
