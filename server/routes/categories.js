var express = require('express');
 var  routerCategories = express.Router();
 
var ctrlCategories = require('../controllers/categoriesCtrl');
 
 routerCategories.get('/categories',ctrlCategories.getAll);
 
 
/* GET SINGLE Category BY ID */
routerCategories.get('/categories/:_id', ctrlCategories.get);
routerCategories.get('/categories/module/:module', ctrlCategories.getByModule);
 
/* SAVE Category */
routerCategories.post('/categories/', ctrlCategories.create);

/* UPDATE Category */
routerCategories.put('/categories/:_id', ctrlCategories.update);
 

/* DELETE Category */
routerCategories.delete('/categories/:_id', ctrlCategories.delete);
 
 
 module.exports = routerCategories;