module.exports = (function (app,GenesisDB){
	
	app.route('/')

		.get(function (request,response){

			response.render('login')

		})

	app.route('/start')

		.get(function (request,response){

			response.render('index')

		})

});