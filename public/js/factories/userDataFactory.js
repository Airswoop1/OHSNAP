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

			'user':{}

		/*user: { "formData": {
			"address": {
			"street_address": "4118 Crescent St.",
				"apt_number": "4B",
				"zip": 11101
		},
			"benefit_amount": 632,
			"citizen": "Yes",
			"created_on": 1407173182710,
			"created_on_readable": "Mon Aug 04 2014 13:30:11 GMT-0400 (EDT)",
			"disabled": "No",
			"dob": "2013-11-30",
			"documents": [
			{
				"name": "citizenship",
				"file_name": "kjb_xmas_darker3.jpg",
				"file_type": "image/jpeg"
			}
		],
			"expenses": {
			"utilities_total": 0
		},
			"hours_wk": 23,
			"household": 5,
			"household_members": {
			"0": {
				"applying": true,
					"income": 0,
					"name": "Mike Duch",
					"ssn": "1231231234",
					"dob": "2012-12-30",
					"relation": {
					"relation": "Parent"
				}
			},
			"1": {
				"applying": false,
					"income": 0,
					"name": "Mark Kasey"
			},
			"2": {
				"applying": false,
					"income": 0,
					"name": "Hi Wang"
			},
			"3": {
				"applying": true,
					"income": 0,
					"name": "Jamie Miller",
					"ssn": "123123123",
					"dob": "2011-12-31",
					"relation": {
					"relation": "Other family member"
				}
			}
		},
			"income": 800,
			"last_modified": 1407173411734,
			"marital": "Single",
			"name": {
			"entered_name": "Kevin",
				"first_name": "Kevin",
				"last_name": "Miller"
		},
			"personal_disabled": "No",
			"phone_main": 2016551789,
			"ssn": "1231231234",
			"total_resources": 0,
			"user_id": "fdb3c086-ab2a-47ed-ba74-a7e3768f9387",
			"utilities": {
			"rent": 0
		},
			"wk_month": 4
		}
		}*/
		};




		return {
			"userData":userData
		};

	});