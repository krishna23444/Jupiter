//Still need a huge work here 
var DataBase = require('../models/resource').DataBase;
var Senario = require('../models/senario').Senario;
var Result = require('../models/result').Result;
var Test = require('../models/test').Test;
var createLog = require('./logsCtrl').createLog;
var shell = require('shelljs');
var util = require('util');
var http = require('http');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Promise = require('bluebird');
exports.get = function (req, res) {

 Test.findOne({_id: req.params._id}, function(err, db) {
  if (err)
    res.send(err);
  res.send(db);

});
};
exports.create = function (req, res,next) {
  var nameSenario="";
//Creating a unique name for a senario
var senario =new Senario({type:req.body.type,createdBy:req.body.createdBy });

var methods=req.body.methodNames;
nameSenario="Senario"+senario._id+".m";
//Get path of Database
//Get scans and scan
let numberScans=req.body.numberScans;
let numberTot=req.body.numberTot;
let DistDir=__dirname+"\\..\\uploads\\results\\"+req.body.createdBy+"\\"+senario._id+"\\";
let  pathBDD= __dirname+"\\."+req.body.url;
// If user wants to save results 
let savingResults=req.body.savingResults;


if(req.body.needBDD==false)
{
  // Replacing strings in file : 
  var map = {
    'pathBDDToReplace' :pathBDD,
    'pathResultsToReplace' : DistDir,
    'numberScansToChange' : req.body.numberScans,
    'numberTotToChange' : req.body.numberTot,
    'savningToChange' : req.body.savingResults
  };
  var prepText= fs.readFileSync(__dirname+'\\senarios\\'+'preperation.txt', 'utf-8');
}
else
{
  if(req.body.modality=="Fingerprint")
  {
   var map = {
    'pathBDDToReplace' :pathBDD,
    'pathResultsToReplace' : DistDir,
    'numberScansToChange' : req.body.numberScans,
    'numberTotToChange' : req.body.numberTot,
    'savningToChange' : req.body.savingResults,
    'matchToChange':req.body.matcher,
    'BeforetoChange':req.body.beforeRoutine
  };
}  
else
{
  var map = {
    'pathBDDToReplace' :pathBDD,
    'pathResultsToReplace' : DistDir,
    'numberScansToChange' : req.body.numberScans,
    'numberTotToChange' : req.body.numberTot,
    'savningToChange' : req.body.savingResults,
    'matchToChange':req.body.matcher,
    'BeforetoChange':req.body.beforeRoutine
  };
}
  // Replacing strings in file : 

  var prepText= fs.readFileSync(__dirname+'\\senarios\\'+'preperationSpace.txt', 'utf-8');
}
var prepText = replaceAll(prepText, map);

if(req.body.needBDD==false)
{
  methods.forEach(function(element) {
    item=element;

prepText=prepText+"\n %"+item.module; //Comment
switch(item.module.toLowerCase())
{
  case "segmentation":
  prepText=prepText+"\n  [img,mask]="+item.name+"(img);\n";
  break;
  case "filtering":
  prepText=prepText+"\n  [ img, mask, cimg, cimg2, orient_img, orient_img_m ] ="+item.name+"(img,mask);\n";
  break;
  case "extraction":
  if(req.body.modality=="Fingerprint")
  {
    prepText=prepText+"\n  [minutiae,img] ="+item.name+"(img,mask,orient_img,orient_img_m,cimg);  \n  features{a}=minutiae; \n";

  }
  else
  {
    prepText=prepText+"\n  [feature] ="+item.name+"(img);  \n  features{a}=feature; \n";
  }
  break;

  default:
  prepText=prepText+"\n  img="+item.name+"(img); \n ";
  break;
}
prepText=prepText+"%Saving results \n if(savingResults==1); saveOutPutImage(img,'"+item.module+"',dirResults,name); end\n";
});
//Finalisation      
if(req.body.matcher=="")
{
  var txt= fs.readFileSync(__dirname+'\\senarios\\'+'finalisation.txt', 'utf-8');
  var map = {
    'matchToChange' :req.body.matcher,
    'ErrorToChange':DistDir+"\\error.txt"
  };
  prepText =prepText+ replaceAll(txt, map);
}
else
{
  var txt= fs.readFileSync(__dirname+'\\senarios\\'+'finalisationMatching.txt', 'utf-8');
  if(req.body.modality==="Fingerprint")
  {
    var map = {
      'matchToChange' :req.body.matcher,
      'rocTochange':'rocPalm(1 ./ S_intra_class,1 ./ S_inter_class)',
      'ErrorToChange':DistDir+"\\error.txt"};
    }
    else  {
      var map = {
        'matchToChange' :req.body.matcher,
        'rocTochange':"rocPalm(S_intra_class,S_inter_class)",
        'ErrorToChange':DistDir+"\\error.txt"};
      }


      prepText =prepText+ replaceAll(txt, map);
    }
  }


  tesintPath=DistDir+"\\"+nameSenario;
  mkdirp(DistDir, function(err) { 
// path exists unless there was an error
var stream = fs.createWriteStream(tesintPath);
stream.once('open', function(fd) {
  stream.write(prepText);
  stream.end();
});
});
  nameSenarioToExe="Senario"+senario._id;
  var logPath=__dirname+"\\error.txt";
 var cmd = ['matlab -nojvm -nosplash -nodesktop -noFigureWindows  -minimize -r  \"  addpath(genpath(\''+ __dirname+'\\..\\uploads\')); '+ nameSenarioToExe+'(); exit; \"'];///
 // console.log('I HATE U');
 shell.exec(cmd, function (code, stdout, stderr) {
  // console.log('matlab exit');
}); 
 filedir = DistDir,
 filename = "done.json";

 var p = Promise.resolve(DistDir)

 .catch(console.error.bind(console, 'Failed to load config!'))
 .then( fs.watch(DistDir, function(event, who) {
    if (event == "rename" && who == "done.json") { // && who === filename


      /************NOW WE CREATE OUR MODELS**********/
      var test =new Test({  type:req.body.type, savingResults: req.body.savingResults, complete: req.body.complete,
        needBDD: req.body.needBDD,  beforeRoutine: req.body.beforeRoutine,  url:DistDir , modality: req.body.modality,
        matcher:req.body.matcher,   nameBDD:req.body.nameBDD, createdBy:req.body.createdBy, numberScans:req.body.numberScans, numberTot:req.body.numberTot,
        methodNames: req.body.methodNames});

      test.save(function (err) {
       if (err) {
        return res.send('Fail');
      } else {   
       createLog(1,req.body.createdBy,req.body.type, "Test") ;

       var codeError=  fs.readFileSync(filedir+filename, 'utf-8');
       jsonErr=JSON.parse(codeError);
       var codeError = jsonErr.code.toUpperCase() === "fail".toUpperCase();
       var errorMsg="";
     // // console.log("here i am ");
    // res.json({ message: 'post created!' });
    if(codeError==1)
    {
      var  times1=fs.readFileSync(filedir+"error.json", 'utf-8');
      var errorTime=JSON.parse(times1).errorTime;
      errorMsg=fs.readFileSync(filedir+"error.txt", 'utf-8');
      var result =new Result({  type:req.body.type,errorTime:errorTime,fail: codeError, complete: req.body.complete,  
        errorCode: errorMsg, savingResults:false,
        url:DistDir, modality: req.body.modality,testId:test._id,
        createdBy: req.body.createdBy});    
    }
    else
    {          
          // si no fail 
          var  times1=fs.readFileSync(filedir+"statistics\\stat.json", 'utf-8');
          var timesPretrait=JSON.parse(times1).timesPretrait;
         // // console.log("here i am "+timesPretrait);
          if(req.body.complete==true) // if we are testing a process
          {
           var times2=fs.readFileSync(filedir+"statistics\\stat1.json", 'utf-8');
           var timesMatching=JSON.parse(times2).timesMatching;
           var ratesJSon=fs.readFileSync(filedir+"statistics\\stat2.json", 'utf-8');
           var realrate=JSON.parse(ratesJSon).rates.realrate;
           var missrate=JSON.parse(ratesJSon).rates.missrate;
           var rates=JSON.parse(ratesJSon).rates.rates;
           var result =new Result({ testId:test._id, type:req.body.type,complete: req.body.complete
            ,savingResults: req.body.savingResults,timesPretrait:timesPretrait, timesMatching:timesMatching,
            url:DistDir, modality: req.body.modality,publicResults:false, 
            createdBy: req.body.createdBy,realrate:realrate,missrate:missrate,rates:rates});    
         }
         else
         {
          var result =new Result({ testId:test._id, type:req.body.type,complete: req.body.complete
            ,savingResults: req.body.savingResults, timesPretrait:timesPretrait,
            url:DistDir, modality: req.body.modality,publicResults:false, 
            createdBy: req.body.createdBy});    
        }
      }
      result.save(function (err) {
        if (err) {
          return res.send(err);
        }else {
         res.status(200).send(result);

       }
     });

    } 
  });
    }
  }));
// Listen for exception event to trigger promise cancellation
process.on('unhandledException', function(event) {
 // cancel config loading
 p.cancel();
});

}
//Repteaaad i will refine it later
exports.createFusion = function (req, res,next) {
  var nameSenario="";
//Creating a unique name for a senario
var senario =new Senario({type:req.body.type,createdBy:req.body.createdBy });  
var methods=req.body.methodNames;
nameSenario="Senario"+senario._id+".m";
let DistDir=__dirname+"\\..\\uploads\\results\\"+req.body.createdBy+"\\"+senario._id+"\\";
let  pathBDD= __dirname+"\\."+req.body.url;


if(req.body.type=="Features Fusion")
{
  var map = {
    'pathBDDToReplace' :pathBDD,
    'pathResultsToReplace' : DistDir,
    'matcher' : req.body.matcher,
    'ErrorToChange':DistDir+"\\error.txt"
  };
  var prepText= fs.readFileSync(__dirname+'\\senarios\\'+'senarioFusionFeatures.txt', 'utf-8');
}
else
{
 var map = {
  'pathBDDToReplace' :pathBDD,
  'pathResultsToReplace' : DistDir,
  'fusionMethod' : req.body.methodNames[0].name,
  'ErrorToChange':DistDir+"\\error.txt"

};
  // Replacing strings in file : 
  var prepText= fs.readFileSync(__dirname+'\\senarios\\'+'senarioFusionScores.txt', 'utf-8');
}
var prepText = replaceAll(prepText, map);
var tesintPath=DistDir+"\\"+nameSenario;
mkdirp(DistDir, function(err) { 
  var stream = fs.createWriteStream(tesintPath);
  stream.once('open', function(fd) {
    stream.write(prepText);
    stream.end();
  });
});
nameSenarioToExe="Senario"+senario._id;
var logPath=__dirname+"\\error.txt";
 var cmd = ['matlab -nojvm -nosplash -nodesktop -noFigureWindows  -minimize -r  \"  addpath(genpath(\''+ __dirname+'\\..\\uploads\')); '+ nameSenarioToExe+'(); exit; \"'];///
 shell.exec(cmd, function (code, stdout, stderr) {
  // console.log('matlab exit');
}); 
 filedir = DistDir,
 filename = "done.json";
//res.send('OK');  
 //.timeout(2000)
 var p = Promise.resolve(DistDir)
 .catch(console.error.bind(console, 'Failed to load config!'))
 .then( fs.watch(DistDir, function(event, who) {
  //// console.log("me is  "+who);
    if (event == "rename" && who == "done.json") { // && who === filename

      /************NOW WE CREATE OUR MODELS**********/
      var test =new Test({  type:req.body.type, savingResults: req.body.savingResults,  complete: req.body.complete,
        needBDD: req.body.needBDD,  beforeRoutine: req.body.beforeRoutine,  url:DistDir , modality: req.body.modality,
        matcher:req.body.matcher,   nameBDD:req.body.nameBDD, createdBy:req.body.createdBy, numberScans:req.body.numberScans, numberTot:req.body.numberTot,
        methodNames: req.body.methodNames});
      // console.log('after');

      test.save(function (err) {
       if (err) {
        return res.send('Fail');
      } else {   
       createLog(1,req.body.createdBy,req.body.type, "Test") ;
       var codeError=  fs.readFileSync(filedir+filename, 'utf-8');
       jsonErr=JSON.parse(codeError);
       var codeError = jsonErr.code.toUpperCase() === "fail".toUpperCase();
       var errorMsg="";

    if(codeError==1)
    {
     var  times1=fs.readFileSync(filedir+"error.json", 'utf-8');
     var errorTime=JSON.parse(times1).errorTime;
     console.log("here meeeeeeee "+JSON.stringify(times1));
     errorMsg=fs.readFileSync(filedir+"error.txt", 'utf-8');
     var result =new Result({  type:req.body.type,errorTime:errorTime,fail: codeError, complete: req.body.complete,  
      errorCode: errorMsg, savingResults:false,
      url:DistDir, modality: req.body.modality,testId:test._id,
      createdBy: req.body.createdBy});    
   }
   else
   {          
 // si no fail 
 var  times1=fs.readFileSync(filedir+"statistics\\stat.json", 'utf-8');
 var timesPretrait=JSON.parse(times1).timesPretrait;
         // // console.log("here i am "+timesPretrait);
         var times2=fs.readFileSync(filedir+"statistics\\stat1.json", 'utf-8');
         var timesMatching=JSON.parse(times2).timesMatching;
         var ratesJSon=fs.readFileSync(filedir+"statistics\\stat2.json", 'utf-8');
         var realrate=JSON.parse(ratesJSon).rates.realrate;
         var missrate=JSON.parse(ratesJSon).rates.missrate;
         var rates=JSON.parse(ratesJSon).rates.rates;
         var result =new Result({ testId:test._id, type:req.body.type,complete: req.body.complete
          ,savingResults: req.body.savingResults,timesPretrait:timesPretrait, timesMatching:timesMatching,
          url:DistDir, modality: req.body.modality,publicResults:false, 
          createdBy: req.body.createdBy,realrate:realrate,missrate:missrate,rates:rates});        
       }
       result.save(function (err) {
        if (err) {
          return res.send(err);
        }else {
         res.status(200).send(result);

       }
     });
     } 
   });
    }
  }));
// Listen for exception event to trigger promise cancellation
process.on('unhandledException', function(event) {
 // cancel config loading
 p.cancel();
});
}
function checkFile(currentPath, fileContents) {
  var fileContents = fs.readFileSync(currentPath);
  zlib.gunzip(fileContents, function(err, buff) {
    if (buff.toString().indexOf("position") !== -1) {
      // console.log("The file '%s' has an odometer reading.", currentPath);
      return;
    }
  });
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


function onFileChange(type, current, previous) {
  // console.log(type);
}

function appendFile(dest,data)
{
//writeStream=fs.createWriteStream(dest);
fs.appendFile(dest, data, function (err) {
  if (err) throw err;
  // console.log('Saved!');
});

}
function copyTextFromFile(src) {
//Copy a file test
fs.readFile(src, 'utf8', function (err,data) {
  if (err) {
    return // console.log(err);
  }
  //var result = data.replace(/string to be replaced/g, 'replacement');
  data= fs.readFileSync(src, 'utf-8');
  // console.log(data);
  return data;
});
}

function copyFile(src, dis) {
//Copy a file test

}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function initFile(destDir)
{
 var stream = fs.createWriteStream(destDir);
 stream.once('open', function(fd) {
  stream.write("");
  stream.end();
});
}
function getFiles (url, files_){
  files_ = files_ || [];
  // console.log('i am  here!'+url);


  var files = fs.readdirSync(url);
  for (var i in files){
    var name = url + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
 // res.json(db);
 


 return files_;
}
