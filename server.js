var express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const port = 8080;
const file = 'data/tester.json';

app.use(express.static('web'));

const getData = function(type, callback) {
    fs.readFile(file, function(err, data) {
        if (err) {
            callback(err, null);
        }
        try {
            var parsedData = JSON.parse(data);
            var returnValue;
            for (var i = 0; i < parsedData.length; i++) {
                if (parsedData[i][type]) {
                    returnValue = parsedData[i][type];
                }
            }
            callback(null, returnValue);
        }
        catch (err) {
            callback(err, null);
        }

    });
};
var lastAlt;
var lastTime;
var speed0, speed1, speed2, speed3, speed4;
const getSpeed = function(callback) {
    getData("altitude", function(err, alt) {
        if (err) {
            callback(err, null);
        }
        var speed = ((lastAlt - alt) / (lastTime - Date.now())) * 1000;
        if(!speed4){
            speed0, speed1, speed2, speed3, speed4 = speed;
        }
        speed4 = speed3;
        speed3 = speed2;
        speed2 = speed1;
        speed1 = speed0;
        speed0 = speed;
        var averageSpeed = (speed4 + speed3 + speed2 + speed1 + speed0)/5;
        lastAlt = alt;
        lastTime = Date.now();
        callback(null, Math.round(averageSpeed));
    });
};


io.on('connection', function(socket) {
    setInterval(function() {
        getData("altitude", function(err, alt) {
            if (err) {
                io.emit('altitude', "error");
                return;
            }
            io.emit('altitude', Math.round(alt));
        });

        getData("temperature", function(err, temp) {
            if (err){
                io.emit('temperature', "error");
                return;
            }
            io.emit('temperature', Math.round(temp));
        });


        getData("pressure", function(err, pres) {
            if (err) {
                io.emit('pressure', "error");
                return;
            }
            io.emit('pressure', Math.round(pres));
        });

        getSpeed(function(err, speed) {
            if (err) {
                io.emit('speed', "error");
                return;
            }
            io.emit('speed', speed);
        });
    }, 200);
});

//Dit gedeelte moet ALTIJD onderaan staan
http.listen(port, function() {
    console.log("Server running at 0.0.0.0:8080");
});
