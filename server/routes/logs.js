var express = require('express');
var  routerLogs = express.Router(); 
var ctrlLogs = require('../controllers/logsCtrl');
routerLogs.get('/logs/:createdBy',ctrlLogs.getAll);
/* GET SINGLE Log BY ID */
routerLogs.get('/logs/:_id', ctrlLogs.get); 
/* SAVE Log */
routerLogs.post('/logs/', ctrlLogs.create);
/* UPDATE Log */
routerLogs.put('/logs/:_id', ctrlLogs.update);
/* DELETE Log */
routerLogs.delete('/logs/:_id', ctrlLogs.delete);
 
 
 module.exports = routerLogs;