/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp',['ui.router', 'formApp.formController',
		'formApp.interviewStates', 'formApp.formStates', 'formApp.documentStates', 'formApp.interviewCtrl',
		'formApp.documentUploadCtrl', 'formApp.jSignature', 'formApp.userDataFactory'])

// configuring our routes
// =============================================================================


/**************** Google Analytics Send event on page tarnsition ****************/
	.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
		$rootScope
			.$on('$stateChangeSuccess',
			function(event){

				if (!$window.ga)
					return;

				$window.ga('send', 'pageview', { page: $location.path() });
			});

	}])




.config(['$provide', function ($provide) {
	$provide.decorator('$rootScope', function ($delegate) {
		var _emit = $delegate.$emit;

		$delegate.$emit = function () {
			console.log.apply(console, arguments);
			_emit.apply(this, arguments);
		};

		return $delegate;
	});
}]);