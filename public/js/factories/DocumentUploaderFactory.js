/**
 * Created by airswoop1 on 6/25/14.
 */


angular.module('DocumentUploader',[]).factory('documentUpload', function($http, $upload, $q) {
    return {
        onFileSelect : function($files, $scope) {

            var deferred = $q.defer();

            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.
                    upload({
                        url: 'https://easyfoodstamps.com/upload_docs',
                        data: {myObj: $scope.myModelObj, "the_data":"oohhh zee data"},
                        file: file
                    })
                    .progress(function(evt) {
                        return deferred.promise;
                    })
                    .success(function(data, status, headers, config) {
                        // file is uploaded successfully
                        return deferred.resolve(data);
                    });

            }
            return deferred.promise
        }
    }
})