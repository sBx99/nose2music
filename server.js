var express = require('express')

var app = express()
var server = app.listen(3000, listening)

function listening() {
    console.log("listening on https://0.0.0.0/3000")
}

app.use(express.static('public'))