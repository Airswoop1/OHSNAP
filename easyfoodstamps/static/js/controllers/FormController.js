angular.module('formApp.formController', [
	'angularFileUpload',
	'ui.router',
	'ui.bootstrap',
	'ngTouch',
	'NoContactModal',
	'formApp.CalcBenefitService',
	'formApp.infoFooterDirective',
	'formApp.ngEnterDirective',
	'formApp.telephoneFilter',
	'formApp.ssnFilter',
	'formApp.appSubmittedDropdownDirective',
	'formApp.feedbackFooterDirective',
	'formApp.modalDirective',
	'formApp.documentUploadCtrl',
	'efs.userService'
])
.controller('EligibilityController', function($scope, $state, calcBenefitService, User) {
	$scope.formData = User;
	$scope.data = $scope.formData;
	$scope.progress = 0;

	$scope.goBack = function() {
		window.history.back();
	};

	$scope.completedHousehold = function() {
		if($scope.snapForm.household.$valid) {
			$scope.progress += 20;
			$state.go('^.income');
		}
	};

	$scope.completedIncome = function() {
		if ($scope.snapForm.income.$valid) {
			$scope.progress += 20;
			$state.go('^.resources');
		}
	};

	$scope.completedResources = function() {
		if($scope.snapForm.total_resources.$valid) {
			$scope.progress += 20;
			$state.go('^.expenses');
		}
	};

	$scope.updateCurrentAndGoToNext = function(current, next) {
		$scope.progress += 20;
		$state.go(next);
	}

	$scope.calculateElgibility = function() {
		if($scope.snapForm.expenses.$valid) {
			calcBenefitService.calculate($scope.formData);
			$scope.progress += 20;
			$state.go('^.eligibility')
		}
	};
})
.controller('formController', function(
		$scope, $state, $http, $rootScope, $upload, $location,
		$window, calcBenefitService, User) {

	// we will store all of our form data in this object
	$scope.formData = User;
	// $scope.formData = $cookies.userData ?
	// 	JSON.parse($cookies.userData) : User;


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

		if($scope.snapForm.address.$pristine && $scope.snapForm.zipcode.$pristine){
			updateProgress('address');
			$scope.has_address = false;
			$state.go('form.lived-at-duration');
		}
		else if($scope.snapForm.address.$valid && $scope.snapForm.zipcode.$valid
			&& $scope.formData.address.address && $scope.formData.address.zipcode){
			updateProgress('address');
			$state.go('form.lived-at-duration');
		}
		else if(($scope.snapForm.address.$dirty || $scope.snapForm.zipcode.$dirty)
			&& ($scope.formData.address.address === "" || (typeof $scope.formData.address.address === "undefined"))
			&& ($scope.formData.address.zipcode === null || (typeof $scope.formData.address.zipcode === "undefined" )
			&& $scope.snapForm.address.$valid && $scope.snapForm.zipcode.$valid)){
			updateProgress('address');
			$scope.has_address = false;
			$state.go('form.lived-at-duration');
		}
		console.log($scope.snapForm.address);
		console.log($scope.snapForm.zipcode);

	};

	$scope.completedLivedAt = function() {
		updateProgress('lived_at_duration');
		if($scope.formData.household && $scope.formData.income) {
			$state.go('form.ssn');
		}
		else {
			$state.go('form.citizenship');
		}
	};

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

	$scope.completedIncome = function () {
		$scope.submitted_income = true;

		if ($scope.snapForm.income.$valid) {
			updateProgress('income');
			$state.go('form.resources');
		}

	};

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
		$state.go(num > 0 ?
			'form.quick-snap-' + num :
			'form.quick-snap-eligible');
	};

	$scope.inputOtherUtilities = function() {
		$scope.inputOtherUtils = true;
	};

	$scope.completedCitizenship = function() {
		$scope.submitted_citizenship = true;
		if($scope.formData.citizenship){
			if($scope.formData.citizenship == 'none'){
				$state.go('form.ineligible');
			}
			else if($scope.goingThroughEligibility){
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

	function calcPotentialImmeditateBenefit() {
		return (
			$scope.formData.total_resources <= 100 ||
			$scope.formData.income <= 150 ||
			($scope.formData.income+$scope.formData.total_resources) <= $scope.formData.expenses
			);
	}

	function showNoContactModal() {
		$scope.modalShown = true;
	}

	$scope.$on('start.application', function() {
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

	function updateProgress(u){
		$scope.completed_items[u] = true;
		$scope.progress = 0;
		for(var comp in $scope.completed_items){
			if($scope.completed_items[comp]){
				$scope.progress += 10;
			}
		}
	}

	$scope.submitBasicApp = function() {
		calcBenefitService.calculate($scope.formData);
		updateProgress('confirmation');

		var user_id = $scope.formData.user_id;
		var path = user_id ? user_id + '/' : ''

		$http.post('/api/pa_snap/' + path, $scope.formData)
			.success(function(data, status, headers, config) {
				user_id = data._id.$oid;
				$scope.formData.user_id = user_id;
				$scope.remove_progress_bar = true;
				$state.go('form.basic-app-submitted');
			})
			.error(function(data, status, headers, config) {
				console.log('Error creating/updating form.', status, data, headers);
			});
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

	$scope.submitFeedback = function(rating) {
		$scope.formData['rating'] = rating;
		console.log(rating.value);
	};

	$scope.goBack = function() {
		window.history.back();
	};
});