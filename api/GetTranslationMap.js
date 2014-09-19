/**
 * Created by airswoop1 on 9/19/14.
 */

var csv = require('csv'),
	fs = require('fs'),
	_ = require('underscore');


var GetTranslationMap = (function() {

	var map = {};
	/**
	 * Create translation map
	 */
	(function() {

		fs.readFile(__dirname + '/Assets/translation.csv', function(err, data) {
			if(err) {
				console.error("Error Opening Translation file: ",err);
				return;
			}

			csv.parse(data, {'comment':'#'}, function(err, output) {

				if(err){
					console.error("Error parsing csv: ",err);
					return;
				}


				_.each(output, function(element, index, list){

					var key = element[0],
						english = element[1],
						spanish = element[2];

					map[key] = {'en':english, 'es': spanish};
				});
				console.log(map);
			})

		})
	}());


	var execute = function(req, res) {
		res.jsonp(map);


	};


	return {
		"execute":execute
	}

}());

module.exports = GetTranslationMap;
