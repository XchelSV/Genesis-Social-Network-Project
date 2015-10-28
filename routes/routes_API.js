module.exports = (function (app,ObjectId,uuid){

var bcrypt = require('bcrypt')	
		//Models Requires
var  User = require('../Models/user_model');


	app.route('/validateUser')

		.post(function (request,response){

		
		/*	var NewUser = new User({
				name: 'Panchito',
				password: 'pass',
				birthday: Date('2014-10-26'),
				biography: '',
				servicePlace: 'Republica Dominicana',
				post: [{body:'OLa ke ace? :v', like:2, pray4You:6, date:Date('2014-10-26')}]
			})

			NewUser.save(function (err){
				if (err) throw err;
			})*/
			
			User.findOne({name : request.body.name}, function (err , user){
				if (err) throw err;
				console.log(user);

				if(user != undefined){
					user.comparePassword(request.body.pass, function (err , pass){
						if (err) throw err;
						console.log(pass);

							if(pass){

								var date = new Date(user.birthday);

								request.session._id = uuid.v1();
								response.cookie('session',request.session._id);
								response.cookie('name',user.name);
								response.cookie('day',date.getDate()+1);
								response.cookie('month',date.getMonth()+1);
								response.cookie('servicePlace',user.servicePlace);
								response.cookie('biography',user.biography);
								response.redirect('/');
							}
							else{
								response.cookie('attempPass', true)
								response.cookie('attempUser', false)
								response.render('login')
								
							}
					})
				}else
				{
					response.cookie('attempUser', true)
					response.cookie('attempPass', false)
					response.render('login')
					
				}

			})

		})

	app.route('/logout')

		.get(function (request, response){

			request.session.destroy(function (err){

				response.clearCookie('name');
				response.clearCookie('day');
				response.clearCookie('month');
				response.clearCookie('servicePlace');
				response.clearCookie('biography');
				response.clearCookie('session')
				response.clearCookie('attempPass')
				response.clearCookie('attempUser')
				response.redirect('/');

			})

		})
		

});