var mongoose = require('mongoose');  
var KeywordSchema = new mongoose.Schema({   
  
  name: {
    type: String ,
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 KeywordSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
 

 var Keyword = mongoose.model('Keyword', KeywordSchema);

 /** export schema */
 module.exports = {
  Keyword: Keyword
};


