/****This is just a test for Matlab i don't need it any more***/
var express = require('express');
var  routerMatlab = express.Router();
var ctrlMatlab = require('../controllers/ctrlMatlab'); 
/* SAVE DataBase */
routerMatlab.post('/readfromurl/readfromurl', ctrlMatlab.create);
 
 
 
 module.exports = routerMatlab;