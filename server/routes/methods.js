var express = require('express');
 var  routermethods = express.Router();
 
var ctrlmethods = require('../controllers/methodsCtrl');
 
 routermethods.get('/methods',ctrlmethods.getAll);

/* GET SINGLE Method BY ID */
routermethods.get('/methods/:_id', ctrlmethods.get);
 routermethods.get('/methods/category/:category', ctrlmethods.getByCategory);
 routermethods.get('/methods/user/:createdBy', ctrlmethods.getByUser);
/* SAVE Method */
routermethods.post('/methods', ctrlmethods.create);
/* UPDATE Method */
routermethods.put('/methods/:_id', ctrlmethods.update);
/* DELETE Method */
routermethods.delete('/methods/:_id', ctrlmethods.delete);

 module.exports = routermethods;