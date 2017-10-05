var express = require('express');
var router = express.Router();
var io = require('socket.io');
var NXTCode = require('../model/NXTCode');
var Q = require('q');
var mongoose = require('mongoose');
var _ = require('lodash');
mongoose.Promise = Q.Promise;

router.get('/test', function(req, res, next){
  let val = req.app.get('socketio') ? true : false;
  let socketBank = req.app.get('sockets');

  let sockets = _.values(socketBank);
  sockets.forEach((socket) => {
    socket.emit('play sound', { data: 'hello'}); //Just send a test signal out
  });

  res.send({ socketio: val, socketBank: socketBank});
});

router.get('/code/:macAddress', function(req, res, next) {
  const macAddress = req.params.macAddress;
  searchCode(macAddress)
  .then((response) => {

    res.send({ address: macAddress, commands: response.length && response[0].code || []});
    removeCode(macAddress)
    .then((response) => {
      console.log('Successfully removed the object');
    })
    .catch((err) => {
      console.log(err, 'In the remove method');
    })
  })
  .catch((err) => res.send({ commands: [], message: "Error finding commands"}));
});

router.post('/upload', (req, res, next) => {
  let {commands, macAddress} = req.body;
  const codeSnippet = {
    address: macAddress,
    code: commands,
  };

  saveCode(codeSnippet)
  .then((response) => res.send({ message: response, code: 200}))
  .catch((err) => res.send({ message: 'Error', code: 401}));
});

function searchCode(macAddress){
  return NXTCode.find({"address": macAddress}).exec();
}

function removeCode(macAddress){
  return NXTCode.remove({"address": macAddress}).exec();
}

function saveCode(codeSnippet){
  const query = { address: codeSnippet.address };
  const options = { upsert: true};
  return NXTCode.update(query, codeSnippet, options).exec();
}

module.exports = router;
