/**
 * Created by airswoop1 on 7/11/14.
 */
angular.module('formApp.telephoneFilter',[]).filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country === 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
})

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
