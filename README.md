# Shopify-Backend-Internship-Challenge

My code for the Summer 2022 - Shopify Backend Developer Intern Challenge

# Topic

Inventory management system for Logistics company

# Hosting

This Project is Hosted using Microsoft Azure and Heroku 
Visit the project here 
`https://inventory-logistics.herokuapp.com/`
or
`https://shopify-backend-challange.azurewebsites.net/`

## Pre-requisites

The following prerequisites are needed for compilation

- [Node.js](https://nodejs.org/en/)
- [Cloudinary](https://cloudinary.com/) Account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account and Database

## Setting up

1. Download code to your local machine by running `https://github.com/somya339/Inventory-management-system/`
2. `cd ./Inventory-Management-system-master/` to move into proper directory
3. Specify authentication used by Cloudinary and MongoDB:\
   Create a `config.env` file in `./Inventory-Management-system-master/`  
   Store the following contents:

```
ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.edrpu.mongodb.net/<dbname>?retryWrites=true&w=majority
CLOUDINARY_NAME=*********
CLOUDINARY_API_KEY=***************
CLOUDINARY_API_SECRET=***************************
```

3. Run `npm install` to install dependencies from package.json
4. `npm start` alternatively you can run `nodemon server.js` to run the server

## Functionality

Backend for secure photo storage by users  
Users can:

- Create , Read, Update and Delete material in/from the inventory
- Upload photos one at a time
- Delete photos one at a time
- View all images preview in the materials section
- Get full details of a product in watch section
- Get csv file for the materails and suppliers.

The following mongoos schema are used:

1. Materials

```
Name : String
state : String
price : Number
qty : Number
Image : mongoose.SchemaTypes.ObjectId
create_on : String

```

- name is name of material
- State is what type of good is it SOLID , LIQUID , GAS
- Price is the cost of that material
- qty is the quantitiy available in the inventory
- Image is the reference id of the photo uploaded on cloudinary
- created_on is the date and time when the item was added in the inventory

**Password ecryption** is performed using the bcrypt library when storing in database
Right now, date is a parameter(e.g. `2022-01-09T03:07:01.028Z`). However, it is very easy to change it to be the current date.

2. Photo Schema

```
username: String
name: String
url: String
date: Date

```

- username is name of user
- name is name of photo, obtained from filename
- url is URL provided by Cloudinary upon uploading
- date is `Date` object, passed as parameter(e.g. `2022-01-09T03:07:01.028Z`)

3. Materials

```
cpmname : String
materialname : String
emailid : String
address : String
contactno : String
state : String
qty : Number
costprice : Number
create_on : String

```

- cpmname is name of supplier
- materialname is the name of material
- emailid is the email id of the supplier
- address is the address of the supplier
- contactno is the contact number of the supplier
- state is what type of good is it SOLID , LIQUID , GAS
- qty is the quantitiy available in the inventory
- costprice is the cost of that material
- created_on is the date and time when the item was added in the inventory

## Testing

Testing is done using Postman.
Logical Backend Flow is as follows:\

- User **Interface** is provided which makes it eaiser for tesing
- User can **upload** a photo using the `localhost:5000/postaddmaterails` endpoint with `POST` request.
- User can **delete** a photo by using the `localhost:5000/deletematerials/` endpoint with `DELETE` request.
- User can **get** a list of all their materails using the `localhost:5000/materials/` endpoint with `GET` request.
- User can **get** a list of all their suppliers using the `localhost:5000/suppliers/` endpoint with `GET` request.

## Improvements for future

- Nodejs should be used for backend I/O operation, not for uploading photos, since that blocks other request.
  - So, investigate other options, maybe Ruby on Rails
- Bulk Operations
  - Currently user can upload and delete individual files, not bulk files
  - This is done for simplicity; but, we could change this by appropriate `multer` commands for upload and json body input for delete
- Restrictions on Information provided
  - Currently, there are little restriction on the form fields
  - Only restriction is NOT NULL data
  - To fix this, can add checks and restrictions on length and whether data meets a certain criteria
