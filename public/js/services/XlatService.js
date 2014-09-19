/**
 * Created by airswoop1 on 9/19/14.
 */

angular.module('formApp.xlat', []).factory('xlatService', function() {

	var currentLanguage = 'es';

	var tables = $.extend(true, {}, initialXlatTables);

	return {

		setCurrentLanguage: function(newCurrentLanguage) {
			currentLanguage = newCurrentLanguage;
		},

		getCurrentLanguage: function() {
			return currentLanguage;
		},

		xlat: function(label, parameters) {
			return tables[label][currentLanguage];
		}
	};
})


.filter('xlat', ['xlatService', function(xlatService) {
	return function(label) {
		return xlatService.xlat(label);
	};

}]);

BuildTranslateMap = function(data) {
	initialXlatTables = data;
};
