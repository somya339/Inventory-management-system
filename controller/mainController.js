const Material = require('../models/material');
const Suppliers = require('../models/supplier');
const Photo = require("../models/photo.models");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');
const {
    Parser
} = require('json2csv');
var globalMaterials = [];
// import utilities
const {
    cloudinary
} = require('../utils/cloudinary');
const path = require('path');

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
    Material.getMaterials(async (err, materials) => {
        if (err) {
            res.render('material', {
                msg: 'Error in getting details..'
            });
        } else {
            globalMaterials = materials;
            var obj = globalMaterials
            let url = await getURL(obj);
            res.render('material', {
                obj: globalMaterials,
                url: url
            });

        }
    })
};

const getURL = async (obj) => {
    let url = [];
    for (let image of obj) {
        let result = await Photo.findOne({
            _id: image.image
        })
        url.push(result.url);
    }
    return url;
}
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
        let result = await cloudinary.uploader.upload(path, {
            use_filename: true
        })
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
        Material.create({
            name: name,
            price: price,
            qty: qty,
            state: state,
            image: newPhoto._id,
            created_on: on
        }).then((material) => {
            console.log(material);
            res.status(200).send({
                status: "success"
            })
        }).catch((err) => {
            console.log(err.message);
            return res.render('addmaterial', {
                msg: 'Please fill required details!'
            })
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            err: 'Something went wrong'
        });
    }
}
// update the material data
exports.posteditmaterial = async (req, res) => {
    console.log(req.file);
    var name = entities.encode(req.body.name);
    var price = entities.encode(req.body.price);
    var qty = entities.encode(req.body.qty);
    var state = entities.encode(req.body.state);
    console.log(name, price, qty, state);
    try {
        var id = req.params.id;
        //for creating date
        var on = today();
        await Photo.deleteOne({
            _id: id
        })
        const result = await cloudinary.uploader.upload(req.file.path, {
            use_filename: true
        });
        const username = req.body.name;
        const filename = req.file.filename;
        const url = result.url;
        const date = Date();
        let photo = await Photo.create({
            username,
            filename,
            url,
            date,
        })
        Material.updateMaterial(id, {
            name: name,
            price: price,
            qty: qty,
            state: state,
            image: photo,
            created_on: on
        }, {}, (err, callback) => {
            if (err) {
                return res.render('editmaterial', {
                    msg: "Error Occured."
                });
            }
            res.redirect('/materials')
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false
        })
    }
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

        Photo.findOne({
            _id: obj.image
        }).then(result => {
            res.render('showmaterials', {
                obj: obj,
                url: result.url
            });
        })
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
    })
    res.redirect('/suppliers');
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
    console.log(req.body);
    var id = req.params._id
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
    // console.log(supplier);
    Suppliers.updateSupplier(id, supplier, {}, (err, data) => {
        // console.log(err, data);
        if (err) {
            console.log(err.message);
            throw err
        }
        res.redirect('/suppliers');
    })
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

// download data as csv 
exports.createCsv = async (req, res) => {
    console.log(req.body);
    if (req.body.schema == "material") {

        Material.find({}).then(async result => {
            try {
                var flatUsers = result.map(function (user) {
                    return user.toObject();
                })
                var FinalVal = (flatUsers)
                console.log(FinalVal);
                const csv = new Parser();
                const data = csv.parse(FinalVal, {
                    fields: ["_id", "username", "filename", "url", "date", "createdAT", "updatedAT", "__v"]
                })
                console.log(data);
                fs.writeFileSync("./public/datamaterial.csv", data);
                res.status(200).send({
                    status: "success"
                })

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    success: false
                })
            }
        })
    } else if (req.body.schema == "supplier") {
        Suppliers.find({}).then(async result => {
            try {
                console.log(result);
                if (result.length != 0) {
                    var flatUsers = result.map(function (user) {
                        return user.toObject();
                    })
                    var FinalVal = (flatUsers)
                    console.log(FinalVal);
                    const csv = new Parser();
                    const data = csv.parse(FinalVal, {
                        fields: ["_id", "cmpname", "materialname", "email", "address", "contactno", "state", "qty", "costprice", "create_on",
                            "__v"
                        ]
                    })
                    console.log(data);
                    fs.writeFileSync("./public/dataSupplier.csv", data);
                    res.status(200).send({
                        status: "success"
                    })
                } else {
                    return res.status(401).send({
                        status: "data is empty"
                    })
                }
            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    success: false
                })
            }
        })
    }
}

exports.removeCsv = (req, res) => {
    fs.unlink("./public/data.csv", (err) => {
        if (err) {
            return res.send({
                status: err.message
            })
        }
        res.send({
            status: "data cleared"
        })
    });
}

exports.getData = async (req, res) => {
    Material.find({}).then((result) => {
        if (result != [] && result != null) {
            // res.header({
            //     "Content-Type": "application/octet"
            // });

            res.status(200).send({
                result: result
            })
        } else {
            res.status(201).send({
                status: "empty"
            })
        }
    }).catch((err) => {
        return res.send({
            err: err.message
        })
    });
}

exports.sortTable = async (req, res) => {
    globalMaterials = req.body;
    let url = await getURL(globalMaterials);
    console.log(globalMaterials);
    res.render('material', {
        obj: globalMaterials,
        url: url
    });
}