/**
 * Created by airswoop1 on 7/23/14.
 */

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
			} else if($state.params.type == "EARNED_INCOME") {
				return "INCOME";
			} else {
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
		'NoContactModal','formApp.infoFooterDirective', 'formApp.ngEnterDirective',
		'formApp.telephoneFilter', 'formApp.ssnFilter','formApp.apiFactory', 'formApp.appSubmittedDropdownDirective', 'formApp.feedbackFooterDirective',
		'formApp.modalDirective', 'formApp.documentUploadCtrl', 'formApp.userDataFactory']).controller('formController',
	["$scope", "$state", "$http", "$rootScope", "$upload", "$location", "$window", "API", "userDataFactory", function($scope, $state, $http, $rootScope, $upload, $location, $window, API, userDataFactory) {

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

		$scope.completed_items = {
			"name": false,
			"address": false,
			"telephone" : false,
			"income" : false,
			"household" : false,
			"expenses":false,
			"ssn":false,
			"citizenship":false,
			"confirmation" : false
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
		 * fn: initNameStart
		 * attempt to parse value of name input on intro screen
		 * if person enters string value with no spaces it is first_name : go-to form.name
		 * if person enters string value with space consider it first_name + " " + last_name : go-to form.address
		 * if person enters string with more than 3 spaces then there is a first middle and last name : go-to form.address
		 * if person enters no value : go-to form.name
		 * */
		$scope.initNameStart = function(){
			var split_name = ""

			if($scope.formData.name.entered_name){
				split_name = ($scope.formData.name.entered_name).split(' ');
				$window.ga('send','event','name','tap','exists',1);
			}
			else {
				$window.ga('send','event','name','tap','empty',1);
			}

			$scope.formData.name.first_name = split_name[0];

			if((split_name.length === 1) && (split_name !== "")) {
				$scope.completed_first_name = true;
				$state.go('form.name');

			}
			else if(split_name.length === 2) {
				this.formData.name.last_name = split_name[1];
				updateProgress('name');
				$state.go('form.address');
			}
			else if(split_name.length >= 3) {
				this.formData.name.middle_name = split_name[1];
				this.formData.name.last_name = split_name[2];
				updateProgress('name');

				$state.go('form.address');


			}
			else {

				$state.go('form.name');

			}
		};

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
				if($scope.formData.household && $scope.formData.income){
					$state.go('form.telephone');
				}
				else {
					$state.go('form.citizenship');
				}
			}
			else if($scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid
				&& $scope.formData.address.street_address && $scope.formData.address.zip){
				updateProgress('address');
				if($scope.formData.household && $scope.formData.income){
					$state.go('form.telephone');
				}
				else {
					$state.go('form.citizenship');
				}
			}
			else if(($scope.snapForm.street_address.$dirty || $scope.snapForm.zip.$dirty)
				&& ($scope.formData.address.street_address === "" || (typeof $scope.formData.address.street_address === "undefined"))
				&& ($scope.formData.address.zip === null || (typeof $scope.formData.address.zip === "undefined" )
				&& $scope.snapForm.street_address.$valid && $scope.snapForm.zip.$valid)){
				updateProgress('address');
				$scope.has_address = false;
				if($scope.formData.household && $scope.formData.income){
					$state.go('form.telephone');
				}
				else {
					$state.go('form.citizenship');
				}
			}

		};


		/** *
		 * fn completedTelephone
		 *
		 * */

		$scope.completedTelephone = function(){
			$scope.submitted_phone = true;

			console.log($scope.snapForm.phone);

			if(!$scope.formData.phone_main && $scope.snapForm.phone.$pristine) {

			}
			else if($scope.snapForm.$valid) {
				updateProgress('telephone');
				$scope.remove_progress_bar = true;
				$scope.submitBasicApp();
				calculateBenefit();
			}

		};

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

				$state.go('form.expenses');

			}
			else {
				var field_invalid = $scope.snapForm.$error,
					which = "";
				if(field_invalid.minlength){
					which = 'income_length';
				}
				else if(field_invalid.number){
					which = 'income_nan'
				}
				$window.ga('send','event','income_validate','tap',which,1);
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
			else {
				$window.ga('send','event','household_validate','tap','bad',1);
			}
		};

		$scope.completedExpenses = function() {
			$scope.submitted_expenses = true;
			if($scope.snapForm.expenses.$valid){

				updateProgress('expenses');
				$state.go('form.ssn')
			}
		};


		$scope.completedEligibilityIncome = function() {
			$scope.submitted_income = true;

			if ($scope.snapForm.income.$valid) {
				updateEligibilityProgress('income');
				$state.go('form.eligibility-expenses');
			}

			};

		$scope.completedEligibilityHousehold = function() {

			$scope.submitted_household = true;
			if($scope.snapForm.household.$valid) {
				updateEligibilityProgress('household');
				$state.go('form.income');

			}
		};

		$scope.completedCitizenship = function() {
			$scope.submitted_citizenship = true;
			console.log($scope.snapForm.citizenship);

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

		$scope.completeEligibilityCalc = function() {
			$scope.submitted_expenses = true;
			if($scope.snapForm.expenses.$valid){
				calculateBenefit();
				updateProgress('expenses');
				$scope.show_elig_progress_bar = false;
				$scope.show_progress_bar = true;
				$scope.remove_progress_bar = true;

				$state.go('form.eligibility')
			}
		};


		/**
		 * fn calculateBenefit
		 * Use data from household and income to determine whether the individual is eligible for SNAP and if so
		 * how much they are eligible for.
		 * Uses the standard matrix provided by NYC HRA
		 */

		function calculateBenefit() {

			var house = ($scope.formData.household !== "undefined") ? $scope.formData.household : 1;
			var income = ($scope.formData.income !== "undefined") ? parseInt($scope.formData.income,10) : 0;
			if($scope.formData.eligibility_expenses) {
				income -= $scope.formData.eligibility_expenses;
				income = (income >= 0) ? income : 0;
			}
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
					$scope.progress += 25;
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
			calculateBenefit();
			updateProgress('confirmation');

			API.uploadBasicInfo($scope.formData, function(result, user_id){
				if(result && user_id) {
					$scope.formData.user_id = user_id;
					userDataFactory.userData.user.formData = $scope.formData;
					$scope.remove_progress_bar = true;
					$state.go('form.basic-app-submitted');

				}
				else {
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

			if((toState.name === 'form.name' ||
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
				toState.name === 'form.ineligible'
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
			}
		});




	}]);
/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory','formApp.jSignature']).controller('interviewCtrl',
	["$scope", "$state", "$rootScope", "$location", "$anchorScroll", "$window", "userDataFactory", "API", function($scope, $state, $rootScope, $location, $anchorScroll, $window, userDataFactory, API){


		$scope.show_interview_progress=false;
		$scope.int_progress = 0;
		$scope.appSubmissionInProcess = false;
		$scope.show_sig1 = false;
		$scope.show_sig2 = false;

		$scope.interview_progress_status = 0;
		$scope.interview_steps = -1;
		//$scope.interview_steps = 5;
		$scope.user = userDataFactory.userData.user.formData; //? userDataFactory.userData.user.formData : {"household":1};
		$scope.user.household_members = (typeof $scope.user.household_members!== 'undefined') ? $scope.user.household_members : {};
		$scope.interviewCompleted = userDataFactory.userData.interviewProgress;
		$scope.estimated_benefit = $scope.user.benefit_amount;

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
			//"int.ssn":false,
			"int.dob":false,
			"int.marital_status":false,
			"int.disabled":false,
			//"int.citizen":false,
			"int.household":false,
			"int.household-applying":false,
			"int.household-ssn":false,
			"int.household-dob":false,
			"int.household-relation":false,
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
			{"value":"Yes", "name":"Yes"},
			{"value":"No", "name":"No"}
		];

		$scope.MaritalOpts = [
			{"value":"Single", "name":"Single"},
			{"value":"Divorced", "name":"Divorced"},
			{"value":"Married", "name":"Married"}

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


		$scope.$on('int-main', function(meta, type){

			if(!$scope.interviewCompleted[type]){
				$scope.updateMinutes(interviewMinutesCategory[type]);
			}

			$scope.interviewCompleted[type] = true;
			$scope.show_interview_progress = false;
			calculateBenefit();


			API.uploadPartialInterviewInfo($scope.user, function(result){
				if(result) {

				}
				else {
					alert("Oops! Looks like something went wrong. Your information was NOT submitted. Please refill your information");
				}
			});
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
					$scope.int_progress += 7.4;
				}
			}
		};

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

		function calculateBenefit() {

			var applying = $scope.interviewCompleted.household ? 1 : $scope.user.household,
				income = (typeof $scope.user.monthly_income !== 'undefined') ? $scope.user.monthly_income : parseInt($scope.user.income),
				expenses = (typeof $scope.user.eligibility_expenses !== 'undefined') ? $scope.user.eligibility_expenses : 0;

			if(typeof $scope.user.rent !== 'undefined'){
				expenses += parseInt($scope.user.rent);
			}

			for(var users in $scope.user.household_members){

				if($scope.user.household_members[users].applying){
					applying += 1;
					income += (typeof $scope.user.household_members[users].income !== 'undefined') ? parseInt($scope.user.household_members[users].income) : 0;
				}

			}

			var house = applying;
			var grossIncome = income - expenses;
			var benefit = 0;
			var eligible = false;


			if($scope.user.personal_disabled === "Yes" || $scope.user.disabled === "yes") {

				if( (house === 1 && grossIncome <= 1915) ||
					(house === 2 && grossIncome <= 2585) ||
					(house === 3 && grossIncome <= 3255) ||
					(house === 4 && grossIncome <= 3925) )
				{
					eligible = true;
				}
				else if(house >= 5 && (grossIncome <= (((house-4)*670)+3925)) ){
					eligible = true;
				}
			}
			else {
				if( (house === 1 && grossIncome <= 1245) ||
					(house === 2 && grossIncome <= 1681) ||
					(house === 3 && grossIncome <= 2116) ||
					(house === 4 && grossIncome <= 2552) )
				{
					eligible = true;
				}
				else if(house >= 5 && (grossIncome <= (((house-4)*436)+2552)) ){
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

			$scope.estimated_benefit = benefit;

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
			    case "int.ssn":
			    case "int.dob":
			    case "int.marital_status":
			    case "int.disabled":
			    case "int.citizen":
			        $scope.interview_steps = 0;
			        break;
			    case "int.household":
			    case "int.household-applying":
			    case "int.household-ssn":
			    case "int.household-dob":
			    case "int.household-relation":
			        $scope.interview_steps = 1;
			        break;
			    case "int.income-frequency":
			    case "int.income-hours":
			    case "int.income-household-amount":
			    case "int.income-household-frequency":
			        $scope.interview_steps = 2;
			        break;
			    case "int.resources":
			    case "int.expenses-mortgage":
			        $scope.interview_steps = 3;
			        break;
				case "int.info-confirmation":
					$scope.goToTop();
					$scope.interview_steps = 4;
					break;
				case "int.interview-preview-sign":
				case "int.info-review":
					$scope.interview_steps = 5;
					break;
			    case "int.main":
			        $scope.interview_steps = -1;
			        break;
			    default:
			        //$scope.interview_steps = -1;
				    $scope.interview_steps = 4;
			}
			updateProgressStatus();
		});



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


		$scope.$on('process-app-data', function(){
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
						$state.go('upload.documents');
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

		function isEmpty(object) {

			for(var i in object) {
				if(object.hasOwnProperty(i)){
					return true;
				}
			}
			return false;
		}


	}]);