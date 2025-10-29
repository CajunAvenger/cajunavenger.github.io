var fs = require('fs');
var dex = require('./dex.json');

fs.writeFile('./dex_mini.js', 'var pokedex = ' + JSON.stringify(dex), () => {})

