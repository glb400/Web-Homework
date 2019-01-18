var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var jade = require('jade');
var validator = require('./js/validator');
var server = require("./server");
var router = require("./router");

server.start(router.route);