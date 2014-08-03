/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory']).controller('interviewCtrl',
	function($scope, $rootScope, userDataFactory, API){
		console.log(userDataFactory.userData.user.formData);
		$scope.show_interview_progress=true;
		$scope.int_progress = 0;

		$scope.user = userDataFactory.userData.user.formData;

		//for testing
//		$scope.user.formData = {};
//		$scope.user.formData.household = 4;
		$scope.user.household_members = {};
		/*$scope.user.formData.household_members = {
			"0":{"name":"Kevin Miller", "income":0},
			"1":{"name":"Jamie Miller", "income":0},
			"2":{"name":"Tiernan Kiefer", "income":0},
			"3":{"name":"Brianna Miller", "income":0}};*/



		for(var i=0; i<$scope.user.household;i++ ){
			$scope.user.household_members[i] = {
				"applying":false,
		        "income":0
			};
		}


		$scope.user['citizen'] = 'yes';
		$scope.user['disabled'] = 'no';

		$scope.interviewCompleted = {
			"eligibility":false,
			"household":false,
			"income":false,
			"expenses":false
		};

		$scope.relationshipOptions = [
			{relation:"partner"},
			{relation: "child"},
			{relation:"parent"},
			{relation:"roommate"},
			{relation:"other family member"}
		];


		$scope.$on('int-main', function(meta, type){
			$scope.interviewCompleted[type] = true;
			API.uploadPartialInterviewInfo($scope.user, function(result){
				if(result) {
					userDataFactory.userData.user.formData = $scope.user;
				}
				else {
					alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
				}
			});
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
			if(fromState.name !== 'int.main' && $scope.int_progress < 100){
				$scope.int_progress += 5.6;
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

		$scope.goBack = function() {
			window.history.back();
		};



	});