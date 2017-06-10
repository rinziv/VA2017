// create a connector to access the database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('vast2015_mc1.db');

// initialize express 
var express = require('express');
var restapi = express();


// define a simple entry point to retrieve all users
restapi.get('/users', function(req, res){
	db.all("SELECT distinct id FROM movs", function(err, rows){
		res.json(rows);
	})
})


// get all points of a specified user
restapi.get('/user/:id', function(req, res){
	var id = req.params.id;
	if(id){
		db.all("SELECT * from movs where id = ?", id,function(err,rows){
			res.json(rows);
		})
	}
})

restapi.listen(3000);
console.log("Listening on port 3000...");