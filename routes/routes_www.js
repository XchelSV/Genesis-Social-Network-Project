module.exports = (function (app,ObjectId){
	
	app.route('/')

		.get(function (request,response){

			response.render('index')

		})

	app.route('/login')

		.get(function (request,response){
			
			response.cookie('attempPass', false)
			response.cookie('attempUser', false)
			response.render('login')
		})

});