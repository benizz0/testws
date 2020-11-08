var http = require("http");
var fs = require('fs');
var wss = require('ws').Server;
var util = require('util');
var mysql = require('mysql');


// CONFIG

// Web Server
var web_server_port = 8000;

// Ws Server
var ws_server = {
	host:'0.0.0.0', 
	port:8001
};

// Mysql Connection
var Mysql_conn = {
	host:'localhost',
	port:'3311',
	user:'root',
	password:'root',
	database:'test'
};

// ----------------------------------------------------------------


// ----------------------------------------------------------------
var gestclient = {
	user:new Array(), // {name:<> , session:<>}
	removeuser:function(Session){
		for( i = 0; i < gestclient.user.length; i++){
			if(gestclient.user[i].session === Session){
				gestclient.user.splice(i,1);

				
			}
		}
	},
	adduser:function(name,Session){
		var a = {
			name:name,
			session:Session
		}
		gestclient.user.push(a);
	},
	newmessage:function(message){
		for( i = 0; i < gestclient.user.length; i++){
			gestclient.user[i].session.send(message);
		}
	},
	veriflogin:function(user,password,session){
		mysqlconnection.query('SELECT COUNT(ID) AS count FROM user WHERE user="' + user + '" AND pass = "' + password + '";', function(err, rows){
			if(!err){
				if(rows[0].count == 1){
					gestclient.adduser(user,session);
					gestclient.systememessage("connection reussi",session);

				}else{
					gestclient.systememessage("nom d'utilisateur ou mots de passe incorect",session);
					
				}
				
			}else{
				gestclient.systememessage("erreur l'ors de l'authentification",session);
			}
		});
	},

	verifauth:function(Session){
		
		for( i = 0; i < gestclient.user.length; i++){
			if(gestclient.user[i].session === Session){
				return i;
				
			}
		}
		return -1;
	},

	systememessage:function(message,session){
		var mess = {"type":"text","user":"systeme","message":message};
		session.send(JSON.stringify(mess));
	}
};

// ----------------------------------------------------------------


var Smess = fs.createWriteStream(__dirname + '/message.text', {flags : 'a'});
var log_file = fs.createWriteStream(__dirname + '/main.log', {flags : 'a'});
var log_stdout = process.stdout;

var index = fs.readFileSync(__dirname + '/index.html');
var wsC = fs.readFileSync(__dirname + '/wsclient.js');
var css = fs.readFileSync(__dirname + '/style.css');

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// -----------
// CONNECT DB

var mysqlconnection = mysql.createConnection(Mysql_conn);
mysqlconnection.connect(function(e){
	if(e){
		console.log("[!] ERROR DB : ")
		console.log(e);
		
	}else{
		console.log(">>> DB Connected");
	}
});


// -----------
var HTMLserver = http.createServer(function(request, response) {
	var url = request.headers.host + request.url;
	console.log('Request: ' + url);
	console.log(request.headers.host);

	var headers = {
		"Content-Type": "text/html",
		"Server": "test/beta 0.0",
		"Access-Control-Allow-Origin": "*"
	};

	
	if(url.indexOf('/ws') != -1){
		response.writeHead(200, headers);
		response.write(wsC);
		response.end();
		return;
	}else if(url.indexOf('/css') != -1){
		response.writeHead(200,headers);
		response.write(css);
		response.end();
		return;
	}else if(url.indexOf('/favicon.ico') != -1){
		response.writeHead(404,headers);
		response.end();
		return;
	}else{
		console.log('>>> connection');
		response.writeHead(200, headers);
		response.write(index);
		response.end();
		return;
	}
});

// --------------------



var wssServer = new wss(ws_server);


wssServer.on('connection', function(WsSession){

	console.log('>>> Ws connection');

	WsSession.on('message',function(message){
		console.log(message);

		var a = JSON.parse(message);
		if(a.message.charAt(0) === '/'){
			var comd = a.message.split(" ");
			switch(comd[0]){
				case '/help':
					gestclient.systememessage("/help - voir les commandes \n/login 'user' 'password' - se connecter eu chat \n/disconnect - se déconecter",WsSession);
					break;
				case '/login':
					if(comd.length === 3){
						gestclient.removeuser(WsSession);
						gestclient.veriflogin(comd[1],comd[2],WsSession);

					}else{
						gestclient.systememessage("/login 'user' 'password'",WsSession);
					}
					
					break;
				case '/disconnect':
					gestclient.removeuser(WsSession);
					break;

				case '/list':
					gestclient.systememessage(gestclient.user.length + " " + gestclient.user[0].name,WsSession);
					break;
				default:
					gestclient.systememessage("/help - voir les commandes \n/login 'user' 'password' - se connecter eu chat \n/disconnect - se déconecter",WsSession);
					break;

			}
		}else if(gestclient.verifauth(WsSession) != -1){
			var id = gestclient.verifauth(WsSession);
			var us = gestclient.user[id].name;
			var rep = {"type":"text","user":us,"message":a.message};
			gestclient.newmessage(JSON.stringify(rep));
		}else{
			gestclient.systememessage("merci de s'authentifier (/help pour plus d'info)",WsSession);
			
		}

				
	});

	WsSession.on('close', function(){
		gestclient.removeuser(WsSession);
	})
	
});


console.log(">>> Server WSS Started on " + ws_server.port);
HTMLserver.listen(web_server_port);
console.log(">>> Server HTML Started on " + web_server_port);
