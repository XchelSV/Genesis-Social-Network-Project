module.exports = (function (app,GenesisDB){
	
	app.route('/')

		.get(function (request,response){

			response.render('login')

		})

});