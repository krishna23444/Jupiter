var mongoose = require('mongoose'); 
var Promise = require('bluebird'); 
var SenarioSchema = new mongoose.Schema({   


  type: {
    type: String,
     required: true
  }, createdBy: {
        type: String   
  },
   url: {
        type: String   
  },

   
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 SenarioSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;
      
  next();
});
 

 
var Senario = mongoose.model('Senario', SenarioSchema);


/** export schema */
module.exports = {
    Senario: Senario
};


