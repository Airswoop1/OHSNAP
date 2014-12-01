/**
 * Created by airswoop1 on 7/21/14.
 */
angular.module('formApp.modalDirective',[])
.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');
})
.directive('modalDialog',function(){
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below

	    transclude: true, // we want to insert custom content inside the directive

        link: function(scope, element, attrs) {
            scope.dialogStyle = {
	            width:'90%',
	            height:'100%'
            };

            scope.hideModal = function() {
                scope.show = false;
            };

            scope.goToTelephone = function() {
                scope.show = false;
                goTelephone();
            }

        },
        controller : function($state, $scope){
          goTelephone = function(){
	          $scope.$parent.updateProgress('ssn');
              $state.go('form.telephone');
          };

        },
        templateUrl: 'templates/basic/modal.html'
    };
})