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
		},
		template : {
			'index_for_prod': {
				'options': {
					'data': {
						'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js',
						'angular_ui_router': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js',
						'angular_animate': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.min.js',
						'angular_touch':'//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-touch.min.js',
						'jquery_1_11_1': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'
					},
					'delimiters': 'handlebars-like-delimiters'
				},
				'files': {
					'public/index.html': ['public/src/index.html.tpl']
				}
			},
			'index_for_dev':{
				'options': {
					'data': {
						'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js',
						'angular_ui_router': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.js',
						'angular_animate': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.js',
						'angular_touch':'//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-touch.js',
						'jquery_1_11_1': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js'
					},
					'delimiters': 'handlebars-like-delimiters'
				},
				'files': {
					'public/index.html': ['public/src/index.html.tpl']
				}
			}

		},
		env : {
			options : {
				//Shared Options Hash
			},
			sandbox : {
				NODE_ENV : 'sandbox'
				//DEST     : 'temp'
			},
			prod : {
				NODE_ENV : 'prod'
				//DEST     : 'dist',
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-env');

	// Default task(s).
	//grunt.registerTask('default', ['ngAnnotate', 'uglify', 'cssmin']);
	grunt.registerTask('dev', ['ngAnnotate', 'uglify', 'cssmin', 'template:index_for_dev']);
	grunt.registerTask('prod', ['ngAnnotate', 'uglify', 'cssmin', 'template:index_for_prod']);

	// A very basic default task.
	grunt.registerTask('logging', 'Log some stuff.', function() {
		grunt.log.write('Logging some stuff...WOO!').ok();
	});

};