module.exports = (function (app,ObjectId,uuid,RedisClient){

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

								request.session._id = uuid.v4();
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


	app.route('/api/validateUser')

		.post(function (request,response){

			
			User.findOne({name : request.body.name}, function (err , user){
				if (err) throw err;
				
				if(user != undefined){
					user.comparePassword(request.body.pass, function (err , pass){
						if (err) throw err;

							if(pass){
								
								var UIDSession = uuid.v4();
								request.session._id = UIDSession;
								RedisClient.set(UIDSession , user._id, function (err, value){
									console.log('Token de Session: '+value);
								});
								RedisClient.expire(UIDSession,3600);
								response.send(UIDSession);
								
							}
							else{
								
								response.send(404);
							}
					})
				}else
				{
	
					response.send(404);
					
				}

			})

		})
		

	app.route('/logoutApp')

		.get(function (request, response){

			request.session.destroy(function (err){

				response.sendStatus(200);

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

	app.route('/api/user')

		.get(function (request, response){ 	


		})

		.post(function (request, response){

			RedisClient.exists(request.body.token, function (err, reply){

				if(reply===1){
			//if (request.session._id){
				User.find('',function (err, docs){
					if (err) throw err;
					console.log(docs);
					response.send(docs);
				})
			} else {
				response.send(404);
			}
			/*}
			else{
				request.session.destroy(function (err){
					response.sendStatus(404);
				})
			}*/
			});

		})

		.put(function (request, response){

		})

		.delete(function (request, response){
			
		})


	app.route('/user')

		.get(function (request, response){ 	

			//if (request.session._id){
				User.find('',function (err, docs){
					if (err) throw err;
					console.log(docs);
					response.send(docs);
				})
			/*}
			else{
				request.session.destroy(function (err){
					response.sendStatus(404);
				})
			}*/

		})

		.post(function (request, response){

			if (request.session._id){
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
			}
			else{
				request.session.destroy(function (err){
					response.redirect('/');
				})
			}


		})

		.put(function (request, response){

		})

		.delete(function (request, response){
			
		})

});