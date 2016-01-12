module.exports = (function (app,ObjectId,uuid,RedisClient){

var bcrypt = require('bcrypt')	
var path = require('path');
		//Models Requires
var  User = require('../Models/user_model');
var  Post = require('../Models/post_model');


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

					var userId = RedisClient.get(token).toString();

					var NewPost = new Post({

						user_id:userId,
						userName:request.session.name,
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

							console.log('Succesfully Added Post in User '+request.body.id+' by API app');
							response.send(save);


					})
					
				} 
				else {
					response.send(404);
				}
				
			});

			
		})


	

});