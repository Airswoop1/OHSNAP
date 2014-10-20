/**
 * Created by airswoop1 on 7/23/14.
 */

angular.module('formApp.documentUploadConfig',['ui.router']).config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('upload', {
		url:'/upload',
		templateUrl:'templates/documents/upload-main.html',
		controller: 'documentUploadCtrl'

		})

		.state('upload.documents',{
			url:'/documents',
			templateUrl:'templates/documents/form-document-upload.html'
		})


		.state('upload.detail',{
			url:'/detail?type',
			templateUrl:'templates/documents/form-document-detail.html'
		})

		.state('upload.completion', {
			url:'/completion?type',
			templateUrl: 'templates/documents/form-document-completion.html'
		})


}]);

angular.module('formApp.documentUploadCtrl', ['formApp.ngDocumentFullscreen', 'formApp.DocumentUploader','formApp.userDataFactory', 'formApp.sampleDocumentsDirective']).controller('documentUploadCtrl',
	["$scope", "$upload", "$state", "$stateParams", "$rootScope", "$location", "$window", "documentUpload", "userDataFactory", function($scope, $upload, $state, $stateParams, $rootScope, $location, $window, documentUpload, userDataFactory){

		$scope.docs = userDataFactory.userData.docs;
		$scope.docProgress = userDataFactory.userData.docProgress;

		$scope.user = (typeof userDataFactory.userData.user.formData !== "undefined") ? userDataFactory.userData.user.formData : {};


		$scope.date = new Date();
		$scope.date_of_interview = new Date();
		$scope.date_of_interview.setDate($scope.date.getDate() + 10);

		$scope.DOC_STATUS = {
			"UPLOADED": 2,
			"IN_PROGRESS":1,
			"NOT_UPLOADED":0
		};

		$scope.localDocs = {
			'IDENTITY':0,
				'RESIDENCE':0,
				'HOUSEHOLD_COMPOSITION':0,
				'AGE':0,
				'SSN':0,
				'CITIZENSHIP':0,
				'ALIEN_STATUS':0,
				'EARNED_INCOME':0,
				'ALT_INCOME':0,
				'RESOURCES':0
		};

		$scope.current_type = $state.params.type;
		$scope.docSafetyOpen = false;

		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState){
			if(toParams){
				$scope.current_type = toParams.type;
			}
		});


		$scope.renderImg = function(type, url) {
				$scope.localDocs[type] = url;
		};

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

		$scope.goToCompletion = function() {
			$state.go('upload.completion', {'type':'Completion'});
		};

		$scope.getCurrentContent = function(){
			var type =  $state.params.type;
			$scope.current_sample_image = $scope.docContent[type].sample_image;
			return $scope.docContent[type].header;
		};

		$scope.getDocDetailState = function() {
			return $scope.docs[$state.params.type];
		};

		$scope.getCurrentType = function() {
			if($state.params.type == "ALT_INCOME") {
				return "OTHER INCOME";
			}
			else if($state.params.type == "EARNED_INCOME") {
				return "INCOME";
			}
			else if($state.params.type == "HOUSING_EXPENSE"){
				return "HOUSING EXPENSES"
			}
			else {
				return $state.params.type ? $state.params.type : "Documents";
			}
		};


		$scope.uploadFile = function($files) {
			//display upload in progress;
			var type = $state.params.type;

			$scope.docs[type] = $scope.DOC_STATUS.IN_PROGRESS;
			$scope.uploadProgress(type);
			console.log($files);

			documentUpload.onFileSelect($files, $scope, type, $scope.user.user_id).then(
				//it succeeeded
				function(result){

					$scope.docProgress[type] = 100;
					$scope.docs[type] = $scope.DOC_STATUS.UPLOADED;
				},
				//it failed
				function(reason){
					$scope.docs[type] = $scope.DOC_STATUS.NOT_UPLOADED;
					//throw some sort of error indicating failure.
					alert('Sorry we were unable to upload your documents, please try again');

				})
		};

		$scope.uploadProgress = function(type) {
			$scope.docProgress[type] += 10;

			var upload = setInterval(function(){

				if($scope.docProgress[type] < 100 && $scope.docs[type] !== $scope.DOC_STATUS.UPLOADED){
					$scope.docProgress[type] += 10;
				}
				else{
					$scope.docProgress[type] = 100;
					clearInterval(upload);
				}

			},50);

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


		$window.onbeforeunload = function(){
			var message = 'Your documents are still uploading! If you leave now they won\'t be submitted.';

			if($scope.docStillUploading()){

				if (typeof event == 'undefined') {
					event = window.event;
				}
				if (event) {
					event.returnValue = message;
				}
				return message;
			}
			else{
				return null;
			}
		};


		$scope.docStillUploading = function() {
			var uploading = false;
			for(var x in $scope.docs){
				uploading = (uploading || ($scope.docs[x] === $scope.DOC_STATUS.IN_PROGRESS)) ;
			}

			return uploading;

		};

		//API.getDocumentStatus($scope.user_id, $scope.updateUploadedFilesStatus);

		$scope.docContent = {
			'IDENTITY':{
				header:"Take a picture of 1 of these documents to confirm your identity.",
				sample_image:"sample_id.png",
				valid_docs : [
					{
						"name":"Drivers license or state photo ID",
						"image":"sample_dl.jpg",
						"link":"http://dmv.ny.gov/driver-license/get-driver-license"
					},
					{
						"name":"US Passport",
						"image":"sample_passport.jpg",
						"link":"https://www.usps.com/shop/apply-for-a-passport.htm"
					}
				]

			},
			'RESIDENCE':{
				header:"Take a picture of 1 of these documents to confirm where you live.",
				sample_image:"sample_address.png",
				valid_docs : [
					{
						"name":"Lease",
						"image":"sample_lease.jpg",
						"link":"http://www.ehow.com/how_6147098_request-copy-apartment-lease-mail.html"
					},
					{
						"name":"Statement from landlord or primary tenant",
						"image":"sample_addressstatement.jpg",
						"link":"http://www.wikihow.com/Write-a-Letter-Showing-Proof-of-Residence-for-a-Tenant"
					},
					{
						"name":"Mortgage record",
						"image":"sample_mortgagerecord.jpg",
						"link":"http://a836-acris.nyc.gov/CP/"
					}
				]
			},
			'HOUSING_EXPENSE':{
				header:"Take a picture of 1 of these documents to confirm how much you pay for housing.",
				sample_image:"sample_housingexpense.png",
				valid_docs : [
					{
						"name":"Lease, if you do not split the rent",
						"image":"sample_lease.jpg",
						"link":"http://www.ehow.com/how_6147098_request-copy-apartment-lease-mail.html"
					},
					{
						"name":"Rent receipt, if you do not split the rent",
						"image":"sample_rentreceipt.jpg",
						"link":"http://www.masslegalhelp.org/housing/private-housing/ch3/security-deposit-landlords-responsiblities"
					},
					{
						"name":"Statement from roommates, if you split the rent",
						"image":"sample_housingstatement.jpg",
						"link":"http://www.lawdepot.com/contracts/roommate-agreement/"
					}
				]
			},
			'HOUSEHOLD_COMPOSITION':{
				header:"Take a picture of 1 of these documents to prove who lives with you.",
				sample_image:"sample_household.png",
				valid_docs : [
					{
						"name":"Statement from your landlord",
						"image":"sample_addressstatement.jpg",
						"link":"http://www.wikihow.com/Write-a-Letter-Showing-Proof-of-Residence-for-a-Tenant"
					},
					{
						"name":"School records",
						"image":"sample_schoolrecord.jpg",
						"link":"http://www1.nyc.gov/nyc-resources/service/2557/student-record-request"
					}
				]
			},

			'UTILITIES':{
				header:"Take a picture of 1 of these documents to confirm utilities you pay for separate from rent.",
				sample_image:"sample_utilities.png",
				valid_docs : [
					{
						"name":"Utility bill",
						"image":"sample_utility.jpg"

					},
					{
						"name":"Telephone bill",
						"image":"sample_phonebill.jpg"
					}
				]
			},
			'SSN':{
				header:"Take a picture of 1 of these documents to confirm your Social Security Number.",
				sample_image:"sample_ssn.png",
				valid_docs : [
					{
						"name":"Social Security Card",
						"image":"sample_ssn.jpg",
						"link":"http://www.nyc.gov/html/id/html/how/social_security_card.shtml"
					},
					{
						"name":"Official mail from the SSA",
						"image":"sample_ssamail.jpg"
					}
				]
			},
			'CITIZENSHIP':{
				header:"Take a picture of one of these documents to confirm your citizenship status.",
				sample_image:"sample_citizen.png",
				valid_docs : [
					{
						"name":"US Passport",
						"image":"sample_passport.jpg",
						"link":"https://www.usps.com/shop/apply-for-a-passport.htm"
					},
					{
						"name":"US Birth Certificate",
						"image":"sample_birth_cert.jpg",
						"link":"http://www.nyc.gov/html/id/html/how/birth_certificate.shtml"
					},
					{
						"name":"US Military service record",
						"image":"sample_military.jpg",
						"link":"http://themilitarywallet.com/how-to-get-a-military-id-card/"
					},
					{
						"name":"Naturalization Certificate",
						"image":"sample_naturalization.jpg",
						"link":"http://www.uscis.gov/tools/how-do-i-customer-guides/how-do-i-guides-us-citizens/how-do-i-obtain-certified-true-copies-certificate-naturalization"
					}
				]
			},
			'EARNED_INCOME':{
				header:"Take a picture of 1 of these documents to confirm income that you've earned.",
				sample_image:"sample_income.png",
				valid_docs : [
					{
						"name":"Pay stub",
						"image":"sample_paystub.jpg",
						"link":"http://www.ehow.com/how_8353804_copy-pay-stubs.html"
					},
					{
						"name":"Tax return",
						"image":"sample_taxreturn.jpg",
						"link":"http://www.irs.gov/Individuals/Get-Transcript"
					},
					{
						"name":"Statement from employer",
						"image":"sample_incomestatement.jpg",
						"link":"hhttp://www.wikihow.com/Write-a-Letter-for-Proof-of-Income"
					},
					{
						"name":"Invoice, if you are self-employed",
						"image":"sample_invoice.jpg"
					}
				]
			},
			'ALT_INCOME':{
				header:"Take a picture of 1 of these documents to confirm alternate sources of income.",
				sample_image:"sample_altincome.png",
				valid_docs : [
					{
						"name":"Current unemployment award certificate",
						"image":"sample_unemploymentcert.jpg",
						"link":"http://www.ehow.com/how_8421455_do-proof-unemployment.html"
					},
					{
						"name":"Current Social Security benefit check",
						"image":"sample_sscheck.jpg",
						"link":"http://www.ssa.gov/pubs/EN-05-10552.pdf"
					},
					{
						"name":"Statement from person paying child support",
						"image":"empty.jpg",
						"link":"http://info.legalzoom.com/evidence-child-support-payments-23480.html"
					},
					{
						"name":"Check stubs from child support",
						"image":"empty.jpg",
						"link":"http://info.legalzoom.com/evidence-child-support-payments-23480.html"
					},
					{
						"name":"Current veteran's benefit check",
						"image":"empty.jpg"
					},
					{
						"name":"Current worker's compensation certificate",
						"image":"sample_workerscompcert.jpg"
					}

				]
			},
			'OTHER' : {
				header:"Take a picture of 1 of these documents to confirm alternate sources of income.",
				sample_image:"sample_utilities.png",
				valid_docs : []
			}
		};

		$scope.goBack = function() {
			window.history.back();
		};

	}]);
