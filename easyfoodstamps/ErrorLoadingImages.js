/**
 * Created by airswoop1 on 8/26/14.
 */


var ErrorLoadingImages = (function() {

	var execute = function(req, res) {
		if(typeof req.body.user_id !== 'undefined' && req.body.user_id.length == 36){
			console.error("Error loading images for: " + req.body.user_id);
			res.send(200);
		}
		else {
			console.error("Error loading images for an undefined user_id")
			res.send(200);
		}

	};

	return {
		'execute':execute
	}

}());

module.exports = ErrorLoadingImages;