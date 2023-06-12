const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const GP = require('../models/gp.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// REGISTER A gp 
router.post('/newgp', (req, res) => {
    const now = new Date()
  
  var id = 'gp' + '-' + Math.floor(Math.random() * 100000) + '-' + req.body.gp_phone_number;
  
  const new_gp_data = {
    gp_id: id, // To generate
    gp_first_name : req.body.gp_first_name,
    gp_last_name : req.body.gp_last_name,
    gp_phone_number : req.body.gp_phone_number,
    gp_phone_number2 : req.body.gp_phone_number2,
    gp_phone_number3 : req.body.gp_phone_number3,
    gp_password : req.body.gp_password,
    gp_departure_areas : req.body.gp_departure_areas,
    gp_landing_areas: req.body.gp_landing_areas,
    gp_departure_address: req.body.gp_departure_address,
    gp_landing_address: req.body.gp_landing_address,
    gp_description: req.body.gp_description,
    gp_registration_date: now
  }
        GP.create(new_gp_data)
            .then(gp_data => {
              let token = jwt.sign(gp_data.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
                
              })
              res.json({ token: token }) 
            })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

///////////////////////////////////////////////////////////////////////////////////// FETCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET All gps 
router.get('/all_gps', (req, res, next)=>{
   
    GP.findAll({
      order: [
        ['gp_registration_date', 'DESC'], // Sorts by id in descending order
        // attributes:[ 'order_id','shopify_order_id','names','client_phone_number' ],
    ]
    })
    .then(gp_data => {
        if (gp_data) {
          res.json(gp_data)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
  });

// GET ONE gp

router.get('/get_one/:gp_id', (req, res) => {
  const id = req.params.gp_id;

  GP.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    }); 
})  


///////////////////////////////////////////////////////////////////////////////////// LOGIN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/login', (req, res) => {
  GP.findOne({
    where: {
      gp_phone_number: req.body.gp_phone_number,
      gp_password: req.body.gp_password
    }
  } )
    .then(gp => {

      if (gp) {
        let token = jwt.sign(gp.dataValues, process.env.SECRET_KEY, {
          expiresIn: 43200
        } )
        res.json({ 
          token: token, 
          expiresIn: 43200,
          gp_id: gp.dataValues.gp_id,
          gp_first_name: gp.dataValues.gp_first_name,
          gp_last_name: gp.dataValues.gp_last_name,
          gp_phone_number: gp.dataValues.gp_phone_number,
          gp_phone_number2: gp.dataValues.gp_phone_number2,
          gp_phone_number3: gp.dataValues.gp_phone_number3,
          gp_password: gp.dataValues.gp_password,
          gp_departure_areas: gp.dataValues.gp_departure_areas,
          gp_landing_areas: gp.dataValues.gp_landing_areas,
          gp_departure_address: gp.dataValues.gp_departure_address,
          gp_landing_address: gp.dataValues.gp_landing_address,
          gp_registration_date: gp.dataValues.gp_registration_date,
        })
      }
      else {
        res.send('User does not exist');
      }
    } )
    .catch(err => {
      res.send('error: ' + err)
    } )
} )

module.exports = router