const Router = require('express').Router;
const controler = require('../controller/mainController');
//getting to the index
Router.get('/index', controler.index);
//getting addmaterial page
Router.get('/addmaterial', controler.addmaterial);
Router.post('/addmaterial', controler.addmaterial);
//getting editmaterial page
Router.get('/editmaterial/:id', controler.editmaterial);
Router.post('/editmaterial/:id', controler.editmaterial);
//getting materials
Router.get('/materials', controler.materials);

Router.post('/showmaterials/:id', controler.materials);

Router.post('/deletematerial/:_id', controler.materials);

Router.get('/addsupplier', controler.addmaterial);

Router.get('/showsupplier/:id', controler.addmaterial);

Router.get('/suppliers', controler.addmaterial);

Router.post('/addsupplier', controler.addmaterial);

Router.get('/editsupplier/:id', controler.addmaterial);

Router.post('/editsupplier/:_id', controler.addmaterial);
//delete the data from supplier ...
Router.post('/deletesupplier/:_id', controler.addmaterial);