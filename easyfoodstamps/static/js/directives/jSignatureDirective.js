angular.module('formApp.jSignature', [])
.directive('jSignature', function () {
  return {
    restrict: 'EA',
    scope: {
      model: '='
    },
    link: function (scope, element, attrs, controller) {
      var locked = false;
      $(element).jSignature({UndoButton: true});
      scope.$watch('model', function(newValue, oldValue) {
        if (newValue && newValue.data) {
          locked = true;
          var value = newValue.data.split(',');
          if (value[1] && value[1].length > 0) {
            try {
              $(element).jSignature('setData', newValue.data);
            } catch(e) {
              console.log('Nim: jSignature - Bad format while trying to setData', e);
            }
          } else {
            $(element).jSignature('reset');
          }
          locked = false;
        }
      });

      $(element).bind('change', function(e) {
        if (!locked) {
          scope.model.data = $(element).jSignature('getData');
          scope.$apply();
        }
      });
    }
  };
});
