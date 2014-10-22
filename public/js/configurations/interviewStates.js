/**
 * Created by airswoop1 on 10/21/14.
 */
angular.module('formApp.interviewStates', ['ui.router', 'formApp.userDataFactory'])
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