var mongoose = require('mongoose');  
var dataBaseSchema = new mongoose.Schema({   
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  modality: {
    type: String,
  },
  createdBy: {
    type: String   
  },
  publicDatabase:
  {
    type: Boolean
  },
  url: {
    type: String,
  },
  sensor: {
    type: String,
  },
  note: {
    type: String,
  },
  preTraited: {
    type: Boolean,
  },
  ref: {
    type: Boolean,
  },
  resolution: {
    type: Number,
  },
  numberTot: {
    type: Number,
  },
  numberScans: {
    type: Number,

  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 dataBaseSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});
 

 var DataBase = mongoose.model('DataBase', dataBaseSchema);

 /** export schema */
 module.exports = {
  DataBase: DataBase
};


