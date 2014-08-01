/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory']).controller('interviewCtrl',
	function($scope, userDataFactory){

		$scope.show_interview_progress=true;

		$scope.user = userDataFactory.userData;

		//for testing
		$scope.user.formData = {};
		$scope.user.formData.household = 4;
		$scope.user.formData.household_obj = {};
		$scope.user.formData.household_obj = {"0":{"name":"Kevin Miller"},"1":{"name":"Jamie Miller"},"2":{"name":"Tiernan Kiefer"},"3":{"name":"Brianna Miller"}};
		/*for(var i=0; i<$scope.user.formData.household;i++ ){
			$scope.user.formData.household_obj[i] = {
				"applying":false
			};
		}*/

		//$scope.user.formData.household_obj = {"0":{"name":"Kevin Miller"},"1":{"name":"Jamie Miller"},"2":{"name":"Tiernan Kiefer"},"3":{"name":"Brianna Miller"}};


		$scope.user.formData['citizen'] = 'yes';
		$scope.user.formData['disabled'] = 'no';




		$scope.relationshipOptions = [
			{name:"partner"},
			{name: "child"},
			{name:"parent"},
			{name:"roommate"},
			{name:"other family member"}
		];



		/**
		 * Takes the number in formData.household and allows ng-repeat to create n items
		 * @param n
		 * @returns {Array}
		 */
		$scope.getNumber = function(n) {
			return new Array(n);
		};





	});