module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower:{
      build: {
        options: {
          targetDir:'bower_components',
        }
      }      
    },

    compass: {
      build: {
        options: {
          //outputStyle: 'compressed',
          noLineComments: true,
          force: true,
          sassDir: 'src',
          importPath : 'bower_components/bootstrap-sass-official/assets/stylesheets',
          cssDir: 'build/css'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, src: 'src/*.html', dest: 'build/', flatten: true},
          {src: 'bower_components/angular/angular.min.js', dest: 'build/angular.min.js'},
          {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'build/jquery.min.js'}
        ]
      }
    }
  });

  // Load task plugins.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Default task(s).
  grunt.registerTask('default', ['bower','uglify','compass','copy']);
};