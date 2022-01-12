// configures Cloudinary using credentials in .env
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, ".env")
});
const cloudinary = require('cloudinary').v2;
console.log(process.env.CLOUDINARY_NAME);
cloudinary.config({
    cloud_name: 'dhdsnakvg',
    api_key: '759133781257655',
    api_secret: 'UZ7QnfuB5cWDYaGR1kaYCm3pcaI'
});

module.exports = {
    cloudinary
};