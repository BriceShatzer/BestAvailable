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

    connect: {
      build: {
        options: {
          hostname: '*',
          base: 'build'
        }
      }
    },

    copy: {
      markup:{
        expand: true, 
        src: 'src/*.html', 
        dest: 'build/', 
        flatten: true
      },
      dataSources:{
        expand: true, 
        src: 'src/*.json', 
        dest: 'build/', 
        flatten: true
      },

      assetScripts:{
        files: [
          {src: 'bower_components/angular/angular.min.js', dest: 'build/angular.min.js'},
          {src: 'bower_components/angular/angular.min.js.map', dest: 'build/angular.min.js.map'},
          {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'build/jquery.min.js'},
          {src: 'bower_components/lodash/dist/lodash.min.js', dest: 'build/lodash.min.js'},
        ]
      },
      images:{
        expand: true,
        src: 'src/images/*', 
        dest: 'build/images/',
        flatten: true
      },
      applicationLogic:{
        files: [
          {src: 'src/BestAvailable.js', dest: 'build/BestAvailable.js'}
        ]
      }
    },    

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    //     sourceMap: true
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },

    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true
      },
      build: {
        src: 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        dest: 'build/bootstrap.min.js'
      }
    },

    watch: {
      sass: {
        files: 'src/*.scss',
        tasks: 'compass',
      },
      markup: {
        files: 'src/*.html',
        tasks: 'copy:markup'
      },
      applicationLogic: {
        files: 'src/*.js',
        tasks: 'copy:applicationLogic'        
      }
    }
  
  });

  // Load task plugins.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['bower','copy','uglify','compass','connect','watch']);
};