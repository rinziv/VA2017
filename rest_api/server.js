// call to required packages
var express = require('express');
var d3 = require('d3');

var app = express(); // create the application module

var port = process.env.PORT || 5000;

var router = express.Router();  // Router associate URL requests to specific handlers


// define a test route to check if the server is working correctly
router.get('/', function(req, res){
	res.json({message: 'Hello World!'});
})


// define a prefix for all the URLs
app.use('/api', router);

app.listen(port);
console.log("Listening to port " + port);