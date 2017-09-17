var mongoose = require('mongoose'); 
var Promise = require('bluebird'); 
var ModalitySchema = new mongoose.Schema({   
  name: {
    type: String,
    required: true,
    unique:true
  },
  type: {
    type: String,
    required: true
  },
  createdBy: {
    type: String   
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 ModalitySchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // change the updatedAt field to current date
  this.updatedAt = currentDate;
  // if createdAt doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});
var Modality = mongoose.model('Modality', ModalitySchema);
 /** export schema */
 module.exports = {
  Modality: Modality
};


