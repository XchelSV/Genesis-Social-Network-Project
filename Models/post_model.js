var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    //Schema Definition
    var PostSchema = new Schema({
    	user_id:{type:String},
    	userName:{type:String},
    	body:{type:String},
    	like:{type : Number},
    	pray4You:{type: Number},
    	date:{type:Date},
    	img:{type:Boolean},
    	audio:{type:Boolean},
    	video:{type:Boolean}
    })

module.exports = mongoose.model('Post', PostSchema);