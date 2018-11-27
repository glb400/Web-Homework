var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var jade = require('jade');
var validator = require('./js/validator');

function start(route){
    function onRequest(req,res){
        route(req,req.url,res);
    }
    http.createServer(onRequest).listen(8000);
    console.log("Server has started & listening at Port: 8000....");
}

exports.start = start;