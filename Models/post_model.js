var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    //Schema Definition
    var PostSchema = new Schema({
    	user_id:{type:String},
    	userName:{type:String},
    	body:{type:String},
    	like:{type : [String]},
    	pray4You:{type: [String]},
    	date:{type:Date},
    	img:{type:Boolean},
    	audio:{type:Boolean},
    	video:{type:Boolean},
        ext_img:{type:String}
    })

module.exports = mongoose.model('Post', PostSchema);