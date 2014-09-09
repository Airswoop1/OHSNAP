/**
 * Created by airswoop1 on 7/31/14.
 */

angular.module('formApp.interviewCtrl',['formApp.userDataFactory', 'formApp.apiFactory','formApp.jSignature']).controller('interviewCtrl',
	function($scope, $state, $rootScope, $location, $anchorScroll, $window, userDataFactory, API){


		$scope.show_interview_progress=false;
		$scope.int_progress = 0;
		$scope.appSubmissionInProcess = false;
		$scope.show_sig1 = false;
		$scope.show_sig2 = false;

		$scope.interview_progress_status = 0;
		$scope.interview_steps = -1;
		//$scope.interview_steps = 4;
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
			"int.ssn":false,
			"int.dob":false,
			"int.marital_status":false,
			"int.disabled":false,
			"int.citizen":false,
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


		$scope.goToSig1 = function() {
			console.log("Trying to go to sig1");
			var img1 = document.getElementById('image_wrapper1'),
				img2 = document.getElementById('image_wrapper2'),
				img3 = document.getElementById('image_wrapper3'),
				img4 = document.getElementById('image_wrapper4'),
				img5 = document.getElementById('image_wrapper5'),
				h1 = document.getElementById('page_alt_header1'),
				h2 = document.getElementById('page_alt_header2'),
				h3 = document.getElementById('page_alt_header3'),
				h4 = document.getElementById('page_alt_header4'),
				h5 = document.getElementById('page_alt_header5');

			img1.style.display = 'block';
			img1.style.opacity = '1';
			img2.style.display = 'block';
			img3.style.display = 'block';
			img4.style.display = 'block';
			img5.style.display = 'block';
			img5.style.opacity = '1';

			h1.style.display = 'block';
			h2.style.display = 'block';
			h3.style.display = 'block';
			h4.style.display = 'block';
			h5.style.display = 'block';

			h1.style.position = 'relative';
			h2.style.position = 'relative';
			h3.style.position = 'relative';
			h4.style.position = 'relative';
			h5.style.position = 'relative';

			img1.style.position = 'relative';
			img2.style.position = 'relative';
			img3.style.position = 'relative';
			img4.style.position = 'relative';
			img5.style.position = 'relative';


			$scope.show_sig1 = true;
			$location.hash('sig_container1');
			$anchorScroll();
			document.getElementById('image_wrapper1').scrollLeft = 467;
		};

		$scope.goToSig2 = function() {
			$scope.show_sig2 = true;
			$location.hash('sig_container2');
			$anchorScroll();
			document.getElementById('image_wrapper2').scrollLeft = 163;
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
				$state.go('int.info-confirmation');
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
				tp_sign_page = document.getElementById('topOfSignPage'),
				sign_btn = document.getElementById('goToFirstSigButton');



			pg_header.style.display = 'block';
			tp_sign_page.style.display = 'block';

			header.style.display = 'none';

			if(index === 1 || index === 5){
				img_container.style.opacity = '0';
				img_container.style.zIndex = '0';
			}
			else {
				img_container.style.display = 'none';
			}

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



			if(index === 1 || index === 5){

				img_container.style.zIndex = '1000';
				img_container.style.opacity = '1';
			}
			else {
				img_container.style.display = 'block';
			}
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


	});