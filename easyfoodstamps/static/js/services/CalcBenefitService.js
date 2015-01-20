/**
 * Created by airswoop1 on 9/23/14.
 */


angular.module('formApp.CalcBenefitService', [])
.service('calcBenefitService', function() {

	this.calcPotentialImmeditateBenefit = function(formData) {
		return (
			formData.total_resources <= 100 || formData.income <= 150 ||
			(formData.income + formData.total_resources) <= formData.expenses
		);
	}

	this.calculate = function(formData) {

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
			if(house === 1){ benefit=194; }
			else if(house === 2){ benefit=357;}
			else if(house === 3){ benefit=511;}
			else if(house === 4){ benefit=649;}
			else if(house === 5){ benefit=771;}
			else if(house === 6){ benefit=925;}
			else if(house === 7){ benefit=1022;}
			else if(house === 8){ benefit=1169;}
			else if(house === 9){ benefit=1315;}
			else if(house === 10){ benefit=1461;}
			else if(house >= 11) {
				benefit = 1607 + (146*(house-11))
			}
		}

		formData.benefit_amount = benefit;
		return benefit;
	}
});
