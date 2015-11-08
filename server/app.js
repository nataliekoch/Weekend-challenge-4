var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg =require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weekend Challenge 4';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.get('/data', function(req,res){
    var results = [];

    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT id, name, message FROM people");

        query.on('row', function (row) {
           results.push(row);
        });

        query.on('end', function (){
           client.end();
            console.log("it worked!");
            return res.json(results);
        });


        if (err){
            console.log(err);
        }

    });
});

app.post('/data', function(req,res) {
    console.log(req);

    var addedMessage = {
        "name" : req.body.inputName,
        "message" : req.body.inputMessage
    };

    pg.connect(connectionString, function (err, client){
        client.query()
    });

});


app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});