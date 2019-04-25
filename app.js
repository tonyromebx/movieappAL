var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var route = require('./server/routes');
var dotenv = require('dotenv');
var cors = require('cors');


dotenv.config();

console.log(process.env.DB_CONN_STRING)

mongoose.connect(process.env.DB_CONN_STRING, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  console.log(`unable to connect to database`);
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var port = process.env.PORT || 2000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Require routes into the application.
route(app);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('app runnin on port ' + port);
