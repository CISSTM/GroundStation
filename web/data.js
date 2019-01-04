/*global io*/
var socket = io();
console.log("running tests");
socket.on('temperature', function(msg) {
    document.getElementById("temp_value").innerHTML = msg.toString() + " °C";
});
socket.on('pressure', function(msg) {
    document.getElementById("press_value").innerHTML = msg.toString() + " HPa";
});
socket.on('altitude', function(msg) {
    document.getElementById("alt_value").innerHTML = msg.toString() + " meter";
});
