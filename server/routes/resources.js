var express = require('express');
var  routerResources = express.Router();
var ctrlResource = require('../controllers/resourcesCtrl');
routerResources.get('/resources/databases',ctrlResource.getAll);
/* GET SINGLE DataBase BY ID */
routerResources.get('/resources/databases/:_id', ctrlResource.get);
routerResources.get('/resources/databases/user/:createdBy', ctrlResource.getByUser);
routerResources.get('/resources/databases/modality/:modality', ctrlResource.getByModality);
/* SAVE DataBase */
routerResources.post('/resources/databases/', ctrlResource.create);
/* UPLOAD DataBase */
routerResources.post('/resources/databases/upload', ctrlResource.upload);
/* UPDATE DataBase */
routerResources.put('/resources/databases/:_id', ctrlResource.update);
/* DELETE DataBase */
routerResources.delete('/resources/databases/:_id', ctrlResource.delete);
 module.exports = routerResources;