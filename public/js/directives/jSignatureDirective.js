/**
 * Created by airswoop1 on 9/2/14.
 */

//https://github.com/brinley/jSignature
//<div data-j-signature="form.signature" data-pen-color="#ff00ff" data-line-color="#00ffff" data-readonly="readonly"></div>
angular.module('formApp.jSignature',['formApp.userDataFactory']).directive('jSignature',['$timeout', 'userDataFactory',
	function ($timeout, userDataFactory) {
		return {
			restrict: 'EA',
			/*scope: {
				model: '=jSignature',
				penColor: '@',
				lineColor: '@',
				readonly: '='
			},*/
			link: function (scope, element, attrs, controller) {

				// Style undoButton
				var undoButton = function () {
					var undoButtonStyle = 'position:absolute;display:block;margin:0 !important;top:auto';

					var $undoButton = $('<button type="button" class="btn btn-xs btn-default" style="' + undoButtonStyle +
						'">Undo Last Stroke</button>').appendTo(this.$controlbarLower);

					var buttonWidth = $undoButton.width();
					$undoButton.css('left', Math.round(( this.canvas.width - buttonWidth ) / 2));
					return $undoButton;
				};

				// Create Settings Object
				var settings = {
					'UndoButton': true
				};

				// Build jSignature Element
				$(element).jSignature(settings);

				// Watch Model
				scope.$watch('model', function(newValue, oldValue) {
					if (typeof newValue !== 'undefined') {
						var value = newValue.split(',');
						if (value[1] && value[1].length > 0) {
							try {
								$(element).jSignature("setData", "data:" + newValue);
							} catch (e) {
								console.log('Nim: jSignature - Bad format while trying to setData', e);
							}
						} else {
							$(element).jSignature('reset');
						}
					}
				});



				// Bind to jSignature Event
				$(element).bind('change', function(e){
					// $timeout, 100, true because event happens outside angular's digest cycle
					// and change is called on setData
					$timeout(function () {
						// getData returns an array of [mimetype, string of jSignature's custom Base30-compressed format]
						var dataPair = $(element).jSignature("getData");
						if(attrs.id=='sig_capture1'){
							userDataFactory.userData.user.formData.sig1 = dataPair;
						}
						else{
							userDataFactory.userData.user.formData.sig2 = dataPair;
						}

						//scope.model = dataPair.join(",");
					}, 100, true);
				});

			}
		};
	}
]);