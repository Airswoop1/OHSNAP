/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp',['ui.router', "ngAnimate", 'formApp.formController',
		'formApp.interviewCtrl','formApp.documentUploadCtrl', 'formApp.jSignature', 'formApp.userDataFactory'])

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


			/************************ Step 2 - INTERVIEW ****************/

			.state('int', {
				url:'/interview',
				templateUrl:'templates/interview/interview.html',
				controller: 'interviewCtrl'
			})

			.state('int.main', {
				url:'/main',
				templateUrl:'templates/interview/interview-main.html'
			})

			.state('int.ssn', {
				url:'/ssn',
				templateUrl:'templates/interview/interview-ssn.html'
			})

			.state('int.dob', {
				url:'/dob',
				templateUrl:'templates/interview/interview-dob.html'
			})

			.state('int.self-gender', {
				url:'/gender',
				templateUrl:'templates/interview/interview-self-gender.html'
			})

			.state('int.marital_status', {
				url:'/marital_status',
				templateUrl:'templates/interview/interview-marital-status.html'
			})

			.state('int.state_id', {
				url:'/state_id',
				templateUrl:'templates/interview/interview-self-state-id.html'
			})

			.state('int.school', {
				url:'/school',
				templateUrl:'templates/interview/interview-self-school.html'
			})

			.state('int.school-grade', {
				url:'/school-grade',
				templateUrl:'templates/interview/interview-self-grade.html'
			})

			.state('int.school-name', {
				url:'/school-name',
				templateUrl:'templates/interview/interview-self-school-name.html'
			})

			.state('int.school-FT', {
				url:'/school-FT',
				templateUrl:'templates/interview/interview-self-school-ft.html'
			})

			.state('int.pregnant', {
				url:'/pregnant',
				templateUrl:"templates/interview/interview-self-pregnant.html"
			})

			.state('int.pregnant-due-date', {
				url:'/pregnant-due-date',
				templateUrl:"templates/interview/interview-self-pregnant-due-date.html"
			})

			.state('int.pregnant-num-babies', {
				url:'/pregnant-num-babies',
				templateUrl:"templates/interview/interview-self-pregnant-num-babies.html"
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

			.state('int.other-state-benefits', {
				url:'/other-benefits',
				templateUrl:'templates/interview/interview-household-other-state-benefits.html'
			})

			.state('int.disqualification', {
				url:'/disqualification',
				templateUrl:'templates/interview/interview-household-disqualification.html'
			})

			.state('int.other-name-applied', {
				url:'/other-name-applied',
				templateUrl:'templates/interview/interview-household-other-name-applied.html'
			})

			.state('int.in-military', {
				url:'/in-military',
				templateUrl:'templates/interview/interview-household-in-military.html'
			})

			.state('int.in-military-family', {
				url:'/in-military-family',
				templateUrl:'templates/interview/interview-household-in-military-family.html'
			})

			.state('int.foster-care', {
				url:'/foster-care',
				templateUrl:'templates/interview/interview-household-foster-care.html'
			})

			.state('int.foster-care-end', {
				url:'/foster-care-end',
				templateUrl:'templates/interview/interview-household-foster-care-end.html'
			})

			.state('int.medical-need', {
				url:'/medical-need',
				templateUrl:'templates/interview/interview-household-medical-need.html'
			})

			.state('int.medical-lt-care', {
				url:'/medical-lt-care',
				templateUrl:'templates/interview/interview-household-medical-lt-care.html'
			})

			.state('int.medical-unpaid', {
				url:'/medical-unpaid',
				templateUrl:'templates/interview/interview-household-medical-unpaid.html'
			})

			.state('int.domestic-abuse', {
				url:'/domestic-abuse',
				templateUrl:'templates/interview/interview-household-domestic-abuse.html'
			})

			.state('int.medical-medication', {
				url:'/medical-medication',
				templateUrl:'templates/interview/interview-household-medical-medication.html'
			})

			.state('int.drug-abuse', {
				url:'/drug-abuse',
				templateUrl:'templates/interview/interview-household-drug-abuse.html'
			})


			.state('int.criminal-defendant', {
				url:'/criminal-defendant',
				templateUrl:'templates/interview/interview-household-yesnowho-template.html',
				controller: function($scope){

					$scope.title = "Does anyone have a summons or warrant to appear as a defendant at a criminal court proceeding?";
					$scope.route_name = "criminal-defendant";
					$scope.data_name = "criminal_defendant";
					$scope.to_route_name = "criminal-fines-payment";
					$scope.model_for_route = $scope.$parent.user;
					$scope.show_input = false;
				}
			})

			.state('int.criminal-fines-payment', {
				url:'/criminal-fines-payment',
				templateUrl:'templates/interview/interview-household-criminal-fines-payment.html'
			})

			.state('int.criminal-payment-plan', {
				url:'/criminal-payment-plan',
				templateUrl:'templates/interview/interview-household-criminal-payment-plan.html'
			})

			.state('int.criminal-probation', {
				url:'/criminal-probation',
				templateUrl:'templates/interview/interview-household-yesnowho-template.html',
				controller: function($scope){

					console.log("scope for parent: ",$scope.$parent);
					$scope.title = "is anyone on probation?";
					$scope.route_name = "criminal-probation";
					$scope.data_name = "criminal_probation";
					$scope.to_route_name = "welfare-fraud";
					$scope.model_for_route = $scope.$parent.user;
					$scope.show_input = false;
				}
			})


			.state('int.welfare-fraud', {
				url:'/welfare-fraud',
				templateUrl:'templates/interview/interview-household-yesnowho-template.html',
				controller: function($scope){

					$scope.title = "Has anyone been convicted of welfare fraud?";
					$scope.route_name = "welfare-fraud";
					$scope.data_name = "welfare_fraud";
					$scope.to_route_name = "law-enforcement";
					$scope.model_for_route = $scope.$parent.user;
					$scope.show_input = false;
				}
			})

			.state('int.law-enforcement', {
				url:'/law-enforcement',
				templateUrl:'templates/interview/interview-household-yesnowho-template.html',
				controller: function($scope){

					$scope.title = "Is anyone fleeing from law enforcement?";
					$scope.route_name = "law-enforcement";
					$scope.data_name = "law_enforcement";
					$scope.to_route_name = "main";
					$scope.model_for_route = $scope.$parent.user;
					$scope.show_input = false;
				}
			})

			.state('int.income-frequency', {
				url: '/income-frequency',
				templateUrl: 'templates/interview/interview-income-frequency.html'
			})

			.state('int.income-hours', {
				url: '/income-hours',
				templateUrl: 'templates/interview/interview-income-hours.html'
			})

			.state('int.income-household-amount', {
				url: '/income-household-amount',
				templateUrl: 'templates/interview/interview-income-household-amount.html'
			})

			.state('int.income-household-frequency', {
				url: '/income-household-frequency',
				templateUrl: 'templates/interview/interview-income-household-frequency.html'
			})

			.state('int.resources', {
				url: '/resources',
				templateUrl: 'templates/interview/interview-resources.html'
			})

			.state('int.expenses-mortgage', {
				url: '/expenses-mortgage',
				templateUrl: 'templates/interview/interview-expenses-mortgage.html'
			})

			.state('int.expenses-utilities', {
				url: '/expenses-utilities',
				templateUrl: 'templates/interview/interview-expenses-utilities.html'
			})

			.state('int.expenses-utilities-total', {
				url: '/expenses-utilities-total',
				templateUrl: 'templates/interview/interview-expenses-utilities-total.html'
			})

			.state('int.info-confirmation', {
				url: '/confirmation',
				templateUrl: 'templates/interview/interview-info-confirmation.html'
			})

			.state('int.info-review', {
				url:'/review',
				templateUrl: 'templates/interview/interview-review-app.html'
			})

			.state('int.info-esig-confirm', {
				url:'/confirm-esignature',
				templateUrl:'templates/interview/interview-esignature-legal.html'
			})

			.state('int.interview-preview-sign', {
				url: '/sign',
				templateUrl: 'templates/interview/interview-application-signature.html'
			})

			.state('int.app-submission', {
				url:'/submission',
				templateUrl:'templates/interview/interview-application-submission.html'
			})






		/********************* DOCUMENTS ****************************************/

			.state('upload', {
				url:'/upload',
				templateUrl:'templates/documents/upload-main.html',
				controller: 'documentUploadCtrl'

			})

			.state('upload.documents',{
				url:'/documents',
				templateUrl:'templates/documents/form-document-upload.html'
			})


			.state('upload.detail',{
				url:'/detail?type',
				templateUrl:'templates/documents/form-document-detail.html'
			})

			.state('upload.completion', {
				url:'/completion?type',
				templateUrl: 'templates/documents/form-document-completion.html'
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