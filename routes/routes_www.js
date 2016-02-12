module.exports = (function (app,ObjectId){
	
	var  Devotional = require('../Models/devotional_model');
	
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

	app.route('/showDevotionals')

		.get(function (request, response){
			
			
				response.render('showDevotionals')
				
			
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

	app.route('/addPlace')

		.get(function (request, response){
			if (request.session._id){
				response.render('addPlace')
			}
			else{
				request.session.destroy(function (err){
				response.redirect('/');
				})
			}
		})

	app.route('/devotionals/:_id')

		.get(function (request,response){


			if (request.session._id){

				Devotional.findById( request.params._id ,function (err,devotional){
					response.render('devotionals',{id:devotional._id, title:devotional.title, body:devotional.body, date:devotional.showDate, img:devotional.img, audio:devotional.audio, video:devotional.video});		
				})
				
			}
			else{
				request.session.destroy(function (err){
				response.redirect('/');
				})
			}

		})
});