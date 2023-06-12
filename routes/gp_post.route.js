const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const GpPost = require('../models/gp_post.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// REGISTER A DRIVER PAYMENT TRANSACTION
router.post('/newpost', (req, res) => {
  const now = new Date()
  
  var id =  Math.floor(Math.random() * 1000000000);
  
  const new_transaction_data = {
    post_id: id, // To generate
    gp_id : req.body.gp_id,
    departure_land: req.body.departure_land,
    landing_land: req.body.landing_land,
    price: req.body.price,
    price_currency: req.body.price_currency,
    departure_date: req.body.departure_date,
    gp_first_name: req.body.gp_first_name,
    gp_last_name: req.body.gp_last_name,
    gp_phone_number: req.body.gp_phone_number,
    post_status: 'active',
    post_registration_date: now
  }
      GpPost.create(new_transaction_data)
            .then(driver_data => {
              let token = jwt.sign(driver_data.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
                
              })
              res.json('post_well_registered') 
            })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

///////////////////////////////////////////////////////////////////////////////////// FETCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET All posts 
router.get('/all_gps_posts', (req, res, next)=>{

   
  GpPost.findAll({
      order: [
        ['post_registration_date', 'DESC'], // Sorts by id in descending order
        // attributes:[ 'order_id','shopify_order_id','names','client_phone_number' ],
    ],
    })
    .then(driver_data => {
        if (driver_data) {
          res.json(driver_data)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
  });

// GET All posts 
router.get('/all_gps_active_posts', (req, res, next)=>{

   
  GpPost.findAll({
      order: [
        ['post_registration_date', 'DESC'], // Sorts by id in descending order
        // attributes:[ 'order_id','shopify_order_id','names','client_phone_number' ],
    ],
    where: {
      // date de depart pas >= a aujourdhui
    } 
    })
    .then(driver_data => {
        if (driver_data) {
          res.json(driver_data)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
  });

// GET All posts of a gp
router.get('/all_gp_posts/:gp_id', (req, res, next)=>{

  const id = req.params.gp_id
   
  GpPost.findAll({
      order: [
        ['post_registration_date', 'DESC'], // Sorts by id in descending order
        // attributes:[ 'order_id','shopify_order_id','names','client_phone_number' ],
    ],
    where: {
      gp_id: id,
      // transaction_type : 'driver_to_gsa'
    } 
    })
    .then(driver_data => {
        if (driver_data) {
          res.json(driver_data)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
  });


// // GET All driver to station by gsa
// router.get('/driver_to_gsa_transaction_gsa/:gsa_id', (req, res, next)=>{

//   const id = req.params.gsa_id
   
//   GpPost.findAll({
//       order: [
//         ['transaction_registration_date', 'DESC'], // Sorts by id in descending order
//         // attributes:[ 'order_id','shopify_order_id','names','client_phone_number' ],
//     ],
//     where: {
//       gsa_id: id,
//       transaction_type : 'driver_to_gsa'
//     } 
//     })
//     .then(driver_data => {
//         if (driver_data) {
//           res.json(driver_data)
//         } 
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       })     
//   });

// GET ONE DRIVER

// router.get('/get_one_driver_payment_transtion/:transaction_id', (req, res) => {
//   const id = req.params.transaction_id;

//   Transaction.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving user with id=" + id
//       });
//     }); 
// }) 

module.exports = router