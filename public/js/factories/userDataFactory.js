/**
 * Created by airswoop1 on 7/30/14.
 */
angular.module('formApp.userDataFactory',[]).factory('userDataFactory',
	function(){

		this.DOC_STATUS = {
			"UPLOADED": 2,
			"IN_PROGRESS":1,
			"NOT_UPLOADED":0
		};

		var userData = {
			'docs' : {
				'IDENTITY':this.DOC_STATUS.NOT_UPLOADED,
				'RESIDENCE':this.DOC_STATUS.NOT_UPLOADED,
				'HOUSEHOLD_COMPOSITION':this.DOC_STATUS.NOT_UPLOADED,
				'AGE':this.DOC_STATUS.NOT_UPLOADED,
				'SSN':this.DOC_STATUS.NOT_UPLOADED,
				'CITIZENSHIP':this.DOC_STATUS.NOT_UPLOADED,
				'ALIEN_STATUS':this.DOC_STATUS.NOT_UPLOADED,
				'EARNED_INCOME':this.DOC_STATUS.NOT_UPLOADED,
				'ALT_INCOME':this.DOC_STATUS.NOT_UPLOADED,
				'RESOURCES':this.DOC_STATUS.NOT_UPLOADED
			},
			docProgress : {
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
			},

			'interviewProgress': {
				"eligibility":false,
				"household":false,
				"income":false,
				"expenses":false
			},

			'user':{
			 formData: {
			 "name": {
			 'first_name':undefined,
			 'last_name':undefined
			 },
			 "address":{
			 "street_address":undefined,
			 "zip":undefined
			 },
			 "phone":undefined
			 }
			 }
			/*'user' :  {
				formData : {

					name: { first_name: 'Kevin', last_name: 'Miller' },
					address:
					{ street_address: '4118 Crescent Street',
						apt_number: '4B',
						zip: 11101,
						city: 'Long Island City' },
					phone_main: 2016551789,
					household_members:
					{ '0':
						{ applying: true,
							income: 900,
							show: false,
							relation: 'Roommate',
							name: 'Tiernan Kiefer',
							ssn: 988999888,
							dob: '1989-04-06',
							hours_wk: 40,
							wk_month: 4 },
					'1':
						{ applying: true,
							income: 0,
							show: false,
							relation: 'Roommate',
							name: 'James Doyle',
							ssn: 898989887,
							dob: '1989-07-06',
							hours_wk: 30,
							wk_month: 2 },
					'2' :
					{ applying: true,
						income: 0,
						show: false,
						relation: 'Roommate',
						name: 'James Doyle',
						ssn: 898989887,
						dob: '1989-07-06',
						hours_wk: 30,
						wk_month: 2 },
					'3' :
					{ applying: true,
						income: 0,
						show: false,
						relation: 'Roommate',
						name: 'James Doyle',
						ssn: 898989887,
						dob: '1989-07-06',
						hours_wk: 30,
						wk_month: 2 },
					'4':{ applying: false,
						income: 0,
						show: false,
						relation: 'Roommate',
						name: 'James Doyle',
						ssn: 898989887,
						dob: '1989-07-06',
						hours_wk: 30,
						wk_month: 2 },'5':{ applying: true,
						income: 0,
						show: false,
						relation: 'Roommate',
						name: 'James Doyle',
						ssn: 898989887,
						dob: '1989-07-06',
						hours_wk: 30,
						wk_month: 2 },'6':{ applying: true,
						income: 0,
						show: false,
						relation: 'Family',
						name: 'James Doyle',
						ssn: 898989887,
						dob: '1989-07-06',
						hours_wk: 30,
						wk_month: 2 }},
					disabled: 'no',
					household: 3,
					income: 1500,
					eligibility_expenses: 800,
					benefit_amount: 497,
					user_id: '35b78335-521e-4ada-bdb3-b15fe7e0d0e2',
					ssn: 123456789,
					dob: '1877-11-28',
					marital: 'Single',
					personal_disabled: 'Yes',
					citizen: 'No',
					monthly_income: 1200,
					hours_wk: 40,
					wk_month: 4,
					total_resources: 140,
					rent: 900


				}
			}*/

		};




		return {
			"userData":userData
		};

	});