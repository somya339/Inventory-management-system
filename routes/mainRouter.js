const Router = require('express').Router();
const controler = require('../controller/mainController');
const {
    multerupload
} = require('../utils/multer')
//getting to the index
Router.get('/index', controler.index);
//getting addmaterial page
Router.get('/addmaterial', controler.addmaterial);
//post data to addmaterial page
Router.post('/addmaterial', multerupload.single('image'), controler.postaddmaterial);
//getting editmaterial page
Router.get('/editmaterial/:id', controler.editmaterial);
//post data to editmaterial page
Router.post('/editmaterial/:id', controler.posteditmaterial);
//getting materials
Router.get('/materials', controler.materials);
// display materials 
Router.post('/showmaterials/:id', controler.postshowmaterials);
// delete materials
Router.post('/deletematerial/:_id', controler.postdeletematerial);
// add supplier
Router.get('/addsupplier', controler.addsupplier);
// display supplier
Router.get('/showsupplier/:id', controler.showsupplier);
// finds the suppliers
Router.get('/suppliers', controler.suppliers);
// post add supplier
Router.post('/addsupplier', controler.postaddsupplier);
// edit supplier details
Router.get('/editsupplier/:id', controler.editmaterial);
// post edit supplier details
Router.post('/editsupplier/:_id', controler.posteditsupplier);
//delete the data from supplier ...
Router.post('/deletesupplier/:_id', controler.postdeletesupplier);

module.exports = Router;