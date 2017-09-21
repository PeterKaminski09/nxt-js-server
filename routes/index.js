var express = require('express');
var router = express.Router();
var NXTCode = require('../model/NXTCode');
var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = Q.Promise;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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


function saveCode(codeSnippet){
  var deferred = Q.defer();
  let code = new NXTCode(codeSnippet);
  code.save((err, code) => {
    if (err){
      deferred.reject(err);
    } else {
      deferred.resolve('Success');
    }
  });
  return deferred.promise;
}

module.exports = router;
