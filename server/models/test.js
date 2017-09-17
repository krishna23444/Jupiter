var mongoose = require('mongoose'); 
var Promise = require('bluebird'); 
var TestSchema = new mongoose.Schema({   

  type:{
    type: String

  },
  savingResults: {
    type: Boolean
  },
  complete: {
    type: Boolean
  }, 
  needBDD: {
    type: Boolean
  }, 
  beforeRoutine: {
    type: String
  }, 
  nameBDD: {
    type: String
  },
  url: {
    type: String
  }, modality: {
    type: String
  },
  matcher: {
    type: String
  },
  createdBy: {
    type: String   
  },
  
  numberScans:
  {
    type: Number
  },
  numberTot:
  {
    type: Number
  },
  methodNames:[{
      order : String,
      category : String,
      module : String,
      name : String
     }], //Array
   
   createdAt: { type: Date, default: Date.now }
 });
 // on every save, add the date
 TestSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();


  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});
 
 var Test = mongoose.model('Test', TestSchema);


 /** export schema */
 module.exports = {
  Test: Test
};


