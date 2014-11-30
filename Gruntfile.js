module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngAnnotate: {
      easyfoodstamps: {
        files: {
          'public/gen/controllers.js' : [
            'public/js/controllers/DocumentUploadController.js',
            'public/js/controllers/FormController.js',
            'public/js/controllers/InterviewController.js'
          ],
          'public/gen/directives.js': [
            'public/js/directives/appSubmittedDropdownDirective.js',
            'public/js/directives/feedbackFooterDirective.js',
            'public/js/directives/infoFooterDirective.js',
            'public/js/directives/modalDirective.js',
            'public/js/directives/ngDocumentFullscreenDirective.js',
            'public/js/directives/ngEnterDirective.js',
            'public/js/directives/sampleDocumentsDirective.js',
            'public/js/directives/jSignatureDirective.js'
          ],
          'public/gen/factories.js' : [
            'public/js/factories/DocumentUploaderFactory.js',
            'public/js/factories/apiFactory.js',
            'public/js/factories/userDataFactory.js'
          ],
          'public/gen/filters.js' : [
            'public/js/filters/telephoneFilter.js',
            'public/js/filters/ssnFilter.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true
      },
      controller: {
        files: {
          'public/gen/controllers.min.js': ['public/gen/controllers.js'],
          'public/gen/directives.min.js': ['public/gen/directives.js'],
          'public/gen/factories.min.js': ['public/gen/factories.js'],
          'public/gen/filters.min.js': ['public/gen/filters.js']
        }
      }
    },
    cssmin : {
      minify : {
        expand:true,
        cwd:'public/css/',
        src:['stylesheet.css'],
        dest:'public/gen/',
        ext:'.min.css'
      }
    },
    watch: {
      scripts: {
        files: ['public/js/**/*', 'public/css/**/*'],
        tasks: ['ngAnnotate', 'uglify', 'cssmin'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default', ['ngAnnotate', 'uglify', 'cssmin']);
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
