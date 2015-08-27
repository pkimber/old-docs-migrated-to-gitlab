module.exports = function(grunt) {
  // read package file and assign to appConfig
  var appConfig = grunt.file.readJSON('package.json');
  // define your projects and base projects resource paths
  var pathsConfig = function (appName) {
    // assign the name defined in appConfig.name if no appName is passed
    // this.app with prefix the resource paths defined below
    this.app = appName || appConfig.name;

    return {
      base: '../../app/base/base/static/',
      bootstrap: this.app + 'bootstrap/',
      css: this.app + 'project/css/',
      js: this.app + 'project/js/',
      fonts: this.app + 'project/fonts/',
      plugin: this.app + 'plugin/'
    };
  };

  // initialise grunt
  grunt.initConfig({
    // call function pathsConfig passing over the project/static path to prefix
    // assign appConfig to variable pkg for use below
    paths: pathsConfig('project/static/'),
    pkg: appConfig,

    // this will copy font files from base+plugin to local projects fonts folder
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.base %>plugin/font-awesome/fonts/',
          src: ['*.*'],
          dest: '<%= paths.fonts %>'
        }]
      }
    },

    // lint css in custom.css (add addition project css files you wish to lint)
    csslint: {
      all: [
        '<%= paths.css %>custom.css'
      ]
    },

    // lint project js files including this one
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= paths.js %>custom.js'
      ]
    },

    // concatenate source css and js files into 1 destination css/js file
    concat: {
      css: {
        src: [
          '<%= paths.bootstrap %>css/bootstrap.min.css',
          '<%= paths.base %>plugin/font-awesome/css/font-awesome.min.css',
          '<%= paths.css %>style.css',
          '<%= paths.plugin %>owl-carousel/css/owl.carousel.css',
          '<%= paths.css %>custom.css'
        ],
        dest: '<%= paths.css %>project.css'
      },
      js: {
        src: [
          '<%= paths.base %>jquery/js/jquery-1.11.2.min.js',
          '<%= paths.bootstrap %>js/bootstrap.min.js',
          '<%= paths.plugin %>owl-carousel/js/owl.carousel.min.js',
          '<%= paths.js %>custom.js'
        ],
        dest: '<%= paths.js %>project.js'
      }
    },

    // minimise the 1 concatenated css files
    cssmin: {
      css: {
        src: '<%= paths.css %>project.css',
        dest: '<%= paths.css %>project.min.css'
      }
    },

    // minimise/restructure/optimise js file
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= paths.js %>project.js',
        dest: '<%= paths.js %>project.min.js'
      }
    },

    // watch the following files for changes and run the tasks defined in tasks below
    watch: {
      all: {
        // options: { livereload: true },
        files: [
          'Gruntfile.js',
          '<%= paths.css %>custom.css',
          '<%= paths.js %>custom.js'
        ],
        tasks: [
          'copy',
          'csslint',
          'jshint',
          'concat',
          'cssmin',
          'uglify'
        ]
      }
    }
  });

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};