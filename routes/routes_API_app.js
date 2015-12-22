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




	

});