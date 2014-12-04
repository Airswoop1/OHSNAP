angular.module('formApp.documentStates', ['formApp.documentUploadCtrl'])
.config(function($stateProvider, $urlRouterProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');

  $stateProvider
    .state('upload', {
      url:'/upload',
      templateUrl:'templates/documents/upload-main.html',
      controller: 'documentUploadCtrl',
      abstract: true
    })
    .state('upload.documents', {
      url:'/documents',
      templateUrl:'templates/documents/form-document-upload.html'
    })
    .state('upload.detail',{
      url:'/detail?type',
      templateUrl:'templates/documents/form-document-detail.html',
      controller: 'documentDetailCtrl'
    })
    .state('upload.completion', {
      url:'/completion',
      templateUrl: 'templates/documents/form-document-completion.html',
      controller: 'documentCompleteCtrl'
    });
});
