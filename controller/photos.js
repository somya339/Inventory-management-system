exports.searchPhotos = (req, res) => {
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
}