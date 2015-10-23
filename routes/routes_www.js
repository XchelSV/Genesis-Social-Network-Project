module.exports = (function (app,GenesisDB,ObjectId){
	
	app.route('/')

		.get(function (request,response){

			response.render('login')

		})

	app.route('/start')

		.get(function (request,response){

			var id = new ObjectId("5629d94617a51e75b9bf71ad")

			GenesisDB.collection('user').findOne({"_id": id}, function (err, document){

				console.dir(document);

				var date = new Date(document.birthday)
				

				response.cookie('name',document.name)
				response.cookie('month',date.getMonth()+1);
				response.cookie('day',date.getDate()+1);
				response.cookie('biography',document.biography)
				response.cookie('servicePlace',document.servicePlace)
				response.render('index');

			})

			

		})

});