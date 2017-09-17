var express = require('express');
 var  routerKeywords = express.Router();
 
var ctrlKeywords = require('../controllers/keywordsCtrl');
 
 routerKeywords.get('/keywords',ctrlKeywords.getAll);
 
 
/* GET SINGLE DataBase BY ID */
routerKeywords.get('/keywords/:_id', ctrlKeywords.get);
 
/* SAVE DataBase */
routerKeywords.post('/keywords/', ctrlKeywords.create);

/* UPDATE DataBase */
routerKeywords.put('/keywords/:_id', ctrlKeywords.update);
 

/* DELETE DataBase */
routerKeywords.delete('/keywords/:_id', ctrlKeywords.delete);
 
 
 module.exports = routerKeywords;