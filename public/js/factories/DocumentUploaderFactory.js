/**
 * Created by airswoop1 on 6/25/14.
 */


angular.module('DocumentUploader',[]).factory('documentUpload', function($http, $upload, $q) {
    return {
        onFileSelect : function($files, $scope, type) {
            var deferred = $q.defer(),
                file = $files[0];

            $scope.upload = $upload
                .upload({
                    url: '/upload_docs',
                    data: { "user_id":"d5ec41d5-9632-4a76-bd91-e9a9218a3222", "document_type":type},
                    file: file
                })
                .progress(function(evt) {
                    return deferred.promise;
                })
                .success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    return deferred.resolve(data);
                })
                .error(function(err, data){
                    return deferred.reject(err);
                });

            return deferred.promise
        }
    }
})