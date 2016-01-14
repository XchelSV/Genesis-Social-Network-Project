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
			if (request.session._id){
				response.render('addUser')
			}
			else{
				request.session.destroy(function (err){
				response.redirect('/');
				})
			}
		})

	app.route('/showUsers')

		.get(function (request, response){
			
			
				response.render('showUsers')
				
			
		})
	app.route('/addDevotional')

		.get(function (request, response){
			if (request.session._id){
				response.render('addDevotional')
			}
			else{
				request.session.destroy(function (err){
				response.redirect('/');
				})
			}
		})
});