var express = require('express');
var router = express.Router();
var NXTCode = require('../model/NXTCode');
var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = Q.Promise;

router.get('/code/:macAddress', function(req, res, next) {
  const macAddress = req.params.macAddress;
  searchCode(macAddress)
  .then((response) => res.send({ address: macAddress, commands: response}))
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

function saveCode(codeSnippet){
  const query = { address: codeSnippet.address };
  const options = { upsert: true};
  return NXTCode.update(query, codeSnippet, options).exec();
}

module.exports = router;
