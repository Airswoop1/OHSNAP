module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		ngAnnotate: {
			easyfoodstamps: {
				files: {
					'public/js/Controllers/controller.js' :
						[
							'public/js/Controllers/DocumentUploadController.js',
							'public/js/Controllers/FormController.js',
							'public/js/Controllers/InterviewController.js'
						],
					'public/js/directives/directives.js':
						[
							'public/js/directives/appSubmittedDropdownDirective.js',
							'public/js/directives/feedbackFooterDirective.js',
							'public/js/directives/infoFooterDirective.js',
							'public/js/directives/modalDirective.js',
							'public/js/directives/ngDocumentFullscreenDirective.js',
							'public/js/directives/ngEnterDirective.js',
							'public/js/directives/sampleDocumentsDirective.js'
						],
					'public/js/factories/factories.js' :
						[
							'public/js/factories/DocumentUploaderFactory.js',
							'public/js/factories/apiFactory.js',
							'public/js/factories/userDataFactory.js'
						]

				}
			}
		},
		uglify: {
			options: {
				mangle: false,
				compress:true
			},
			controller: {
				files: {
					'public/js/Controllers/controller.min.js': ['public/js/Controllers/controller.js'],
					'public/js/directives/directives.min.js':['public/js/directives/directives.js'],
					'public/js/factories/factories.min.js':['public/js/factories/factories.js']
				}
			}
		},
		cssmin : {
			minify : {
				expand:true,
				cwd:'public/css/',
				src:['stylesheet.css'],
				dest:'public/css/',
				ext:'.min.css'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ng-annotate');

	// Default task(s).
	grunt.registerTask('default', ['ngAnnotate', 'uglify', 'cssmin']);

	// A very basic default task.
	grunt.registerTask('logging', 'Log some stuff.', function() {
		grunt.log.write('Logging some stuff...WOO!').ok();
	});

};