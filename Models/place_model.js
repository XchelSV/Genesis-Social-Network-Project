var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    //Schema Definition
    var PlaceSchema = new Schema({
    	_id:{type:String},
    	location:[Number],
    	formatted_address:{type:String}
    })

module.exports = mongoose.model('Place', PlaceSchema);