const express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var models = require('../models');


/* HOME GET */
router.use(bodyParser.json())

router.get('/api/home', function (req, res) {
  res.send('Welcome!');
});

/* USER LOGIN AND SIGN UP GETS */

router.get('/api/profile', function (req, res) {
  res.send('I am a profile.');
});
router.get('/api/register', function (req, res) {
  res.send('I am a register.');
});
router.get('/api/login', function (req, res) {
  res.send('I am a login');
});

/* PROFILE PAGE ROUTES */
router.get('/api/createorder/:username', function (req, res) {
  models.users
    .findOne({
      where: {
        Username: req.params.username
      }
    })
  res.send('I am a create order page');
});

router.get('/api/additem/:username', function (req, res) {
  models.users
    .findOne({
      where: {
        Username: req.params.username
      }
    })
  res.send('I am an add item route');
});

/* ADD ITEM PAGE ROUTE */

router.post('/api/additem/:username', function (req, res, next) {
  models.products
    .findOrCreate({
      where: {
        ProductName: req.body.productName,
        AmountOnHand: req.body.amountOnHand,
        ProductId: req.body.productId
      }
    });
  models.users
    .findOne({
      where: {
        Username: req.params.username
      }
    })
    .then(res.redirect('/api/additem/' + req.params.username))

});

/* PURCHASE ORDER PAGE */

router.get('/api/itemlist', function (req, res) {
  models.products.findAll({
    where: {
      Deleted: false,
      ProductName: { $gt: 0 }
    }
  }).then(productsFound => {
    res.send(
      JSON.stringify(productsFound)
    );
  });
})

router.post('/api/submitorder/:username', function (req, res) {
let db = new sqlite.Database('PurchaseOrder.sqlite');
  var list = req.body;

  list.forEach((element, index, array) => {
    console.log(element.productId); 
    console.log(index); 
    console.log(array); 

  let sql = 'INSERT INTO purchase_orders(PurchaseOrderId, Username, ProductId, AmountOrdered) VALUES (' + element.purchaseOrderId + ',' + "'" + element.username+ "'" + ',' + element.productId + ',' + element.amountOrdered + ');' ;
  
  // output the INSERT statement
  console.log(sql);

  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  }); 
});
  // close the database connection
  db.close(); 

});

router.post('/api/submitorder/:username', function (req, res, next) {
  models.purchase_orders
    .findOrCreate({
      where: {
        ProductId: req.body.productId

      }
    }).then(
      models.users
        .findOne({
          where: {
            Username: req.params.username
          }
        }
        ))
    .then(res.redirect('/api/createorder/' + req.params.username))
})

router.get('/api/submitorder/:username', function (req, res) {
  models.users
    .findOne({
      where: {
        Username: req.params.username
      }
    }).then(
      res.send('Order Submitted'));
});

router.post('/api/postitem/:username', function (req, res, next) {
  models.products
    .findOne({
      where: {
        ProductId: req.body.productId,
      }
    })
    .then(
      models.users
        .findOne({
          where: {
            Username: req.params.username
          }
        }))
    .then(res.redirect('/api/createorder/' + req.params.username))

});

module.exports = router;