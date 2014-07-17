/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp', ['angularFileUpload', 'ui.router', 'ui.bootstrap', 'ngTouch','DocumentUploader',
        'NoContactModal', 'formApp.infoCarouselDirective', 'formApp.infoFooterDirective', 'formApp.ngEnterDirective',
        'formApp.telephoneFilter', 'formApp.apiFactory'])

// configuring our routes
// =============================================================================
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // route to show our basic form (/form)
            .state('form', {
                url: '/form',
                templateUrl: 'form.html',
                controller: 'formController'
            })

            .state('form.intro', {
                url: '/intro',
                templateUrl: 'form-intro.html'
            })

            .state('form.recert', {
                url: '/recert',
                templateUrl: 'form-recert.html'
            })

            .state('form.name', {
                url: '/name',
                templateUrl:'form-name.html'
            })

            .state('form.address', {
                url: '/address',
                templateUrl: 'form-address.html'
            })

            .state('form.telephone', {
                url: '/telephone',
                templateUrl: 'form-telephone.html'
            })

            .state('form.income', {
                url: '/income',
                templateUrl:'form-income.html'
            })

            .state('form.household', {
                url:'/household',
                templateUrl:'form-household.html'
            })

            .state('form.basic-confirmation', {
                url: '/basic-confirmation',
                templateUrl: 'form-basic-confirmation.html'
            })

            .state('form.basic-app-submitted', {
                url: '/app-submitted',
                templateUrl: 'basic-app-submitted.html'
            })

            .state('form.feedback-submitted', {
                url: '/feedback-submitted',
                templateUrl:'form-feedback-submitted.html'
            })


            .state('form.interview-information', {
                url:'/interview-information',
                templateUrl:'form-interview-information.html'
            })


            .state('form.upload',{
                url:'/upload',
                templateUrl:'upload-test.html'
            })




        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/form/intro');
    })

