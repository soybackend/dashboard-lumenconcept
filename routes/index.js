var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Capa Speed' });
});

router.get('/batch', function(req, res, next) {
  const url = 'mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087';
  const dbName = 'lumenconcept_speed_tier';
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);    

    const db = client.db(dbName);
    const collection = db.collection('dos');
    collection.find().toArray(function(err, ips) {        
      res.render('batch', { 
        title: 'Datos Históricos',
        ips: ips
      });
    });
  });
});


router.get('/frauds/', function(req, res, next) {
  const url = 'mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087';
  const dbName = 'lumenconcept_payments';

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);    

    const db = client.db(dbName);
    const collection = db.collection('Frauds');

    collection.aggregate([      
      {"$group" : {_id:"$isFraud", count:{$sum:1}}}
    ]).toArray(function(err, frauds) {      
      assert.equal(err, null);
      res.json(frauds);
    });    
  });    
});

router.get('/frauds/:date', function(req, res, next) {
  var date_query = req.params.date.split('-');
  const url = 'mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087';
  const dbName = 'lumenconcept_payments';

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);    

    const db = client.db(dbName);
    const collection = db.collection('Frauds');

    collection.aggregate([
      {
        $project:
        {
          doc: "$$ROOT",
          year: { $substr: ["$billCreatedDate", 0, 4] },
          month: { $substr: ["$billCreatedDate", 5, 2] },
          day: { $substr: ["$billCreatedDate", 8, 2] },          
        }
      },
      { $match : { 
          "day": date_query[2],
          "month" : date_query[1],
          "year" : date_query[0] 
        } 
      },      
      { 
        $group : { _id:"$doc.isFraud", count: { $sum:1 } } 
      }
    ]).toArray(function(err, frauds) {      
      assert.equal(err, null);
      res.json(frauds);
    });    
  });    
});

router.get('/trends', function(req, res, next) {
  const url = 'mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087';
  const dbName = 'lumenconcept_speed_tier';

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);    

    const db = client.db(dbName);
    const collection = db.collection('search');

    collection.aggregate([      
      { "$group" : 
        {
          _id: "$word", 
          total: { $sum: "$frequency" }
        }
      }
    ]).toArray(function(err, frauds) {      
      assert.equal(err, null);
      res.json(frauds);
    });    
  });    
});

router.get('/lumens', function(req, res, next) {
  const url = 'mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087';
  const dbName = 'lumenconcept_telemetry';

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);    

    const db = client.db(dbName);
    const collection = db.collection('telemetry_li');

    collection.find({}).sort( { date: 1 } ).toArray(function(err, result) {      
      assert.equal(err, null);
      res.json(result);
    });    

  });
});

module.exports = router;
