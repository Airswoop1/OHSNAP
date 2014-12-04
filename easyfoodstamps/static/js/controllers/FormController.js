angular.module('formApp.formController', [
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'angularFileUpload',
  'formApp.CalcBenefitService',
  'formApp.ngEnterDirective',
  'formApp.telephoneFilter',
  'formApp.ssnFilter',
  'efs.userService'
])
.factory('TransitionFactory', function($state, User) {
  return {
    sections: {},
    next: function(stateTransitions) {
      var state = $state.current.name.split('.')[1];
      var transition = stateTransitions[state];

      var value = User[transition.field];
      if (transition.field && value === undefined) {
        return;
      }

      var next;
      if ($.isFunction(transition.next)) {
        next = transition.next();
      } else if($.isArray(transition.next)) {
        next = value == 'yes' ? transition.next[0] : transition.next[1];
      } else {
        next = transition.next;
      }

      next && $state.go(next);

      if (next && !this.sections[state]) {
        this.sections[state] = true;
        return true;
      }

      return false;
    }
  };
})
.controller('EligibilityController', function($scope, $state, calcBenefitService, TransitionFactory, User) {
  $scope.progress = 0;
  $scope.formData = User;
  var stateTransitions = {
    'citizenship': {
      field: 'citizenship',
      next: ['^.household', '^.non-citizen']
    },
    'non-citizen': {
      field: 'non_citizen',
      next: ['^.household', '^.citizenship-false']
    },
    'household': {
      field: 'household',
      next: '^.income'
    },
    'income': {
      next: '^.resources'
    },
    'resources': {
      field: 'total_resources',
      next: '^.expenses'
    },
    'expenses': {
      field: 'expenses',
      next: function() {
        calcBenefitService.calculate(User);
        return '^.eligibility';
      }
    }
  };

  $scope.next = function() {
    if (TransitionFactory.next(stateTransitions)) {
      $scope.progress += 20;
    }
  }
})
.controller('formController', function(
    $scope, $state, $http, $rootScope, $upload, $location,
    $window, calcBenefitService, TransitionFactory, User) {

  $scope.progress = 0;
  $scope.formData = User;
  $scope.show_progress = true;

  $scope.phoneInterViewDate = new Date();
  $scope.phoneInterViewDate.setDate($scope.phoneInterViewDate.getDate() + 7);

  var stateTransitions = {
    'name': {
      field: 'name',
      next: '^.address'
    },
    'address': {
      next: '^.lived-at-duration'
    },
    'lived-at-duration': {
      field: 'lived_at_duration',
      next: function() {
        return User.household && User.income ?
          'form.ssn' : 'form.citizenship';
      }
    },
    'citizenship': {
      field: 'citizenship',
      next: ['^.household', '^.non-citizen']
    },
    'non-citizen': {
      field: 'non_citizen',
      next: ['^.household', '^.citizenship-false']
    },
    'household': {
      field: 'household',
      next: '^.income'
    },
    'income': {
      field: 'income',
      next: '^.resources'
    },
    'resources': {
      field: 'total_resources',
      next: '^.expenses'
    },
    'expenses': {
      field: 'expenses',
      next: function() {
        return calcBenefitService.calcPotentialImmeditateBenefit(User) ?
          'form.quick-snap-1' : 'form.ssn';
      }
    },
    'ssn': {
      field: 'ssn',
      next: '^.telephone'
    },
    'telephone': {
      field: 'phone_main',
      next: function() {
        if(!$scope.snapForm.$valid) {
          return;
        }

        calcBenefitService.calculate(User);

        var user_id = User.user_id;
        var path = user_id ? user_id + '/' : ''

        $scope.submitting_app = true;
        $http.post('/api/pa_snap/' + path, User)
          .success(function(data, status, headers, config) {
            user_id = data._id.$oid;
            User.user_id = user_id;
            $state.go('form.basic-app-submitted');
          })
          .error(function(data, status, headers, config) {
            console.log('Error creating/updating form.', status, data, headers);
          });
      }
    }
  };

  $scope.next = function() {
    if (TransitionFactory.next(stateTransitions)) {
      $scope.progress += 10;
    }
  }

  $scope.addToPaidUtilities = function(type) {
    User.utilities_paid = User.utilities_paid || [];
    var utilities_paid = User.utilities_paid;

    var idx = utilities_paid.indexOf(type);
    idx < 0 ?
      User.utilities_paid.push(type) :
      User.utilities_paid.splice(idx, 1);
  };

  $scope.goToNextQuickSnap = function(num) {
    $state.go(num > 0 ?
      'form.quick-snap-' + num :
      'form.quick-snap-eligible');
  };
});