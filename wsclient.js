var cont = document.getElementById("cont");
var mess = document.getElementById("mess");
var sub = document.getElementById("sub");
var user = document.getElementById("user");



function connect(){this.ws = new WebSocket("ws://" + window.location.hostname + ":8001");
	ws.onclose = function(){
		writechat('client','erreur de connection, tentative de connexion ...');
		connect();
	}
	ws.onmessage = function(e){ 
		var rep = JSON.parse(e.data);
		writechat(rep.user,rep.message);
	};

};

function wsSend(message){
	var data = {"type":"text" ,"message":message};
	this.ws.send(JSON.stringify(data));
};

function writechat(user,message){
 	cont.innerHTML += '<p>' + user + " : " + message + '</p>';
};


connect();

sub.onclick = function(){wsSend(mess.value);};


