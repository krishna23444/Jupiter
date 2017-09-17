var express = require('express');
 var  routerTests = express.Router();
 
var ctrlTests = require('../controllers/testsCtrl');
routerTests.get('/tests/:_id',ctrlTests.get);
routerTests.post('/tests/', ctrlTests.create);
routerTests.post('/tests/fusion', ctrlTests.createFusion);
 module.exports = routerTests;