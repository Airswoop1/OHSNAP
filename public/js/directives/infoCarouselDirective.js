/**
 * Created by airswoop1 on 7/11/14.
 */
angular.module("formApp.infoCarouselDirective",[]).directive('infoCarousel', function(){
    return {
        restrict:'E',
        templateUrl:'templates/info-carousel.html',
        controller: function($scope){
            $scope.my_int = 5000;

            $scope.slides = [
                {
                    header: "STEP 1",
                    title: "Fill out a short form",
                    text: "Answer 5 basic questions about yourself to get started.",
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