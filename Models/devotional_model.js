var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    //Schema Definition
    var PostSchema = new Schema({
        
    	title:{type:String},
        body:{type:String},
        date:{type:Date},
        showDate:{type:Date},
        img:{type:Boolean},
        audio:{type:Boolean},
        video:{type:Boolean}

    })

module.exports = mongoose.model('Devotional', PostSchema);