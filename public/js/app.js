/**
 * Created by airswoop1 on 6/10/14.
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var app = angular.module('formApp', ['angularFileUpload', 'ui.router', 'ui.bootstrap', 'ngTouch','DocumentUploader' ])

    .directive('selectRace', function(){
        return {
            restrict:'E',
            templateUrl:'select-race.html',
            controller: function(){
                this.race = "Caucasian";

                this.getRace = function(){
                    return this.race;
                }
            },
            controllerAs : 'selected_race'
        }
    })

    .directive('snapInformation', function(){
        return {
            restrict:'E',
            templateUrl:'process-info.html'
        }
    })

    .directive('requiredDocuments', function(){

        return {
            restrict:'E',
            templateUrl:'required-documents.html'
        }
    })

    .directive('infoFooter', function(){
        return {
            restrict:'E',
            templateUrl:'info-footer.html'
        }
    })

    .directive('infoCarousel', function(){
        return {
            restrict:'E',
            templateUrl:'info-carousel.html',
            controller: function($scope){
                $scope.my_int = 5000;

                $scope.slides = [
                    {
                        header: "STEP 1",
                        title: "Fill out a short form",
                        text: "We keep the application short and sweet. No more long waits or confusing paperwork.",
                        bg_color:"#00BFFF",
                        id:"circle"
                    },
                    {
                        header: "STEP 2",
                        title: "Get an interview",
                        text: "Prepare for your interview with a government worker with our interview guide.",
                        bg_color:"#30D5C8",
                        id:"circle"
                    },
                    {
                        header: "STEP 3",
                        title: "Send in required documents",
                        text: "Text us your documents or upload them from your mobile device and we'll fax them in for you. Boom! You're done.",
                        bg_color:"#66CD00",
                        id:"circle"
                    },
                    {
                        header: "",
                        title: "We follow up, anytime",
                        text: "Get reminders about application deadlines. If something goes wrong, we help you take action.",
                        bg_color:"url(images/arrow_clock_sm.png)",
                        id:'arrow_clock'
                    }
                ]
            },
            controllerAs:"carouselCtrl"
        }
    })
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
    .controller('formController', function($scope, $state, $http, $rootScope, $upload, $location, $window, documentUpload, InfoUploader) {

        // we will store all of our form data in this object
        $scope.formData = {
            name: {},
            phone:undefined
        };


        //data objects for holding input temporarily
        $scope.init_name = "";
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

        $scope.completed_items = {
            "name": false,
            "address": false,
            "telephone" : false,
            "income" : false,
            "household" : false,
            "confirmation" : false
        }

        $scope.rating_options = [
            {label: 'Yes Definitely', value:5},
            {label: 'Maybe', value:3},
            {label: 'Definitely No', value:1}
        ]
        $scope.selected_rating = $scope.rating_options[1];

        if($state.current.name == 'form.intro'){
            $scope.show_progress = false;
        }
        else{
            $scope.show_progress = true;
        }


        $scope.initNameStart = function(){
            $scope.formData.name.entered_name = this.init_name;

            var split_name = this.init_name.split(' ');

            $scope.formData.name.first_name = split_name[0];

            if((split_name.length == 1) && (split_name != "")) {
                $scope.completed_first_name = true;
                $state.go('form.name');

            }
            else if(split_name.length == 2) {
                this.formData.name.last_name = split_name[1];
                $state.go('form.address');
            }
            else if(split_name.length >= 3) {
                this.formData.name.middle_name = split_name[1];
                this.formData.name.last_name = split_name[2];
                $state.go('form.address');
            }
            else {
                $state.go('form.name');
            }
        }

        $scope.completedName = function(first_name, last_name) {
            if($scope.snapForm.$valid) {
                updateProgress('name');
                $state.go('form.address');
            }
            else {
                $scope.submitted_name = true;
            }
        }

        $scope.completedAddress = function(){
            $scope.submitted_address = true;

            //if(address && zip && (zip.toString().length==5)){
              if($scope.snapForm.$valid) {

                $scope.has_address = true;
                updateProgress('address');
                $state.go('form.household');
            }
            else if(!$scope.formData.address && $scope.snapForm.street_address.$pristine && $scope.snapForm.zip.$pristine){
                $scope.has_address = false;
                updateProgress('address');
                $state.go('form.household');
            }

        }

        $scope.completedTelephone = function(){
            $scope.submitted_phone = true;
            //phone validation?
            if($scope.snapForm.$valid) {
                updateProgress('telephone');
                $state.go('form.basic-confirmation');
            }
            else if(!$scope.formData.phone_main && $scope.snapForm.phone.$pristine) {
                $scope.has_phone = false
                updateProgress('telephone');
                $state.go('form.basic-confirmation');
            }

        }

        $scope.completedIncome = function() {
            $scope.submitted_income = true;

            if($scope.snapForm.$valid) {
                updateProgress('income');
                $state.go('form.telephone');
            }

        }

        $scope.completedHousehold = function() {
            $scope.submitted_household = true;

            if($scope.snapForm.$valid) {
                updateProgress('household');
                $state.go('form.income');
            }

        }


        function calculateBenefit() {
            if($scope.formData.income && $scope.formData.household) {
                var house = $scope.formData.household;
                var income = parseInt($scope.formData.income,10);
                var benefit = 0;
                var eligible = false;


                if($scope.formData.disabled == true) {

                    if( (house == 1 && income <= 1915) ||
                        (house == 2 && income <= 2585) ||
                        (house == 3 && income <= 3255) ||
                        (house == 4 && income <= 3925) )
                    {
                        eligible = true;
                    }
                    else if(house >= 5 && (income <= (((house-4)*670)+3925)) ){
                        eligible = true;
                    }
                }
                else {
                    if( (house == 1 && income <= 1245) ||
                        (house == 2 && income <= 1681) ||
                        (house == 3 && income <= 2116) ||
                        (house == 4 && income <= 2552) )
                    {
                        eligible = true;
                    }
                    else if(house >= 5 && (income <= (((house-4)*436)+2552)) ){
                        eligible = true;
                    }
                }
                if(eligible){
                    if(house == 1){ benefit=189; }
                    else if(house == 2){ benefit=347;}
                    else if(house == 3){ benefit=497;}
                    else if(house == 4){ benefit=632;}
                    else if(house == 5){ benefit=750;}
                    else if(house == 6){ benefit=900;}
                    else if(house == 7){ benefit=995;}
                    else if(house == 8){ benefit=1137}
                    else if(house >= 9) {
                        benefit = 1337 + (142*(house-8))
                    }
                }

                $scope.formData.benefit_amount = benefit;
            }
        }

        function updateProgress(u){
            $scope.completed_items[u] = true;
            $scope.progress = 0;
            for(var comp in $scope.completed_items){
                if($scope.completed_items[comp]==true){
                    $scope.progress += 17;
                }
            }
            alert($scope.progress);
        }

        $scope.submitBasicApp = function() {
            $scope.basic_confirmation_agree = true;
            $scope.submitted_basic_information = true;

            calculateBenefit();
            updateProgress('confirmation');

            InfoUploader.uploadBasicInfo($scope.formData, function(result, user_id){
                if(result && user_id) {
                    $scope.formData.user_id = user_id;
                    $state.go('form.basic-app-submitted');
                }
                else {
                    alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.")
                }
            });
        };

        $scope.submitFeedback = function(rating) {
            $scope.formData['rating'] = rating;

            InfoUploader.uploadFeedback($scope.formData, function(result){
                if(result) {
                    $state.go('form.feedback-submitted');
                }
                else {
                    alert("Oops Looks like something went wrong. Your feedback was NOT submitted. Please wait and try again.")
                }
            })
        };

        $scope.goBack = function() {
            window.history.back();
        }

        /*$scope.throwErrors = function(page) {
            if(page == 'form.name') {
                alert('you must fill out all required fields!');
            }
            else if(page == 'form.address') {
                alert('Please fill in address and zip!');
            }

        }*/

        $scope.uploadFiles = function($files) {
            var file_upload_status = documentUpload.onFileSelect($files, $scope);
            file_upload_status.then(function(success){
                console.log(success);
            })
        }

        $rootScope.$on('$stateChangeStart', function(event, toState){

            if((toState.name == 'form.name' ||
                toState.name == 'form.address' ||
                toState.name == 'form.telephone' ||
                toState.name == 'form.basic-confirmation'||
                toState.name == 'form.basic-app-submitted' ||
                toState.name == 'form.income' ||
                toState.name == 'form.household' ||
                toState.name == 'form.feedback-submitted' ||
                toState.name == 'form.recert')) {
                $scope.show_progress = true
                sendViewAnalytic();

            }
            else {
                $scope.show_progress = false;
            }



            if(toState.name == 'form.basic-confirmation' && !($scope.has_address && $scope.has_phone)){
                alert("Note we will be unable to process your form if you do not provide us with at least your address or phone number");
            }

        })

        function sendViewAnalytic(){
            $window.ga('set','page',$location.path())
            $window.ga('send','pageview');
        }

        function sendEvent(category, action, label, value){
            $window.ga('send','event',category, action, label, value);
        }


    })

    .factory('InfoUploader', function($http) {
        return {

            uploadFeedback : function(formData, callback) {
                //$http.post('https://easyfoodstamps.com/submit_feedback', JSON.stringify(formData))
                $http.post('http://localhost:1337/submit_feedback', JSON.stringify(formData))
                    .success(function(data, status, headers, config) {

                        if(status === 201){
                            callback(true);
                        }
                        else {
                            callback(null);
                        }
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);

                        callback(null)

                    });
            },

            uploadBasicInfo : function(formData, callback) {
               //$http.post('https://easyfoodstamps.com/upload_user_info', JSON.stringify(formData))
               $http.post('http://localhost:1337/upload_user_info', JSON.stringify(formData))
                    .success(function(data, status, headers, config) {

                        if(status === 201){
                            callback(true, data.user_id);
                        }
                        else {
                            callback(null);
                        }
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);

                        callback(null)

                    });
            }
        }
    })


    .filter('tel', function () {
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

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });

