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
								response.cookie('session',encodeURIComponent(request.session._id));

								response.cookie('id', encodeURIComponent(user._id));
								response.cookie('name',encodeURIComponent(user.name));
								response.cookie('day',encodeURIComponent(date.getDate()+1));
								response.cookie('month',encodeURIComponent(date.getMonth()+1));
								response.cookie('servicePlace',encodeURIComponent(user.servicePlace));
								response.cookie('biography',encodeURIComponent(user.biography));
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

				response.clearCookie('id');
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
	
	app.route('/user/:id')

		.get(function (request, response){

		})

		.post(function (request, response){

		})

		.put(function (request, response){

		})

		.delete(function (request, response){
			
		})


	app.route('/user')

		.get(function (request, response){

			User.find('',function (err, docs){
				if (err) throw err;
				console.log(docs);
				response.send(docs);
			})

		})

		.post(function (request, response){
			var NewUser = new User({
				name: request.body.name,
				password: request.body.pass,
				birthday: request.body.birth,
				biography: request.body.bio,
				servicePlace: request.body.place,
				post: []
			})

			NewUser.save(function (err, user){
				if (err) throw err;

				var fs = require('fs')

				   var path = request.files.photo.path;
				   var newPath =  './public/img/userPhotos/'+user._id+'.jpg';

				   var is = fs.createReadStream(path);
				   var os = fs.createWriteStream(newPath);

				   is.pipe(os)

				   is.on('end', function() {
					      //eliminamos el archivo temporal
					   fs.unlinkSync(path);
					})

				response.redirect('/addUser');
			})


		})

		.put(function (request, response){

		})

		.delete(function (request, response){
			
		})

});