angular.module('formApp.formController', [
	'ui.router',
	'ui.bootstrap',
	'ngTouch',
	'NoContactModal',
	'angularFileUpload',
	'formApp.CalcBenefitService',
	'formApp.ngEnterDirective',
	'formApp.telephoneFilter',
	'formApp.ssnFilter',
	'efs.userService'
])
.factory('TransitionFactory', function($state, User) {
	return {
		sections: {},
		next: function(stateTransitions, data) {
			var state = $state.current.name.split('.')[1];
			var transition = stateTransitions[state];
			var value = User[transition.field];
			if (!value) {
				return;
			}

			var next;
			if ($.isFunction(transition.next)) {
				next = transition.next();
			} else if($.isArray(transition.next)) {
				next = value == 'yes' ? transition.next[0] : transition.next[1];
			} else {
				next = transition.next;
			}

			next && $state.go(next);

			if (next && !this.sections[state]) {
				this.sections[state] = true;
				return true;
			}

			return false;
		}
	};
})
.controller('EligibilityController', function($scope, $state, calcBenefitService, TransitionFactory, User) {
	$scope.progress = 0;
	$scope.formData = User;
	var stateTransitions = {
		'citizenship': {
			field: 'citizenship',
			next: ['^.household', '^.non-citizen']
		},
		'non-citizen': {
			field: 'non_citizen',
			next: ['^.household', '^.citizenship-false']
		},
		'household': {
			field: 'household',
			next: '^.income'
		},
		'income': {
			field: 'income',
			next: '^.resources'
		},
		'resources': {
			field: 'total_resources',
			next: '^.expenses'
		},
		'expenses': {
			field: 'expenses',
			next: function() {
				calcBenefitService.calculate(User);
				return '^.eligibility';
			}
		}
	};

	$scope.next = function() {
		if (TransitionFactory.next(stateTransitions)) {
			$scope.progress += 20;
		}
	}
})
.controller('formController', function(
		$scope, $state, $http, $rootScope, $upload, $location,
		$window, calcBenefitService, TransitionFactory, User) {

	$scope.progress = 0;
	$scope.formData = User;
	$scope.show_progress = true;

	var stateTransitions = {
		'name': {
			field: 'name',
			next: function() {
				if(!$scope.snapForm.$valid) {
					var which = "";
					var field_invalid = $scope.snapForm.$error.required;

					if(field_invalid.length == 2) {
						which = "both";
					}
					else if(field_invalid[0].$name == 'first_name') {
						which = 'first_name';
					}
					else {
						which = 'last_name';
					}
					$window.ga('send', 'event', 'name_validate', 'tap', which, 1);
				}
				return '^.address';
			}
		},
		'address': {
			field: 'address',
			next: function() {
				if (($scope.snapForm.address.$pristine || $scope.snapForm.zipcode.$pristine) ||
					(!$scope.formData.address.address && !$scope.formData.address.zipcode)) {
					$scope.has_address = false;
				}
				return '^.lived-at-duration';
			}
		},
		'lived-at-duration': {
			field: 'lived_at_duration',
			next: function() {
				return User.household && User.income ?
					'form.ssn' : 'form.citizenship';
			}
		},
		'citizenship': {
			field: 'citizenship',
			next: ['^.household', '^.non-citizen']
		},
		'non-citizen': {
			field: 'non_citizen',
			next: ['^.household', '^.citizenship-false']
		},
		'household': {
			field: 'household',
			next: '^.income'
		},
		'income': {
			field: 'income',
			next: '^.resources'
		},
		'resources': {
			field: 'total_resources',
			next: '^.expenses'
		},
		'expenses': {
			field: 'expenses',
			next: function() {
				return calcPotentialImmeditateBenefit() ?
					'form.quick-snap-1' : 'form.ssn';
			}
		},
		'ssn': {
			field: 'ssn',
			next: '^.telephone'
		},
		'telephone': {
			field: 'phone_main',
			next: function() {
				if(!$scope.snapForm.$valid) {
					return;
				}

				calcBenefitService.calculate(User);

				var user_id = User.user_id;
				var path = user_id ? user_id + '/' : ''

				$scope.submitting_app = true;
				$http.post('/api/pa_snap/' + path, User)
					.success(function(data, status, headers, config) {
						user_id = data._id.$oid;
						User.user_id = user_id;
						$state.go('form.basic-app-submitted');
					})
					.error(function(data, status, headers, config) {
						console.log('Error creating/updating form.', status, data, headers);
					});
			}
		}
	};

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

	$scope.next = function() {
		if (TransitionFactory.next(stateTransitions)) {
			$scope.progress += 10;
		}
	}

	$scope.checkboxAlert = function() {
		alert('You must check the box to certify your information is true before we can submit your application.');
	};

	$scope.addToPaidUtilities = function(type) {
		User.utilities_paid = User.utilities_paid || [];
		var utilities_paid = User.utilities_paid;

		var idx = utilities_paid.indexOf(type);
		idx < 0 ?
			User.utilities_paid.push(type) :
			User.utilities_paid.splice(idx, 1);
	};

	$scope.goToNextQuickSnap = function(num) {
		$state.go(num > 0 ?
			'form.quick-snap-' + num :
			'form.quick-snap-eligible');
	};

	$scope.inputOtherUtilities = function() {
		$scope.inputOtherUtils = true;
	};

	// move to calculate benefit service
	function calcPotentialImmeditateBenefit() {
		return (
			$scope.formData.total_resources <= 100 ||
			$scope.formData.income <= 150 ||
			($scope.formData.income+$scope.formData.total_resources) <= $scope.formData.expenses
			);
	}

	$scope.updateCurrentAndGoToNext = function(current, next) {
		$state.go(next);
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
});