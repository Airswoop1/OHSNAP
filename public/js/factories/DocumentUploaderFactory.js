/**
 * Created by airswoop1 on 6/25/14.
 */


angular.module('DocumentUploader',[]).factory('documentUpload', function($http, $upload, $q) {

    function resizeDocument(file, callback) {
        console.log(file);

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function() {
            console.log("reading operation complete")


            var tempImg = new Image();
            tempImg.src = reader.result;

            tempImg.onload = function () {
                console.log("THE FILE: ");
                console.log(file);

                var MAX_WIDTH = 800,
                    MAX_HEIGHT = 600,
                    tempW = tempImg.width,
                    tempH = tempImg.height;
                console.log("Temp w: " + tempW + " temp h:  " + tempH);

                //  is it landscape? if so...
                if (tempW > tempH) {
                    console.log("landscape");
                    if (tempW > MAX_WIDTH) {
                        console.log("Scaling...");
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                    else{
                        console.log("Not scaling...");
                    }
                } else {
                    console.log("portrait")
                    if (tempH > MAX_HEIGHT) {
                        console.log("Scaling...");
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                    else{
                        console.log("Not scaling...");
                    }
                }
                console.log("Temp w: " + tempW + " temp h: " + tempH);


                var canvas = document.createElement('canvas');
                canvas.width = tempW;
                canvas.height = tempH;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, tempH, tempW);

                var dataURL = canvas.toDataURL(file.type);
                console.log("data URL for new image: ");
                console.log(dataURL);
                callback(dataURL);
            }
        }
    }


    return {
        onFileSelect : function($files, $scope, type, user_id) {
            var deferred = $q.defer(),
                file = $files[0];
            console.log(file);
            resizeDocument(file, function(file_url){

                $scope.upload = $upload
                    .upload({
                        url: '/upload_docs',
                        data: { 'user_id':"d5ec41d5-9632-4a76-bd91-e9a9218a3222",
                            'document_type':type,
                            'file_base64':file_url,
                            'file_name': file.name,
                            'file_type':file.type
                        }
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


            })
            return deferred.promise;
        }
    }
})