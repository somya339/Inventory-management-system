const Router = require('express').Router();
const controller = require('../controller/mainController');
const {
    multerupload
} = require('../utils/multer')
//getting to the index
Router.get('/', controller.index);
//getting addmaterial page
Router.get('/addmaterial', controller.addmaterial);
//post data to addmaterial page
Router.post('/addmaterial', multerupload.single('image'), controller.postaddmaterial);
//post data to editmaterial page
Router.post('/posteditmaterial/:id', multerupload.single('image'), controller.posteditmaterial);
//getting editmaterial page
Router.get('/editmaterial/:id', controller.editmaterial);
//getting materials
Router.get('/materials', controller.materials);
// display materials 
Router.post('/showmaterials/:id', controller.postshowmaterials);
// delete materials
Router.post('/deletematerial/:_id', controller.postdeletematerial);
// add supplier
Router.get('/addsupplier', controller.addsupplier);
// display supplier
Router.get('/showsupplier/:id', controller.showsupplier);
// finds the suppliers
Router.get('/suppliers', controller.suppliers);
// post add supplier
Router.post('/addsupplier', controller.postaddsupplier);
// post edit supplier details
Router.post('/posteditsupplier/:_id', controller.posteditsupplier);
// edit supplier details
Router.get('/editsupplier/:id', controller.editsupplier);
//delete the data from supplier ...
Router.post('/deletesupplier/:_id', controller.postdeletesupplier);
// download all data as csv
Router.post('/createcsv', controller.createCsv)

module.exports = Router;