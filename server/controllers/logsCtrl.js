var mongoose = require('mongoose');
var Log = require('../models/log').Log;
//mongoose.Promise = global.Promise;
/** create function to create Log. */
exports.create = function (req, res) {
   // new Thread({title: req.body.title, author: req.body.author}).save();
   var log =new Log({name:req.body.name });
   log.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
  console.log(err);
  res.send({
    message: 'something went wrong'
  });
} else {
  res.send({
    message: 'the log has been saved'
  });
}
  // saved!
});
 };

 exports.createLog=function (operation,user,model,entity) {
  var header="";
  var body="";
  var icon="";
  var date=new Date();
  if(operation==1)
  {
    header=entity+" created";
    body="You have created a "+model;
    icon="fa-plus"
  }
  else
  {
    if(operation==3)
    {
      console.log("here   delet");
      header=entity+" deleted ";
      body="You have deleted a "+model;
      icon="fa-times"
    }
    else
      {if(operation==2)
    {
      header=entity+" updated ";
      body="You have updated a "+model;
      icon="fa-pencil"
    }
  }
}

var log =new Log({createdBy:user,date:date,header:header, body:body,icon:icon});
log.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
  console.log(err);

}
  // saved!
});
}
/** getLog function to get Log by id. */
exports.getAll = function (req, res) {
  Log.find({$or: [{createdBy:req.params.createdBy}]}).sort({createdAt: -1})
.exec(function(err, dbs) {
   var dbMap = [];

   dbs.forEach(function(db) {
    dbMap.push( db);
  });

   res.send(dbMap);  
 });
};
//.limit(10)
/** getLog function to get Log by id. */
exports.get = function (req, res) {

 Log.find({name: req.params._id}, function(err, db) {
  if (err)
    res.send(err);
  console.log("whyyyy"+req.params._id);
  res.json(db);
});
};

/** updateLog function to get Log by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
Log.findOneAndUpdate(req.params._id, req.body, function (err, db) {  
    // Handle any possible Log errors
    if (err)
      res.send(err);
    res.json(db);

  });
}

/** removeLog function to get Log by id. */
exports.delete = function (req, res) {
  Log.findOneAndRemove(req.params._id, function(err, result) {
    if(err) { throw err; }

    res.send(result);  
  });
}