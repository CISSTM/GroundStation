/*global io*/
var socket = io();
socket.on('temperature', function(msg) {
    if (!msg) { return }
    if (msg == "error") { return }
    document.getElementById("temp_value").innerHTML = msg.toString() + " °C";
});
socket.on('pressure', function(msg) {
    if (!msg) { return }
    if (msg == "error") { return }
    document.getElementById("press_value").innerHTML = msg.toString() + " HPa";
});
socket.on('altitude', function(msg) {
    if (!msg) { return }
    if (msg == "error") { return }
    document.getElementById("alt_value").innerHTML = msg.toString() + " m";
});

socket.on('speed', function(msg) {
    if (!msg) { return }
    if (msg == "error") { return }
    document.getElementById('speed_value').innerHTML = msg.toString() + " m/s";
});
