var mongoose = require('mongoose');
var Keyword = require('../models/keyword').Keyword;
//mongoose.Promise = global.Promise;
/** create function to create Keyword. */
exports.create = function (req, res) {
   // new Thread({title: req.body.title, author: req.body.author}).save();
var keyword =new Keyword({name:req.body.name });
    keyword.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
      console.log(err);
      res.send({
        message: 'something went wrong'
      });
    } else {
      res.send({
        message: 'the keyword has been saved'
      });
    }
  // saved!
});
};

/** getKeyword function to get Keyword by id. */
exports.getAll = function (req, res) {
   

    Keyword.find({}, function(err, dbs) {
       var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};

/** getKeyword function to get Keyword by id. */
exports.get = function (req, res) {
   
     Keyword.find({name: req.params._id}, function(err, db) {
            if (err)
                res.send(err);
              console.log("whyyyy"+req.params._id);
            res.json(db);
        });
};

/** updateKeyword function to get Keyword by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
Keyword.findOneAndUpdate(req.params._id, req.body, function (err, db) {  
    // Handle any possible Keyword errors
      if (err)
                res.send(err);
            res.json(db);
   
});
}

/** removeKeyword function to get Keyword by id. */
exports.delete = function (req, res) {
  Keyword.findOneAndRemove(req.params._id, function(err, result) {
    if(err) { throw err; }

    res.send(result);  
  });
}