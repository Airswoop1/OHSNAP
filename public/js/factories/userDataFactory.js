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
				'HOUSING_EXPENSE':this.DOC_STATUS.NOT_UPLOADED,
				'AGE':this.DOC_STATUS.NOT_UPLOADED,
				'SSN':this.DOC_STATUS.NOT_UPLOADED,
				'CITIZENSHIP':this.DOC_STATUS.NOT_UPLOADED,
				'ALIEN_STATUS':this.DOC_STATUS.NOT_UPLOADED,
				'EARNED_INCOME':this.DOC_STATUS.NOT_UPLOADED,
				'ALT_INCOME':this.DOC_STATUS.NOT_UPLOADED,
				'RESOURCES':this.DOC_STATUS.NOT_UPLOADED,
				'OTHER':this.DOC_STATUS.NOT_UPLOADED
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

			/*'user':{
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
			}*/
			'user' :  {
			 formData : {
				 "name": {
					 "first_name": "Kevin",
					 "last_name": "Miller"
				 },
				 "address": {
					 "street_address": "4118 Crescent Street",
					 "apt_number": "4B",
					 "zip": 11101,
					 "city": "Long Island City"
				 },
				 "phone_main": 2016551789,
				 "household_members": {
					 "0": {
						 "applying": true,
						 "income": 900,
						 "show": false,
						 "relation": "other",
						 "name": "Tiernan Kiefer",
						 "ssn": 988999888,
						 "dob": "1989-04-06",
						 "hours_wk": 40,
						 "wk_month": 4,
						 "gender": "female",
						 "state_id": 123455,
						 "marital_status": "Married",
						 "lives_with": "yes",
						 "in_schoool": "yes"
					 },
					 "1": {
						 "applying": true,
						 "income": 0,
						 "show": false,
						 "relation": "child",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2,
						 "gender": "male",
						 "state_id": 6666666,
						 "marital_status": "Single",
						 "lives_with": "yes",
						 "in_schoool": "yes",
						 "student":'yes',
						 "school_grade": "Senior",
						 "schoolName": "Lehigh",
						 "studentFT": "yes",
						 "pregnant":'yes',
						 "pregnant_due_date": "2014-10-29",
						 "pregnant_num_babies": 1
					 },
					 "2": {
						 "applying": true,
						 "income": 0,
						 "show": false,
						 "relation": "child",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2,
						 "gender": "male",
						 "state_id": 6666666,
						 "marital_status": "Single",
						 "lives_with": "yes",
						 "in_schoool": "yes",
						 "student":'yes',
						 "school_grade": "Senior",
						 "schoolName": "Lehigh",
						 "studentFT": "yes",
						 "pregnant":"yes",
						 "pregnant_due_date": "2014-10-29",
						 "pregnant_num_babies": 1,
						 "citizen":"Yes"
					 },
					 "3": {
						 "applying": true,
						 "income": 0,
						 "show": false,
						 "relation": "child",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2,
						 "gender": "male",
						 "state_id": 6666666,
						 "marital_status": "Single",
						 "lives_with": "yes",
						 "in_schoool": "yes",
						 "student":'yes',
						 "school_grade": "Senior",
						 "schoolName": "Lehigh",
						 "studentFT": "yes",
						 "pregnant":"yes",
						 "pregnant_due_date": "2014-10-29",
						 "pregnant_num_babies": 1,
						 "citizen":"Yes"
					 },
					 "4": {
						 "applying": true,
						 "income": 0,
						 "show": false,
						 "relation": "child",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2,
						 "gender": "male",
						 "state_id": 6666666,
						 "marital_status": "Single",
						 "lives_with": "yes",
						 "in_schoool": "yes",
						 "student":'yes',
						 "school_grade": "Senior",
						 "schoolName": "Lehigh",
						 "studentFT": "yes",
						 "pregnant":"yes",
						 "pregnant_due_date": "2014-10-29",
						 "pregnant_num_babies": 1,
						 "citizen":"Yes"
					 },
					 "5": {
						 "applying": true,
						 "income": 0,
						 "show": false,
						 "relation": "child",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2,
						 "gender": "male",
						 "state_id": 6666666,
						 "marital_status": "Single",
						 "lives_with": "yes",
						 "in_schoool": "yes",
						 "student":'yes',
						 "school_grade": "Senior",
						 "schoolName": "Lehigh",
						 "studentFT": "yes",
						 "pregnant":"yes",
						 "pregnant_due_date": "2014-10-29",
						 "pregnant_num_babies": 1,
						 "citizen":"Yes"
					 },
					 "6": {
						 "applying": false,
						 "income": 0,
						 "show": false,
						 "relation": "Family",
						 "name": "James Doyle",
						 "ssn": 898989887,
						 "dob": "1989-07-06",
						 "hours_wk": 30,
						 "wk_month": 2
					 }
				 },
				 "disabled": "no",
				 "household": 3,
				 "income": 1500,
				 "eligibility_expenses": 800,
				 "benefit_amount": 497,
				 "user_id": "35b78335-521e-4ada-bdb3-b15fe7e0d0e2",
				 "ssn": 123456789,
				 "dob": "1877-11-28",
				 "marital": "Single",
				 "personal_disabled": "Yes",
				 "citizen": "No",
				 "monthly_income": 1200,
				 "hours_wk": 40,
				 "wk_month": 4,
				 "total_resources": 140,
				 "rent": 900,
				 "gender": "male",
				 "state_id": "12345",
				 "student": "yes",
				 "self_pregnant": "yes",
				 "school_grade": "Senior",
				 "schoolName": "Lehigh",
				 "studentFT": "yes",
				 "pregnant_due_date": "2014-10-29",
				 "pregnant_num_babies": 1,
				 "lived_at_duration":"0-3 Months",
				 "receiving_snap": "yes",
				 "other_state_benefits_input":"Kevin",
				 "snap_disqualification":"no",
				 "snap_disqualification_input":"James",
				 "different_name":'yes',
				 "different_name_input":"Mark",
				 "pay_for_telephone": "yes",
				 "pay_for_heating": "yes",
				 "in_military":"yes",
				 "in_military_family":"yes",
				 "foster_care":"yes",
				 "foster_care_input":"jimmy",
				 "foster_care_end":"no",
				 "foster_care_end_input_age":18,
				 "foster_care_end_input_state" : "NJ",
				 "medical_need":"yes",
				 "medical_need_input":"Ned",
				 "medical_need_input_disability":"bipolar",
				 "medical_lt_care":"yes",
				 "medical_unpaid":"yes",
				 "domestic_abuse":"no",
				 "medical_medication":"yes",
				 "medical_medication_input":"ME",
				 "drug_abuse":"yes",
				 "drug_abuse_input":"Jim",
				 "criminal_defendant":"yes",
				 "criminal_defendant_input":"Joe",
				 "pay_for_other_utilities": "yes",
				"criminal_fine_payment":"no",
				 "criminal_fine_payment_input":"Shawn",
				 "criminal_payment_plan":"no",
				 "criminal_probation":"yes",
				 "criminal_probation_input":"Fran",
				 "welfare_fraud":"yes",
				 "welfare_fraud_input":"Eric",
				 "law_enforcement":"no",
				 "resources" : [
					 {
						 "person_name": "Kevin",
						 "type": "Wages",
						 "amount": 1200,
						 "location": "Wells Fargo"
					 },
					 {
						 "person_name": "Andrew",
						 "type": "Savings",
						 "amount": 500,
						 "location": "BoA"
					 }
				 ],
				 "resources_expecting_money":"yes",
				 "resources_expecting_money_who":"Kevin",
				"resources_expecting_money_kind":"child support",
				 "resources_expecting_money_when":"tomorrow",
				 "resources_expecting_money_amount":1300,
				 "resources_sold_stuff":"yes",

				 "resources_sold_stuff_who":"Kevin",
				 "resources_sold_stuff_kind":"child support",
				 "resources_sold_stuff_when":"tomorrow",
				 "resources_sold_stuff_amount":1300,

				 "resources_own_property":"no",
				 "resources_own_property_input":"Kevin",

				 "resources_burial_agreement" : "yes",
				 "resources_burial_agreement_input":"Kevin :-(",
					"resources_num_vehicles_owned":0,

				 "resources_life_insurance":"yes",
				 "resources_life_insurance_input":"Kevin :-D",

				 "incomes": [
					 {
						 "person_name": "Kevin",
						 "type": "Wages",
						 "amount": 1200,
						 "frequency": "Daily",
						 "recent_date": "2014-02-03"
					 },
					 {
						 "person_name": "Mark",
						 "type": "Winnings",
						 "amount": 500,
						 "frequency": "Biweekly",
						 "recent_date": "2015-04-04"
					 }
				 ],

				 "child_support_expense":"yes",
				 "child_support_expense_court_ordered":"yes",

				 "housing_assistance":"yes",
				 "housing_assistance_input":"Mark",
				 "housing_assistance_allowance":"yes",

				 "monthly_expenses_condo_lives_with":"yes",
				 "monthly_expenses_condo_other":0,
				 "monthly_expenses_condo_amount":900,

				 "monthly_expenses_prop_insurance_amount":1000,
				"monthly_expenses_prop_insurance_other":500,
				 "monthly_expenses_prop_insurance_lives_with":"yes",


				 "utilities": {
					 "electric": true,
					 "water": true,
					 "phone": true,
					 "oil": true,
					 "other": true,
					 "other_name": "Hydrogen, Solar"
				 },

				 medical_expenses:{
					 "hospital": true,
					 "prescription_medicines": true,
					 "dental": true,
					 "general_costs": true,
					 "other": true,
					 "other_name": "hurry cane"
				 },

				 "utilities_paid": [
					 "sewer",
					 "installation",
					 "garbage"
				 ],
				 "migrant_worker": "yes",
				 "shelter_abused": "yes"
			 }
			 }

		};

		return {
			"userData":userData
		};

	});