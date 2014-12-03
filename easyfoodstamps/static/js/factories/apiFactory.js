/**
 * Created by airswoop1 on 7/11/14.
 */

angular.module('formApp.apiFactory',[]).factory('API', function($http) {
    return {
        getDocumentStatus : function(user_id, callback) {
          $http.post('/get_doc_status',JSON.stringify({"user_id":user_id}))
              .success(function(data, status){
                  callback(data);
              })
              .error(function(data){
                  callback(null);
              });
        },
    }
})