/**
 * Created by airswoop1 on 7/23/14.
 */

angular.module('formApp.documentUploadCtrl',['DocumentUploader','formApp.apiFactory']).controller('documentUploadCtrl',function($scope, $upload,  documentUpload, API){

    $scope.uploadedFiles = {
        'IDENTITY':false,
        'RESIDENCE':false,
        'HOUSEHOLD_COMPOSITION':false,
        'AGE':false,
        'SSN':false,
        'CITIZENSHIP':false,
        'ALIEN_STATUS':false,
        'EARNED_INCOME':false,
        'UNEARNED_INCOME':false,
        'RESOURCES':false
    };

    $scope.user_id = $scope.$parent.formData.user_id;




    $scope.uploadFile = function($files, type) {

        documentUpload.onFileSelect($files, $scope,type).then(
            //it succeeeded
            function(result){
                console.log(result);
                $scope.uploadedFiles[type] = true;

            },
            //it failed
            function(reason){
                //throw some sort of error indicating failure.
            })
    };

     $scope.updateUploadedFilesStatus = function(data) {
        console.log(data.status)
         if(data.status){
             for (var uploaded in data.status){
                if(data.status.hasOwnProperty(uploaded)){
                    $scope.uploadedFiles[uploaded] = data.status[uploaded];
                }
            }
        }
    }

    API.getDocumentStatus($scope.user_id, $scope.updateUploadedFilesStatus);



});