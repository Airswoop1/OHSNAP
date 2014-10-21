/**
 * Created by airswoop1 on 7/31/14.
 */


angular.module('formApp.interviewConfig', ['ui.router', 'formApp.userDataFactory'])
	.config(function($stateProvider, $urlRouterProvider) {

	/************************ Step 2 - INTERVIEW ****************/
	$stateProvider

	.state('int', {
		url:'/interview',
		templateUrl:'templates/interview/interview.html',
		controller: 'interviewCtrl'
	})

		.state('int.main', {
			url:'/main',
			templateUrl:'templates/interview/interview-main.html'
		})

	/**
	 * *******************ELIGIBILITY
	 */


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

	/**
	 *  ******************** END ELIGIBILITY
	 */


	/**
	 * _********************** HOUSEHOLD
	 */

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

		.state('int.household-gender', {
			url: '/household-gender',
			templateUrl: 'templates/interview/interview-household-gender.html'
		})

		.state('int.household-state-id', {
			url:'/household-state-id',
			templateUrl: 'templates/interview/interview-household-state-id.html'
		})

		.state('int.household-marital-status',{
			url:'/household-marital-status',
			templateUrl:'templates/interview/interview-household-marital-status.html'
		})

		.state('int.household-lives-with',{
			url:'/household-lives-with',
			templateUrl:'templates/interview/interview-household-lives-with.html'
		})

		.state('int.household-in-school',{
			url:'/household-in-school',
			templateUrl:'templates/interview/interview-household-in-school.html'
		})

		.state('int.household-pregnant',{
			url:'/household-pregnant',
			templateUrl:'templates/interview/interview-household-pregnant.html'
		})

		.state('int.household-is-citizen',{
			url:'/household-is-citizen',
			templateUrl:'templates/interview/interview-household-citizenship.html'
		})

	/**      //Sex  - - int.household-gender
	 //Driver's license #  - - int.household-state-id *****
	 //marital status // int.household-marital-status
	 //Does this person live with you - - int.household-lives-with
	 //Is this person in school - - int.household-in-school
	 //is this person pregnant // int.household-pregnant
	 //is this person a us citizen or national //int.household-is-citizen
	 */

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
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone have a summons or warrant to appear as a defendant at a criminal court proceeding?";
				$scope.route_name = "criminal-defendant";
				$scope.data_name = "criminal_defendant";
				$scope.data_name_input = "criminal_defendant_input";
				$scope.to_route_name = "criminal-fines-payment";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
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
			controller: function($scope, userDataFactory){

				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone on probation or parole?";
				$scope.route_name = "criminal-probation";
				$scope.data_name = "criminal_probation";
				$scope.data_name_input = "criminal_probation_input";
				$scope.to_route_name = "welfare-fraud";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})


		.state('int.welfare-fraud', {
			url:'/welfare-fraud',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){

				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone been convicted of welfare fraud?";
				$scope.route_name = "welfare-fraud";
				$scope.data_name = "welfare_fraud";
				$scope.data_name_input = "welfare_fraud_input";
				$scope.to_route_name = "law-enforcement";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.law-enforcement', {
			url:'/law-enforcement',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone fleeing from law enforcement?";
				$scope.route_name = "law-enforcement";
				$scope.data_name = "law_enforcement";
				$scope.data_name_input = "law_enforcement_input";
				$scope.to_route_name = "main";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})
	/**
	 ******************** END HOUSEHOLD
	 */



	/**
	 ******************** INCOME
	 */
		.state('int.income', {
			url:'/income',
			'templateUrl':'templates/interview/interview-income.html',
			controller:'interviewCtrl'
		})

		.state('int.other-income-worked-90-days', {
			url:'/worked-90-days',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone worked in the last 90 days?";
				$scope.route_name = "worked-90-days";
				$scope.data_name = "worked_90_days";
				$scope.data_name_input = "worked_90_days_input";
				$scope.to_route_name = "other-income-worked-reduced-hours";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.other-income-worked-reduced-hours', {
			url:'/worked-reduced-hours',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone had work hours reduced in the last 60 days?";
				$scope.route_name = "worked-reduced-hours";
				$scope.data_name = "worked_reduced_hours";
				$scope.data_name_input = "worked_reduced_hours_input";
				$scope.to_route_name = "stopped-working";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.stopped-working', {
			url:'/stopped-working',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone stopped working at one or more jobs in the past 30 days?";
				$scope.route_name = "stopped-working";
				$scope.data_name = "stopped_working";
				$scope.data_name_input = "stopped_working_input";
				$scope.to_route_name = "on-strike";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.on-strike', {
			url:'/on-strike',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone on strike?";
				$scope.route_name = "on-strike";
				$scope.data_name = "on_strike";
				$scope.data_name_input = "on_strike_input";
				$scope.to_route_name = "on-social-security";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.on-social-security', {
			url:'/on-social-security',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone received Social Security in the past?";
				$scope.route_name = "on-social-security";
				$scope.data_name = "on_social_security";
				$scope.data_name_input = "on_social_security_input";
				$scope.to_route_name = "on-ssi";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.on-ssi', {
			url:'/on-ssi',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone received Supplemental Security Income in the past?";
				$scope.route_name = "on-ssi";
				$scope.data_name = "on_ssi";
				$scope.data_name_input = "on_ssi_input";
				$scope.to_route_name = "applied-for-workers-comp";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.applied-for-workers-comp', {
			url:'/applied-for-workers-comp',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for workers' compensation?";
				$scope.route_name = "applied-for-workers-comp";
				$scope.data_name = "applied_for_workers_comp";
				$scope.data_name_input = "applied_for_workers_comp_input";
				$scope.to_route_name = "applied-for-social-security";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.applied-for-social-security', {
			url:'/applied-for-social-security',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for social security?";
				$scope.route_name = "applied-for-social-security";
				$scope.data_name = "applied_for_social_security";
				$scope.data_name_input = "applied_for_social_security_input";
				$scope.to_route_name = "applied-for-unemployment-compensation";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.applied-for-unemployment-compensation', {
			url:'/applied-for-unemployment-compensation',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for unemployment compensation?";
				$scope.route_name = "applied-for-unemployment-compensation";
				$scope.data_name = "applied_for_unemployment_comp";
				$scope.data_name_input = "applied_for_unemployment_comp_input";
				$scope.to_route_name = "applied-for-veterans-benefits";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.applied-for-veterans-benefits', {
			url:'/applied-for-veterans-benefits',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for veterans benefits?";
				$scope.route_name = "applied-for-veterans-benefits";
				$scope.data_name = "applied_for_veterans_benefits";
				$scope.data_name_input = "applied_for_veterans_benefits_input";
				$scope.to_route_name = "applied-for-ssi";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
				console.log($scope.current_user);
			}
		})

		.state('int.applied-for-ssi', {
			url:'/applied-for-ssi',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for Supplemental Security Income (SSI)?";
				$scope.route_name = "applied-for-ssi";
				$scope.data_name = "applied_for_ssi";
				$scope.data_name_input = "applied_for_ssi_input";
				$scope.to_route_name = "daycare-for-school";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.$parent.user;
				$scope.show_input = false;
			}
		})

		.state('int.daycare-for-school', {
			url:'/daycare-for-school',
			templateUrl:'templates/interview/interview-household-pay-care-for-school.html',
			controller: 'interviewCtrl'
		})


		.state('int.cost-for-income', {
			url:'/cost-for-income',
			templateUrl:'templates/interview/interview-yesno-template.html',
			controller: function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does it cost anyone anything to get the income listed above? (Such as transportation costs, court fees, bank or guardian fees, etc.)?";
				$scope.route_name = "cost-for-income";
				$scope.data_name = "cost_for_income";
				$scope.data_name_input = "cost_for_income_input";
				$scope.to_route_name = "resources";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})


		.state('int.resources', {
			url: '/resources',
			templateUrl: 'templates/interview/interview-resources.html',
			controller: 'interviewCtrl'
		})

		.state('int.resources-expecting-money', {
			url:'/resources-expecting-money',
			templateUrl: 'templates/interview/interview-resources-expecting-money.html'
		})

		.state('int.resources-sold-stuff', {
			url:'/resources-sold-stuff',
			templateUrl:'templates/interview/interview-resources-sold-stuff.html'
		})

		.state('int.resources-own-property', {
			url:'/resources-own-property',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone own any homes or property that they don’t live in?";
				$scope.route_name = "resources-own-property";
				$scope.data_name = "resources_own_property";
				$scope.to_route_name = "resources-owned-vehicles";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;

			}
		})

		.state('int.resources-owned-vehicles', {
			url:'/resources-num-vehicles-owned',
			templateUrl:'templates/interview/interview-resources-owned-vehicles.html',
			controller:'interviewCtrl'
		})

		.state('int.resources-burial-agreement', {
			url:'/resources-burial-agreement',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone have a burial agreement with a bank or funeral home?";
				$scope.route_name = "resources-burial-agreement";
				$scope.data_name = "resources_burial_agreement";
				$scope.to_route_name = "resources-life-insurance";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.resources-life-insurance', {
			url:'/resources-life-insurance',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone have a life insurance policy?";
				$scope.route_name = "resources-life-insurance";
				$scope.data_name = "resources_life_insurance";
				$scope.to_route_name = "main";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}
		})

	/**
	 * *************** END INCOME
	 */



	/**
	 * **************** EXPENSES
	 */

		.state('int.expenses-child-support', {
			url:'/child-support-expenses',
			templateUrl:'templates/interview/interview-expenses-child-support-expenses.html',
			controller:'interviewCtrl'
		})


		.state('int.expenses-housing-assistance',{
			url:'/receive-housing-assistance',
			templateUrl:'templates/interview/interview-expenses-housing-assistance.html',
			controller:'interviewCtrl'
		})


		.state('int.monthly-expenses-rent', {
			url:'/monthly-expenses-rent',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "rent, mortgage or lot rent";
				$scope.alt_question = "Are meals included in your rent?";
				$scope.alt_question_data = 'rent_meals_included';
				$scope.route_name = 'monthly-expenses-rent';
				$scope.data_name = 'monthly_expenses_rent';
				$scope.to_route_name = 'monthly-expenses-condo';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}

		})


		.state('int.monthly-expenses-condo', {
			url:'/monthly-expenses-condo',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "condominium fees";
				$scope.route_name = 'monthly-expenses-condo';
				$scope.data_name = 'monthly_expenses_condo';
				$scope.to_route_name = 'monthly-expenses-property-insurance';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.monthly-expenses-property-insurance', {
			url:'/monthly-expenses-property-insurance',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "property insurance";
				$scope.route_name = 'monthly-expenses-property-insurance';
				$scope.data_name = 'monthly_expenses_prop_insurance';
				$scope.to_route_name = 'monthly-expenses-property-taxes';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}
		})

		.state('int.monthly-expenses-property-taxes', {
			url:'/monthly-expenses-property-taxes',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "property taxes";
				$scope.route_name = 'monthly-expenses-property-taxes';
				$scope.data_name = 'monthly_expenses_prop_taxes';
				$scope.to_route_name = 'expenses-utilities';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}

		})


		.state('int.expenses-utilities', {
			url: '/expenses-utilities',
			templateUrl: 'templates/interview/interview-expenses-utilities.html'
		})

		.state('int.expenses-medical', {
			url:'/expenses-medical',
			templateUrl:'templates/interview/interview-expenses-medical.html',
			controller:'interviewCtrl'
		})

	/**
	 * ******************* END EXPENSES
	 */


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
		});


});

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory','formApp.jSignature', 
		'formApp.CalcBenefitService']).controller('interviewCtrl',
	function($scope, $state, $rootScope, $location, $anchorScroll, $window, userDataFactory, API, calcBenefitService){
		console.log("loading interview controller!");

		$scope.show_interview_progress=false;
		$scope.int_progress = 0;
		$scope.appSubmissionInProcess = false;
		$scope.show_sig1 = false;
		$scope.show_sig2 = false;
		$scope.show_esig_info = false;
		$scope.otherStateBenefits = false;
		$scope.inputDisqualified = false;
		$scope.inputDiffName = false;
		$scope.inputFosterCare = false;
		$scope.inputFosterCareEnd = false;
		$scope.inputMedNeed = false;
		$scope.inputMedMedication = false;


		$scope.interview_progress_status = 0;
		$scope.interview_steps = -1;
		//$scope.interview_steps = 5;
		$scope.user = userDataFactory.userData.user.formData; //? userDataFactory.userData.user.formData : {"household":1};
		$scope.user.household_members = (typeof $scope.user.household_members!== 'undefined') ? $scope.user.household_members : {};
		$scope.interviewCompleted = userDataFactory.userData.interviewProgress;
		$scope.estimated_benefit = $scope.user.benefit_amount;

		console.log($scope.user);

		$scope.today = new Date();
		var	dd = $scope.today.getDate(),
			mm = $scope.today.getMonth()+1,
			yyyy = $scope.today.getFullYear();

		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
		$scope.today = mm+'/'+dd+'/'+yyyy;

		$scope.user['disabled'] = 'no';

		$scope.minutes_saved = 0;

		if(!isEmpty($scope.user.household_members)){

			for(var i=0; i<$scope.user.household-1;i++ ){
				$scope.user.household_members[i] = {
					"applying":false,
			        "income":0,
					"show":false,
					"relation":'Select'
				};
			}
		}

		$scope.stepsCompleted = {

			"int.dob":false,
			"int.self-gender":false,
			"int.marital_status":false,
			"int.state_id":false,
			"int.school":false,
			"int.pregnant":false,

			"int.household":false,
			"int.household-applying":false,
			"int.household-ssn":false,
			"int.household-dob":false,
			"int.household-relation":false,

			"int.other-state-benefits":false,

			"int.income-frequency":false,
			"int.income-hours":false,
			"int.income-household-amount":false,
			"int.income-household-frequency":false,
			"int.resources":false,

			"int.expenses-mortgage":false
		};

		var interviewMinutesCategory = {
			"eligibility":5,
			"household":10,
			"income":5,
			"expenses":5
		};

		$scope.BoolOpts = [
			{"value":true, "name":"Yes"},
			{"value":false, "name":"No"}
		];

		$scope.YNOpts = [
			{"value":"yes", "name":"yes"},
			{"value":"no", "name":"no"}
		];

		$scope.Grade = [
			{"value":"K", "name":"Kindergarden"},
			{"value":"1", "name":"1st"},
			{"value":"2" ,"name":"2nd"},
			{"value":"3" ,"name":"3rd"},
			{"value":"4" ,"name":"4th"},
			{"value":"5" ,"name":"5th"},
			{"value":"6" ,"name":"6th"},
			{"value":"7" ,"name":"7th"},
			{"value":"8" ,"name":"8th"},
			{"value":"9" ,"name":"9th"},
			{"value":"10" ,"name":"10th"},
			{"value":"11" ,"name":"11th"},
			{"value":"12" ,"name":"12th"},
			{"value":"Freshman" ,"name":"College-Freshman"},
			{"value":"Sophomore" ,"name":"College-Sophomore"},
			{"value":"Junior" ,"name":"College-Junior"},
			{"value":"Senior" ,"name":"College-Senior"},
			{"value":"Graduate" ,"name":"Graduate"}

		];

		$scope.MaritalOpts = [
			{"value":"Single", "name":"Single"},
			{"value":"Married", "name":"Married"},
			{"value":"Divorced", "name":"Divorced"},
			{"value":"Separated", "name":"Separated"},
			{"value":"Widowed", "name":"Widowed"}
		];

		$scope.relationshipOptions = [
			{name:"Select", value:"Select"},
			{name:"Partner", value:"Partner"},
			{name:"Child", "value":"Child"},
			{name:"Parent", "value":"Parent"},
			{name:"Roommate", "value":"Roommate"},
			{name:"Family", "value":"Family"}
		];


		$scope.showHouseholdMember = function(k) {
			for(var n in  $scope.user.household_members){
				if($scope.user.household_members[n].name == k){
					$scope.user.household_members[n].show = !$scope.user.household_members[n].show;
				}
			}
		};

		$scope.hasApplyingMembers = function() {
			var isApplying = false;
			for(var member in $scope.user.household_members){
				isApplying = isApplying || $scope.user.household_members[member].applying;
			}
			return isApplying;
		}

		$scope.updateMinutes = function(num) {
			$scope.minutes_saved += num;
		};

		$scope.hasHouseholdMembers = function() {
			var has_members =false;
			for(var member in $scope.user.household_members){
				has_members = has_members || $scope.user.household_members[member].name;
			}
			return has_members;
		};

		$scope.current_resource_name = "";
		$scope.current_resource_kind = "";
		$scope.current_resource_amount = 0;
		$scope.current_resource_location = "";


		$scope.addResource = function() {

			if(!$scope.user.resources){
				$scope.user.resources = [];
			}

			$scope.user.resources.push({
				'person_name': $scope.current_resource_name,
				'type' : $scope.current_resource_kind,
				'amount' : $scope.current_resource_amount,
				'location' : $scope.currentresource_location
			});

			$scope.current_resource_name = "";
			$scope.current_resource_kind = "";
			$scope.current_resource_amount = 0;
			$scope.current_resource_location = "";

		};

		$scope.current_income_name = "";
		$scope.current_income_kind = "";
		$scope.current_income_amount = 0;
		$scope.current_income_frequency = "";
		$scope.current_income_recent_date = "";

		$scope.addIncome = function() {

			if(!$scope.user.incomes){
				$scope.user.incomes = [];
			}

			console.log($scope.current_income_name);
			console.log(typeof $scope.user.incomes);
			console.log($scope.user.incomes);
			console.log("trying to push to array");
			$scope.user.incomes.push({
				'person_name': $scope.current_income_name,
				'type' : $scope.current_income_kind,
				'amount' : $scope.current_income_amount,
				'frequency' : $scope.current_income_frequency,
				'recent_date' : $scope.current_income_recent_date
			});

			console.log($scope.user.incomes);

			$scope.current_income_name = "";
			$scope.current_income_kind = "";
			$scope.current_income_amount = 0;
			$scope.current_income_frequency = "";
			$scope.current_income_recent_date = "";

		};





		$scope.$on('int-main', function(meta, type){

			if(!$scope.interviewCompleted[type]){
				$scope.updateMinutes(interviewMinutesCategory[type]);
			}

			$scope.interviewCompleted[type] = true;
			$scope.show_interview_progress = false;
			calcBenefitService.calculate($scope.user);


			API.uploadPartialInterviewInfo($scope.user, function(result){
				if(result) {

				}
				else {
					alert("Oops! Looks like something went wrong. Your information was NOT submitted. Please refill your information");
				}
			});
		});

		$scope.$on('start-last-step', function() {
			API.uploadPartialInterviewInfo($scope.user, function(result){

			})
		});

		$scope.goToSignPage = function() {
			$state.go('int.interview-preview-sign');
			$scope.show_sig1 = true;
		};


		$scope.goToSig1 = function() {
			$scope.show_sig1 = true;
			$location.hash('sig_container1');
			$anchorScroll();
			document.getElementById('image_wrapper_1').scrollLeft = 467;
		};

		$scope.goToSig2 = function() {
			$scope.show_sig2 = true;
			$location.hash('sig_container2');
			$anchorScroll();
			document.getElementById('image_wrapper_5').scrollLeft = 163;
		};

		function updateProgress(name) {
			$scope.stepsCompleted[name] = true;
			$scope.int_progress = 0;
			for(var x in $scope.stepsCompleted) {
				if($scope.stepsCompleted[x] === true){
					$scope.int_progress += 2.5;
				}
			}
		}

		function updateProgressStatus(){
			if( $scope.interviewCompleted.eligibility &&
				$scope.interviewCompleted.household &&
				$scope.interviewCompleted.income && 
				$scope.interviewCompleted.expenses){
				$scope.interview_progress_status = 2;
			} else if ( !$scope.interviewCompleted.eligibility && 
						!$scope.interviewCompleted.household && 
						!$scope.interviewCompleted.income && 
						!$scope.interviewCompleted.expenses){
				$scope.interview_progress_status = 0;
			} else {
				$scope.interview_progress_status = 1;
			}

		}


		$rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState){
			if($state.current.name == 'int.interview-preview-sign') {
				$scope.goToSig1();
				document.getElementById('topOfSignPage').style.display = 'none';
			}
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
			if(fromState.name !== 'int.main' && $scope.int_progress < 100){
				updateProgress(fromState.name);
			}
			if(fromState.name == 'int.main') {
				$scope.show_interview_progress = true;
			}
			if(toState.name == 'int.main'){
				$scope.show_interview_progress = false;
			}

			switch(toState.name) {
			    case "int.dob":
				case "int.self-gender":
				case "int.marital_status":
				case "int.state_id":
				case "int.school":
				case "int.school-grade":
				case "int.school-name":
				case "int.school-FT":
				case "int.pregnant":
				case "int.pregnant-due-date":
				case "int.pregnant-num-babies":
			    case "int.disabled":
				//case "int.citizen":
			        $scope.interview_steps = 0;
			        break;
			    case "int.household":

				case "int.other-state-benefits":
				case "int.disqualification":
				case "int.other-name-applied":
				case "int.in-military":
				case "int.in-military-family":
				case "int.foster-care":
				case "int.foster-care-end":
				case "int.medical-need":
				case "int.medical-lt-care":
				case "int.medical-unpaid":
				case "int.domestic-abuse":
				case "int.medical-medication":
				case "int.drug-abuse":
				case "int.criminal-defendant":
				case "int.criminal-fines-payment":
				case "int.criminal-payment-plan":
				case "int.criminal-probation":
				case "int.welfare-fraud":
				case "int.law-enforcement":
				/*case "int.household-applying":
			    case "int.household-ssn":
			    case "int.household-dob":
			    case "int.household-relation":*/

			        $scope.interview_steps = 1;
			        break;
				case "int.income":
				case "int.other-income-worked-90-days":
				case "int.other-income-worked-reduced-hours":
				case "int.stopped-working":
				case "int.on-strike":
				case "int.on-social-security":
				case "int.on-ssi":
				case "int.applied-for-workers-comp":
				case "int.applied-for-social-security":
				case "int.applied-for-unemployment-compensation":
				case "int.applied-for-veterans-benefits":
				case "int.applied-for-ssi":
				case "int.daycare-for-school":
				case "int.cost-for-income":
				case "int.resources":
			        $scope.interview_steps = 2;
			        break;

				case "int.expenses-child-support":
				case "int.expenses-housing-assistance":
				case "int.monthly-expenses-rent":
				case "int.monthly-expenses-condo":
				case "int.monthly-expenses-property-insurance":
				case "int.monthly-expenses-property-taxes":
				case "int.expenses-utilities":
			    case "int.expenses-medical":
			        $scope.interview_steps = 3;
			        break;

				case "int.info-confirmation":
					$scope.goToTop();
					$scope.interview_steps = 4;
					break;
				case "int.interview-preview-sign":
				case "int.info-review":
					$scope.scrollUpSignPage();
					$scope.interview_steps = 5;
					break;
				case "int.app-submission":
					$scope.interview_steps = 6;
					break;
			    case "int.main":
			        $scope.interview_steps = -1;
			        break;
			    default:
			        //$scope.interview_steps = -1;
				    $scope.interview_steps = 4;
			}
			$scope.goToTop();
			updateProgressStatus();
		});


		$scope.inputOtherStateBenefits = function() {
			$scope.otherStateBenefits = true;
		};

		$scope.inputDisqualification = function() {
			$scope.inputDisqualified = true;
		};

		$scope.inputDifferentName = function() {
			$scope.inputDiffName = true;
		};

		$scope.inputInFosterCare = function() {
			$scope.inputFosterCare = true;
		};

		$scope.inputFosterCareEndedDueToAge = function() {
			$scope.inputFosterCareEnd = true;
		};

		$scope.inputMedicalNeed = function() {
			$scope.inputMedNeed = true;
		};



		$scope.getCity = function() {
			if(typeof $scope.user.address.zip !== 'undefined'){
				API.getCityFromZip($scope.user.address.zip, function(err, data){
					if(!err){
						$scope.user.address.city = (data.results[0].address_components[1].long_name.length > 27) ? data.results[0].address_components[1].short_name : data.results[0].address_components[1].long_name;
					}
					else {
						$scope.user.address.city = " ";
					}
				})
			}
			else {
				$scope.user.address.city = " ";
			}

		};


		function removeHouseholdMembersNotApplying() {
			for(var i=0; i<$scope.user.household-1;i++ ){
				if(typeof $scope.user.household_members[i] !== 'undefined' &&

					($scope.user.household_members[i].applying == false ||
					typeof $scope.user.household_members[i].name == 'undefined')){

					$scope.user.household_members[i].relation = ' ';
				}
			}
		}


		$scope.$on('process-app-data', function(){
			removeHouseholdMembersNotApplying();
			$scope.getCity();
			$scope.calcPersonsWithIncome();
		});


		$scope.calcPersonsWithIncome = function() {
			$scope.personsWithIncome = [];

			if(typeof $scope.user.monthly_income !== 'undefined'){
				$scope.personsWithIncome.push({
					'name': $scope.user.name.first_name + " " + $scope.user.name.last_name,
					'amount' : $scope.user.monthly_income,
					'hours_per_month' : (typeof $scope.user.hours_wk === 'number' && typeof $scope.user.wk_month === 'number') ? ($scope.user.wk_month * $scope.user.hours_wk) : " "
				})
			}

			for(var p in $scope.user.household_members){
				if($scope.user.household_members.hasOwnProperty(p) &&
					$scope.user.household_members[p].applying === true &&
					typeof $scope.user.household_members[p].income === 'number'){

					$scope.personsWithIncome.push({
						'name': $scope.user.household_members[p].name,
						'amount': $scope.user.household_members[p].income,
						hours_per_month: (typeof $scope.user.household_members[p].hours_wk === 'number' && typeof $scope.user.household_members[p].wk_month === 'number') ? ($scope.user.household_members[p].wk_month * $scope.user.household_members[p].hours_wk) : " "
					})

				}
			}

			$scope.personsWithIncome = ($scope.personsWithIncome.length > 3) ? $scope.personsWithIncome.slice(0,3) : $scope.personsWithIncome;

			console.log($scope.personsWithIncome);

		};




		$scope.submitSignedApplication = function() {
			if(typeof $scope.user.sig1 !== 'undefined' && typeof $scope.user.sig2 !== 'undefined' ){
				$scope.appSubmissionInProcess = true;
				API.uploadPartialInterviewInfo($scope.user, function(result){
					if(result) {
						$state.go('int.app-submission');
					}
					else {
						$scope.appSubmissionInProcess = false;
						alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
					}
				});
			}
			else {
				alert("Note you must sign the form in both signature boxes in order to submit an application.");
			}
		};

		/**
		 * Takes the number in formData.household and allows ng-repeat to create n items
		 * @param n
		 * @returns {Array}
		 */
		$scope.getNumber = function(n) {
			return new Array(n-1);
		};

		/**
		 * Back Button
		 * **/
		$scope.goBack = function() {
			if($state.current.name === 'int.interview-preview-sign'){
				document.getElementById('topOfSignPage').style.display = 'block';
				$state.go('int.info-review');
			}
			else{
				window.history.back();
			}

		};

		$scope.goToTop = function() {
			$location.hash('topOfSignPage');
			$anchorScroll();
		};

		$scope.updateCurrentAndGoToNext = function(current, next) {
			console.log($scope.user);
			setTimeout( function() {
					updateProgress(current);
					$state.go(next);
				},200);
		};

		$scope.backToMainSign = function(index) {

			var img_container = document.getElementById('image_wrapper' + index),
				header = document.getElementById('page_header'+ index),
				pg_header = document.getElementById('sign_header'),
				tp_sign_page = document.getElementById('topOfSignPage');

			pg_header.style.display = 'block';
			tp_sign_page.style.display = 'block';

			header.style.display = 'none';

			img_container.style.display = 'none';
			img_container.style.bottom = '0';


			$location.hash('topOfSignPage');
			$anchorScroll();
		};


		$scope.expandThumbnail = function(index) {
			var img_container = document.getElementById('image_wrapper' + index),
				header = document.getElementById('page_header'+ index),
				pg_header = document.getElementById('sign_header'),
				tp_sign_page = document.getElementById('topOfSignPage');

			pg_header.style.display = 'none';
			tp_sign_page.style.display = 'none';

			header.style.display = 'block';
			header.style.position = 'absolute';
			header.style.top = '0';
			header.style.left = '0';

			img_container.style.display = 'block';
			img_container.style.position = 'absolute';
			img_container.style.top = '50px';
			img_container.style.left = '0';

			$location.hash('page_header' + index);
			$anchorScroll();
		};

		$scope.scrollDown = function() {
			$location.hash('confirm_anchor');
			$anchorScroll();
		};

		$scope.scrollUpSignPage = function() {
			$location.hash('sign_header');
			$anchorScroll();
		};

		function isEmpty(object) {

			for(var i in object) {
				if(object.hasOwnProperty(i)){
					return true;
				}
			}
			return false;
		}


	});