var mongoose = require('mongoose');  
var LogSchema = new mongoose.Schema({   
  
  date: {
    type: Date ,
   },
   header: {
    type: String ,
   },
   body: {
    type: String ,
   },
     createdBy: {
    type: String ,
   },
   icon: {
    type: String ,
   },
    updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
LogSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
 

var Log = mongoose.model('Log', LogSchema);

/** export schema */
module.exports = {
    Log: Log
};


