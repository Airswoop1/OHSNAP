/**
 * Created by airswoop1 on 6/17/14.
 */


var Index = (function(){


    var execute = function(req,res){
        res.send(200);
    }

    return {
        "execute": execute
    }
}());

module.exports = Index;