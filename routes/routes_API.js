module.exports = (function (app,ObjectId,uuid,RedisClient){

var bcrypt = require('bcrypt')	
		//Models Requires
var  User = require('../Models/user_model');
var  Post = require('../Models/post_model');
var  Devotional = require('../Models/devotional_model');


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

									response.clearCookie('temporalSession');	
								
								

								var date = new Date(user.birthday);

								request.session._id = uuid.v4();
								RedisClient.set(request.session._id , user._id, function (err, value){
									console.log('Token de Session: '+value);
								});
								RedisClient.expire(request.session._id,3600);
								response.cookie('session',encodeURIComponent(user._id));

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

			RedisClient.del(request.session._id, function (err,reply){
				
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

	app.route('/posts')

		.get(function (request, response){
			Post.find('','',{skip:0,limit:15,sort:{date:-1}},function (err, docs){

				if (err) throw err;
				
				
				response.send(docs);

			})
		})

		.post(function (request, response){

			var NewPost = new Post({

				user_id:request.body.id,
				userName:request.body.name,
				body:request.body.body,
				like:[],
				pray4You:[],
				date:request.body.date,
				img:request.body.img,
				audio:request.body.audio,
				video:request.body.video

			});	

			NewPost.save(function (err,save){

				if (err) throw err;

					var flag =  request.body.img;
					console.log('Flag is '+flag);

					if(request.files.file != undefined){
					   
					   console.log('Post Id: '+save._id);
					   var fs = require('fs')

					   var path = request.files.file.path;
					   var newPath =  './public/img/postPhotos/'+save._id+'.jpg';

					   var is = fs.createReadStream(path);
					   var os = fs.createWriteStream(newPath);

					   is.pipe(os)

					   is.on('end', function() {
						      //eliminamos el archivo temporal
						   fs.unlinkSync(path);
						})
					}

					console.log('Succesfully Added Post in User '+request.body.id);
					response.send(save);


			})

		})

	app.route('/post/:_id')

			.get(function (request,response){

					var id = request.params._id;
					Post.findById(id, function (err,doc){
						response.send(doc);

					})

			})


	app.route('/post/like')

			.post(function (request,response){

				var id = request.body.userId;
				var postId = request.body.postId;
				var flag = true;

				Post.findById(postId,function (err,doc){
					for (var i = 0; i < doc.like.length; i++) {
						if (id == doc.like[i]){

							flag = false;
							break;

						}
					};

					if (flag){

						Post.update({_id:postId},{$push: {'like':id}},{upsert:true},function(err){
				        
							        if(err){
							                console.log(err);
							        }else{
							                console.log("Successfully like Added from user: "+id);
							                response.sendStatus(200);
							        }
						})
					}
					else{
						doc.like.pull(id);
						doc.save(function (err){
							if (err) {throw err};
							console.log('Like from user '+id+' was removed')
							response.sendStatus(202);
						})
						
					}
				})

		})

	app.route('/post/pray')

			.post(function (request,response){

				var id = request.body.userId;
				var postId = request.body.postId;
				var flag = true;

				Post.findById(postId,function (err,doc){
					for (var i = 0; i < doc.pray4You.length; i++) {
						if (id == doc.pray4You[i]){

							flag = false;
							break;

						}
					};

					if (flag){

						Post.update({_id:postId},{$push: {'pray4You':id}},{upsert:true},function(err){
				        
					        if(err){
					                console.log(err);
					        }else{
					                console.log("Successfully pray4You Added from user: "+id);
					                response.sendStatus(200);
					        }
						})
					}
					else{
						doc.pray4You.pull(id);
						doc.save(function (err){
							if (err) {throw err};
							console.log('Pray4You from user '+id+' was removed')
							response.sendStatus(202);
						})
						
					}
				})


		})
	app.route('/devotional')

		.get(function (request,response){

			Devotional.find('','',function (err,docs){

				response.send(docs);
			})

		})

		.post(function (request,response){

			var date = new Date();
			var img = false;
			var video = false;
			var audio = false;
			console.log(request.files.img)

			if(request.files.img.size != 0){
					   
				img = true;
			}

			if(request.files.video.size != 0){
				
				video = true;	   
			}

			if(request.files.audio.size != 0){
					   
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

				console.log('Devotional saved ID: '+saved._id);
				response.redirect('/');

			})

		})

});