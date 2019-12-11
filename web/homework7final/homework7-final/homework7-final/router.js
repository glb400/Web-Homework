var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var jade = require('jade');
var validator = require('./js/validator');

var users = {};

var user;

function route(req,url,res){
    switch(url){
        case '/js/validator.js':
            send(res,'./js/validator.js','text/javascript');
            break;
        case '/js/signup.js':
            send(res,'./js/signup.js','text/javascript');
            break;
        case '/css/Userstyle.css':
            send(res,'./css/Userstyle.css','text/css');
            break;
        case '/css/Detailstyle.css':
            send(res,'./css/Detailstyle.css','text/css');
            break;
        default:
            req.method === 'POST' ? registUser(req,res):sendHtml(req, res);
        }
}

function send(res, filePath, tp){
    res.writeHead(200,{"Content-Type":tp});
    res.end(fs.readFileSync(filePath));
}

function parseUser(dataChunk){
    dataSplit = dataChunk.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
    var user = {username: dataSplit[1],sid: dataSplit[2],phone: dataSplit[3],email: decodeURIComponent(dataSplit[4])};
    console.log("接收到的用户信息为: ", user);
    return user;
}

function checkUser(user){
    let errors = [];
    for(var key in user){
        if(!validator.isFieldValid(key, user[key]))
            errors.push(validator.form[key].errorMessage);
        if(!validator.isAttrValidUnique(users, user, key))
            errors.push("错误提示: " + key + " 的值已存在，其值为: ",user[key]);
        }
    if(errors.length > 0)
        throw new Error(errors.join('<br />'));
}

function registUser(req, res){
    req.on('data', function(chunk){
        try{
            user = parseUser(chunk.toString());
            checkUser(user);
            users[user.username] = user;
            res.writeHead(301,{Location: '?username=' + user.username});
            res.end();
        }
        catch(error){
            console.warn("注册错误: ", error);
            showSignup(res,user,error.message);
        }
    });
}

function sendHtml(req,res){
    var username = querystring.parse(url.parse(req.url).query).username;
    if(!username || !(!!users[username])){
        showSignup(res,{username: username},null);
    }
    else{
        showDetail(res,users[username]);
    }
}

function showSignup(res,user,error){
    showHtml(res,'signup.jade',{user: user,error:error});
}

function showDetail(res,user){
    showHtml(res,'detail.jade', user);
}

function showHtml(res, template, data){
    res.writeHead(200,{"Content-Type":"text/html","Charset":"UTF-8"});
    res.end(jade.renderFile(template, data));
}

exports.route = route;