const userRouter = require('express').Router();
const { express } = require('express');
// const { useParams } = require('react-router-dom');
const User = require('../models/user')

/*
* This gets all users from the database
*/
userRouter.get('/', async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const users = await User.find({});
    return res.json(users.map((users) => users.toJSON()));
  }
  return res.status(403).send('Not authorized');
});

/**
 * This gets a user from search bar
 */
userRouter.get('/search', async(req, res) => {
  // return req;
  // const auth = req.currentUser;
  // if (auth) {
    console.log(req.username);
    const users = await User.find({username:req.username});
    return res.json(users.map((users) => users.toJSON()));
  // }
  // return res.status(403).send('Not authorized');
});

userRouter.post('/', (req, res) => {
  const user = new User(req.body);
  const savedUser = user.save();
  return res.status(201).json(savedUser);
});

userRouter.post('/updateEmail', async (req, res) => {
  var params = req.body;
  User.findOne({'email':params.email}, function(err,existingUser) {
    user.email = params.email;
    User.findOne({email: params.email}, function(err, existingUser) {
      if(err) return next(err);
      if(existingUser) {
        return res.status(404).send('Account with that email already exists.');
      } else {
        User.updateOne({"email":params.email},params, function(err, user) {
          if (err) return next(err);
          return res.status(200).send('Email address updated Successfully.');
        });
      }
    });      
  });
});


userRouter.post('/updateBio', async (req, res) => {
  var params = req.body;
  User.findOne({'email':params.email}, function(err,user) {
    if (err) {
      console.log(err);
      return res.status(400).send('Error updating bio');
    } else {
      user.bio = params.bio;
      User.updateOne({"bio":params.bio},params, function(err, user) {
        if (err) return next(err);
        return res.status(200).send('Bio updated Successfully.');
      });
    }
  });
});



/**
 * packages needed to update profile picture 
 */
const fs = require('fs');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

userRouter.post('/updateProfilePicture', upload.single("avatar"), async (req, res) => {

  let fileType = req.file.mimetype.split("/")[1];
  let fileName = req.file.filename + "." + fileType;

  fs.rename('./uploads/' + req.file.filename, './uploads/' + fileName, (err) => {
    if (err) {
      console.log("File rename error: " + err);
    }
    console.log("callback");
    console.log("File renamed");
  });

  console.log("fileType: ", fileType);
  console.log("req.file", req.file);  
  res.send("File uploaded successfully.");
  res.send("200")

});


module.exports = userRouter;