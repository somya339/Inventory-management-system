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
//getting editmaterial page
Router.get('/editmaterial/:id', controller.editmaterial);
//post data to editmaterial page
Router.post('/editmaterial/:id', controller.posteditmaterial);
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
// edit supplier details
Router.get('/editsupplier/:id', controller.editmaterial);
// post edit supplier details
Router.post('/editsupplier/:_id', controller.posteditsupplier);
//delete the data from supplier ...
Router.post('/deletesupplier/:_id', controller.postdeletesupplier);
// download all data as csv
Router.post('/createcsv', controller.createCsv)

module.exports = Router;