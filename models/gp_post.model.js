const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'gp_post',

    {
        post_id: {
            type: Sequelize.STRING,
            primaryKey: true
            // autoIncrement: true
        },
        gp_id: {
            type: Sequelize.STRING
        },
        departure_land: {
            type: Sequelize.STRING
        },
        landing_land: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        price_currency: {
            type: Sequelize.STRING
        },
        departure_date: {
            type: Sequelize.STRING
        },
        gp_first_name: {
            type: Sequelize.STRING
        },
        gp_last_name: {
            type: Sequelize.STRING
        },
        gp_phone_number: {
            type: Sequelize.STRING
        },
        post_status: {
            type: Sequelize.STRING
        },
        post_registration_date: {
            type: Sequelize.DATE
        }      
    },
    {
        timestamps: false
    }
)