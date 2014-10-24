module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower:{
      build: {
        options: {}
      }      
    },

    compass: {
      build: {
        options: {
          //outputStyle: 'compressed',
          noLineComments: true,
          force: true,
          sassDir: 'src',
          importPath : 'src/bower_components/bootstrap-sass-official/assets/stylesheets',
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
    }
  });

  // Load task plugins.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task(s).
  grunt.registerTask('default', ['bower','uglify','compass']);

};