module.exports = (function (app,ObjectId,uuid,RedisClient){

var bcrypt = require('bcrypt')	
var path = require('path');
		//Models Requires
var  User = require('../Models/user_model');
var  Post = require('../Models/post_model');
var  Devotional = require('../Models/devotional_model');
var  Place = require('../Models/place_model');


	app.route('/api/login')

		.post(function (request,response){

			
			User.findOne({name : request.body.name}, function (err , user){
				if (err) throw err;
				
				if(user != undefined){
					user.comparePassword(request.body.pass, function (err , pass){
						if (err) throw err;

							if(pass){
								
								var UIDSession = uuid.v4();
								request.session._id = UIDSession;
								
								response.cookie('session',encodeURIComponent(request.session._id));
								RedisClient.set(UIDSession , user._id, function (err, value){
									console.log('Token de Session: '+value);
								});
								RedisClient.expire(UIDSession,3600);
								response.send(UIDSession);
								
							}
							else{
								
								response.sendStatus(404);
							}
					})
				}else
				{
	
					response.sendStatus(404);
					
				}

			})

		})
		

	app.route('/api/logout/:token')

		.get(function (request, response){

			var token = request.params.token;
			
			request.session.destroy(function (err){

				RedisClient.del(token, function (err,reply){
					response.sendStatus(200);
				})

			})

		})



	app.route('/api/user/:token')

		.get(function (request, response){

			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

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

	app.route('/api/user/img/:_id')

		.get(function (request,response){

			var userId = request.params._id;

					response.sendFile(path.join(__dirname, '../public/img/userPhotos/'+userId+'.jpg'));

		})
		

	app.route('/api/post/img/:_id')

		.get(function (request,response){

			var postId = request.params._id;

			

					response.sendFile(path.join(__dirname, '../public/img/postPhotos/'+postId+'.jpg'));


		})

	app.route('/api/post')

		.get(function (request,response){
				

						Post.find('','',{sort:{date:-1}},function (err, docs){

							if (err) throw err;
							response.send(docs);
						});
					

		})


	app.route('/api/post/:token')

		.post(function (request,response){

			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){

					var userId;

					RedisClient.get(token, function (err,value){
						
						userId = value;

						User.findById(userId, function (err,doc){
						
						var img = false;
						var audio = false;
						var video = false;

						if(request.files.img != undefined){
							   
							img = true;
						}

						if(request.files.video != undefined){
							
							video = true;	   
						}

						if(request.files.audio != undefined){
								   
							audio = true;
						}

						var NewPost = new Post({

							user_id:userId,
							userName:doc.name,
							body:request.body.body,
							like:[],
							pray4You:[],
							date:request.body.date,
							img:img,
							audio:audio,
							video:video

						});	



					NewPost.save(function (err,save){

						if (err) throw err;

							var flag =  request.body.img;
							console.log('Flag is '+flag);

							if(request.files.img != undefined){
							   
							   console.log('Post Id: '+save._id);
							   var fs = require('fs')

							   var path = request.files.img.path;
							   var newPath =  './public/img/postPhotos/'+save._id+'.jpg';

							   var is = fs.createReadStream(path);
							   var os = fs.createWriteStream(newPath);

							   is.pipe(os)

							   is.on('end', function() {
								      //eliminamos el archivo temporal
								   fs.unlinkSync(path);
								})
							}

							console.log('Succesfully Added Post in User '+request.body.id+' by API app');
							response.send(200);


					})

					})

				});
					
				} 
				else {
					response.send(404);
				}
				
			});

			
		})

	app.route('/api/devotional/:token')

		.get(function (request,response){

			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){

					var newDate = new Date();

					Devotional.find({showDate:{$lt: newDate}},'',{sort:{showDate:-1}},function (err,docs){

						response.send(docs);
					})

				}else{
					response.sendStatus(404);
				}
			})

		})

		.post(function (request,response){

			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){

					var date = new Date();
					var img = false;
					var video = false;
					var audio = false;
					

					if(request.files.img != undefined){
							   
						img = true;
					}

					if(request.files.video != undefined){
						
						video = true;	   
					}

					if(request.files.audio != undefined){
							   
						audio = true;
					}

					var newDevotional = new Devotional({

						title:request.body.title,
						body:request.body.body,
						date:date,
						showDate:request.body.showDate,
						img:img,
						audio:audio,
						video:video

					})

					newDevotional.save(function (err,saved){

						if (err) throw err;

						if(img){
						   var fs = require('fs')

						   var path = request.files.img.path;
						   var newPath =  './public/img/devotionalPhotos/'+saved._id+'.jpg';

						   var is = fs.createReadStream(path);
						   var os = fs.createWriteStream(newPath);

						   is.pipe(os)

						   is.on('end', function() {
							      //eliminamos el archivo temporal
							   fs.unlink(path);
							})
						}

						if(audio){
						   var fs = require('fs')

						   var path = request.files.audio.path;
						   var newPath =  './public/audio/devotionalAudios/'+saved._id+'.mp3';

						   var is = fs.createReadStream(path);
						   var os = fs.createWriteStream(newPath);

						   is.pipe(os)

						   is.on('end', function() {
							      //eliminamos el archivo temporal
							   fs.unlink(path);
							})
						}


						if(video){
						   var fs = require('fs')

						   var path = request.files.video.path;
						   var newPath =  './public/video/devotionalVideos/'+saved._id+'.mp4';

						   var is = fs.createReadStream(path);
						   var os = fs.createWriteStream(newPath);

						   is.pipe(os)

						   is.on('end', function() {
							      //eliminamos el archivo temporal
							   fs.unlink(path);
							})
						}

						console.log('Devotional saved by API App: '+saved._id);
						response.sendStatus(200);

					})


				}else{
					response.sendStatus(404);
				}
			})

		})

	app.route('/api/devotional/:date/:token')

		.get(function (request,response){

			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){

					var newDate = new Date(request.params.date);

					Devotional.find({showDate:{$lt: newDate}},'',{sort:{date:-1}},function (err,docs){

						console.log('Numero de Devocionales Enviados '+docs.length)
						response.send(docs);
					})

				}else{
					response.sendStatus(404);
				}
			})

		})
	
	app.route('/api/devotional/img/:_id/:token')

		.get(function (request,response){

			var devotionalId = request.params._id;
			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){

			

					response.sendFile(path.join(__dirname, '../public/img/devotionalPhotos/'+devotionalId+'.jpg'));
				}else{
					response.sendStatus(404);
				}
			})

		})

	app.route('/api/devotional/audio/:_id/:token')

		.get(function (request,response){

			var devotionalId = request.params._id;
			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){
			

					response.sendFile(path.join(__dirname, '../public/audio/devotionalAudios/'+devotionalId+'.mp3'));

				}else{
					response.sendStatus(404);
				}
			})
		})

	app.route('/api/devotional/video/:_id/:token')

		.get(function (request,response){

			var devotionalId = request.params._id;
			var token = request.params.token;

			RedisClient.exists(token, function (err, reply){

				if(reply===1){
			

					response.sendFile(path.join(__dirname, '../public/video/devotionalVideos/'+devotionalId+'.mp4'));

				}else{
					response.sendStatus(404);
				}
			})
		})

	app.route('/api/place')

		.get(function (request,response){

			Place.find('','',function (err,docs){

				response.send(docs);
			})

		})

});