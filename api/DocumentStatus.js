/**
 * Created by airswoop1 on 7/23/14.
 */

var DocumentStatus = (function() {

    var execute = function(req, res){
     /*
     * check if user ID is valid
     * query db for doc_status array
     * send back
     * */

        var status = {
            'IDENTITY':true,
            'RESIDENCE':false,
            'HOUSEHOLD_COMPOSITION':false,
            'AGE':false,
            'SSN':false,
            'CITIZENSHIP':false,
            'ALIEN_STATUS':false,
            'EARNED_INCOME':false,
            'UNEARNED_INCOME':false,
            'RESOURCES':false
        };
        res.send(200, {"status":status})

    };

    return {
        "execute":execute
    }
}());

module.exports = DocumentStatus;