// our controller for the form
// =============================================================================
    .controller('formController', function($scope, $state, $http, $rootScope, $upload, $location, $window, documentUpload, InfoUploader, modalService) {

        // we will store all of our form data in this object
        $scope.formData = {
            name: {
                "entered_name":""
            },
            phone:undefined
        };


        //data objects for holding input temporarily

        $scope.progress = 0;
        $scope.date = new Date();
        $scope.date_of_interview = new Date();
        $scope.date_of_interview.setDate($scope.date.getDate() + 10);
        $scope.date_of_phone_call = new Date();
        $scope.date_of_phone_call.setDate($scope.date.getDate() + 5);



        //data flags for optional fields
        $scope.basic_confirmation_agree = false;
        $scope.submitted_name = false;
        $scope.submitted_address = false;
        $scope.submitted_phone = false;
        $scope.submitted_income = false;
        $scope.submitted_household = false;
        $scope.has_phone = true;
        $scope.has_address = true;
        $scope.completed_first_name = false;
        $scope.submitted_basic_information = false;
        $scope.feedback_collapsed = true;
        $scope.disable_submit = false;

        $scope.completed_items = {
            "name": false,
            "address": false,
            "telephone" : false,
            "income" : false,
            "household" : false,
            "confirmation" : false
        }

        $scope.rating_options = [
            {label:'Select', value:-1},
            {label: 'Definitely - 10', value:10},
            {label: '9', value:9},
            {label: '8', value:8},
            {label: '7', value:7},
            {label: '6', value:6},
            {label: '5', value:5},
            {label: '4', value:4},
            {label: '3', value:3},
            {label: '2', value:2},
            {label: 'Absolutely Not - 1', value:1}
        ];

        $scope.selected_rating = $scope.rating_options[0];

        if($state.current.name === 'form.intro'){
            $scope.show_progress = false;
        }
        else{
            $scope.show_progress = true;
        }


        $scope.initNameStart = function(){
            var split_name = ""
            if($scope.formData.name.entered_name){
                split_name = ($scope.formData.name.entered_name).split(' ');
            }


            $scope.formData.name.first_name = split_name[0];

            if((split_name.length === 1) && (split_name !== "")) {
                $scope.completed_first_name = true;
                sendViewAnalytic('/form/name',function(){
                    $state.go('form.name');
                });

            }
            else if(split_name.length === 2) {
                this.formData.name.last_name = split_name[1];
                updateProgress('name');
                sendViewAnalytic('/form/address',function(){
                    $state.go('form.address');
                });
            }
            else if(split_name.length >= 3) {
                this.formData.name.middle_name = split_name[1];
                this.formData.name.last_name = split_name[2];
                updateProgress('name');
                sendViewAnalytic('/form/address', function(){
                    $state.go('form.address');
                });

            }
            else {
                sendViewAnalytic('/form/name',function(){
                    $state.go('form.name');
                });
            }
        };

        $scope.completedName = function() {
            if($scope.snapForm.$valid) {
                updateProgress('name');
                sendViewAnalytic('/form/address',function(){
                    $state.go('form.address');
                });
            }
            else {
                $scope.submitted_name = true;
            }
        };

        $scope.completedAddress = function(){
            $scope.submitted_address = true;

            if(!$scope.formData.address && $scope.snapForm.street_address.$pristine && $scope.snapForm.zip.$pristine) {

                $scope.has_address = false;
                updateProgress('address');
                sendViewAnalytic('/form/household',function(){
                    $state.go('form.household');
                });
            }
            else if($scope.snapForm.$valid && $scope.formData.address.street_address && $scope.formData.address.zip) {

                $scope.has_address = true;
                updateProgress('address');
                sendViewAnalytic('/form/household',function(){
                    $state.go('form.household');
                });
            }
            else if($scope.snapForm.$valid && ($scope.formData.address.street_address || $scope.formData.address.zip)){
                $scope.has_address = true;
            }


        };

        $scope.completedTelephone = function(){
            $scope.submitted_phone = true;

            if(!$scope.formData.phone_main && $scope.snapForm.phone.$pristine) {
                $scope.has_phone = false;

                if(!$scope.has_phone && !$scope.has_address) {
                    showNoContactModal();
                }
                else {
                    updateProgress('telephone');
                    sendViewAnalytic('/form/basic-confirmation',function(){
                        $state.go('form.basic-confirmation');
                    });
                }
            }
            else if($scope.snapForm.$valid) {
                updateProgress('telephone');
                sendViewAnalytic('/form/basic-confirmation',function(){
                    $state.go('form.basic-confirmation');
                });
            }

        };

        $scope.completedIncome = function () {
            $scope.submitted_income = true;

            if ($scope.snapForm.income.$valid) {
                updateProgress('income');
                sendViewAnalytic('/form/telephone',function(){
                    $state.go('form.telephone');
                });
            }

        };

        $scope.completedHousehold = function() {
            $scope.submitted_household = true;

            if($scope.snapForm.household.$valid) {
                updateProgress('household');
                sendViewAnalytic('/form/income', function(){
                    $state.go('form.income');
                });
            }

        };


        function calculateBenefit() {

            var house = ($scope.formData.household !== "undefined") ? $scope.formData.household : 1;
            var income = ($scope.formData.income !== "undefined") ? parseInt($scope.formData.income,10) : 0;
            var benefit = 0;
            var eligible = false;

            if($scope.formData.disabled === true) {

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
                if(house === 1){ benefit=189; }
                else if(house === 2){ benefit=347;}
                else if(house === 3){ benefit=497;}
                else if(house === 4){ benefit=632;}
                else if(house === 5){ benefit=750;}
                else if(house === 6){ benefit=900;}
                else if(house === 7){ benefit=995;}
                else if(house === 8){ benefit=1137}
                else if(house >= 9) {
                    benefit = 1337 + (142*(house-8))
                }
            }

            $scope.formData.benefit_amount = benefit;

        }

        function showNoContactModal() {
            modalService.showModal({}, {})
        }

        function updateProgress(u){
            $scope.completed_items[u] = true;
            $scope.progress = 0;
            for(var comp in $scope.completed_items){
                if($scope.completed_items[comp]){
                    $scope.progress += 17;
                }
            }
        }

        $scope.submitBasicApp = function() {
            $scope.basic_confirmation_agree = true;
            $scope.submitted_basic_information = true;

            calculateBenefit();
            updateProgress('confirmation');

            $scope.disable_submit = true;

            InfoUploader.uploadBasicInfo($scope.formData, function(result, user_id){
                if(result && user_id) {
                    $scope.formData.user_id = user_id;
                    sendViewAnalytic('/form/app-submitted',function(){
                        $state.go('form.basic-app-submitted');
                    });
                }
                else {
                    alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
                    $scope.disable_submit = false;
                }
            });
        };

        $scope.submitFeedback = function(rating) {
            $scope.formData['rating'] = rating;

            InfoUploader.uploadFeedback($scope.formData, function(result){
                if(result) {
                    sendViewAnalytic('/form/feedback-submitted',function(){
                        $state.go('form.feedback-submitted');
                    });
                }
                else {
                    alert("Oops Looks like something went wrong. Your feedback was NOT submitted. Please wait and try again.")
                }
            })
        };

        $scope.goBack = function() {
            window.history.back();
        };


        $scope.uploadFiles = function($files) {
            var file_upload_status = documentUpload.onFileSelect($files, $scope);
            file_upload_status.then(function(success){
                console.log(success);
            })
        };

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){

            if((toState.name === 'form.name' ||
                toState.name === 'form.address' ||
                toState.name === 'form.telephone' ||
                toState.name === 'form.basic-confirmation'||
                toState.name === 'form.basic-app-submitted' ||
                toState.name === 'form.income' ||
                toState.name === 'form.household' ||
                toState.name === 'form.feedback-submitted' ||
                toState.name === 'form.recert')) {

                $scope.show_progress = true;
            }
            else {
                $scope.show_progress = false;
            }

            if((fromState.name === 'form.intro' ||
                fromState.name === 'form.address' ||
                fromState.name === 'form.basic-confirmation' ||
                fromState.name === 'form.basic-app-submitted')) {

                $window.scrollTo(0,0);
            }

            if(toState.name == 'form.recert') {
                sendViewAnalytic('/form/recert',function(){return;});
            }
            else if(toState.name == 'form.intro') {
                sendViewAnalytic('/form/intro',function(){return;});
            }


        });

        function sendViewAnalytic(page, cb){

            $window.ga('send', 'pageview', {
                'page': page,
                'hitCallback': function() {
                    cb();
                }
            });
        }

        function sendEvent(category, action, label, value){
            $window.ga('send','event',category, action, label, value);
        }


    });







