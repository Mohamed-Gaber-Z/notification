const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Country = require('../models/address/country');
const {validationReg, validationLogin} = require('../validation/validateuser');
const {address} = require('../services/location');

exports.registering = async (req, res, next) => {
  const location = await address(req.body.location[0], req.body.location[1]);

  const {error} = validationReg(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const image = req.file;
  if(!image) return res.status(400).send('File is not image');
  const profileImage = image.path;

  // const country = await Country.findById(req.body.locationref);
  // if(!country) return res.status(400).send('Invalid country');


  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already registered');

  try {
    user = new User({
      nameAr: req.body.nameAr,
      nameEn: req.body.nameEn,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      profileImage: profileImage,
      location: req.body.location
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token  = user.generateAuthToken();
    res.header('x-auth', token).json({user, token, location});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const {error} = validationLogin(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Invalid email or password');

  try {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.json({user, token});
  } catch (err) {
    console.log(err)
    next(err);
  }
};
