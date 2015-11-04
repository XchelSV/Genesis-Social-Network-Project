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

	app.route('/addUser')

		.get(function (request, response){
			response.render('addUser')
		})

	app.route('/showUsers')

		.get(function (request, response){
			response.render('showUsers')
		})
});