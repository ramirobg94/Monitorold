var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname)))


// viewed at http://localhost:8080
app.get('/', function(req, res) {
	console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/rasp', function(req, res) {
	console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname + '/rasp.html'));
});

app.listen(8080);
