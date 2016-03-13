var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// return ALL blobs
router.get('/blobs', function(req, res, next){

  // Knex Query with promise
 knex.select().table('blobs')
  .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data
      });
  })
  .catch(function(err){
    res.status(500)
      .json({
        status: 'error',
        data: err.message
      });
  });

});

// return SINGLE Blob
router.get('/blobs/:id', function(req, res, next){
  // Redefining the id. 
  var blobID = req.params.id;

   // Knex Query with promise
  knex('blobs').where('id', blobID)
  .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data
      });
  })
  .catch(function(err){
    res.status(500)
      .json({
        status: 'error',
        data: err.message
      });
  }); 
  
});

// add a SINGLE blob
router.post('/blobs', function(req, res, next){

  var first = req.body.firstName;
  var last = req.body.lastName;

   // Knex Query with promise
  knex('blobs').insert({
    firstName: first,
    lastName: last 
  })
  .then(function(data){
    /* jshint ignore:start */
    res.status(200)
      .json({
        status: 'success',
        data: `Added ${data.rowCount} row` 
      });
    /* jshint ignore:end */
  })
  .catch(function(err){
    res.status(500)
      .json({
        status: 'error',
        data: err.message
      });
  }); 
  
});

// update a SINGLE blob
router.put('/blobs/:id', function(req, res, next){

  var column = req.body.column;
  var value = req.body.value;

  //throw error if id does not exist
  // verify that we're passing in the correct keys

   // Knex Query with promise
  knex('blobs')
  .update(column, value)
  .where('id', req.params.id)
    .then(function(data){
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          data: `Added ${data.rowCount} row` 
        });
      /* jshint ignore:end */
    })
    .catch(function(err){
      res.status(500)
        .json({
          status: 'error',
          data: err.message
        });
    });   
  
});


// delete a SINGLE blob
router.get('/blobs', function(req, res, next){

  
  
});



module.exports = router;
