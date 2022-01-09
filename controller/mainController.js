const Material = require('../models/material');
const Suppliers = require('../models/supplier');
const Photo = require("../models/photo.models");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');
// import utilities
const {
    cloudinary
} = require('../utils/cloudinary');

function sanitizer(string) {
    string = entities.encode(string);
    return string;
}

function today() {
    var date = new Date();
    var todaydate = date.toDateString();
    var minutes = date.getUTCMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var format = hours + ':' + minutes + ':' + seconds + ' ' + todaydate;
    return format;
};

//getting to the index
exports.index = (req, res) => {
    res.render('index');
};
//getting addmaterial page
exports.addmaterial = (req, res) => {
    res.render('addmaterial');
};
//getting editmaterial page
exports.editmaterial = (req, res) => {
    var id = req.params.id;
    res.render('editmaterial', {
        id: id
    });
};
//getting materials
exports.materials = (req, res) => {
    Material.getMaterials((err, materials) => {
        if (err) {
            res.render('material', {
                msg: 'Error in getting details..'
            });
        } else {
            var obj = materials;
            Photo.findOne({
                _id: obj[0].image
            }).then(result => {
                console.log(result);
                res.render('material', {
                    obj: obj,
                    url: result.url
                });
            })
        }
    })
};
// add the materials 
exports.postaddmaterial = async (req, res) => {
    var name = entities.encode(req.body.name);
    var price = entities.encode(req.body.price);
    var qty = entities.encode(req.body.quan);
    var state = entities.encode(req.body.state);
    var on = today();
    console.log(name, price, qty, state);

    try {
        // Retrieve path to file from file input
        const path = req.file.path;
        console.log(path);
        // Upload to Cloudinary
        let result = await cloudinary.uploader.upload(path)
        fs.rmSync(path);
        // set Photo properties
        console.log(result);
        const username = req.body.name;
        const filename = req.file.originalname;
        const url = result.url;
        const date = Date();

        // create Photo object
        const newPhoto = await Photo.create({
            username,
            filename,
            url,
            date,
        });
        console.log(newPhoto);
        // save to MongoDB database
        Material.addMaterial({
            name: name,
            price: price,
            qty: qty,
            state: state,
            image: newPhoto,
            created_on: on
        }, (err, material) => {
            if (err) {
                return res.render('addmaterial', {
                    msg: 'Please fill required details!'
                })
            }
            var obj = material;
            // res.render('addmaterial' , {
            //     msg:'successfully submit!!'
            //});
            res.status(200).send({
                status: "success"
            })
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            err: 'Something went wrong'
        });
    }
}
// update the material data
exports.posteditmaterial = (req, res) => {
    var id = req.params.id;
    var name = entities.encode(req.body.name);
    var price = entities.encode(req.body.price);
    var qty = entities.encode(req.body.qty);
    var state = entities.encode(req.body.state);
    //for creating date
    var on = today();
    Material.updateMaterial(id, {
        name: name,
        price: price,
        qty: qty,
        state: state,
        created_on: on
    }, {}, (err, callback) => {
        if (err) {
            res.render('editmaterial', {
                msg: "Error Occured."
            });
        }
        // res.render('editmaterial' ,{ id:id ,msg:"Successfully updated!!"} );
        res.redirect('/materials');
    });
};
//delete the data of materials
exports.postdeletematerial = (req, res) => {
    var id = req.params._id;
    Material.removeMaterial(id, (err, callback) => {
        if (err) {
            throw err
        }
        res.redirect('/materials');
    });
};
exports.postshowmaterials = (req, res) => {
    var id = req.params.id;
    Material.findbyid(id, (err, materials) => {
        if (err) {
            throw err;
        }
        var obj = materials;
        res.render('showmaterials', {
            obj: obj
        });
    });
};
//--------------------------------------------------
exports.addsupplier = (req, res) => {
    res.render('addsupplier');
};
exports.editsupplier = (req, res) => {
    var id = req.params.id;
    res.render('editsupplier', {
        id: id
    });
};
// finds the suppliers
exports.suppliers = (req, res) => {
    Suppliers.getSuppliers((err, suppliers) => {
        if (err) {
            res.render('supplier', {
                msg: 'some error occured!!'
            });
        }
        var obj = suppliers;
        res.render('supplier', {
            obj: obj
        });
    });
};
exports.postaddsupplier = (req, res) => {
    var cmpname = sanitizer(req.body.cmpname);
    var materialname = sanitizer(req.body.materialname);
    var state = sanitizer(req.body.state);
    var emailid = sanitizer(req.body.emailid);
    var contactno = sanitizer(req.body.contactno);
    var address = sanitizer(req.body.address);
    var costprice = sanitizer(req.body.costprice);
    var qty = sanitizer(req.body.qty);
    var on = today();
    var supplier = {
        cmpname: cmpname,
        materialname: materialname,
        state: state,
        emailid: emailid,
        contactno: contactno,
        address: address,
        costprice: costprice,
        qty: qty,
        created_on: on
    };
    Suppliers.addSupplier(supplier, (err, supplier) => {
        if (err) {
            throw err
        }
        res.redirect('/suppliers');
    })
};
// //add suppliers
// app.post('/addsupplier',(req ,res)=>{
//     var supplier = req.body;
//     Suppliers.addSupplier(supplier , (err, supplier)=>{
//         if(err){
//             throw err; 
//         }
//         res.json(supplier);
//     });
// });
//update the supplier data
exports.showsupplier = (req, res) => {
    var id = req.params.id;
    Suppliers.getSuppliersById(id, (err, supplier) => {
        if (err) {
            throw err
        }
        var obj = supplier;
        res.render('showsupplier', {
            obj: obj
        });
    });
};
exports.posteditsupplier = (req, res) => {
    var id = req.params._id;
    var cmpname = sanitizer(req.body.cmpname);
    var materialname = sanitizer(req.body.materialname);
    var state = sanitizer(req.body.state);
    var emailid = sanitizer(req.body.emailid);
    var contactno = sanitizer(req.body.contactno);
    var address = sanitizer(req.body.address);
    var costprice = sanitizer(req.body.costprice);
    var qty = sanitizer(req.body.qty);
    var on = today();
    var supplier = {
        cmpname: cmpname,
        materialname: materialname,
        state: state,
        emailid: emailid,
        contactno: contactno,
        address: address,
        costprice: costprice,
        qty: qty,
        created_on: on
    };
    Suppliers.updateSupplier(id, supplier, {}, (err, supplier) => {
        if (err) {
            throw err
        }
        res.redirect('/suppliers');
    });
};
//delete the data from supplier ...
exports.postdeletesupplier = (req, res) => {
    var id = req.params._id;
    Suppliers.removeSupplier(id, (err, callback) => {
        if (err) {
            throw err
        }
        res.redirect('/suppliers');
    });
};