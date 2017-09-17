var mongoose = require('mongoose');
var Modality = require('../models/modality').Modality;
/** create function to create Modality. */
var createLog = require('./logsCtrl').createLog;

exports.create = function (req, res) {
       console.log('fff',JSON.stringify(req.body));

var modality =new Modality({name: req.body.name, type: req.body.type,createdBy:req.body.createdBy });
       console.log(JSON.stringify(modality));

 modality.save(function (err) {
//  if (err)         return res.end(err.message); 
 if (err) {
      console.log('fff'+err);
      createLog(1,req.body.createdBy,"databse with a modality: "+req.body.name, "Modality") ;

      res.send({
        message: 'something went wrong'
      });
    } else {
      res.send({
        message: 'the Modality has been saved'
      });
    }
  // saved!
});  
};
   // Modality.create(req.body).then(list )=> respondCreated.call(res, list)).catch(err => respondFailedValidation.call(res, err.toString()));

/** getModality function to get Modality by id. */
exports.getAll = function (req, res) {
 Modality.find({}, function(err, dbs) {
       var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);   
  });
};

/** getModality function to get Modality by id. */
exports.get = function (req, res) {
   
     Modality.find({name: req.params._id}, function(err, db) {
            if (err)
                res.send(err);
            res.json(db);
        });
};

/** updateModality function to get Modality by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
Modality.findOneAndUpdate({name:req.params._id}, req.body, function (err, db) {  
    // Handle any possible Modality errors
      if (err)
                res.send(err);
            res.json(db);
   
});
}

/** removeModality function to get Modality by id. */
 

  exports.delete = function (req, res) {
   Modality.findOneAndRemove({name:req.params._id}, function(err, result) {
    if(err) { throw err; }

    res.send(result);  
  }); 
}