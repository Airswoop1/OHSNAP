/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory']).controller('interviewCtrl',
	function($scope, $rootScope, userDataFactory, API){


		$scope.show_interview_progress=false;
		$scope.int_progress = 0;

		$scope.user = userDataFactory.userData.user.formData ? userDataFactory.userData.user.formData : {"household":1};

		$scope.interviewCompleted = userDataFactory.userData.interviewProgress;

		$scope.user.household_members = {};

		$scope.user['disabled'] = 'no';

		for(var i=0; i<$scope.user.household;i++ ){
			$scope.user.household_members[i] = {
				"applying":false,
		        "income":0
			};
		}



		$scope.stepsCompleted = {
			"int.ssn":false,
			"int.dob":false,
			"int.marital_status":false,
			"int.disabled":false,
			"int.citizen":false,
			"int.household":false,
			"int.household-applying":false,
			"int.household-ssn":false,
			"int.household-dob":false,
			"int.household-relation":false,
			"int.income-frequency":false,
			"int.income-hours":false,
			"int.income-household-amount":false,
			"int.income-household-frequency":false,
			"int.resources":false,
			"int.expenses-mortgage":false
		};


		$scope.relationshipOptions = [
			{relation:"Oartner"},
			{relation: "Child"},
			{relation:"Parent"},
			{relation:"Roommate"},
			{relation:"Other family member"}
		];

		$scope.hasHouseholdMembers = function() {
			var has_members =false;
			for(var member in $scope.user.household_members){
				has_members = has_members || $scope.user.household_members[member].name;
			}
			return has_members;
		};


		$scope.$on('int-main', function(meta, type){
			$scope.interviewCompleted[type] = true;
			$scope.show_interview_progress = false;
			API.uploadPartialInterviewInfo($scope.user, function(result){
				if(result) {

				}
				else {
					alert("Oops! Looks like something went wrong. Your information was NOT submitted. Please refill your information");
				}
			});
		});

		function updateProgress(name) {
			$scope.stepsCompleted[name] = true;
			$scope.int_progress = 0;
			for(var x in $scope.stepsCompleted) {
				if($scope.stepsCompleted[x] === true){
					$scope.int_progress += 5.6;
				}
			}
		}

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
		});

		/**
		 * Takes the number in formData.household and allows ng-repeat to create n items
		 * @param n
		 * @returns {Array}
		 */
		$scope.getNumber = function(n) {
			return new Array(n);
		};

		/**
		 * Back Button
		 * **/
		$scope.goBack = function() {
			window.history.back();
		};



	});