const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'gp',

    {
        gp_id: {
            type: Sequelize.STRING,
            primaryKey: true
            // autoIncrement: true
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
        gp_phone_number2: {
            type: Sequelize.STRING
        },
        gp_phone_number3: {
            type: Sequelize.STRING
        },
        gp_password: {
            type: Sequelize.STRING
        },
        gp_departure_areas: {
            type: Sequelize.STRING
        },
        gp_landing_areas: {
            type: Sequelize.STRING
        },
        gp_departure_address: {
            type: Sequelize.STRING
        },
        gp_landing_address: {
            type: Sequelize.STRING
        },
        gp_description: {
            type: Sequelize.STRING
        },
        gp_registration_date: {
            type: Sequelize.DATE
        },        
    },
    {
        timestamps: false
    }
)