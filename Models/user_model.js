var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

    //Schema Definition
    var PostSchema = new Schema({
    	body:{type:String},
    	like:{type : Number},
    	pray4You:{type: Number},
    	date:{type:Date},
    	img:{type:Boolean},
    	audio:{type:Boolean},
    	video:{type:Boolean}
    })

    var UserSchema = new Schema({
	    name: { type: String, required: true },
	    password: { type: String, required: true },
	    birthday:{ type : Date },
	    biography: { type : String },
	    servicePlace : { type : String},
	    post : [PostSchema]
	});


UserSchema.pre('save', function(next) {	
   		 var user = this;

		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) return next();

		// generate a salt
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		    if (err) return next(err);

		    // hash the password using our new salt
		    bcrypt.hash(user.password, salt, function(err, hash) {
		        if (err) return next(err);

		        // override the cleartext password with the hashed one
		        user.password = hash;
		        next();
		    });
		});


	});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);