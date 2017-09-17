
var mongoose = require('mongoose');
var Result = require('../models/result').Result;
var fs = require('fs');
var path = require('path');
/** getAll function to get all Results . */
exports.getAll = function (req, res) {
  Result.find({}, function(err, dbs) {
     var dbMap = [];
    dbs.forEach(function(db) {
      dbMap.push( db);
    });
    res.send(dbMap);  
  });
};

exports.getByUser = function (req, res) {
  Result.find({$or: [{createdBy:req.params.createdBy},{publicResults:true}]})
.sort({createdAt: -1})
.exec(function(err, dbs) {
   var dbMap = [];

   dbs.forEach(function(db) {
    dbMap.push( db);
  });

   res.send(dbMap);  
 });
};
exports.getFiles = function (req, res) {

}

/** getResult function to get Result by id. */
exports.get = function (req, res) {

 Result.findOne({_id: req.params._id}, function(err, db) {
  if (err)
    res.send(err);
  toReturn={};
  toReturn.infos=db;
console.log("TESTING   "+JSON.stringify(db));
//if("savingResults" in db)

  if(db.savingResults)
  {
  toReturn.folders=folders(db.url);
  toReturn.files= walkSync(db.url);
  }

  res.send(toReturn);

});
};
var folders = function(dir) {
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  filelist = [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {

      filelist.push(file);
    }
  });
  return filelist;
}
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
function replaceAll(str, map){
  for(key in map){
    str = str.replaceAll(key, map[key]);
  }
  return str;
}
/**********************/
// List all files [as directory tree] in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
 
      filelist.push(walkSync(dir + '\\' + file, []));
    
 
    }
    else { 
      var data={};
      var results= [];
      results=dir.split("..");
      var map = {
        "\\\\" :"/"

      };
         var map2 = {
        "//" :"/"

      };
      var urlP= replaceAll(results[1], map);
      var urlP= replaceAll(urlP, map2);

      var pathNew="http://localhost:4000"+urlP+'/'+file;
      data.file = pathNew;//path.join( dir , file);

      data.name= file;
      if(file.endsWith('.png'))
      {
        filelist.push(data); 
      }
      }
    });
  return filelist;
};

/** getResult function to get Result by id. */
exports.getByModality = function (req, res) {
  console.log(" modality "+req.params.modality);
  Result.find({modality: req.params.modality}, function(err, dbs) {
    var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};

/** updateResult function to get Result by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
Result.findOneAndUpdate({_id:req.params._id}, req.body, function (err, db) {  
    // Handle any possible database errors
    if (err)
      res.send(err);
    res.json(db);
   });
}

/** removeResult function to get Result by id. */

exports.delete = function (req, res) {
  Result.findOneAndRemove({_id:req.params._id}, function(err, result) {
    if(err) { throw err; }

    res.send(result);  
  });
}

