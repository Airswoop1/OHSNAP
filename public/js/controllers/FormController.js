/**
 * Created by airswoop1 on 7/31/14.
 */
angular.module('formApp.formController', [
		'angularFileUpload',
		'ui.router',
		'ui.bootstrap',
		'ngCookies',
		'ngTouch',
		'NoContactModal',
		'formApp.CalcBenefitService',
		'formApp.infoFooterDirective',
		'formApp.ngEnterDirective',
		'formApp.telephoneFilter',
		'formApp.ssnFilter',
		'formApp.apiFactory',
		'formApp.appSubmittedDropdownDirective',
		'formApp.feedbackFooterDirective',
		'formApp.modalDirective',
		'formApp.documentUploadCtrl',
		'formApp.userDataFactory'
	]).controller('formController',
	function($scope, $state, $http, $rootScope, $upload, $location, $cookies, $window, API, userDataFactory, calcBenefitService) {
		$scope.formData = userDataFactory.userData.user.formData;
		// we will store all of our form data in this object
		// $scope.formData = $cookies.userData ?
		// 	JSON.parse($cookies.userData) :
		// 	userDataFactory.userData.user.formData;

		//data objects for holding input temporarily
		$scope.progress = 0;
		$scope.date = new Date();
		$scope.date_of_interview = new Date();
		$scope.date_of_interview.setDate($scope.date.getDate() + 10);
		$scope.date_of_phone_call = new Date();
		$scope.date_of_phone_call.setDate($scope.date.getDate() + 7);

		//data flags for optional fields
		$scope.basic_confirmation_agree = false;
		$scope.submitted_name = false;
		$scope.submitted_address = false;
		$scope.submitted_phone = false;
		$scope.submitted_income = false;
		$scope.submitted_household = false;
		$scope.submitted_expenses = false;
		$scope.has_phone = true;
		$scope.has_address = true;
		$scope.completed_first_name = false;
		$scope.submitted_basic_information = false;
		$scope.feedback_collapsed = true;
		$scope.disable_submit = false;
		$scope.show_progress_bar = true;
		$scope.remove_progress_bar = false;
		$scope.show_elig_progress_bar = false;
		$scope.goingThroughEligibility = false;
		$scope.submitting_app = false;
		$scope.inputOtherUtils = false;

		$scope.completed_items = {
			"name": false,
			"address": false,
			"telephone" : false,
			"income" : false,
			"household" : false,
			"expenses":false,
			"ssn":false,
			"citizenship":false,
			"school_district":false,
			"township":false,
			"lived_at_duration":false

		};

		$scope.eligibilityCompleted = {
			"household":false,
			"income":false,
			"citizenship":false,
			"expenses":false
		};

		$scope.rating_options = [
			{label:'Select', value:-1},
			{label: 'Definitely - 10', value:10},
			{label: '9', value:9},
			{label: '8', value:8},
			{label: '7', value:7},
			{label: '6', value:6},
			{label: '5', value:5},
			{label: '4', value:4},
			{label: '3', value:3},
			{label: '2', value:2},
			{label: 'Absolutely Not - 1', value:1}
		];
		$scope.selected_rating = $scope.rating_options[0];
		$scope.show_progress = !($state.current.name === 'form.intro');

		/**
		 * fn: completedName
		 * if the form is valid, increment progress, send pageview event for /form/address : go-to form.address
		 * else determine which field invalidated the submission, set flag for errors, send event for error
		 * **/
		$scope.completedName = function() {
			if($scope.snapForm.$valid && $scope.formData.name.first_name && $scope.formData.name.last_name) {
				updateProgress('name');
				$state.go('form.address');
			}
			else {
				var field_invalid = $scope.snapForm.$error.required,
					which = "";

				if(field_invalid.length == 2) {
					which = "both";
				}
				else if(field_invalid[0].$name == 'first_name') {
					which = 'first_name';
				}
				else {
					which = 'last_name';
				}

				$scope.submitted_name = true;
				$window.ga('send','event','name_validate','tap',which,1);
			}
		};


		$scope.checkboxAlert = function() {
			alert('You must check the box to certify your information is true before we can submit your application.');
		};

		/**
		 * fn completedAddress
		 * We allow the submission of blank address fields, however if any fields contain data we validate
		 * if no address or no address.street_address and address.zip, update progress, send page view : go-to form.household
		 * else if the form is valid and we have data in both, update progress, send page view : go-to form.household
		 * else if the form is valid but there is data in either street_address or zip, set flag and send event of error
		 * else theres another error on the page, figure out what it is and send it
		 * **/

		$scope.completedAddress = function(){
			$scope.submitted_address = true;

			if($scope.snapForm.street_address.$pristine && $scope.snapForm.zip.$pristine){
				updateProgress('address');
				$scope.has_address = false;
				$state.go('form.lived-at-duration');
			}
			else if($scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid
				&& $scope.formData.address.street_address && $scope.formData.address.zip){
				updateProgress('address');
				$state.go('form.lived-at-duration');
			}
			else if(($scope.snapForm.street_address.$dirty || $scope.snapForm.zip.$dirty)
				&& ($scope.formData.address.street_address === "" || (typeof $scope.formData.address.street_address === "undefined"))
				&& ($scope.formData.address.zip === null || (typeof $scope.formData.address.zip === "undefined" )
				&& $scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid)){
				updateProgress('address');
				$scope.has_address = false;
				$state.go('form.lived-at-duration');
			}
			console.log($scope.snapForm.street_address);
			console.log($scope.snapForm.zip);

		};

		$scope.completedLivedAt = function() {
			if($scope.formData.household && $scope.formData.income){
				$state.go('form.ssn');
			}
			else {
				$state.go('form.citizenship');
			}
		};


		/** *
		 * fn completedTelephone
		 *
		 * */

		$scope.completedTelephone = function(){
			$scope.submitted_phone = true;

			if($scope.snapForm.$valid) {
				$scope.submitting_app = true;
				updateProgress('telephone');
				$scope.remove_progress_bar = true;
				$scope.submitBasicApp();
				calcBenefitService.calculate($scope.formData);
			}

		};

		/**
		 * fn completedSSN
		 */

		$scope.completedSSN = function() {

			$scope.submitted_ssn = true;

			if(!$scope.formData.ssn && $scope.snapForm.ssn.$valid){
				showNoContactModal();
				submitted_ssn = false;
			}
			else if($scope.formData.ssn && $scope.snapForm.ssn.$valid){
				updateProgress('ssn');
				$state.go('form.telephone');
			}

		};

		/**
		 * fn completedIncome
		 *
		 */

		$scope.completedIncome = function () {
			$scope.submitted_income = true;

			if ($scope.snapForm.income.$valid) {
				updateProgress('income');
				$state.go('form.resources');
			}

		};

		/**
		 * fn completedHousehold
		 */

		$scope.completedHousehold = function() {
			$scope.submitted_household = true;

			if($scope.snapForm.household.$valid) {
				updateProgress('household');
				$state.go('form.income');
			}

		};

		$scope.completedResources = function() {
			$scope.submitted_resources = true;

			if($scope.snapForm.total_resources.$valid) {
				updateProgress('resources');
				$state.go('form.expenses')
			}


		}

		$scope.completedExpenses = function() {
			$scope.submitted_expenses = true;

			if($scope.snapForm.expenses.$valid){

				updateProgress('expenses');

				if(calcPotentialImmeditateBenefit()) {
					$scope.show_progress_bar = false;
					$state.go('form.quick-snap-1');
				}
				else {
					$state.go('form.ssn');
				}


			}
		};


		$scope.addToPaidUtilities = function(type) {
			if(typeof $scope.formData.utilities_paid === 'undefined') {
				$scope.formData.utilities_paid = [];
			}

			if($scope.formData.utilities_paid.indexOf(type) < 0) {
				$scope.formData.utilities_paid.push(type);
			}
			else {
				$scope.formData.utilities_paid.splice($scope.formData.utilities_paid.indexOf(type),1);
			}

		};

		$scope.goToNextQuickSnap = function(num) {
			if(num == 0){

				$state.go('form.quick-snap-eligible');

			}
			else {
				$state.go('form.quick-snap-' + num);
			}

		};

		$scope.inputOtherUtilities = function() {
			$scope.inputOtherUtils = true;
		};



		$scope.completedEligibilityIncome = function() {
			$scope.submitted_income = true;

			if ($scope.snapForm.income.$valid) {
				updateEligibilityProgress('income');
				$state.go('form.resources');
			}

			};

		$scope.completedEligibilityHousehold = function() {

			$scope.submitted_household = true;

			if($scope.snapForm.household.$valid) {
				updateEligibilityProgress('household');
				$state.go('form.income');
			}
		};

		$scope.completedEligibilityResources = function() {

			$scope.submitted_resources = true;
			if($scope.snapForm.total_resources.$valid) {
				updateEligibilityProgress('resources');
				$state.go('form.eligibility-expenses');
			}

		};

		$scope.completedCitizenship = function() {
			$scope.submitted_citizenship = true;

			if($scope.formData.citizenship){
				if($scope.formData.citizenship == 'none'){
					$state.go('form.ineligible');
				}
				else if($scope.goingThroughEligibility){
					alert(1);
					updateEligibilityProgress('citizenship');
					$state.go('form.household');
				}
				else {
					updateProgress('citizenship');
					$state.go('form.household');
				}
			}
		};

		$scope.completedNonCitizenship = function() {
			$scope.submitted_non_citizen = true;

			if($scope.formData.non_citizen){

				if($scope.goingThroughEligibility){
					updateEligibilityProgress('citizenship');
					$state.go('form.household');
				}
				else {
					updateProgress('citizenship');
					$state.go('form.household');
				}
			}

		};

		$scope.completeEligibilityCalc = function() {
			$scope.submitted_expenses = true;
			if($scope.snapForm.expenses.$valid){
				calcBenefitService.calculate($scope.formData);
				updateProgress('expenses');
				$scope.show_elig_progress_bar = false;
				$scope.show_progress_bar = true;
				$scope.remove_progress_bar = true;

				$state.go('form.eligibility')
			}
		};


		function calcPotentialImmeditateBenefit() {
			return (
				$scope.formData.total_resources <= 100 ||
				$scope.formData.income <= 150 ||
				($scope.formData.income+$scope.formData.total_resources) <= $scope.formData.expenses
				);
		}


		/**
		 * fn showNoContactModal
		 * Show modal for no address nor phone entered (HRA cannot contact the user if so)
		 *
		 */
		function showNoContactModal() {
			$scope.modalShown = true;

		}

		$scope.$on('start.application', function() {
			console.log("show progress bar being called!!");
			$scope.show_progress = true;
			$scope.goingThroughEligibility = false;
		});

		$scope.$on('start.eligibility', function() {
			$scope.show_progress = true;
			$scope.goingThroughEligibility = true;
		});


		$scope.updateCurrentAndGoToNext = function(current, next) {
			if($scope.goingThroughEligibility){
				updateEligibilityProgress(current.split('.')[1]);
			}
			else {
				updateProgress(current.split('.'[1]));
			}

			$state.go(next);
		};

		$scope.updateProgress = function(u) {
			updateProgress(u);
		};

		/**
		 * fn updateProgress
		 * @param u
		 * for a given step in the process u, update progress to reflect completed steps
		 */
		function updateProgress(u){
			$scope.completed_items[u] = true;
			$scope.progress = 0;
			for(var comp in $scope.completed_items){
				if($scope.completed_items[comp]){
					$scope.progress += 10;
				}
			}
		}

		function updateEligibilityProgress(u){
			$scope.eligibilityCompleted[u] = true;
			$scope.eligibility_progress = 0;
			for(var comp in $scope.eligibilityCompleted){
				if($scope.eligibilityCompleted[comp]){
					$scope.eligibility_progress += 20;
				}
			}
		}

		/**
		 * fn submitBasicApp
		 * Called when the user attempts to submit their app form the basic-confirmation page
		 * Submit button is only active when user checks box for app submission/approval
		 * Calls API.uploadbasicInfo which takes the entire formData object and POSTS to server
		 * On success, store user_id that's returned from server and send page view analytic for
		 * /form/app-submitted.
		 * On failure, alert with error message and re-enable submit
		 *
		 */
		$scope.submitBasicApp = function() {
			calcBenefitService.calculate($scope.formData);
			updateProgress('confirmation');

            $http.post('/upload_user_info', JSON.stringify($scope.formData)).
            	success(function(data, status) {
            		console.log(data);
                    if(status === 201) {
                    	$scope.formData.user_id = data.user_id;
						userDataFactory.userData.user.formData = $scope.formData;
						$scope.remove_progress_bar = true;
						$state.go('form.basic-app-submitted');
                    }
                }).
                error(function(data) {
                	$scope.submitting_app = false;
					alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
                });
		};

		/**
		 * fn submitFeedback
		 * Event handler for submitting feedback once app has been submitted.
		 * Requires rating is non negitive value.
		 * Alerts if no rating is selected and user tries to submit
		 * Alerts if feedback-submitted API returns failure.
		 *
		 * @param rating
		 */

		$scope.submitFeedback = function(rating) {
			$scope.formData['rating'] = rating;

			if(rating.value == '-1' ) {
				alert("You must select a rating first!");
				return;
			}

			API.uploadFeedback($scope.formData, function(result) {
				if(!result) {

					$state.go('form.feedback-submitted');

				}
				else {
					alert("Oops Looks like something went wrong. Your feedback was NOT submitted. Please wait and try again.")
				}
			});
		};


		/**
		 * fn goBack
		 * Event handler for back button on top left of page
		 */
		$scope.goBack = function() {
			$window.history.back();
		};

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
			if(fromState.name === 'form.intro') {
				$window.scrollTo(0,0);
			}

			$scope.show_progress = toState.name != 'form.intro';
			$cookies.userData = JSON.stringify($scope.formData);
		});
	});