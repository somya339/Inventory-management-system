// import express.router 
const router = require('express').Router();
// import Photo schema
let Photo = require('../models/photo.models');
// import utilities
const {
    cloudinary
} = require('../utils/cloudinary');
const {
    multerupload
} = require('../utils/multer')

// import authentication method
const authenticateToken = require('../auth/authentication')

/*
    GET request: Return photos of a user; either all of them or search results from a given text

    Parameter: search query
    Return: list of saved photo objects if successful; or error if unsuccessful (photo doesn't exist) 
*/
router.route('/').get(authenticateToken, (req, res) => {
    // Input name
    const {
        name
    } = req.body;

    // Find photo
    Photo.find({
            username: req.user.name,
            name: {
                $regex: name || "",
                $options: "i"
            }
        })
        .then(photos => res.json(photos)) // Output photo
        .catch(err => res.status(400).json('Error: ' + err)); // Output error
});

/*
    POST request: Upload image to Cloudinary and save image to MongoDB database

    Parameters: form data containing username(String), date(String) and imagetoupload(File) 
    Return: saved Photo object 
    Output: "Photo added!" if successful, "Something went wrong" if fail
*/
router.route('/add').post(authenticateToken, multerupload.single('imagetoupload'), function (req, res) {
    console.log(req.file);

    try {
        // Retrieve path to file from file input
        const path = req.file.path;

        // Upload to Cloudinary
        cloudinary.uploader.upload(path, {
                upload_preset: 'ml_default',
            })
            .then(result => {
                // set Photo properties
                const username = req.user.name;
                const name = req.file.originalname;
                const url = result.url;
                const date = Date.parse(req.body.date);

                // create Photo object
                const newPhoto = new Photo({
                    username,
                    name,
                    url,
                    date,
                });

                // save to MongoDB database
                newPhoto.save()
                    .then(() => res.json('Photo added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            err: 'Something went wrong'
        });
    }
});

/*
    DELETE request: Delete user's image from Cloudinary and MongoDB database

    Parameters: form data containing username(String), date(String) and imagetoupload(File) 
    Return: deleted Photo object 
    Output: "Photo deleted" if successful, "Something went wrong" if fail
*/
router.route('/').delete(authenticateToken, (req, res) => {
    // Read filename
    let filename = req.body.filename;

    // Delete file
    Photo.deleteOne({
            name: filename,
            user: req.user.name
        })
        .then(() => res.json('Photo deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));

    // Get filename; excluding file extension
    let rawfilename = filename.split('.')[0]

    // Delete from Cloudinary
    try {
        cloudinary.uploader.destroy(rawfilename)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            err: 'Something went wrong'
        });
    }
});

module.exports = router;