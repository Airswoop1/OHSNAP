/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp',['ui.router', 'formApp.formController',
		'formApp.interviewCtrl','formApp.documentUploadCtrl'])

// configuring our routes
// =============================================================================
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider

			// route to show our basic form (/form)
			.state('form', {
				url: '/form',
				templateUrl: 'templates/form.html',
				controller: 'formController'
			})

			.state('form.intro', {
				url: '/intro',
				templateUrl: 'templates/form-intro.html'
			})

			.state('form.recert', {
				url: '/recert',
				templateUrl: 'templates/form-recert.html'
			})

			.state('form.name', {
				url: '/name',
				templateUrl:'templates/form-name.html'
			})

			.state('form.address', {
				url: '/address',
				templateUrl: 'templates/form-address.html'
			})

			.state('form.telephone', {
				url: '/telephone',
				templateUrl: 'templates/form-telephone.html'
			})

			.state('form.income', {
				url: '/income',
				templateUrl:'templates/form-income.html'
			})

			.state('form.household', {
				url:'/household',
				templateUrl:'templates/form-household.html'
			})

			.state('form.basic-confirmation', {
				url: '/basic-confirmation',
				templateUrl: 'templates/form-basic-confirmation.html'
			})

			.state('form.basic-app-submitted', {
				url: '/app-submitted',
				templateUrl: 'templates/basic-app-submitted.html'
			})

			.state('form.feedback-submitted', {
				url: '/feedback-submitted',
				templateUrl:'templates/form-feedback-submitted.html'
			})


			.state('form.interview-information', {
				url:'/interview-information',
				templateUrl:'templates/form-interview-information.html'
			})

			.state('int', {
				url:'/interview',
				templateUrl:'templates/interview/interview-main.html',
				controller: 'interviewCtrl'
			})

			.state('int.ssn', {
				url:'/ssn',
				templateUrl:'templates/interview/interview-ssn.html'
			})

			.state('int.dob', {
				url:'/dob',
				templateUrl:'templates/interview/interview-dob.html'
			})

			.state('int.marital_status', {
				url:'/marital_status',
				templateUrl:'templates/interview/interview-marital-status.html'
			})

			.state('int.disabled', {
				url:'/disabled_or_pregnant',
				templateUrl:'templates/interview/interview-disabled.html'
			})

			.state('int.citizen', {
				url:'/citizen',
				templateUrl:'templates/interview/interview-citizen.html'
			})

			.state('int.household', {
				url:'/household-names',
				templateUrl:'templates/interview/interview-household-names.html'
			})

			.state('int.household-applying', {
				url: '/household-applying',
				templateUrl: 'templates/interview/interview-household-applying.html'
			})

			.state('int.household-ssn', {
				url: '/household-ssn',
				templateUrl: 'templates/interview/interview-household-ssn.html'
			})

			.state('int.household-dob', {
				url: '/household-dob',
				templateUrl: 'templates/interview/interview-household-dob.html'
			})

			.state('int.household-relation', {
				url: '/household-relation',
				templateUrl: 'templates/interview/interview-household-relation.html'
			})

			.state('int.income-frequency', {
				url: '/income-frequency',
				templateUrl: 'templates/interview/interview-income-frequency.html'
			})

			.state('int.income-hours', {
				url: '/income-hours',
				templateUrl: 'templates/interview/interview-income-hours.html'
			})


		/********************* DOCUMENTS ****************************************/

			.state('upload', {
				url:'/upload',
				templateUrl:'templates/upload-main.html',
				controller: 'documentUploadCtrl'

			})

			.state('upload.documents',{
				url:'/documents',
				templateUrl:'templates/form-document-upload.html'
			})


			.state('upload.detail',{
				url:'/detail?type',
				templateUrl:'templates/form-document-detail.html'
			})


		// catch all route
		// send users to the form page
		$urlRouterProvider.otherwise('/form/intro');
	});



