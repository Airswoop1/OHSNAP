/**
 * Created by airswoop1 on 7/23/14.
 */

angular.module('formApp.documentUploadCtrl', ['formApp.DocumentUploader','formApp.userDataFactory', 'formApp.sampleDocumentsDirective']).controller('documentUploadCtrl',
	function($scope, $upload, $state, $stateParams, $rootScope, documentUpload, userDataFactory){
		alert("loading controller!");
		$scope.docs = userDataFactory.userData.docs;

		$scope.DOC_STATUS = {
			"UPLOADED": 2,
			"IN_PROGRESS":1,
			"NOT_UPLOADED":0
		};
		$scope.current_type = $state.params.type;
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState){
			if(toParams){
				$scope.current_type = toParams.type;
			}
		});


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


		$scope.uploadFile = function($files) {

			//display upload in progress;
			var type = $state.params.type;

			userDataFactory.userData.docs[type] = $scope.DOC_STATUS.IN_PROGRESS;

			documentUpload.onFileSelect($files, $scope, type, $scope.user_id).then(
				//it succeeeded
				function(result){
					userDataFactory.userData.docs[type] = $scope.DOC_STATUS.UPLOADED;

				},
				//it failed
				function(reason){
					userDataFactory.userData.docs[type] = $scope.DOC_STATUS.NOT_UPLOADED;
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

		};

		//API.getDocumentStatus($scope.user_id, $scope.updateUploadedFilesStatus);



		$scope.docContent = {
			'IDENTITY':{
				header:"We need to confirm your identity",
				sample_image:"state_id.jpg",
				valid_docs : [
					{
						"name":"Passport",
						"image":"sample_passport.jpg",
						"link":"https://www.usps.com/shop/apply-for-a-passport.htm"
					}
				]

			},
			'RESIDENCE':{
				header:"We need to confirm where you live",
				sample_image:"sample_lease.png",
				valid_docs : [
					{
						"name":"Lease",
						"image":"sample_lease.png",
						"link":"http://www.ehow.com/how_6147098_request-copy-apartment-lease-mail.html"
					}
				]
			},
			'HOUSEHOLD_COMPOSITION':{
				header:"We need to confirm who is living with you",
				sample_image:"sample_lease.png",
				valid_docs : [
					{
						"name":"Statement from Non-Relative Landlord",
						"image":"sample_lease.png",
						"link":"http://www.ehow.com/how_6147098_request-copy-apartment-lease-mail.html"
					}
				]
			},
			'AGE':{
				header:"We need to confirm how old you are",
				sample_image:"sample_birth_cert.jpg",
				valid_docs : [
					{
						"name":"Birth Certificate",
						"image":"sample_birth_cert.jpg",
						"link":"https://www.health.ny.gov/vital_records/birth.htm"
					}
				]
			},
			'SSN':{
				header:"We need to confirm your Social Security Number",
				sample_image:"sample_ssn.gif",
				valid_docs : [
					{
						"name":"Social Security Card",
						"image":"sample_ssn.gif",
						"link":"http://www.ssa.gov/ssnumber/"
					}
				]
			},
			'CITIZENSHIP':{
				header:"We need to confirm your citizenship status",
				sample_image:"sample_passport.jpg",
				valid_docs : [
					{
						"name":"Passport",
						"image":"sample_passport.jpg",
						"link":"https://www.usps.com/shop/apply-for-a-passport.htm"
					},
					{
						"name":"Birth Certificate",
						"image":"sample_birth_cert.jpg",
						"link":"https://www.health.ny.gov/vital_records/birth.htm"
					}
				]
			},
			'ALIEN_STATUS':{
				header:"We need to confirm your alien status",
				valid_docs : [
					{
						"name":"Social Security Card",
						"image":"sample_ssn.gif",
						"link":"http://www.ssa.gov/ssnumber/"
					}
				]

			},
			'EARNED_INCOME':{
				header:"We need to confirm your income",
				valid_docs : [
					{
						"name":"Social Security Card",
						"image":"sample_ssn.gif",
						"link":"http://www.ssa.gov/ssnumber/"
					}
				]
			},
			'UNEARNED_INCOME':{
				header:"We need to confirm your unearned income",
				valid_docs : [
					{
						"name":"Social Security Card",
						"image":"sample_ssn.gif",
						"link":"http://www.ssa.gov/ssnumber/"
					}
				]
			},
			'RESOURCES':{
				header:"Let us know if you have any other documents we might need!",

			}
		};

		$scope.goBack = function() {
			window.history.back();
		};





	});