# Shopify-Backend-Internship-Challenge

My code for the Summer 2022 - Shopify Backend Developer Intern Challenge

# Topic

Inventory management system for Logistics company

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
ACCESS_TOKEN_SECRET=70d088310be28ac7db7b997b8f2f83ac8bb5c757d66823bf487be9a2cb4d7ebd566c480d3ffab985d537f9043624a0a6b3b6956ee8208d351c1ecfc0d02ad23b
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

1. User

```
username: String
password: String
```

**Password ecryption** is performed using the bcrypt library when storing in database
Right now, date is a parameter(e.g. `2021-01-01T03:07:01.028Z`). However, it is very easy to change it to be the current date.

2. Photo Schema

```
username: String
name: String
url: String
date: Date
```

- username is name of user logged in
- name is name of photo, obtained from filename
- url is URL provided by Cloudinary upon uploading
- date is `Date` object, passed as parameter(e.g. `2021-01-01T03:07:01.028Z`)

## Testing

Testing is done using Postman.
Logical Backend Flow is as follows:\

- Users can **register** using the `localhost:5000/users/register` endpoint with `POST` request. JSON body is of format `{username: String, password:String}`
- Users can then **login** using the `localhost:5000/users/login` endpoint with `POST` request. JSON body is of format `{username: String, password:String}`\
  Login is successful only if password matches registration password
- To access all the following, user must provide an **access token** as the Authorization Header. Access token must match json web token.
- User can **upload** a photo using the `localhost:5000/photos/add` endpoint with `POST` request. User must input form data containing `date`(String) and `imagetoupload`(File)
- User can **delete** a photo by using the `localhost:5000/photos/` endpoint with `DELETE` request. JSON body is of format `{name: String}`, where name is name of photo
- User can **get** a list of all their files using the `localhost:5000/photos/` endpoint with `GET` request. JSON body is of format `{name: String}`. They have option of searching photos by filename by inputting a search query `{name: String}` in Postman body.

## Improvements for future

- Nodejs should be used for backend I/O operation, not for uploading photos, since that blocks other request.
  - So, investigate other options, maybe Ruby on Rails
- Bulk Operations
  - Currently user can upload and delete individual files, not bulk files
  - This is done for simplicity; but, we could change this by appropriate `multer` commands for upload and json body input for delete
- Username and Password restrictions
  - Currently, there is little restrictions that force a strong username or password, or to verify password on registration.
  - Only restriction is minimum password length = 3
  - To fix this, can add checks and restrictions on password length and whether user fields are empty
