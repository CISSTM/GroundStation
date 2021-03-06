const fs = require('fs');

const getData = function (type, callback) {
    fs.readFile('data/readable.json', function(err, data) {
        if (err) throw err;
        var parsedData = JSON.parse(data);
        var returnValue;
        for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i][type]) {
                returnValue = parsedData[i][type];
            }
        }
        callback (null, returnValue);
    });
}
//Ik probeerde er een async functie van te maken
getData("temperature", function(err, temp){
    if (err) throw err;
    console.log('De huidige temperatuur is ' + temp + ' graden')
})
