/**
 * Created by airswoop1 on 8/29/14.
 */
angular.module('formApp.ssnFilter',[]).filter('ssn', function () {
	return function (ssn) {
		if (!ssn) { return ''; }

		var value = ssn.toString().trim();

		if(value.length == 8){
			value = '0' + value;
		}

		if(value.length == 9){
			value = value.slice(0,3) + '-' + value.slice(3,5) + '-' + value.slice(5);
		}

		return value;
	};
})
