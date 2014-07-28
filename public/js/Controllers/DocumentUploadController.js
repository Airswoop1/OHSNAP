/**
 * Created by airswoop1 on 7/23/14.
 */

angular.module('formApp.documentUploadCtrl',['DocumentUploader','formApp.apiFactory']).controller('documentUploadCtrl',function($scope, $upload,  documentUpload, API){

    $scope.DOC_STATUS = {
        "UPLOADED": 2,
        "IN_PROGRESS":1,
        "NOT_UPLOADED":0
    }

    $scope.uploadedFiles = {
        'IDENTITY':$scope.DOC_STATUS.NOT_UPLOADED,
        'RESIDENCE':$scope.DOC_STATUS.NOT_UPLOADED,
        'HOUSEHOLD_COMPOSITION':$scope.DOC_STATUS.NOT_UPLOADED,
        'AGE':$scope.DOC_STATUS.NOT_UPLOADED,
        'SSN':$scope.DOC_STATUS.NOT_UPLOADED,
        'CITIZENSHIP':$scope.DOC_STATUS.NOT_UPLOADED,
        'ALIEN_STATUS':$scope.DOC_STATUS.NOT_UPLOADED,
        'EARNED_INCOME':$scope.DOC_STATUS.NOT_UPLOADED,
        'UNEARNED_INCOME':$scope.DOC_STATUS.NOT_UPLOADED,
        'RESOURCES':$scope.DOC_STATUS.NOT_UPLOADED
    };



    $scope.user_id = $scope.$parent.formData.user_id;




    $scope.uploadFile = function($files, type) {

        //display upload in progress;


        documentUpload.onFileSelect($files, $scope,type, $scope.user_id).then(
            //it succeeeded
            function(result){
                alert('woo uploaded!');
                alert(restul);
                $scope.uploadedFiles[type] = true;

            },
            //it failed
            function(reason){
                //throw some sort of error indicating failure.
                alert('aw no upload');
                alert(reason);
            })
    };

    //update status based on whats in the db
     $scope.updateUploadedFilesStatus = function(data) {
        var status = data.status;
         if(status){
             for (var uploaded in status){
                if(status.hasOwnProperty(uploaded)){
                    $scope.uploadedFiles[uploaded] = status[uploaded];
                }
            }
        }
    }

    API.getDocumentStatus($scope.user_id, $scope.updateUploadedFilesStatus);









});