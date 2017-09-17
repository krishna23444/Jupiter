var express = require('express');
 var  routerModalities = express.Router();
 
var ctrlModalities = require('../controllers/modalitiesCtrl');
 
 routerModalities.get('/resources/modalities',ctrlModalities.getAll);

/* GET SINGLE Modality BY ID */
routerModalities.get('/resources/modalities/:_id', ctrlModalities.get);
 
/* SAVE Modality */
routerModalities.post('/resources/modalities/', ctrlModalities.create);

/* UPDATE Modality */
routerModalities.put('/resources/modalities/:_id', ctrlModalities.update);
 

/* DELETE Modality */
routerModalities.delete('/resources/modalities/:_id', ctrlModalities.delete);
 
 
 module.exports = routerModalities;