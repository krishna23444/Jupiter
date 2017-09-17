var mongoose = require('mongoose');  
var MethodSchema = new mongoose.Schema({   

  name: {
    type: String ,
    unique:true
  },
  name2:
  {
    type: String ,
  },
  publicMethod: {
   type: Boolean

 },
 needBDD: {
   type: Boolean

 },
 createdBy: {
  type: String   
},
module: {
  type: String
},
category: {
  type: String
}, 
// This is shouldn't be done this way i will refine it later
codeMatlab: {
  type: String
},
codeMatlab2: {
  type: String
},
modality: {
  type: String,    
},
description: {
  type: String

},
url: {
  type: String
},
ref: {
  type: String

},
updatedAt: { type: Date, default: Date.now },
createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 MethodSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
 

 var Method = mongoose.model('Method', MethodSchema);

 /** export schema */
 module.exports = {
  Method: Method
};


