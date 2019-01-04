var express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8080;

var altitude = 1000;
var temperature = 15
var pressure = 1013

app.use(express.static('web'))

setInterval(function() {
    altitude -= 2;
    altitude += Math.random()
    altitude -= Math.random()
    if (altitude <= 0){
        altitude = 0;
    }
}, 200);

setInterval(function() {
    temperature += Math.random();
    temperature -= Math.random();
}, 350);

setInterval(function() {
    pressure += Math.random()
    pressure -= Math.random()
}, 500);

io.on('connection', function(socket) {
    //if (err) throw err;
    console.log("connected")
    setInterval(function() {
        io.emit('temperature', Math.round(temperature));
        io.emit('altitude', Math.round(altitude));
        io.emit('pressure', Math.round(pressure));
    }, 200);

});

//Dit gedeelte moet ALTIJD onderaan staan
http.listen(port, function() {
    console.log("Server running at 0.0.0.0:8080")
});
