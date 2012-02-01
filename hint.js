var JSHINT = require('./src/core.js');
var fs = require('fs');

try {
    JSHINT.lint(fs.readFileSync('./demo.js').toString());
} catch (exc) {
    console.log(exc.message);
}