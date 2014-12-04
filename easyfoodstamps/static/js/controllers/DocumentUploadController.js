angular.module('formApp.documentUploadCtrl', [
  'formApp.ngDocumentFullscreen',
  'efs.userService'
])
.filter('doctype', function () {
  return function (doctype) {
    if (!doctype || !doctype.length) {
      return '';
    }

    var parts = doctype.split('_');
    var newParts = [];
    angular.forEach(parts, function(p) {
      newParts.push(p.length <= 3 ?
        p : p[0].toUpperCase() + p.slice(1).toLowerCase());
    });

    return newParts.join(' ');
  };
})
.service('documents', function ($upload, User) {
  this.DOC_STATUS = {UPLOADED: 2, IN_PROGRESS: 1, NOT_UPLOADED: undefined};
  this.docs = {};
  this.docProgress = {};
  this.localDocs = {};

  this.inProgress = function() {
    for(var x in this.docs) {
      if (this.docs[x] === this.DOC_STATUS.IN_PROGRESS) {
        return true;
      }
    }
  };

  this.upload = function(type, file) {
    var docId = User.user_id;
    var apiUrl = '/api/pa_snap/' + docId + '/';
    var params = {
      url: apiUrl,
      file: file,
      data: {
        data: {
          attachments: [{
            doctype: type,
            filename: file.name,
            filetype: file.type
          }]
        },
      }
    };

    var self = this;
    this.docs[type] = this.DOC_STATUS.IN_PROGRESS;
    return $upload.upload(params)
      .progress(function(evt) {
        var width = parseInt(100.0 * evt.loaded / evt.total);
        self.docProgress[type] = width;
      })
      .success(function(data, status, headers, config) {
        self.docProgress[type] = 100;
        self.docs[type] = self.DOC_STATUS.UPLOADED;
        console.log(data);
        self.localDocs[type] = data.documents[type].url;
      })
      .error(function(err, data) {
        self.docs[type] = self.DOC_STATUS.NOT_UPLOADED;
        alert('Sorry we were unable to upload your documents, please try again');
      });
  };
})
.controller('documentUploadCtrl', function($scope, $state, $window, documents) {
  $scope.documents = documents;

  $scope.goBack = function() {
    window.history.back();
  };

  $scope.goToDocUpload = function(name) {
    $state.go('upload.detail', {'type': name});
  };

  $scope.goToCompletion = function() {
    $state.go('upload.completion');
  };

  $window.onbeforeunload = function() {
    if (documents.inProgress()) {
      return [
        'Your documents are still uploading! ',
        'If you leave now they won\'t be submitted.'
      ].join();
    }
  };

  $scope.docContent = $window.docContent;
  $scope.doctypes = Object.keys($scope.docContent);
})
.controller('documentDetailCtrl', function($scope, $stateParams, $upload, documents) {
  $scope.docType = $stateParams.type;
  $scope.samples = $scope.$parent.docContent[$scope.docType];
  $scope.currentContent = $scope.samples;

  $scope.DOC_STATUS = documents.DOC_STATUS;
  $scope.docs = documents.docs;
  $scope.docProgress = documents.docProgress;
  $scope.localDocs = documents.localDocs;

  $scope.getDocDetailState = function() {
    return $scope.docs[$scope.docType];
  };

  $scope.uploadFile = function($files) {
    documents.upload($scope.docType, $files[0]);
  };

  $scope.isActive = {showExampleDocs: true};
  $scope.exampleActive = {};

  for(var x in $scope.currentContent.valid_docs) {
    $scope.exampleActive[$scope.currentContent.valid_docs[x].name] = false;
  }

  $scope.click = function(name) {
    if(!$scope.isActive[name]) {
      for(var i in $scope.isActive) {
        $scope.isActive[i] = false;
      }
      $scope.isActive[name] = true;

    }
    else if($scope.isActive[name]) {
      $scope.isActive[name] = false;
    }
  };

  $scope.clickEx = function(name) {
    if(!$scope.exampleActive[name]) {
      for(var i in $scope.exampleActive) {
        $scope.exampleActive[i] = false;
      }
      $scope.exampleActive[name] = true;

    }
    else if($scope.exampleActive[name]) {
      $scope.exampleActive[name] = false;
    }
  };

  $scope.external = function(name) {
    $window.ga('send','event','external', 'tap', name, 1);
  }
})
.controller('documentCompleteCtrl',  function($scope) {
  $scope.interviewDate = new Date();
  $scope.interviewDate.setDate($scope.interviewDate.getDate() + 10);
});
