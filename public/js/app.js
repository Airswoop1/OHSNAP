/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp',['ui.router', "ngAnimate", 'formApp.formController', 'formApp.documentUploadConfig',
		'formApp.interviewConfig','formApp.interviewCtrl','formApp.documentUploadCtrl', 'formApp.jSignature', 'formApp.userDataFactory'])

// configuring our routes
// =============================================================================
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider

			/************Step 1 - Initial Questions ****************/

			// route to show our basic form (/form)
			.state('form', {
				url: '/form',
				templateUrl: 'templates/basic/form.html',
				controller: 'formController'
			})

			.state('form.intro', {
				url: '/intro',
				templateUrl: 'templates/basic/form-intro.html'
			})

			.state('form.recert', {
				url: '/recert',
				templateUrl: 'templates/basic/form-recert.html'
			})

			.state('form.name', {
				url: '/name',
				templateUrl:'templates/basic/form-name.html'
			})

			.state('form.address', {
				url: '/address',
				templateUrl: 'templates/basic/form-address.html'
			})

			.state('form.telephone', {
				url: '/telephone',
				templateUrl: 'templates/basic/form-telephone.html'
			})

			.state('form.income', {
				url: '/income',
				templateUrl:'templates/basic/form-income.html'
			})

			.state('form.household', {
				url:'/household',
				templateUrl:'templates/basic/form-household.html'
			})

			.state('form.eligibility-expenses', {
				url:'/eligibility-expenses',
				templateUrl:'templates/basic/form-eligible-expenses.html'
			})

			.state('form.expenses', {
				url:'/expenses',
				templateUrl:'templates/basic/form-expenses.html'
			})

			.state('form.ssn', {
				url:'/ssn',
				templateUrl:'templates/basic/form-ssn.html'
			})

			.state('form.citizenship', {
				url:'/citizenship',
				templateUrl:'templates/basic/form-citizenship.html'
			})

			.state('form.ineligible', {
				url:'/ineligible',
				templateUrl:'templates/basic/form-ineligible.html'
			})

			.state('form.eligibility', {
				url:'/elibility',
				templateUrl:'templates/basic/form-eligibility.html'
			})

			.state('form.resources', {
				url:'/resources',
				templateUrl:'templates/basic/form-resources.html'
			})

			.state('form.lived-at-duration', {
				url:'/livedAt',
				templateUrl:'templates/basic/form-housing-duration.html'
			})

			.state('form.quick-snap-1', {
				url: '/quickSnap1',
				templateUrl: 'templates/basic/form-quick-snap-1.html'
			})

			.state('form.quick-snap-2', {
				url: '/quickSnap2',
				templateUrl: 'templates/basic/form-quick-snap-2.html'
			})

			.state('form.quick-snap-3', {
				url: '/quickSnap3',
				templateUrl: 'templates/basic/form-quick-snap-3.html'
			})

			.state('form.quick-snap-4', {
				url: '/quickSnap4',
				templateUrl: 'templates/basic/form-quick-snap-4.html'
			})

			.state('form.quick-snap-5', {
				url: '/quickSnap5',
				templateUrl: 'templates/basic/form-quick-snap-5.html'
			})

			.state('form.quick-snap-6', {
				url: '/quickSnap6',
				templateUrl: 'templates/basic/form-quick-snap-6.html'
			})

			.state('form.quick-snap-eligible', {
				url: '/quickSnapEligible',
				templateUrl: 'templates/basic/form-quick-snap-eligible.html'
			})

			.state('form.basic-confirmation', {
				url: '/basic-confirmation',
				templateUrl: 'templates/basic/form-basic-confirmation.html'
			})

			.state('form.basic-app-submitted', {
				url: '/app-submitted',
				templateUrl: 'templates/basic/basic-app-submitted.html'
			})

			.state('form.feedback-submitted', {
				url: '/feedback-submitted',
				templateUrl:'templates/basic/form-feedback-submitted.html'
			})

			.state('form.redirect_page', {
				url: '/redirect',
				templateUrl:'templates/basic/form-redirect.html'
			})

			.state('form.non-citizen', {
				url:'/non-us-citizen',
				templateUrl:'templates/basic/form-non-citizen.html'
			})

			.state('form.citizenship-false', {
				url:'/citizenship-false',
				templateUrl:'templates/basic/form-illegal-citizen.html'
			})

			.state('error', {
				url:'/error',
				templateUrl:'templates/basic/form-transition.html'

			})



		// catch all route
		// send users to the form page

		$urlRouterProvider.otherwise('/form/intro');
	})

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