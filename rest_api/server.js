// call to required packages
var express = require('express');
var d3 = require('d3');
var fs = require('fs');

var app = express(); // create the application module

var port = process.env.PORT || 5000;

var router = express.Router();  // Router associate URL requests to specific handlers
var dsv = d3.dsv(";","text/html")

var file_URL = "assets/data/opere_colori.csv";
var opere;


function loadAndParseData(filepath){
	
}

// define a test route to check if the server is working correctly
router.get('/', function(req, res){
	res.json({message: 'Hello World!'});
})

router.route('/painting')
	.get(function(req, res){
		fs.readFile(file_URL, "utf-8", function(error, data){
			if(error) throw error;
	
			opere = dsv.parse(data);
			
			res.json(opere);
		})
	});
	

router.route('/painting/byauthor/:author')
	.get(function(req, res){
		fs.readFile(file_URL, "utf-8", function(error, data){
			if(error) throw error;
	
			opere = dsv.parse(data);
			
			res.json(opere.filter(function(d){
					return d["AUTHOR"].toLowerCase().indexOf(req.params.author.toLowerCase()) >= 0
				}));
		})
	});



// define a prefix for all the URLs
app.use('/api', router);

app.listen(port);
console.log("Listening to port " + port);