/**
 * Created by airswoop1 on 7/2/14.
 */
(function(angular) {

    angular.module('analytics', ['ng']).service('analytics', [
        '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
            var track = function() {
                $window.ga('send','screenview', {
                    'screenName': $location.path()
                });
                alert("Sending GA event for " + $location.path());
            };
            $rootScope.$on('$viewContentLoaded', track);
        }
    ]);

}(window.angular));