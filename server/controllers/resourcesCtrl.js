
var mongoose = require('mongoose');
var DataBase = require('../models/resource').DataBase;
var createLog = require('./logsCtrl').createLog;

var formidable = require('formidable'),
http = require('http'),
util = require('util');
var mkdirp = require('mkdirp');
var mv = require('mv');
exports.upload = function (req, res) {
var uploadDir = './uploads/databses/temp/';//+body.name; 
mkdirp(uploadDir, function (err) {
  if (err) return cb(err);
  var form = new formidable.IncomingForm({ 
    keepExtensions: true
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    console.log(100 * bytesReceived / bytesExpected + '%');
  });

  form.uploadDir=uploadDir;

  form.parse(req)
  .on('fileBegin', function(name, file) {
    file.path = form.uploadDir + file.name;
  }).on('field', function(databse, fields) {
    var body = JSON.parse(fields);
    console.log(body);

    uploadDir='./uploads/databses/'+body.createdBy+'/'+body.name+'/';
    console.log('Got form:', form.uploadDir);
    var dataBase =new DataBase({name:body.name,type:body.type,publicDatabase:body.publicDatabase,
      modality: body.modality,sensor: body.sensor, note:body.note,preTraited:body.preTraited,ref:body.ref,
      resolution: body.resolution, numberTot: body.numberTot,
      numberScans: body.numberScans,createdBy:body.createdBy,url:uploadDir });
    form.uploadDir=uploadDir;

    mkdirp(uploadDir, function (err) {
      if (err) return cb(err);
    });
            console.log('77');

    dataBase.save( function(err, result) {
      if (!err) {
        console.log('hhhhhhhhhhh');
        createLog(1,req.body.createdBy,"databse with a name: "+req.body.name, "DataBase") ;

     // return res.json(result);
   } else { 
            return res.send(err); // 500 error
          }
        });
  }).on('file', function(name, files) {
   mv('./uploads/databses/temp',  form.uploadDir, {mkdirp: true}, function(err) {
  // done. it first created all the necessary directories, and then 
  // tried fs.rename, then falls back to using ncp to copy the dir 
  // to dest and then rimraf to remove the source dir 
});
   console.log('Got file:', name);
   res.end(util.inspect({

    files: files
  }));
 })
  .on('error', function(err) {
    next(err);
  })
  .on('end', function() {
    res.end();
  });
};
/** Never used create function to create DataBase. */
exports.create = function (req, res) {
  var dataBase =new DataBase({name:body.name,
    modality: req.body.modality,sensor: req.body.sensor, 
    resolution: req.body.resolution, numberTot: req.body.numberTot,
    numberScans: req.body.numberScans,createdBy:req.body.createdBy });

  dataBase.save( function(err, result) {
    if (!err) {

      return res.send('ok');
    } else {
            return res.send(err); // 500 error
          }
        });
};

/** getDataBase function to get DataBase by id. */
exports.getAll = function (req, res) {


  DataBase.find({}) .sort({createdAt: -1})
.exec(function(err, dbs) {
    var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};

exports.getByUser = function (req, res) {
  DataBase.find({$or: [{createdBy:req.params.createdBy},{publicDatabase:true}]}) .sort({createdAt: -1})
.exec(function(err, dbs) {
   var dbMap = [];

   dbs.forEach(function(db) {
    dbMap.push( db);
  });

   res.send(dbMap);  
 });
};

/** getDataBase function to get DataBase by id. */
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
exports.get = function (req, res) {
   console.log("FU  : "+req.params._id);

  DataBase.findOne({_id: req.params._id}, function(err, db) {
    if (err)
      res.send(err);
    toReturn={};
    toReturn.infos=db;
//console.log(toReturn.infos.url);
if(db.url!=null)
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
      console.log("before : "+dir);
      results=dir.split(".");
      var map = {
        "\\\\" :"/"

      };
      var map2 = {
        "//" :"/"

      };
      console.log("after : "+results[1]);
      var urlP= replaceAll(results[1], map);
      var urlP= replaceAll(urlP, map2);

      var pathNew="http://localhost:4000"+urlP+'/'+file;
      data.file = pathNew;//path.join( dir , file);

      data.name= file;

        filelist.push(data); 
 
    }
  });
  return filelist;
};

/** getDataBase function to get DataBase by id. */
exports.getByModality = function (req, res) {
  console.log(" modality "+req.params.modality);
  DataBase.find({modality: req.params.modality}, function(err, dbs) {
    var dbMap = [];

    dbs.forEach(function(db) {
      dbMap.push( db);
    });

    res.send(dbMap);  
  });
};

/** updateDataBase function to get DataBase by id. */
exports.update = function (req, res) {
   // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.dbId.
// Find the existing resource by ID
DataBase.findOneAndUpdate({_id:req.params._id}, req.body, function (err, db) {  
createLog(2,db.createdBy,"databse with a name: "+req.body.name, "DataBase") ;

    // Handle any possible database errors
    if (err)
      res.send(err);
    res.json(db);
    });
}

/** removeDataBase function to get DataBase by id. */

exports.delete = function (req, res) {
  console.log("resss"+JSON.stringify(req.params));

  DataBase.findByIdAndRemove(req.params._id, function(err,db) {
 createLog(3,db.createdBy,"databse with a name: "+db.name, "DataBase") ;

    if (err)
      res.send(err);
    else
      res.json({ message: 'Database Deleted!'});
  });
}