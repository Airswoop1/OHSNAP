/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory']).controller('interviewCtrl',
	function($scope, userDataFactory){

		$scope.show_interview_progress=true;

		$scope.user = userDataFactory.userData;

		//for testing
		$scope.user.formData = {};
		$scope.user.formData.household_obj = {};
		$scope.user.formData.household = 4;

		$scope.user.formData['citizen'] = 'yes';
		$scope.user.formData['disabled'] = 'no';






		/**
		 * Takes the number in formData.household and allows ng-repeat to create n items
		 * @param n
		 * @returns {Array}
		 */
		$scope.getNumber = function(n) {
			return new Array(n);
		};





	});