/**
 * Created by airswoop1 on 7/31/14.
 */
angular.module('formApp.formController',['angularFileUpload', 'ui.router', 'ui.bootstrap', 'ngTouch',
		'NoContactModal', 'formApp.CalcBenefitService' ,'formApp.infoFooterDirective', 'formApp.ngEnterDirective',
		'formApp.telephoneFilter', 'formApp.ssnFilter','formApp.apiFactory', 'formApp.appSubmittedDropdownDirective', 'formApp.feedbackFooterDirective',
		'formApp.modalDirective', 'formApp.documentUploadCtrl', 'formApp.userDataFactory']).controller('formController',
	["$scope", "$state", "$http", "$rootScope", "$upload", "$location", "$window", "API", "userDataFactory", "calcBenefitService", function($scope, $state, $http, $rootScope, $upload, $location, $window, API, userDataFactory, calcBenefitService) {

		// we will store all of our form data in this object
		$scope.formData = userDataFactory.userData.user.formData;


		//data objects for holding input temporarily
		$scope.progress = 0;
		$scope.date = new Date();
		$scope.date_of_interview = new Date();
		$scope.date_of_interview.setDate($scope.date.getDate() + 10);
		$scope.date_of_phone_call = new Date();
		$scope.date_of_phone_call.setDate($scope.date.getDate() + 7);


		//data flags for optional fields
		$scope.basic_confirmation_agree = false;
		$scope.submitted_name = false;
		$scope.submitted_address = false;
		$scope.submitted_phone = false;
		$scope.submitted_income = false;
		$scope.submitted_household = false;
		$scope.submitted_expenses = false;
		$scope.has_phone = true;
		$scope.has_address = true;
		$scope.completed_first_name = false;
		$scope.submitted_basic_information = false;
		$scope.feedback_collapsed = true;
		$scope.disable_submit = false;
		$scope.show_progress_bar = true;
		$scope.remove_progress_bar = false;
		$scope.show_elig_progress_bar = false;
		$scope.goingThroughEligibility = false;
		$scope.submitting_app = false;
		$scope.inputOtherUtils = false;

		$scope.completed_items = {
			"name": false,
			"address": false,
			"telephone" : false,
			"income" : false,
			"household" : false,
			"expenses":false,
			"ssn":false,
			"citizenship":false,
			"school_district":false,
			"township":false,
			"lived_at_duration":false

		};

		$scope.eligibilityCompleted = {
			"household":false,
			"income":false,
			"citizenship":false,
			"expenses":false
		};

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
		$scope.show_progress = !($state.current.name === 'form.intro');

		/**
		 * fn: completedName
		 * if the form is valid, increment progress, send pageview event for /form/address : go-to form.address
		 * else determine which field invalidated the submission, set flag for errors, send event for error
		 * **/
		$scope.completedName = function() {
			if($scope.snapForm.$valid && $scope.formData.name.first_name && $scope.formData.name.last_name) {
				updateProgress('name');
				$state.go('form.address');
			}
			else {
				var field_invalid = $scope.snapForm.$error.required,
					which = "";

				if(field_invalid.length == 2) {
					which = "both";
				}
				else if(field_invalid[0].$name == 'first_name') {
					which = 'first_name';
				}
				else {
					which = 'last_name';
				}

				$scope.submitted_name = true;
				$window.ga('send','event','name_validate','tap',which,1);
			}
		};


		$scope.checkboxAlert = function() {
			alert('You must check the box to certify your information is true before we can submit your application.');
		};

		/**
		 * fn completedAddress
		 * We allow the submission of blank address fields, however if any fields contain data we validate
		 * if no address or no address.street_address and address.zip, update progress, send page view : go-to form.household
		 * else if the form is valid and we have data in both, update progress, send page view : go-to form.household
		 * else if the form is valid but there is data in either street_address or zip, set flag and send event of error
		 * else theres another error on the page, figure out what it is and send it
		 * **/

		$scope.completedAddress = function(){
			$scope.submitted_address = true;

			if($scope.snapForm.street_address.$pristine && $scope.snapForm.zip.$pristine){
				updateProgress('address');
				$scope.has_address = false;
				$state.go('form.lived-at-duration');
			}
			else if($scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid
				&& $scope.formData.address.street_address && $scope.formData.address.zip){
				updateProgress('address');
				$state.go('form.lived-at-duration');
			}
			else if(($scope.snapForm.street_address.$dirty || $scope.snapForm.zip.$dirty)
				&& ($scope.formData.address.street_address === "" || (typeof $scope.formData.address.street_address === "undefined"))
				&& ($scope.formData.address.zip === null || (typeof $scope.formData.address.zip === "undefined" )
				&& $scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid)){
				updateProgress('address');
				$scope.has_address = false;
				$state.go('form.lived-at-duration');
			}

		};

		$scope.completedLivedAt = function() {
			if($scope.formData.household && $scope.formData.income){
				$state.go('form.ssn');
			}
			else {
				$state.go('form.citizenship');
			}
		};


		/** *
		 * fn completedTelephone
		 *
		 * */

		$scope.completedTelephone = function(){
			$scope.submitted_phone = true;

			if($scope.snapForm.$valid) {
				$scope.submitting_app = true;
				updateProgress('telephone');
				$scope.remove_progress_bar = true;
				$scope.submitBasicApp();
				calcBenefitService.calculate($scope.formData);
			}

		};

		/**
		 * fn completedSSN
		 */

		$scope.completedSSN = function() {

			$scope.submitted_ssn = true;

			if(!$scope.formData.ssn && $scope.snapForm.ssn.$valid){
				showNoContactModal();
				submitted_ssn = false;
			}
			else if($scope.formData.ssn && $scope.snapForm.ssn.$valid){
				updateProgress('ssn');
				$state.go('form.telephone');
			}

		};

		/**
		 * fn completedIncome
		 *
		 */

		$scope.completedIncome = function () {
			$scope.submitted_income = true;

			if ($scope.snapForm.income.$valid) {
				updateProgress('income');
				$state.go('form.resources');
			}

		};

		/**
		 * fn completedHousehold
		 */

		$scope.completedHousehold = function() {
			$scope.submitted_household = true;

			if($scope.snapForm.household.$valid) {
				updateProgress('household');
				$state.go('form.income');
			}

		};

		$scope.completedResources = function() {
			$scope.submitted_resources = true;

			if($scope.snapForm.total_resources.$valid) {
				updateProgress('resources');
				$state.go('form.expenses')
			}


		}

		$scope.completedExpenses = function() {
			$scope.submitted_expenses = true;

			if($scope.snapForm.expenses.$valid){

				updateProgress('expenses');

				if(calcPotentialImmeditateBenefit()) {
					$scope.show_progress_bar = false;
					$state.go('form.quick-snap-1');
				}
				else {
					$state.go('form.ssn');
				}


			}
		};


		$scope.addToPaidUtilities = function(type) {
			if(typeof $scope.formData.utilities_paid === 'undefined') {
				$scope.formData.utilities_paid = [];
			}

			if($scope.formData.utilities_paid.indexOf(type) < 0) {
				$scope.formData.utilities_paid.push(type);
			}
			else {
				$scope.formData.utilities_paid.splice($scope.formData.utilities_paid.indexOf(type),1);
			}

		};

		$scope.goToNextQuickSnap = function(num) {
			if(num == 0){

				$state.go('form.quick-snap-eligible');

			}
			else {
				$state.go('form.quick-snap-' + num);
			}

		};

		$scope.inputOtherUtilities = function() {
			$scope.inputOtherUtils = true;
		};



		$scope.completedEligibilityIncome = function() {
			$scope.submitted_income = true;

			if ($scope.snapForm.income.$valid) {
				updateEligibilityProgress('income');
				$state.go('form.resources');
			}

			};

		$scope.completedEligibilityHousehold = function() {

			$scope.submitted_household = true;

			if($scope.snapForm.household.$valid) {
				updateEligibilityProgress('household');
				$state.go('form.income');
			}
		};

		$scope.completedEligibilityResources = function() {

			$scope.submitted_resources = true;
			if($scope.snapForm.total_resources.$valid) {
				updateEligibilityProgress('resources');
				$state.go('form.eligibility-expenses');
			}

		};

		$scope.completedCitizenship = function() {
			$scope.submitted_citizenship = true;

			if($scope.formData.citizenship){
				if($scope.formData.citizenship == 'none'){
					$state.go('form.ineligible');
				}
				else if($scope.goingThroughEligibility){
					updateEligibilityProgress('citizenship');
					$state.go('form.household');
				}
				else {
					updateProgress('citizenship');
					$state.go('form.household');
				}
			}
		};

		$scope.completedNonCitizenship = function() {
			$scope.submitted_non_citizen = true;

			if($scope.formData.non_citizen){

				if($scope.goingThroughEligibility){
					updateEligibilityProgress('citizenship');
					$state.go('form.household');
				}
				else {
					updateProgress('citizenship');
					$state.go('form.household');
				}
			}

		};

		$scope.completeEligibilityCalc = function() {
			$scope.submitted_expenses = true;
			if($scope.snapForm.expenses.$valid){
				calcBenefitService.calculate($scope.formData);
				updateProgress('expenses');
				$scope.show_elig_progress_bar = false;
				$scope.show_progress_bar = true;
				$scope.remove_progress_bar = true;

				$state.go('form.eligibility')
			}
		};


		function calcPotentialImmeditateBenefit() {
			return (
				$scope.formData.total_resources <= 100 ||
				$scope.formData.income <= 150 ||
				($scope.formData.income+$scope.formData.total_resources) <= $scope.formData.expenses
				);
		}


		/**
		 * fn showNoContactModal
		 * Show modal for no address nor phone entered (HRA cannot contact the user if so)
		 *
		 */
		function showNoContactModal() {
			$scope.modalShown = true;

		}

		$scope.$on('show-progress-bar', function() {
			console.log("show progress bar being called!!");
			$scope.show_progress_bar = true;
		});

		$scope.$on('dont-show-progress-bar', function() {

			$scope.show_progress_bar = false;
		});

		$scope.$on('remove_progress_bar', function() {
			$scope.remove_progress_bar = true;
		});

		$scope.$on('add-progress-bar', function() {
			$scope.remove_progress_bar = false;
		});

		$scope.$on('show-elig-progress-bar', function() {
			$scope.show_elig_progress_bar = true;
			$scope.show_progress_bar = false;
			$scope.goingThroughEligibility = true;
		});


		$scope.updateProgress = function(u) {
			updateProgress(u);
		};

		/**
		 * fn updateProgress
		 * @param u
		 * for a given step in the process u, update progress to reflect completed steps
		 */
		function updateProgress(u){
			$scope.completed_items[u] = true;
			$scope.progress = 0;
			for(var comp in $scope.completed_items){
				if($scope.completed_items[comp]){
					$scope.progress += 12.5;
				}
			}
		}

		function updateEligibilityProgress(u){
			$scope.eligibilityCompleted[u] = true;
			$scope.eligibility_progress = 0;
			for(var comp in $scope.eligibilityCompleted){
				if($scope.eligibilityCompleted[comp]){
					$scope.eligibility_progress += 20;
				}
			}
		}

		/**
		 * fn submitBasicApp
		 * Called when the user attempts to submit their app form the basic-confirmation page
		 * Submit button is only active when user checks box for app submission/approval
		 * Calls API.uploadbasicInfo which takes the entire formData object and POSTS to server
		 * On success, store user_id that's returned from server and send page view analytic for
		 * /form/app-submitted.
		 * On failure, alert with error message and re-enable submit
		 *
		 */
		$scope.submitBasicApp = function() {
			calcBenefitService.calculate($scope.formData);
			updateProgress('confirmation');

			API.uploadBasicInfo($scope.formData, function(result, user_id){
				if(result && user_id) {
					$scope.formData.user_id = user_id;
					userDataFactory.userData.user.formData = $scope.formData;
					$scope.remove_progress_bar = true;
					$state.go('form.basic-app-submitted');

				}
				else {
					$scope.submitting_app = false;
					alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
				}
			});
		};

		/**
		 * fn submitFeedback
		 * Event handler for submitting feedback once app has been submitted.
		 * Requires rating is non negitive value.
		 * Alerts if no rating is selected and user tries to submit
		 * Alerts if feedback-submitted API returns failure.
		 *
		 * @param rating
		 */

		$scope.submitFeedback = function(rating) {
			$scope.formData['rating'] = rating;

			if(rating.value != "-1" ) {
				API.uploadFeedback($scope.formData, function(result){
					if(result) {

						$state.go('form.feedback-submitted');

					}
					else {
						alert("Oops Looks like something went wrong. Your feedback was NOT submitted. Please wait and try again.")
					}
				})
			}
			else {
				alert("You must select a rating first!")
			}
		};


		/**
		 * fn goBack
		 * Event handler for back button on top left of page
		 */
		$scope.goBack = function() {
			/*
			 hack so that user cannot go back after submitting an app
			 Not really effective since they can just use their back button on their browser
			 */

			if($state.current.name !== 'form.basic-app-submitted'){
				window.history.back();
			}


		};

		/**
		 * TODO Fix this for v2 release
		 * rootScope watcher
		 * show progress bar if state is anything but intro
		 * Scroll to top if going from form.intro
		 */
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){


			if(toState.name == 'form.intro') {
				$window.scrollTo(0,0);
				$scope.show_progress_bar = true;
				$scope.goingThroughEligibility = false;
				$scope.show_progress = false;

			}
			else {
				if($scope.goingThroughEligibility && toState.name == 'form.name'){
					$scope.show_progress_bar = true;
				}

				$scope.show_progress = true;
			}

			/*if((toState.name === 'form.name' ||
				toState.name === 'form.address' ||
				toState.name === 'form.telephone' ||
				toState.name === 'form.basic-confirmation'||
				toState.name === 'form.basic-app-submitted' ||
				toState.name === 'form.income' ||
				toState.name === 'form.household' ||
				toState.name === 'form.feedback-submitted' ||
				toState.name === 'form.recert' ||
				toState.name === 'form.document-upload' ||
				toState.name === 'form.document-detail' ||
				toState.name === 'form.eligibility' ||
				toState.name === 'form.eligibility-expenses' ||
				toState.name === 'form.expenses' ||
				toState.name === 'form.redirect' ||
				toState.name === 'form.ssn' ||
				toState.name === 'form.citizenship' ||
				toState.name === 'form.ineligible' ||
				toState.name === 'form.non-citizen' ||
				toState.name === 'form.citizenship-false' ||
				toState.name === 'form.resources'
				)) {

				if($scope.goingThroughEligibility && toState.name == 'form.name'){
					$scope.show_progress_bar = true;
				}

				$scope.show_progress = true;

			}
			else {
				if(fromState.name === 'form.intro') {
					$window.scrollTo(0,0);
				}

				if(toState.name == 'form.intro') {
					$scope.show_progress_bar = true;
					$scope.goingThroughEligibility = false;
				}

				$scope.show_progress = false;
			}*/
		});




	}]);
