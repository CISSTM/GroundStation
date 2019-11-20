//This is a file that randomly changes data in the json file, ONLY FOR TESTING
var fs = require("fs");
var altitude = 1000;
var pressure = 1013;
var temperature = 15;

console.log("Started adding random data");

const writeData = function (altitude, pressure, temperature, callback){
    fs.readFile('data/tester.json', function(err, data){
        if (err) throw err;
        var json = JSON.parse(data);
        var writeAltitude = {"altitude": Math.round(altitude)};
        var writePressure = {"pressure": Math.round(pressure)};
        var writeTemperature = {"temperature": Math.round(temperature)};
        json.push(writeAltitude, writePressure, writeTemperature);
        fs.writeFile('data/tester.json', JSON.stringify(json), function(err){
            if (err) throw err;
        });
        callback(null);
    });
}

setInterval(function(){
    if (altitude <= 0){
        altitude = 1000;
        temperature = 15;
        pressure = 1013;
    }
    altitude += Math.random();
    altitude -= Math.random();
    altitude -= 2;
    pressure += Math.random();
    pressure -= Math.random();
    temperature += 0.9 * Math.random();
    temperature -= Math.random();
    writeData(altitude, pressure, temperature, function(err){
        if (err) throw err;
    });
}, 175);