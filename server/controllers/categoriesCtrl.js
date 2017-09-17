
var createLog = require('./logsCtrl').createLog;
var mongoose = require('mongoose');
var Category = require('../models/category').Category;
//mongoose.Promise = global.Promise;
 
/** create function to create Category. */
exports.create = function (req, res) {
 
   // new Thread({title: req.body.title, author: req.body.author}).save();
var category =new Category({name:req.body.name, module:req.body.module,createdBy:req.body.createdBy });
    category.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
      console.log(err);
     createLog(1,req.body.createdBy,"databse with a category: "+req.body.name, "Category") ;

      res.send({
        message: 'something went wrong'
      });
    } else {
      res.send({
        message: 'the category has been saved'
      });
    }
  // saved!
})

};
/******************/
exports.getAll = function (req, res) {
   
 
    Category.find({}, function(err, dbs) {
       var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};
/** getCategory function to get Category by id. */
exports.getByModule = function (req, res) {
   
   console.log("kkkkk"+req.params.module);
 
    Category.find({module:req.params.module}, function(err, dbs) {
       var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};

/** getCategory function to get Category by id. */
exports.get = function (req, res) {
   console.log("shh!  "+req.params._id );
     Category.findById(req.params._id, function(err, db) {
            if (err)
                res.send(err);
            res.json(db);
        });
};

/** updateCategory function to get Category by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
Category.findOneAndUpdate(req.params._id, req.body, function (err, db) {  
    // Handle any possible Category errors
      if (err)
                res.send(err);
            res.json(db);
   
});
}

/** removeCategory function to get Category by id. */
exports.delete = function (req, res) {
  Category.findOneAndRemove(req.params._id, function(err, result) {
    if(err) { throw err; }

    res.send(result);  
  });
}