/**
 * Created by airswoop1 on 7/31/14.
 */


angular.module('formApp.interviewConfig', ['ui.router', 'formApp.userDataFactory'])
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	/************************ Step 2 - INTERVIEW ****************/
	$stateProvider

	.state('int', {
		url:'/interview',
		templateUrl:'templates/interview/interview.html',
		controller: 'interviewCtrl'
	})

		.state('int.main', {
			url:'/main',
			templateUrl:'templates/interview/interview-main.html'
		})

		.state('int.ssn', {
			url:'/ssn',
			templateUrl:'templates/interview/interview-ssn.html'
		})

		.state('int.dob', {
			url:'/dob',
			templateUrl:'templates/interview/interview-dob.html'
		})

		.state('int.self-gender', {
			url:'/gender',
			templateUrl:'templates/interview/interview-self-gender.html'
		})

		.state('int.marital_status', {
			url:'/marital_status',
			templateUrl:'templates/interview/interview-marital-status.html'
		})

		.state('int.state_id', {
			url:'/state_id',
			templateUrl:'templates/interview/interview-self-state-id.html'
		})

		.state('int.school', {
			url:'/school',
			templateUrl:'templates/interview/interview-self-school.html'
		})

		.state('int.school-grade', {
			url:'/school-grade',
			templateUrl:'templates/interview/interview-self-grade.html'
		})

		.state('int.school-name', {
			url:'/school-name',
			templateUrl:'templates/interview/interview-self-school-name.html'
		})

		.state('int.school-FT', {
			url:'/school-FT',
			templateUrl:'templates/interview/interview-self-school-ft.html'
		})

		.state('int.pregnant', {
			url:'/pregnant',
			templateUrl:"templates/interview/interview-self-pregnant.html"
		})

		.state('int.pregnant-due-date', {
			url:'/pregnant-due-date',
			templateUrl:"templates/interview/interview-self-pregnant-due-date.html"
		})

		.state('int.pregnant-num-babies', {
			url:'/pregnant-num-babies',
			templateUrl:"templates/interview/interview-self-pregnant-num-babies.html"
		})

		.state('int.disabled', {
			url:'/disabled_or_pregnant',
			templateUrl:'templates/interview/interview-disabled.html'
		})

		.state('int.citizen', {
			url:'/citizen',
			templateUrl:'templates/interview/interview-citizen.html'
		})

		.state('int.household', {
			url:'/household-names',
			templateUrl:'templates/interview/interview-household-names.html'
		})

		.state('int.household-applying', {
			url: '/household-applying',
			templateUrl: 'templates/interview/interview-household-applying.html'
		})

		.state('int.household-ssn', {
			url: '/household-ssn',
			templateUrl: 'templates/interview/interview-household-ssn.html'
		})

		.state('int.household-gender', {
			url: '/household-gender',
			templateUrl: 'templates/interview/interview-household-gender.html'
		})

		.state('int.household-state-id', {
			url:'/household-state-id',
			templateUrl: 'templates/interview/interview-household-state-id.html'
		})

		.state('int.household-marital-status',{
			url:'/household-marital-status',
			templateUrl:'templates/interview/interview-household-marital-status.html'
		})

		.state('int.household-lives-with',{
			url:'/household-lives-with',
			templateUrl:'templates/interview/interview-household-lives-with.html'
		})

		.state('int.household-in-school',{
			url:'/household-in-school',
			templateUrl:'templates/interview/interview-household-in-school.html'
		})

		.state('int.household-pregnant',{
			url:'/household-pregnant',
			templateUrl:'templates/interview/interview-household-pregnant.html'
		})

		.state('int.household-is-citizen',{
			url:'/household-is-citizen',
			templateUrl:'templates/interview/interview-household-citizenship.html'
		})

	/**      //Sex  - - int.household-gender
	 //Driver's license #  - - int.household-state-id *****
	 //marital status // int.household-marital-status
	 //Does this person live with you - - int.household-lives-with
	 //Is this person in school - - int.household-in-school
	 //is this person pregnant // int.household-pregnant
	 //is this person a us citizen or national //int.household-is-citizen
	 */

		.state('int.household-dob', {
			url: '/household-dob',
			templateUrl: 'templates/interview/interview-household-dob.html'
		})

		.state('int.household-relation', {
			url: '/household-relation',
			templateUrl: 'templates/interview/interview-household-relation.html'
		})

		.state('int.other-state-benefits', {
			url:'/other-benefits',
			templateUrl:'templates/interview/interview-household-other-state-benefits.html'
		})

		.state('int.disqualification', {
			url:'/disqualification',
			templateUrl:'templates/interview/interview-household-disqualification.html'
		})

		.state('int.other-name-applied', {
			url:'/other-name-applied',
			templateUrl:'templates/interview/interview-household-other-name-applied.html'
		})

		.state('int.in-military', {
			url:'/in-military',
			templateUrl:'templates/interview/interview-household-in-military.html'
		})

		.state('int.in-military-family', {
			url:'/in-military-family',
			templateUrl:'templates/interview/interview-household-in-military-family.html'
		})

		.state('int.foster-care', {
			url:'/foster-care',
			templateUrl:'templates/interview/interview-household-foster-care.html'
		})

		.state('int.foster-care-end', {
			url:'/foster-care-end',
			templateUrl:'templates/interview/interview-household-foster-care-end.html'
		})

		.state('int.medical-need', {
			url:'/medical-need',
			templateUrl:'templates/interview/interview-household-medical-need.html'
		})

		.state('int.medical-lt-care', {
			url:'/medical-lt-care',
			templateUrl:'templates/interview/interview-household-medical-lt-care.html'
		})

		.state('int.medical-unpaid', {
			url:'/medical-unpaid',
			templateUrl:'templates/interview/interview-household-medical-unpaid.html'
		})

		.state('int.domestic-abuse', {
			url:'/domestic-abuse',
			templateUrl:'templates/interview/interview-household-domestic-abuse.html'
		})

		.state('int.medical-medication', {
			url:'/medical-medication',
			templateUrl:'templates/interview/interview-household-medical-medication.html'
		})

		.state('int.drug-abuse', {
			url:'/drug-abuse',
			templateUrl:'templates/interview/interview-household-drug-abuse.html'
		})


		.state('int.criminal-defendant', {
			url:'/criminal-defendant',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone have a summons or warrant to appear as a defendant at a criminal court proceeding?";
				$scope.route_name = "criminal-defendant";
				$scope.data_name = "criminal_defendant";
				$scope.data_name_input = "criminal_defendant_input";
				$scope.to_route_name = "criminal-fines-payment";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.criminal-fines-payment', {
			url:'/criminal-fines-payment',
			templateUrl:'templates/interview/interview-household-criminal-fines-payment.html'
		})

		.state('int.criminal-payment-plan', {
			url:'/criminal-payment-plan',
			templateUrl:'templates/interview/interview-household-criminal-payment-plan.html'
		})

		.state('int.criminal-probation', {
			url:'/criminal-probation',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){

				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone on probation or parole?";
				$scope.route_name = "criminal-probation";
				$scope.data_name = "criminal_probation";
				$scope.data_name_input = "criminal_probation_input";
				$scope.to_route_name = "welfare-fraud";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})


		.state('int.welfare-fraud', {
			url:'/welfare-fraud',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){

				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone been convicted of welfare fraud?";
				$scope.route_name = "welfare-fraud";
				$scope.data_name = "welfare_fraud";
				$scope.data_name_input = "welfare_fraud_input";
				$scope.to_route_name = "law-enforcement";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.law-enforcement', {
			url:'/law-enforcement',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone fleeing from law enforcement?";
				$scope.route_name = "law-enforcement";
				$scope.data_name = "law_enforcement";
				$scope.data_name_input = "law_enforcement_input";
				$scope.to_route_name = "main";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})
	/**
	 ******************** END HOUSEHOLD
	 */



	/**
	 ******************** INCOME
	 */
		.state('int.income', {
			url:'/income',
			'templateUrl':'templates/interview/interview-income.html',
			controller:'interviewCtrl'
		})

		.state('int.other-income-worked-90-days', {
			url:'/worked-90-days',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone worked in the last 90 days?";
				$scope.route_name = "worked-90-days";
				$scope.data_name = "worked_90_days";
				$scope.data_name_input = "worked_90_days_input";
				$scope.to_route_name = "other-income-worked-reduced-hours";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.other-income-worked-reduced-hours', {
			url:'/worked-reduced-hours',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone had work hours reduced in the last 60 days?";
				$scope.route_name = "worked-reduced-hours";
				$scope.data_name = "worked_reduced_hours";
				$scope.data_name_input = "worked_reduced_hours_input";
				$scope.to_route_name = "stopped-working";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.stopped-working', {
			url:'/stopped-working',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone stopped working at one or more jobs in the past 30 days?";
				$scope.route_name = "stopped-working";
				$scope.data_name = "stopped_working";
				$scope.data_name_input = "stopped_working_input";
				$scope.to_route_name = "on-strike";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.on-strike', {
			url:'/on-strike',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Is anyone on strike?";
				$scope.route_name = "on-strike";
				$scope.data_name = "on_strike";
				$scope.data_name_input = "on_strike_input";
				$scope.to_route_name = "on-social-security";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.on-social-security', {
			url:'/on-social-security',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone received Social Security in the past?";
				$scope.route_name = "on-social-security";
				$scope.data_name = "on_social_security";
				$scope.data_name_input = "on_social_security_input";
				$scope.to_route_name = "on-ssi";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.on-ssi', {
			url:'/on-ssi',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone received Supplemental Security Income in the past?";
				$scope.route_name = "on-ssi";
				$scope.data_name = "on_ssi";
				$scope.data_name_input = "on_ssi_input";
				$scope.to_route_name = "applied-for-workers-comp";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.applied-for-workers-comp', {
			url:'/applied-for-workers-comp',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for workers' compensation?";
				$scope.route_name = "applied-for-workers-comp";
				$scope.data_name = "applied_for_workers_comp";
				$scope.data_name_input = "applied_for_workers_comp_input";
				$scope.to_route_name = "applied-for-social-security";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.applied-for-social-security', {
			url:'/applied-for-social-security',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for social security?";
				$scope.route_name = "applied-for-social-security";
				$scope.data_name = "applied_for_social_security";
				$scope.data_name_input = "applied_for_social_security_input";
				$scope.to_route_name = "applied-for-unemployment-compensation";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.applied-for-unemployment-compensation', {
			url:'/applied-for-unemployment-compensation',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for unemployment compensation?";
				$scope.route_name = "applied-for-unemployment-compensation";
				$scope.data_name = "applied_for_workers_comp";
				$scope.data_name_input = "applied_for_workers_comp_input";
				$scope.to_route_name = "applied-for-veterans-benefits";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.applied-for-veterans-benefits', {
			url:'/applied-for-veterans-benefits',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for veterans benefits?";
				$scope.route_name = "applied-for-veterans-benefits";
				$scope.data_name = "applied_for_veterans_benefits";
				$scope.data_name_input = "applied_for_veterans_benefits_input";
				$scope.to_route_name = "applied-for-ssi";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
				console.log($scope.current_user);
			}]
		})

		.state('int.applied-for-ssi', {
			url:'/applied-for-ssi',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Has anyone applied for Supplemental Security Income (SSI)?";
				$scope.route_name = "applied-for-ssi";
				$scope.data_name = "applied_for_ssi";
				$scope.data_name_input = "applied_for_ssi_input";
				$scope.to_route_name = "daycare-for-school";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.$parent.user;
				$scope.show_input = false;
			}]
		})

		.state('int.daycare-for-school', {
			url:'/daycare-for-school',
			templateUrl:'templates/interview/interview-household-pay-care-for-school.html',
			controller: 'interviewCtrl'
		})


		.state('int.cost-for-income', {
			url:'/cost-for-income',
			templateUrl:'templates/interview/interview-yesno-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory){
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does it cost anyone anything to get the income listed above? (Such as transportation costs, court fees, bank or guardian fees, etc.)?";
				$scope.route_name = "cost-for-income";
				$scope.data_name = "cost_for_income";
				$scope.data_name_input = "cost_for_income_input";
				$scope.to_route_name = "resources";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;
			}]
		})


		.state('int.resources', {
			url: '/resources',
			templateUrl: 'templates/interview/interview-resources.html',
			controller: 'interviewCtrl'
		})

		.state('int.resources-expecting-money', {
			url:'/resources-expecting-money',
			templateUrl: 'templates/interview/interview-resources-expecting-money.html'
		})

		.state('int.resources-sold-stuff', {
			url:'/resources-sold-stuff',
			templateUrl:'templates/interview/interview-resources-sold-stuff.html'
		})

		.state('int.resources-own-property', {
			url:'/resources-own-property',
			templateUrl:'templates/interview/interview-household-yesnowho-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;
				$scope.title = "Does anyone own any homes or property that they don’t live in?";
				$scope.route_name = "resources-own-property";
				$scope.data_name = "resources_own_property";
				$scope.to_route_name = "resources-owned-vehicles";
				$scope.model_for_route = $scope.current_user;
				$scope.model_for_input = $scope.current_user;
				$scope.show_input = false;

			}]
		})

	/**
	 * *************** END INCOME
	 */



	/**
	 * **************** EXPENSES
	 */

		.state('int.expenses-child-support', {
			url:'/child-support-expenses',
			templateUrl:'templates/interview/interview-expenses-child-support-expenses.html',
			controller:'interviewCtrl'
		})


		.state('int.expenses-housing-assistance',{
			url:'/receive-housing-assistance',
			templateUrl:'templates/interview/interview-expenses-housing-assistance.html',
			controller:'interviewCtrl'
		})


		.state('int.monthly-expenses-rent', {
			url:'/monthly-expenses-rent',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "rent, mortgage or lot rent";
				$scope.alt_question = "Are meals included in your rent?";
				$scope.alt_question_data = 'rent_meals_included';
				$scope.route_name = 'monthly-expenses-rent';
				$scope.data_name = 'monthly_expenses_rent';
				$scope.to_route_name = 'monthly-expenses-condo';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}]

		})


		.state('int.monthly-expenses-condo', {
			url:'/monthly-expenses-condo',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "condominium fees";
				$scope.route_name = 'monthly-expenses-condo';
				$scope.data_name = 'monthly_expenses_condo';
				$scope.to_route_name = 'monthly-expenses-property-insurance';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.monthly-expenses-property-insurance', {
			url:'/monthly-expenses-property-insurance',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "property insurance";
				$scope.route_name = 'monthly-expenses-property-insurance';
				$scope.data_name = 'monthly_expenses_prop_insurance';
				$scope.to_route_name = 'monthly-expenses-property-taxes';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}]
		})

		.state('int.monthly-expenses-property-taxes', {
			url:'/monthly-expenses-property-taxes',
			templateUrl:'templates/interview/interview-monthly-expenses-template.html',
			controller: ["$scope", "userDataFactory", function($scope, userDataFactory) {
				$scope.current_user = userDataFactory.userData.user.formData;

				$scope.title = "property taxes";
				$scope.route_name = 'monthly-expenses-property-taxes';
				$scope.data_name = 'monthly_expenses_prop_taxes';
				$scope.to_route_name = 'expenses-utilities';
				$scope.model_for_route = $scope.current_user;
				$scope.show_input = false;
			}]

		})


		.state('int.expenses-utilities', {
			url: '/expenses-utilities',
			templateUrl: 'templates/interview/interview-expenses-utilities.html'
		})

		.state('int.expenses-medical', {
			url:'/expenses-medical',
			templateUrl:'templates/interview/interview-expenses-medical.html',
			controller:'interviewCtrl'
		})

	/**
	 * ******************* END EXPENSES
	 */


		.state('int.info-confirmation', {
			url: '/confirmation',
			templateUrl: 'templates/interview/interview-info-confirmation.html'
		})

		.state('int.info-review', {
			url:'/review',
			templateUrl: 'templates/interview/interview-review-app.html'
		})

		.state('int.info-esig-confirm', {
			url:'/confirm-esignature',
			templateUrl:'templates/interview/interview-esignature-legal.html'
		})

		.state('int.interview-preview-sign', {
			url: '/sign',
			templateUrl: 'templates/interview/interview-application-signature.html'
		})

		.state('int.app-submission', {
			url:'/submission',
			templateUrl:'templates/interview/interview-application-submission.html'
		});


}]);

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory','formApp.jSignature', 
		'formApp.CalcBenefitService']).controller('interviewCtrl',
	["$scope", "$state", "$rootScope", "$location", "$anchorScroll", "$window", "userDataFactory", "API", "calcBenefitService", function($scope, $state, $rootScope, $location, $anchorScroll, $window, userDataFactory, API, calcBenefitService){
		console.log("loading interview controller!");

		$scope.show_interview_progress=false;
		$scope.int_progress = 0;
		$scope.appSubmissionInProcess = false;
		$scope.show_sig1 = false;
		$scope.show_sig2 = false;
		$scope.show_esig_info = false;
		$scope.otherStateBenefits = false;
		$scope.inputDisqualified = false;
		$scope.inputDiffName = false;
		$scope.inputFosterCare = false;
		$scope.inputFosterCareEnd = false;
		$scope.inputMedNeed = false;
		$scope.inputMedMedication = false;


		$scope.interview_progress_status = 0;
		$scope.interview_steps = -1;
		//$scope.interview_steps = 5;
		$scope.user = userDataFactory.userData.user.formData; //? userDataFactory.userData.user.formData : {"household":1};
		$scope.user.household_members = (typeof $scope.user.household_members!== 'undefined') ? $scope.user.household_members : {};
		$scope.interviewCompleted = userDataFactory.userData.interviewProgress;
		$scope.estimated_benefit = $scope.user.benefit_amount;

		console.log($scope.user);

		$scope.today = new Date();
		var	dd = $scope.today.getDate(),
			mm = $scope.today.getMonth()+1,
			yyyy = $scope.today.getFullYear();

		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
		$scope.today = mm+'/'+dd+'/'+yyyy;

		$scope.user['disabled'] = 'no';

		$scope.minutes_saved = 0;

		if(!isEmpty($scope.user.household_members)){

			for(var i=0; i<$scope.user.household-1;i++ ){
				$scope.user.household_members[i] = {
					"applying":false,
			        "income":0,
					"show":false,
					"relation":'Select'
				};
			}
		}

		$scope.stepsCompleted = {

			"int.dob":false,
			"int.self-gender":false,
			"int.marital_status":false,
			"int.state_id":false,
			"int.school":false,
			"int.pregnant":false,

			"int.household":false,
			"int.household-applying":false,
			"int.household-ssn":false,
			"int.household-dob":false,
			"int.household-relation":false,

			"int.other-state-benefits":false,

			"int.income-frequency":false,
			"int.income-hours":false,
			"int.income-household-amount":false,
			"int.income-household-frequency":false,
			"int.resources":false,

			"int.expenses-mortgage":false
		};

		var interviewMinutesCategory = {
			"eligibility":5,
			"household":10,
			"income":5,
			"expenses":5
		};

		$scope.BoolOpts = [
			{"value":true, "name":"Yes"},
			{"value":false, "name":"No"}
		];

		$scope.YNOpts = [
			{"value":"yes", "name":"yes"},
			{"value":"no", "name":"no"}
		];

		$scope.Grade = [
			{"value":"K", "name":"Kindergarden"},
			{"value":"1", "name":"1st"},
			{"value":"2" ,"name":"2nd"},
			{"value":"3" ,"name":"3rd"},
			{"value":"4" ,"name":"4th"},
			{"value":"5" ,"name":"5th"},
			{"value":"6" ,"name":"6th"},
			{"value":"7" ,"name":"7th"},
			{"value":"8" ,"name":"8th"},
			{"value":"9" ,"name":"9th"},
			{"value":"10" ,"name":"10th"},
			{"value":"11" ,"name":"11th"},
			{"value":"12" ,"name":"12th"},
			{"value":"Freshman" ,"name":"College-Freshman"},
			{"value":"Sophomore" ,"name":"College-Sophomore"},
			{"value":"Junior" ,"name":"College-Junior"},
			{"value":"Senior" ,"name":"College-Senior"},
			{"value":"Graduate" ,"name":"Graduate"}

		];

		$scope.MaritalOpts = [
			{"value":"Single", "name":"Single"},
			{"value":"Married", "name":"Married"},
			{"value":"Divorced", "name":"Divorced"},
			{"value":"Separated", "name":"Separated"},
			{"value":"Widowed", "name":"Widowed"}
		];

		$scope.relationshipOptions = [
			{name:"Select", value:"Select"},
			{name:"Partner", value:"Partner"},
			{name:"Child", "value":"Child"},
			{name:"Parent", "value":"Parent"},
			{name:"Roommate", "value":"Roommate"},
			{name:"Family", "value":"Family"}
		];


		$scope.showHouseholdMember = function(k) {
			for(var n in  $scope.user.household_members){
				if($scope.user.household_members[n].name == k){
					$scope.user.household_members[n].show = !$scope.user.household_members[n].show;
				}
			}
		};

		$scope.hasApplyingMembers = function() {
			var isApplying = false;
			for(var member in $scope.user.household_members){
				isApplying = isApplying || $scope.user.household_members[member].applying;
			}
			return isApplying;
		}

		$scope.updateMinutes = function(num) {
			$scope.minutes_saved += num;
		};

		$scope.hasHouseholdMembers = function() {
			var has_members =false;
			for(var member in $scope.user.household_members){
				has_members = has_members || $scope.user.household_members[member].name;
			}
			return has_members;
		};

		$scope.current_resource_name = "";
		$scope.current_resource_kind = "";
		$scope.current_resource_amount = 0;
		$scope.current_resource_location = "";


		$scope.addResource = function() {

			if(!$scope.user.resources){
				$scope.user.resources = [];
			}

			$scope.user.resources.push({
				'person_name': $scope.current_resource_name,
				'type' : $scope.current_resource_kind,
				'amount' : $scope.current_resource_amount,
				'location' : $scope.currentresource_location
			});

			$scope.current_resource_name = "";
			$scope.current_resource_kind = "";
			$scope.current_resource_amount = 0;
			$scope.current_resource_location = "";

		};

		$scope.current_income_name = "";
		$scope.current_income_kind = "";
		$scope.current_income_amount = 0;
		$scope.current_income_frequency = "";
		$scope.current_income_recent_date = "";

		$scope.addIncome = function() {

			if(!$scope.user.incomes){
				$scope.user.incomes = [];
			}

			console.log($scope.current_income_name);
			console.log(typeof $scope.user.incomes);
			console.log($scope.user.incomes);
			console.log("trying to push to array");
			$scope.user.incomes.push({
				'person_name': $scope.current_income_name,
				'type' : $scope.current_income_kind,
				'amount' : $scope.current_income_amount,
				'frequency' : $scope.current_income_frequency,
				'recent_date' : $scope.current_income_recent_date
			});

			console.log($scope.user.incomes);

			$scope.current_income_name = "";
			$scope.current_income_kind = "";
			$scope.current_income_amount = 0;
			$scope.current_income_frequency = "";
			$scope.current_income_recent_date = "";

		};





		$scope.$on('int-main', function(meta, type){

			if(!$scope.interviewCompleted[type]){
				$scope.updateMinutes(interviewMinutesCategory[type]);
			}

			$scope.interviewCompleted[type] = true;
			$scope.show_interview_progress = false;
			calcBenefitService.calculate($scope.user);


			API.uploadPartialInterviewInfo($scope.user, function(result){
				if(result) {

				}
				else {
					alert("Oops! Looks like something went wrong. Your information was NOT submitted. Please refill your information");
				}
			});
		});

		$scope.$on('start-last-step', function() {
			API.uploadPartialInterviewInfo($scope.user, function(result){

			})
		});

		$scope.goToSignPage = function() {
			$state.go('int.interview-preview-sign');
			$scope.show_sig1 = true;
		};


		$scope.goToSig1 = function() {
			$scope.show_sig1 = true;
			$location.hash('sig_container1');
			$anchorScroll();
			document.getElementById('image_wrapper_1').scrollLeft = 467;
		};

		$scope.goToSig2 = function() {
			$scope.show_sig2 = true;
			$location.hash('sig_container2');
			$anchorScroll();
			document.getElementById('image_wrapper_5').scrollLeft = 163;
		};

		function updateProgress(name) {
			$scope.stepsCompleted[name] = true;
			$scope.int_progress = 0;
			for(var x in $scope.stepsCompleted) {
				if($scope.stepsCompleted[x] === true){
					$scope.int_progress += 2.5;
				}
			}
		}

		function updateProgressStatus(){
			if( $scope.interviewCompleted.eligibility &&
				$scope.interviewCompleted.household &&
				$scope.interviewCompleted.income && 
				$scope.interviewCompleted.expenses){
				$scope.interview_progress_status = 2;
			} else if ( !$scope.interviewCompleted.eligibility && 
						!$scope.interviewCompleted.household && 
						!$scope.interviewCompleted.income && 
						!$scope.interviewCompleted.expenses){
				$scope.interview_progress_status = 0;
			} else {
				$scope.interview_progress_status = 1;
			}

		}


		$rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState){
			if($state.current.name == 'int.interview-preview-sign') {
				$scope.goToSig1();
				document.getElementById('topOfSignPage').style.display = 'none';
			}
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
			if(fromState.name !== 'int.main' && $scope.int_progress < 100){
				updateProgress(fromState.name);
			}
			if(fromState.name == 'int.main') {
				$scope.show_interview_progress = true;
			}
			if(toState.name == 'int.main'){
				$scope.show_interview_progress = false;
			}

			switch(toState.name) {
			    case "int.dob":
				case "int.self-gender":
				case "int.marital_status":
				case "int.state_id":
				case "int.school":
				case "int.school-grade":
				case "int.school-name":
				case "int.school-FT":
				case "int.pregnant":
				case "int.pregnant-due-date":
				case "int.pregnant-num-babies":
			    case "int.disabled":
				//case "int.citizen":
			        $scope.interview_steps = 0;
			        break;
			    case "int.household":

				case "int.other-state-benefits":
				case "int.disqualification":
				case "int.other-name-applied":
				case "int.in-military":
				case "int.in-military-family":
				case "int.foster-care":
				case "int.foster-care-end":
				case "int.medical-need":
				case "int.medical-lt-care":
				case "int.medical-unpaid":
				case "int.domestic-abuse":
				case "int.medical-medication":
				case "int.drug-abuse":
				case "int.criminal-defendant":
				case "int.criminal-fines-payment":
				case "int.criminal-payment-plan":
				case "int.criminal-probation":
				case "int.welfare-fraud":
				case "int.law-enforcement":
				/*case "int.household-applying":
			    case "int.household-ssn":
			    case "int.household-dob":
			    case "int.household-relation":*/

			        $scope.interview_steps = 1;
			        break;
				case "int.income":
				case "int.other-income-worked-90-days":
				case "int.other-income-worked-reduced-hours":
				case "int.stopped-working":
				case "int.on-strike":
				case "int.on-social-security":
				case "int.on-ssi":
				case "int.applied-for-workers-comp":
				case "int.applied-for-social-security":
				case "int.applied-for-unemployment-compensation":
				case "int.applied-for-veterans-benefits":
				case "int.applied-for-ssi":
				case "int.daycare-for-school":
				case "int.cost-for-income":
				case "int.resources":
			        $scope.interview_steps = 2;
			        break;

				case "int.expenses-child-support":
				case "int.expenses-housing-assistance":
				case "int.monthly-expenses-rent":
				case "int.monthly-expenses-condo":
				case "int.monthly-expenses-property-insurance":
				case "int.monthly-expenses-property-taxes":
				case "int.expenses-utilities":
			    case "int.expenses-medical":
			        $scope.interview_steps = 3;
			        break;

				case "int.info-confirmation":
					$scope.goToTop();
					$scope.interview_steps = 4;
					break;
				case "int.interview-preview-sign":
				case "int.info-review":
					$scope.scrollUpSignPage();
					$scope.interview_steps = 5;
					break;
				case "int.app-submission":
					$scope.interview_steps = 6;
					break;
			    case "int.main":
			        $scope.interview_steps = -1;
			        break;
			    default:
			        //$scope.interview_steps = -1;
				    $scope.interview_steps = 4;
			}
			$scope.goToTop();
			updateProgressStatus();
		});


		$scope.inputOtherStateBenefits = function() {
			$scope.otherStateBenefits = true;
		};

		$scope.inputDisqualification = function() {
			$scope.inputDisqualified = true;
		};

		$scope.inputDifferentName = function() {
			$scope.inputDiffName = true;
		};

		$scope.inputInFosterCare = function() {
			$scope.inputFosterCare = true;
		};

		$scope.inputFosterCareEndedDueToAge = function() {
			$scope.inputFosterCareEnd = true;
		};

		$scope.inputMedicalNeed = function() {
			$scope.inputMedNeed = true;
		};



		$scope.getCity = function() {
			if(typeof $scope.user.address.zip !== 'undefined'){
				API.getCityFromZip($scope.user.address.zip, function(err, data){
					if(!err){
						$scope.user.address.city = (data.results[0].address_components[1].long_name.length > 27) ? data.results[0].address_components[1].short_name : data.results[0].address_components[1].long_name;
					}
					else {
						$scope.user.address.city = " ";
					}
				})
			}
			else {
				$scope.user.address.city = " ";
			}

		};


		function removeHouseholdMembersNotApplying() {
			for(var i=0; i<$scope.user.household-1;i++ ){
				if(typeof $scope.user.household_members[i] !== 'undefined' &&

					($scope.user.household_members[i].applying == false ||
					typeof $scope.user.household_members[i].name == 'undefined')){

					$scope.user.household_members[i].relation = ' ';
				}
			}
		}


		$scope.$on('process-app-data', function(){
			removeHouseholdMembersNotApplying();
			$scope.getCity();
			$scope.calcPersonsWithIncome();
		});


		$scope.calcPersonsWithIncome = function() {
			$scope.personsWithIncome = [];

			if(typeof $scope.user.monthly_income !== 'undefined'){
				$scope.personsWithIncome.push({
					'name': $scope.user.name.first_name + " " + $scope.user.name.last_name,
					'amount' : $scope.user.monthly_income,
					'hours_per_month' : (typeof $scope.user.hours_wk === 'number' && typeof $scope.user.wk_month === 'number') ? ($scope.user.wk_month * $scope.user.hours_wk) : " "
				})
			}

			for(var p in $scope.user.household_members){
				if($scope.user.household_members.hasOwnProperty(p) &&
					$scope.user.household_members[p].applying === true &&
					typeof $scope.user.household_members[p].income === 'number'){

					$scope.personsWithIncome.push({
						'name': $scope.user.household_members[p].name,
						'amount': $scope.user.household_members[p].income,
						hours_per_month: (typeof $scope.user.household_members[p].hours_wk === 'number' && typeof $scope.user.household_members[p].wk_month === 'number') ? ($scope.user.household_members[p].wk_month * $scope.user.household_members[p].hours_wk) : " "
					})

				}
			}

			$scope.personsWithIncome = ($scope.personsWithIncome.length > 3) ? $scope.personsWithIncome.slice(0,3) : $scope.personsWithIncome;

			console.log($scope.personsWithIncome);

		};




		$scope.submitSignedApplication = function() {
			if(typeof $scope.user.sig1 !== 'undefined' && typeof $scope.user.sig2 !== 'undefined' ){
				$scope.appSubmissionInProcess = true;
				API.uploadPartialInterviewInfo($scope.user, function(result){
					if(result) {
						$state.go('int.app-submission');
					}
					else {
						$scope.appSubmissionInProcess = false;
						alert("Oops! Looks like something went wrong. Your form was NOT submitted. Please wait and try again.");
					}
				});
			}
			else {
				alert("Note you must sign the form in both signature boxes in order to submit an application.");
			}
		};

		/**
		 * Takes the number in formData.household and allows ng-repeat to create n items
		 * @param n
		 * @returns {Array}
		 */
		$scope.getNumber = function(n) {
			return new Array(n-1);
		};

		/**
		 * Back Button
		 * **/
		$scope.goBack = function() {
			if($state.current.name === 'int.interview-preview-sign'){
				document.getElementById('topOfSignPage').style.display = 'block';
				$state.go('int.info-review');
			}
			else{
				window.history.back();
			}

		};

		$scope.goToTop = function() {
			$location.hash('topOfSignPage');
			$anchorScroll();
		};

		$scope.updateCurrentAndGoToNext = function(current, next) {
			console.log($scope.user);
			setTimeout( function() {
					updateProgress(current);
					$state.go(next);
				},200);
		};

		$scope.backToMainSign = function(index) {

			var img_container = document.getElementById('image_wrapper' + index),
				header = document.getElementById('page_header'+ index),
				pg_header = document.getElementById('sign_header'),
				tp_sign_page = document.getElementById('topOfSignPage');

			pg_header.style.display = 'block';
			tp_sign_page.style.display = 'block';

			header.style.display = 'none';

			img_container.style.display = 'none';
			img_container.style.bottom = '0';


			$location.hash('topOfSignPage');
			$anchorScroll();
		};


		$scope.expandThumbnail = function(index) {
			var img_container = document.getElementById('image_wrapper' + index),
				header = document.getElementById('page_header'+ index),
				pg_header = document.getElementById('sign_header'),
				tp_sign_page = document.getElementById('topOfSignPage');

			pg_header.style.display = 'none';
			tp_sign_page.style.display = 'none';

			header.style.display = 'block';
			header.style.position = 'absolute';
			header.style.top = '0';
			header.style.left = '0';

			img_container.style.display = 'block';
			img_container.style.position = 'absolute';
			img_container.style.top = '50px';
			img_container.style.left = '0';

			$location.hash('page_header' + index);
			$anchorScroll();
		};

		$scope.scrollDown = function() {
			$location.hash('confirm_anchor');
			$anchorScroll();
		};

		$scope.scrollUpSignPage = function() {
			$location.hash('sign_header');
			$anchorScroll();
		};

		function isEmpty(object) {

			for(var i in object) {
				if(object.hasOwnProperty(i)){
					return true;
				}
			}
			return false;
		}


	}]);