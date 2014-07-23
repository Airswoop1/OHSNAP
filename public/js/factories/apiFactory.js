/**
 * Created by airswoop1 on 7/11/14.
 */
angular.module('formApp.apiFactory',[]).factory('API', function($http) {
    return {
        uploadFeedback : function(formData, callback) {
            $http.post('/submit_feedback', JSON.stringify(formData))
                .success(function(data, status) {

                    if(status === 201){
                        callback(true);
                    }
                    else {
                        callback(null);
                    }
                })
                .error(function(data) {
                    console.log(data);
                    callback(null)

                });
        },

        uploadBasicInfo : function(formData, callback) {

            $http.post('/upload_user_info', JSON.stringify(formData))
                .success(function(data, status) {

                    if(status === 201){
                        callback(true, data.user_id);
                    }
                    else {
                        callback(null);
                    }
                })
                .error(function(data) {
                    console.log(data);

                    callback(null)

                });
        },

        getDocumentStatus : function(user_id) {
          $http.get('/get_doc_status')
              .success(function(data,status){
                 return data;
              })
              .error(function(data){
                  return null;
              });
        }
    }
})