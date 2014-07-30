/**
 * Created by airswoop1 on 7/23/14.
 */

angular.module('formApp.documentUploadCtrl',['formApp.DocumentUploader','formApp.apiFactory']).controller('documentUploadCtrl',
    function($scope, $upload, $state, $stateParams, documentUpload, API){
		alert("loading controller!");
    $scope.DOC_STATUS = {
        "UPLOADED": 2,
        "IN_PROGRESS":1,
        "NOT_UPLOADED":0
    };

    $scope.docs = {
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

	    $scope.current_sample_image = "";

    //$scope.user_id = $scope.$parent.formData.user_id;
	$scope.user_id = "hello";

    $scope.isNotUploaded = function(name) {
        return $scope.docs[name] === $scope.DOC_STATUS.NOT_UPLOADED;
    };

    $scope.isInProgress = function(name) {
        return $scope.docs[name] === $scope.DOC_STATUS.IN_PROGRESS;
    };

    $scope.isUploaded = function(name) {
        return $scope.docs[name] === $scope.DOC_STATUS.UPLOADED;
    };


    $scope.goToDocUpload = function(name) {
        $state.go('upload.detail', {'type':name});

    };

	$scope.getCurrentContent = function(){

		var type =  $state.params.type;
		$scope.current_sample_image = $scope.docContent[type].sample_image;
		return $scope.docContent[type].header;
	};

	$scope.getDocDetailState = function() {

		return $scope.docs[$state.params.type];
	};

	$scope.testME = function(type) {

		$scope.docs[type] = $scope.DOC_STATUS.UPLOADED;
		console.log($scope.docs[type])
	}

    $scope.uploadFile = function($files) {

        //display upload in progress;
		var type = $stateParams.type;
	    $scope.docs[type] = $scope.DOC_STATUS.IN_PROGRESS;

        documentUpload.onFileSelect($files, $scope, type, $scope.user_id).then(
            //it succeeeded
            function(result){
                console.log('woo uploaded!');
                console.log(result);
	            console.log($scope.docs[type]);
				console.log(type);

	            $scope.testME(type);

            },
            //it failed
            function(reason){
                $scope.docs[type] = $scope.DOC_STATUS.NOT_UPLOADED;
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
                    $scope.docs[uploaded] = status[uploaded];
                }
            }
        }

    }


    function docUploadInProgress(amount){
        console.log(amount);
    }

    //API.getDocumentStatus($scope.user_id, $scope.updateUploadedFilesStatus);



    $scope.docContent = {
        'IDENTITY':{
            header:"We need to confirm your identity",
	        sample_image:"state_id.jpg"

        },
        'RESIDENCE':{
	        header:"We need to confirm where you live"
        },
        'HOUSEHOLD_COMPOSITION':{
	        header:"We need to confirm who is living with you"
        },
        'AGE':{
	        header:"We need to confirm how old you are"
        },
        'SSN':{
	        header:"We need to confirm your Social Security Number"
        },
        'CITIZENSHIP':{
	        header:"We need to confirm your citizenship status"
        },
        'ALIEN_STATUS':{
	        header:"We need to confirm your alien status"
        },
        'EARNED_INCOME':{
	        header:"We need to confirm your income"
        },
        'UNEARNED_INCOME':{
	        header:"We need to confirm your unearned income"
        },
        'RESOURCES':{
	        header:"Let us know if you have any other documents we might need!"
        }
    }





});