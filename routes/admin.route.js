const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const Admin = require('../models/admin.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

// RECEIVING DIESEL FUEL TRANSACTION FEES
router.post('/receive_diesel_fuel_transfaction_fees', (req, res)=>{
  // console.log('okkk diesle')
    // const id = req.body.admin_id;
    const id = 234;

    const toConvert = req.body.transaction_fees
    const increase =  toConvert

    Admin.increment('admin_diesel_fuel_balance', { by: increase, where: { admin_id: id } }).then(
      data => {
        res.json('trans_fees_received_successfully');
        // console.log(data, increase, id) 
      }
    )
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    }); 
  
  })


// RECEIVING ESSENCE FUEL TRANSACTION FEES
router.post('/receive_essence_fuel_transfaction_fees', (req, res)=>{
  // console.log('okkk essence' + req.body.transaction_fees)

  // const id = req.body.admin_id;
  const id = 234;

  const toConvert = req.body.transaction_fees
  const increase =  toConvert

  Admin.increment('admin_essence_fuel_balance', { by: increase, where: { admin_id: id } }).then(
    data => {
      res.json('trans_fees_received_successfully');
      // console.log(increase + 'uiii') 
    }
  )
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving user with id=" + id
    });
  }); 

})


// RECEIVING DIESEL FUEL TRANSACTION FEES
// router.put('/pay_diesel_fuel_transfaction_fees', (req, res)=>{

//     const id = req.body.station_id;
//     const number = +req.body.number + +req.body.station_diesel_fuel_balance ;
  
//     // console.log(req.body)
  
//       const postData = {
//         station_diesel_fuel_balance: number
//         }
  
//         Station.update(postData, 
//                  { 
//                    where: {
//                       admin_id: id
//                     } 
//                   }
//                  ).then((client_order) => {
//                    if(client_order){
//                     res.status(200).json({msg:"updated succesfully"});
//                    }
//                    else {
//                      res.send('client_order not found')
//                    }
//                  }) 
//                  .catch(err => {
//                   res.send('error: ' + err)
//                 })  
  
//   })
  
//   // RECEIVING ESSENCE FUEL TRANSACTION FEES
//   router.put('/pay_essence_fuel_transfaction_fees', (req, res)=>{
  
//     const id = req.body.station_id;
//     const number = +req.body.number + +req.body.station_essence_fuel_balance ;
  
//     // console.log(req.body)
  
  
//       const postData = {
//         station_essence_fuel_balance: number
//         }
  
//         Station.update(postData, 
//                  { 
//                    where: {
//                       station_id: id
//                     } 
//                   }
//                  ).then((client_order) => {
//                    if(client_order){
//                     res.status(200).json({msg:"updated succesfully"});
//                    }
//                    else {
//                      res.send('client_order not found')
//                    }
//                  }) 
//                  .catch(err => {
//                   res.send('error: ' + err)
//                 })  
  
//   })
  
  ///////////////////////////////////////////////////////////////////////////////////// FETCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // GET All stations
  router.get('/alladmins', (req, res, next)=>{
     
      Admin.findAll({
        order: [
          ['admin_registration_date', 'DESC'], // Sorts by id in descending order
      ],
      // attributes:[ 'station_id','station_name'],
      })
      .then(station_data => {
          if (station_data) {
            res.json(station_data)
          } 
        })
        .catch(err => {
          res.send('error: ' + err)
        })     
    });


    module.exports = router