/**
 * Created by airswoop1 on 7/20/14.
 */
angular.module('formApp.appSubmittedDropdownDirective',[]).directive('appSubmittedDropdown', function(){
    return {
        restrict:'E',
        templateUrl:'templates/basic/app-submitted-dropdowns.html',
        controller: ["$scope", "$window", function($scope, $window) {

            $scope.isActive = {
                when:false,
                how:false,
                what:false
            };

            $scope.click = function(name) {

                if(!$scope.isActive[name]) {
                    for(var i in $scope.isActive) {
                        $scope.isActive[i] = false;
                    }
                    $scope.isActive[name]=true;

                }
                else if($scope.isActive[name]) {
                    $scope.isActive[name]=false;
                }
                $window.ga('send','event','app-submitted', 'tap', name, 1);


            };



        }]
    }
});
/**
 * Created by airswoop1 on 7/21/14.
 */
angular.module('formApp.feedbackFooterDirective',[]).directive('feedbackFooter', function(){
    return {
        restrict:'E',
        templateUrl:'templates/basic/feedback-footer.html',
        controller: ["$scope", "$window", function($scope, $window) {

            $scope.isActive = {
                about:false,
                faqs:false,
                contact:false
            };

            $scope.click = function(name) {

                if(!$scope.isActive[name]) {
                    for(var i in $scope.isActive) {
                        $scope.isActive[i] = false;
                    }
                    $scope.isActive[name]=true;

                }
                else if($scope.isActive[name]) {
                    $scope.isActive[name]=false;
                }
                $window.ga('send','event','footer', 'tap', name, 1);


            };

            $scope.external = function(name) {
                $window.ga('send','event','external', 'tap', name, 1);
            }

        }]
    }
});
/**
 * Created by airswoop1 on 7/11/14.
 */
angular.module('formApp.infoFooterDirective',[]).directive('infoFooter', function(){
    return {
        restrict:'E',
        templateUrl:'templates/basic/info-footer.html',
        controller: ["$scope", "$window", function($scope, $window) {

            $scope.isActive = {
                about:false,
                faqs:false,
                contact:false
            };

            $scope.faqActive = {
                diff:false,
                cost:false,
                info:false,
                more:false
            };

            $scope.click = function(name) {

                if(!$scope.isActive[name]) {
                    for(var i in $scope.isActive) {
                        $scope.isActive[i] = false;
                    }
                    $scope.isActive[name]=true;

                }
                else if($scope.isActive[name]) {
                    $scope.isActive[name]=false;
                }
                $window.ga('send','event','footer', 'tap', name, 1);


            };

            $scope.clickFAQ = function(name) {
                if(!$scope.faqActive[name]) {
                    for(var i in $scope.faqActive) {
                        $scope.faqActive[i] = false;
                    }
                    $scope.faqActive[name]=true;

                }
                else if($scope.faqActive[name]) {
                    $scope.faqActive[name]=false;
                }
                $window.ga('send','event','faq', 'tap', name, 1);
            };

            $scope.external = function(name) {
                $window.ga('send','event','external', 'tap', name, 1);
            }

        }]
    }
});

/**
 * Created by airswoop1 on 7/21/14.
 */
angular.module('formApp.modalDirective',[]).directive('modalDialog',function(){
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below

	    transclude: true, // we want to insert custom content inside the directive

        link: function(scope, element, attrs) {
            scope.dialogStyle = {
	            width:'90%',
	            height:'100%'
            };

            scope.hideModal = function() {
                scope.show = false;
            };

            scope.goToTelephone = function() {
                scope.show = false;
                goTelephone();
            }

        },
        controller : ["$state", "$scope", function($state, $scope){
          goTelephone = function(){
	          $scope.$parent.updateProgress('ssn');
              $state.go('form.telephone');
          };

        }],
        templateUrl: 'templates/basic/modal.html'
    };
})
angular.module('formApp.ngDocumentFullscreen',[]).directive('ngDocumentFullscreen', function(){
    return {
        restrict: "A",
        link: function(scope, elem, attr, ctrl) {
            elem.bind('click', function(e) {
                this.classList.toggle('fullscreen');
            });
        }
    }
});
/**
 * Created by airswoop1 on 7/11/14.
 */
angular.module('formApp.ngEnterDirective',[]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
	            console.log("keypress?");
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
/**
 * Created by airswoop1 on 7/30/14.
 */
angular.module('formApp.sampleDocumentsDirective',[]).directive('sampleDocuments', function(){



	return {
		restrict:'E',
		templateUrl:'templates/documents/sample-documents.html',
		scope:{
			docContent:'=docContent',
			type:'=current_type'
		},
		controller: ["$scope", "$window", function($scope, $window) {

			$scope.isActive = {
				showExampleDocs:true
			};

			$scope.exampleActive = {};
			$scope.currentContent = $scope.$parent.docContent[$scope.$parent.$parent.current_type];

			for(var x in $scope.currentContent.valid_docs){
				$scope.exampleActive[$scope.currentContent.valid_docs[x].name] = false;
			}

			$scope.click = function(name) {

				if(!$scope.isActive[name]) {
					for(var i in $scope.isActive) {
						$scope.isActive[i] = false;
					}
					$scope.isActive[name]=true;

				}
				else if($scope.isActive[name]) {
					$scope.isActive[name]=false;
				}
			};

			$scope.clickEx = function(name) {
				if(!$scope.exampleActive[name]) {
					for(var i in $scope.exampleActive) {
						$scope.exampleActive[i] = false;
					}
					$scope.exampleActive[name]=true;

				}
				else if($scope.exampleActive[name]) {
					$scope.exampleActive[name]=false;
				}

			};

			$scope.external = function(name) {
				$window.ga('send','event','external', 'tap', name, 1);
			}

		}]
	}
});

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