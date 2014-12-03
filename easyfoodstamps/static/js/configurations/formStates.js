/**
 * Created by airswoop1 on 10/21/14.
 */
angular.module('formApp.formStates', ['formApp.formController'])
.config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
	$interpolateProvider.startSymbol('((');
  	$interpolateProvider.endSymbol('))');
  	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: //'homeController'
			function() {}
		})

		.state('eligibility', {
			url: '/eligibility',
			templateUrl: 'templates/basic/eligibility.html',
			controller: 'EligibilityController',
			abstract: true
		})

		.state('eligibility.citizenship', {
			url:'/citizenship',
			templateUrl:'templates/basic/form-citizenship.html'
		})

		.state('eligibility.household', {
			url:'/household',
			templateUrl:'templates/basic/form-household.html'
		})

		.state('eligibility.income', {
			url: '/income',
			templateUrl:'templates/basic/form-income.html'
		})

		.state('eligibility.resources', {
			url:'/resources',
			templateUrl:'templates/basic/form-resources.html'
		})

		.state('eligibility.expenses', {
			url:'/expenses',
			templateUrl:'templates/basic/form-eligible-expenses.html'
		})

		.state('eligibility.ineligible', {
			url:'/ineligible',
			templateUrl:'templates/basic/form-ineligible.html'
		})

		.state('eligibility.eligibility', {
			url:'/eligible',
			templateUrl:'templates/basic/form-eligibility.html'
		})

		.state('form', {
			url: '/form',
			templateUrl: 'templates/basic/form.html',
			controller: 'formController',
			abstract: true
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
})