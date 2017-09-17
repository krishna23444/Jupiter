var mongoose = require('mongoose'); 
var Promise = require('bluebird'); 
var CategorySchema = new mongoose.Schema({   


  name: {
    type: String,
    required: true,
    unique:true
  },
  createdBy: {
    type: String   
  },
  module: {
    type: String,
    required: true
  },
  modality: {
    type: String,
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 CategorySchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});
 var Category = mongoose.model('Category', CategorySchema);
 /** export schema */
 module.exports = {
  Category: Category
};


