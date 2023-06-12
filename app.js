const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

// global.__basedir = __dirname + "/..";

// DATABASE
const database = require('./database/db');

// ROUTES
const GPRoute = require('./routes/gp.route');
const GPPostRoute = require('./routes/gp_post.route');


console.log({env: process.env.CLEARDB_DATABASE_URL});


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
    
  });


database.sequelize.sync();

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded
    ({extended: true })
);


app.use("/gp_post", GPPostRoute) 
app.use("/gp", GPRoute) 


module.exports = app; 