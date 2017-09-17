var express = require('express');
var  routerResults = express.Router(); 
var ctrlResults = require('../controllers/resultsCtrl');
routerResults.get('/results/',ctrlResults.getAll); 
routerResults.get('/results/user/:createdBy', ctrlResults.getByUser);
/* GET SINGLE Result BY ID */
routerResults.get('/results/:_id', ctrlResults.get);
routerResults.post('/results/files/', ctrlResults.getFiles);
//routerResults.get('/results/module/:module', ctrlResults.getByModule);
/* UPDATE Result */
routerResults.put('/results/:_id', ctrlResults.update); 
/* DELETE Result */
routerResults.delete('/results/:_id', ctrlResults.delete); 
 module.exports = routerResults;