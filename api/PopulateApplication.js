/**
 * Created by airswoop1 on 6/17/14.
 */

var PopulateApplication = (function(){


    var Request = (function(){
        this.status = undefined;
    }());

    var Response = (function(){
        this.status = undefined;
    }());

    var execute = function(req, res){

        var formatted_data = format_request(req.body)

        populate_pdf(formatted_data,function(err, result){
            if(err){
                res.send(404);
            }
            else {
                res.send(200);
            }
        })

        //validate request

        //look up user in db

        //format data

        //execute python pdf populator

        //update data in db for user

        //send appropriate response

    }

    function format_request(r) {
        var formatted_data = {};
        formatted_data['name'] = r.name.first_name + " " + r.name.last_name;
        formatted_data['address'] = r.address.street_address;
        formatted_data['apt'] = r.address.apt_number;
        formatted_data['zip'] = r.address.zip;
        return formatted_data
    }

    function populate_pdf(data, cb){

        var exec = require('child_process').exec;

        var input = "python pdf.py ";
        input += "--Name='" + data.name + "' ";
        input += "--Address='" + data.address + "' ";
        input += "--Apt='" + data.apt + "' ";
        input += "--Zip='" + data.zip + "' ";

        exec(input, function(error, stdout, stderr){
            console.log("error: ");
            console.log(error);
            console.log("stdout: ")
            console.log(stdout);
            console.log("stderr: ")
            console.log(stderr);

            cb(null, "OK");

        })

    }


    return {
        "execute":execute
    }

}());

module.exports = PopulateApplication;