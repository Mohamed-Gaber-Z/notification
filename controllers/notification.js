const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

const Notification = require('../models/notification');
const User = require('../models/user');
const Count = require('../models/count');

const {validation} = require('../validation/notification');
//const {validation} = require('../validation/count');

exports.post = async(req, res, next) => {
  const {error} = validation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.user);
  if(!user) return res.status(400).send('Invalid User');

  try{
    let notification = new Notification({
      text: req.body.text,
      user: req.body.user
    });
    await notification.save();

    let count = await Count.find({user: req.body.user});
    // console.log(count);
    if(count.length == 0) {
      count = new Count({
        count: 1,
        user: req.body.user
      });
      await count.save();
      return res.status(200).send(notification);
    } else {
      await Count.findByIdAndUpdate(count[0]._id, {
        count: count[0].count+1
      })
    }

  res.status(200).send(notification);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.getAll = async (req, res, next) => {
  try{
    const notification = await Notification.find({user: req.params.id});
    if(notification.length == 0) return res.status(400).send('No Notfication');
    res.status(200).send(notification);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try{
    const id = req.params.id;
    const notification = await Notification.findById(id).populate('user');
    if(notification.length == 0) return res.status(400).send('No Notfication');
    res.status(200).send(notification);
  } catch(e) {
    console(e);
    next(e);
  }
};

exports.markAllSeen = async (req, res, next) => {
  try{
    const id = req.params.id;
    const notification = await Notification.updateMany({user: id},{$set: {
      seen: true
    }});
    const count = await Count.find({user: id});
    if(count[0].count == 0) {
      throw new Error('No count');
    } else {
      await Count.findByIdAndUpdate(count[0]._id, {
        count: 0
      });
      res.sendStatus(204);
    }
    res.status(204);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.markOne = async (req, res, next) => {
  try{
    const id = req.params.id;
    const notification = await Notification.findByIdAndUpdate(id, {
      seen: true
    });
    const count = await Count.find({user: notification.user});
    if(count[0].count == 0) {
      throw new Error('Invalid count');
    } else {
      await Count.findByIdAndUpdate(count[0]._id, {
        count: count[0].count-1
      })
    }
    res.sendStatus(204);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.removeOne = async (req, res, next) => {
  try{
    const id = req.params.id;
    const notification = await Notification.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.removeAll = async (req, res, next) => {
  try{
    const id = req.params.id;
    const notification = await Notification.deleteMany({user: id});
    res.sendStatus(204);
  } catch(e) {
    console.log(e);
    next(e);
  }
};
