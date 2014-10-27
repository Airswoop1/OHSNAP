/**
 * Created by airswoop1 on 7/31/14.
 */


angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory','formApp.jSignature', 
		'formApp.CalcBenefitService']).controller('interviewCtrl',
	function($scope, $state, $rootScope, $location, $anchorScroll, $window, userDataFactory, API, calcBenefitService){
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
				'location' : $scope.current_resource_location
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
			        $scope.interview_steps = -1;
				    //$scope.interview_steps = 4;
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

			setTimeout( function() {
					updateProgress(current);
					$state.go(next);
				},200);
		};

		/**
		 *
		 * @param current - current state to update
		 * @param next - state to transition to if condition is not met
		 * @param condition - condition to logically compare
		 * @param condition_next - if condition is met transition to this state
		 */
		$scope.updateCurrentAndGoToNextConditional = function(current, next, condition, condition_next) {

			updateProgress(current);
			var shouldBranch = false;
			for(var x in  $scope.user.household_members) {
				if($scope.user.household_members[x][condition] === 'yes') {
					shouldBranch  = true;
				}
			}

			if(shouldBranch) {
				$state.go(condition_next);
			}
			else {
				$state.go(next);
			}

		};


		/**
		 * Should be using a directive here...
		 * @param index
		 */
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


	});