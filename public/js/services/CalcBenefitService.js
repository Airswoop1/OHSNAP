/**
 * Created by airswoop1 on 9/23/14.
 */


angular.module('formApp.CalcBenefitService',[]).service('calcBenefitService', [
	function(){

		this.calculate = function(formData){

			var house = (formData.household !== "undefined") ? formData.household : 1;
			var income = (formData.income !== "undefined") ? parseInt(formData.income,10) : 0;

			if(formData.expenses) {
				income -= formData.expenses;
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