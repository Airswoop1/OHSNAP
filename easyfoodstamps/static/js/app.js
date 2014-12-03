/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp', [
  'ui.router',
  'formApp.formStates',
  'formApp.interviewStates',
  'formApp.documentStates',
  'efs.userService'
])
.run(function($rootScope, $location, $state, $window) {
  $rootScope.$on('$stateChangeSuccess', function(event) {
    if (!$window.ga)
      return;

    $window.ga('send', 'pageview', { page: $location.path() });
  });
})
.config(function ($provide) {
  $provide.decorator('$rootScope', function ($delegate) {
    var _emit = $delegate.$emit;

    $delegate.$emit = function () {
      console.log.apply(console, arguments);
      _emit.apply(this, arguments);
    };

    return $delegate;
  });
})
.controller('AppCtrl', function($state, $rootScope, $timeout, $window, User) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    if(fromState.name === 'home') {
      $window.scrollTo(0,0);
    }
  });
});
