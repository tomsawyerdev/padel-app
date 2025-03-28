
const express = require('express');
const cors = require('cors');

const config = require('./config');//sin la extension js

const sequelize = require('./db/sequelize.js');
//console.log("typeof:",typeof(sequelize),Object.keys(sequelize));

const { isCelebrateError } = require('celebrate');
const {isAuthenticated} = require('./middlewares');


// -----------------------------
// ver https://www.scaler.com/topics/expressjs-tutorial/sequelize_with_express_js/

sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

// ---------------------------

var routes = require('./routes');

const app = express();

// ------------------------------------------------------------
// Midlewares
// ------------------------------------------------------------
//app.use(cors({origin: 'http://192.168.1.109:3000'})); 
const corsConfig = { 
  credentials: true,
  origin:  ['http://localhost:4200'],
  methods: "HEAD,GET,POST,OPTIONS",
  maxAge:1728000, 
  //preflightContinue: false,  optionsSuccessStatus: 204
}
app.use(cors(corsConfig));
//app.use(cors({credentials: true, origin: ['http://192.168.1.109:3000','http://localhost:5000']}));


app.use(express.json());//json to body


//Math.trunc(Date.now()/1000).toString().slice(-5)

app.use((req, res, next) => {
  console.log("---------------------",req.method,": ", req.originalUrl);
  //console.log("req.body:",req.body);  
  //console.log("req.headers:",req.headers);  
   next();
});

// ------------------------------------------------------------


//app.use(isAuthenticated.unless({ path: ["/","/sessions"] }));

app.get("/", function(req, res) {
  return res.send("Hello World");
});

// test a protected route
app.get('/protected',isAuthenticated,(req, res) => {
  //console.log("protected:") 
  res.json({status:200, authenticated:true });
  });

app.use('/sessions', routes.sessions);
//app.use('/reservations',isAuthenticated, routes.reservations);
app.use('/reservations', routes.reservations);



//---------------------------------
//  Error handlers
//---------------------------------
//  Unauthorized custom error handler

app.use((err, req, res, next) => {
  //console.log("Error:",err.name);
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({status:401, message: 'Unauthorized. Invalid token!' });
	}
  else {
    next(err);
  }
 });

//---------------------------------
// Validation error handling
const errorHandling = (err, req, res, next) => {
  if (isCelebrateError(err)) {
      const errorBody = err.details.get('body');
      return res.send({
          status: 400,
          message: "Invalid request data",                    
          errors: errorBody.details[0].message.split('"').join('')
        });
  }  
  next(err); // or return next(err)
}


app.use(errorHandling);
//---------------------------------


app.listen(config.port, function(){
  console.log(`Listening on port: ${config.port}, node version: ${process.version}`);
});

