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
				'UNEARNED_INCOME':this.DOC_STATUS.NOT_UPLOADED,
				'RESOURCES':this.DOC_STATUS.NOT_UPLOADED
			}
		};




		return {
			"userData":userData
		};

	});