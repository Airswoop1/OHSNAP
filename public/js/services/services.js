/**
 * Created by airswoop1 on 7/9/14.
 */

angular.module('NoContactModal',[]).service('modalService', ['$modal',
    function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'templates/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $state, $location, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;

                    $scope.modalOptions.goToAddress = function () {
                        $modalInstance.dismiss('cancel');
                        $state.go('form.address');
                    };

                    $scope.modalOptions.goToTelephone = function () {
                        $modalInstance.dismiss('cancel');
                    };

                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);
/**
 * Created by airswoop1 on 9/23/14.
 */


angular.module('formApp.CalcBenefitService',[]).service('calcBenefitService', [
	function(){

		this.calculate = function(formData){

			var house = (formData.household !== "undefined") ? formData.household : 1;
			var income = (formData.income !== "undefined") ? parseInt(formData.income,10) : 0;

			if(formData.eligibility_expenses) {
				income -= formData.eligibility_expenses;
				income = (income >= 0) ? income : 0;
			}

			var benefit = 0;
			var eligible = false;

			if(formData.disabled === true) {

				if( (house === 1 && income <= 1915) ||
					(house === 2 && income <= 2585) ||
					(house === 3 && income <= 3255) ||
					(house === 4 && income <= 3925) )
				{
					eligible = true;
				}
				else if(house >= 5 && (income <= (((house-4)*670)+3925)) ){
					eligible = true;
				}
			}
			else {
				if( (house === 1 && income <= 1245) ||
					(house === 2 && income <= 1681) ||
					(house === 3 && income <= 2116) ||
					(house === 4 && income <= 2552) )
				{
					eligible = true;
				}
				else if(house >= 5 && (income <= (((house-4)*436)+2552)) ){
					eligible = true;
				}
			}

			if(eligible){
				if(house === 1){ benefit=189; }
				else if(house === 2){ benefit=347;}
				else if(house === 3){ benefit=497;}
				else if(house === 4){ benefit=632;}
				else if(house === 5){ benefit=750;}
				else if(house === 6){ benefit=900;}
				else if(house === 7){ benefit=995;}
				else if(house === 8){ benefit=1137}
				else if(house >= 9) {
					benefit = 1337 + (142*(house-8))
				}
			}

			formData.benefit_amount = benefit;
			return benefit;
		}


	}
]);