


var foo = 'bar';

describe('basic', function(){
	it('should pass a test', function(){
		"wow".should.equal("wow");
	});


		chai.request("http://localhost:1337")
			.get('/upload_user_info')
			.res(function (res) {
				console.log(res);

			});
});

describe('other', function() {

	it('should equal', function(){
		foo.should.equal('bar');
	})

});

