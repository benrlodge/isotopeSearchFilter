module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: { 'javascripts/isotopeSearchFilter.jquery.js': 'coffee/isotopeSearchFilter.jquery.coffee' }
      }
    },

    watch: {
      coffee: {
        files: ['coffee/isotopeSearchFilter.jquery.coffee'], tasks: 'coffee'
      }
    }

  });
  

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');  
  

  grunt.registerTask('default', ['coffee']);

};