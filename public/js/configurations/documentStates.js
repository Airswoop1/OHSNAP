/**
 * Created by airswoop1 on 10/21/14.
 */
angular.module('formApp.documentStates',['ui.router']).config(function($stateProvider, $urlRouterProvider) {
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


});
