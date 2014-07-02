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

            .state('form.basic-confirmation', {
                url: '/basic-confirmation',
                templateUrl: 'form-basic-confirmation.html'
            })

            .state('form.basic-app-submitted', {
                url: '/app-submitted',
                templateUrl: 'basic-app-submitted.html'
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
            name: {}
        };

        //data objects for holding input temporarily
        $scope.init_name = "";
        $scope.progress = 0;
        $scope.date = new Date();
        $scope.date_of_interview = new Date();
        $scope.date_of_interview.setDate($scope.date.getDate() + 10);


        //data flags for optional fields
        $scope.basic_confirmation_agree = false;
        $scope.has_phone = true;
        $scope.has_address = true;
        $scope.completed_first_name = false;
        $scope.submitted_basic_information = false;

        $scope.completed_items = {
            "name": false,
            "address": false,
            "telephone" : false,
            "confirmation" : false
        }

        if($state.current.name == 'form.intro'){
            $scope.show_progress = false;
        }
        else{
            $scope.show_progress = true;
        }


        $scope.initNameStart = function(){
            $scope.formData.name.full_name = this.init_name;

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

        $scope.submitBasicApp = function() {
            $scope.basic_confirmation_agree = true;
            $scope.submitted_basic_information = true;

            InfoUploader.uploadBasicInfo($scope.formData);

            $state.go('form.basic-app-submitted');
        }


        $scope.completedName = function(first_name, last_name) {
            if(first_name && last_name) {
                updateProgress('name');
                $state.go('form.address');
            }
            else {
                this.throwErrors('form.name');
            }
        }

        $scope.completedAddress = function(zip, address){

            if(address && zip && (zip.toString().length==5)){
                $scope.has_address = true;
                updateProgress('address');
                $state.go('form.telephone');
            }
            else if(!address){
                $scope.has_address = false;
                $state.go('form.telephone');
            }
            else{
                this.throwErrors('form.address');
            }
        }

        $scope.completedTelephone = function(){
            //phone validation?
            if(!$scope.formData.phone_main){
                $scope.has_phone = false;
            }
            updateProgress('telephone');
            $state.go('form.basic-confirmation');
        }

        function updateProgress(u){
            $scope.completed_items[u] = true;
            for(var comp in $scope.completed_items){
                if($scope.completed_items[comp]==true){
                    $scope.progress += 20;
                }
            }
        }

        $scope.throwErrors = function(page) {
            if(page == 'form.name') {
                alert('you must fill out all required fields!');
            }
            else if(page == 'form.address') {
                alert('Please fill in address and zip!');
            }

        }


        $scope.uploadFiles = function($files) {
            var file_upload_status = documentUpload.onFileSelect($files, $scope);
            file_upload_status.then(function(success){
                console.log(success);
            })
        }

        $rootScope.$on('$stateChangeStart', function(event, toState){

            if((toState.name == 'form.name' || toState.name == 'form.address' ||
                toState.name == 'form.telephone' || toState.name == 'form.basic-confirmation')) {
                $scope.show_progress = true
                sendViewAnalytic();
            }
            else {
                if($scope.show_progress == true){
                    $scope.show_progress = false;
                }
            }

        })

        function sendViewAnalytic(){
            $window.ga('set','page',$location.path())
            $window.ga('send','pageview');
        }

        function sendStartAnalytic(){

        }


    })

    .factory('InfoUploader', function($http) {
        return {
            uploadBasicInfo : function(formData) {
                $http.post('https://54.213.211.187/create_base_pdf', JSON.stringify(formData))
                    .success(function(data, status, headers, config) {
                        alert("success uploading info!");
                        console.log(status);
                        console.log(data);
                        console.log(headers);
                        console.log(config);

                    })
                    .error(function(data, status, headers, config) {
                        alert('error uploading info');
                        console.log(status);
                        console.log(data);
                        console.log(headers);
                        console.log(config);

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

