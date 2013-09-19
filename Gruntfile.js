module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: [
        'app/app.js',
        'app/controllers/**/*.js'
      ]
    },
    concat: {
      dev: {
        src: [
          'app/app.js',
          'app/controllers/**/*.js'
        ],
        dest: 'app.js'
      }
    },
    connect: {
      server: {
        options: {
          base: '.',
          port: 3000
        }
      }
    },
    watch: {
      dev: {
        files: ['app/app.js',
          'app/controllers/**/*.js'],
        tasks: ['jshint', 'concat']
      }
    },
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angularjs-gravatar/src/md5-service.js',
            'http://cdn.firebase.com/v0/firebase.js',
            'http://cdn.firebase.com/v0/firebase-simple-login.js',
            'https://login.persona.org/include.js',
            'bower_components/angular-fire/angularFire.js',
            'app.js',
            'test/**/*.js'
          ],
          runnerPort: 9999,
          singleRun: true,
          browsers: ['PhantomJS']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('default', ['jshint','concat']);
}