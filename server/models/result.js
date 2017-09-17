var mongoose = require('mongoose'); 
var Promise = require('bluebird'); 
/*var FileSchema = new mongoose.Schema({
  file: any,
  name: String,
  dir: Boolean
});*/
var ResultSchema = new mongoose.Schema({   
testId:{
  type:String
},
 type:{
  type: String

},savingResults: {
  type: Boolean
},
 publicResults: {
  type: Boolean
},

fail: {
  type: Boolean
},
complete: {
  type: Boolean
},  
errorCode: {
  type: String
}, 
url: {
  type: String
}, 
modality: {
  type: String
},
createdBy: {
  type: String   
},
errorTime: {
    type: Number
}
,
timesMatching: {
  totalMatching: Number,
  avarageMatching:Number
},
timesPretrait: {
  totalPretrait: Number,
  avaragePretrait: Number
},
realrate:{
  type: [Number]
},
missrate:{
  type: [Number]
},
rates: {
  minHTER_er:Number,
  minHTER_tr: Number,
  minHTER_frr: Number,
  minHTER_ver: Number,
  minHTER_far: Number,
  EER_er: Number,
  EER_tr: Number,
  EER_frr: Number,
  EER_ver: Number,
  EER_far: Number,
  FRR_01FAR_er: Number,
  FRR_01FAR_tr: Number,
  FRR_01FAR_frr: Number,
  FRR_01FAR_ver: Number,
  FRR_01FAR_far: Number,
  FRR_10FAR_er: Number,
  FRR_10FAR_tr: Number,
  FRR_10FAR_frr: Number,
  FRR_10FAR_ver: Number,
  FRR_10FAR_far: Number,
  VER_001FAR_er: Number,
  VER_001FAR_tr: Number,
  VER_001FAR_frr: Number,
  VER_001FAR_ver: Number,
  VER_001FAR_far: Number,
  VER_01FAR_er: Number,
  VER_01FAR_tr: Number,
  VER_01FAR_frr: Number,
  VER_01FAR_ver:Number,
  VER_01FAR_far: Number,
  VER_1FAR_er: Number,
  VER_1FAR_tr: Number,
  VER_1FAR_frr: Number,
  VER_1FAR_ver: Number,
  VER_1FAR_far: Number
},
createdAt: { type: Date, default: Date.now }
});
 // on every save, add the date
 ResultSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});
 
 var Result = mongoose.model('Result', ResultSchema);


 /** export schema */
 module.exports = {
  Result: Result
};


