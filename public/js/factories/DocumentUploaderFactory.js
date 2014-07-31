/**
 * Created by airswoop1 on 6/25/14.
 */


angular.module('formApp.DocumentUploader',[]).factory('documentUpload', function($http, $upload, $q) {

    function resizeDocument(file, callback) {

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function() {
            var tempImg = new Image();
            tempImg.src = reader.result;

            tempImg.onload = function () {

                var MAX_WIDTH = 800,
                    MAX_HEIGHT = 600,
                    tempW = tempImg.width,
                    tempH = tempImg.height;


                //  is it landscape? if so...
                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                }

                var canvas = document.createElement('canvas');
                canvas.width = tempW;
                canvas.height = tempH;


                var ctx = canvas.getContext("2d");
                ctx.drawImage(this,0, 0, tempW, tempH);


                var dataURL = canvas.toDataURL(file.type);

                callback(dataURL);
            }
        }
    }



    return {
        onFileSelect : function($files, $scope, type, user_id) {
            var deferred = $q.defer(),
                file = $files[0],
                data = {
                    'user_id':"d5ec41d5-9632-4a76-bd91-e9a9218a3222",
                    //'user_id':user_id,
                    'document_type':type,
                    'file_name': file.name,
                    'file_type':file.type
                };



            if(/(iPad|iPhone|iPod)/g.test( navigator.userAgent )){
                alert("iOS device");
                data['platform'] = 'ios';

                $scope.upload = $upload.upload(
                    {
                        'url': '/upload_docs',
                        'data': data,
                        'file' : file
                    }
                )
                .progress(function(evt) {
                    return deferred.promise;
                })
                .success(function(d, status, headers, config) {
                    console.log("within onFileSelect")
		                console.log(status);
		                console.log(config);
		                console.log(headers);
                    // file is uploaded successfully
                    return deferred.resolve(d);
                })
                .error(function(err, data){
                    return deferred.reject(err);
                });


            }
            else{
                resizeDocument(file, function(file_url){

                    data['file_base64'] = file_url;
                    data['platform'] = 'other';

                    $scope.upload = $upload
                        .upload({
                            'url': '/upload_docs',
                            'data': data
                        })
                        .progress(function(evt) {


                        })
                        .success(function(d, status, headers, config) {
                            // file is uploaded successfully
                            return deferred.resolve(d,data);
                        })
                        .error(function(err){
                            return deferred.reject(err);
                        });


                });

            }

            return deferred.promise;
        }
    }
})