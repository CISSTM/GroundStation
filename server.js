var express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const port = 8080;

var altitude;
var temperature;
var pressure;

app.use(express.static('web'))

const getData = function(type, callback) {
    fs.readFile('data/readable.json', function(err, data) {
        if (err) throw err;
        var parsedData = JSON.parse(data);
        var returnValue;
        for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i][type]) {
                returnValue = parsedData[i][type];
            }
        }
        callback(null, returnValue);
    });
}




io.on('connection', function(socket) {
    //if (err) throw err;
    console.log("connected")
    setInterval(function() {
         getData("altitude", function(err, alt) {
            if (err) throw err;
            io.emit('altitude', Math.round(alt));
        })

        getData("temperature", function(err, temp) {
            if (err) throw err;
            io.emit('temperature', Math.round(temp));
        })


         getData("pressure", function(err, pres) {
            if (err) throw err;
            io.emit('pressure', Math.round(pres));
        })
    }, 100);

});

//Dit gedeelte moet ALTIJD onderaan staan
http.listen(port, function() {
    console.log("Server running at 0.0.0.0:8080")
});