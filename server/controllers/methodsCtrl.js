
var mongoose = require('mongoose');
var Method = require('../models/method').Method;
var Category = require('../models/category').Category;
var Keyword = require('../models/keyword').Keyword;
var createLog = require('./logsCtrl').createLog;

//mongoose.Promise = global.Promise;
var formidable = require('formidable');
var util = require('util');
var http = require('http');
var mkdirp = require('mkdirp');
var fs = require('fs');
/** API path that will upload the files */
/** create function to create Method. */
exports.create = function (req, res) {
 //Store the data from the req.body in your data store.
//The data store could be a file or database or any other store based
//on your application.
console.log("Parsing");
var uploadDir = './uploads/methods/'+req.body.createdBy+'/'+req.body.module+'/'+req.body.category;
//Filling method object
console.log("Parsing"+uploadDir);
//If there is a special traitement for the method
if(req.body.needBDD)
{
  createKey(req.body.name2);
  var method =new Method({name:req.body.name,name2:req.body.name2,category:req.body.category,publicMethod: req.body.publicMethod,createdBy:req.body.createdBy,
    url:uploadDir+'/'+req.body.name+'.m',codeMatlab: req.body.codeMatlab,codeMatlab2: req.body.codeMatlab2, modality: req.body.modality,module: req.body.module,
    description: req.body.description, ref: req.body.ref,needBDD:true});
}
else
{
  var method =new Method({name:req.body.name,category:req.body.category,publicMethod: req.body.publicMethod,createdBy:req.body.createdBy,
    url:uploadDir+'/'+req.body.name+'.m',codeMatlab: req.body.codeMatlab, modality: req.body.modality,module: req.body.module,
    description: req.body.description, ref: req.body.ref,needBDD:false});
}
createKey(req.body.name);


//Create the Key word
mkdirp(uploadDir, function (err) {
  if (err) return cb(err);

  
  fs.writeFile(uploadDir+"/"+req.body.name+'.m', req.body.codeMatlab, function(err) {
    if(err) {
      return console.log(err);
    }
    /*************TO DELETE**************/
    var category =new Category({name:req.body.category, module:req.body.module,modality:req.body.modality,createdBy:req.body.createdBy });

    category.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
  console.log(err);

} else {

}
  // saved!
});
    /**********************************/
    method.save( function(err, result) {
      if (err) {
        console.log(err);
        createLog(1,req.body.createdBy,"method with a name: "+req.body.name, "Method") ;

        res.send({
          message: 'something went wrong'
        });
      } else {
        if(req.body.needBDD)
        {
          fs.writeFile(uploadDir+"/"+req.body.name2+'.m', req.body.codeMatlab2, function(err) {
            if(err) {
              return console.log(err);
            }
            res.send({
              message: 'the method has been saved'
            });
            console.log("The seconde file was saved!");
          });
        }
        else
        {
          res.send({
            message: 'the method has been saved'
          });
        }

      }
    });
    console.log("The file was saved!");
  });
});


};
/** getMethod function to get Method by id. */
exports.getAll = function (req, res) {
  Method.find({}, function(err, dbs) {
    var dbMap = [];
    console.log("please work");

    dbs.forEach(function(db) {
      dbMap[db._id] = db;
      console.log("please work");
      dbMap.push( db);

    });

    res.send(dbMap);  
  });
};

exports.getByUser = function (req, res) {
  Method.find({$or: [{createdBy:req.params.createdBy},{publicMethod:true}]}) .sort({createdAt: -1})
.exec(function(err, dbs) {
    var dbMap = [];
    console.log("please work");

    dbs.forEach(function(db) {
      dbMap[db._id] = db;
      console.log("please work");
      dbMap.push( db);

    });

    res.send(dbMap);  
  });
};

exports.getByCategory = function (req, res) {
  Method.find({category:req.params.category}, function(err, dbs) {
    var dbMap = [];
    console.log("please work");

    dbs.forEach(function(db) {
      dbMap[db._id] = db;
      console.log("please work");
      dbMap.push( db);

    });

    res.send(dbMap);  
  });
};

/** getMethod function to get Method by id. */
exports.get = function (req, res) {
 console.log("The file was saved!"+req.params._id);
 Method.find({_id: req.params._id}, function(err, db) {
  if (err)
    res.send(err);
  res.json(db);
});
};

/** updateMethod function to get Method by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
fs.writeFile( req.body.url,  req.body.codeMatlab, function(err) {
  if(err) {
    return console.log(err);
  }  
  console.log("The file was saved!");

});
Method.findOneAndUpdate({_id:req.params._id}, req.body, function (err, db) {  
// Handle any possible Method errors
if (err)
 // res.send(err);
console.log("testin URL"+req.body.url);
createLog(2,req.body.createdBy,"method with a name: "+req.body.name, "Method") ;
       res.send({"message":"ok"});


});
/*Keyword.findOneAndUpdate(req.body.name, {name:db.body.name}, function (err, db) {  
    // Handle any possible Keyword errors
    if (err)
      res.send(err);
    res.json(db);

  });*/
}

/** removeMethod function to get Method by id. */
exports.delete = function (req, res) {
  Method.findOneAndRemove({_id:req.params._id}, function(err, result) {
    if(err) { throw err; }
    createLog(3,result.createdBy,"method with a name: "+result.name, "Method") ;

    Keyword.findOneAndRemove({name:result.name}, function(err, resp) {
      if(err) { throw err; }

      res.send(resp);  
    });
  });

}


function createKey(key)
{

  var keyword=new Keyword({name: key});
  keyword.save(function (err) {
//  if (err)         return res.end(err.message); 
if (err) {
  console.log(err);

} else {

}
  // saved!
}); 

}
 