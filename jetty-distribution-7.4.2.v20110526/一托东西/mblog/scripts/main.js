// JavaScript Document
/*
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~start of paint~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``
 */
var painting = {
	"type" : "paintORclear",
	"lineWidth" : 5,
	"strokeStyle" : "#FFF",
	"points" : []
};

var points = [];

var Paint = {};
var canvas;
var context;
var h = 600;

Paint.onload = (function() {
	// Get the canvas and the drawing context.
	canvas = document.getElementById("drawingCanvas");
	//canvas.height = h - 170;
	context = canvas.getContext("2d");
	context.lineWidth = 5;
	// Attach the events that you need for drawing.
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	// canvas.onmouseout = stopDrawing;
	canvas.onmousemove = draw;
});

Paint.unload = (function() {
	canvas = document.getElementById("drawingCanvas");
	//canvas.height = h - 170;
	// Attach the events that you need for drawing.
	canvas.onmousedown = null;
	canvas.onmouseup = null;
	// canvas.onmouseout = stopDrawing;
	canvas.onmousemove = null;
});

Paint.paint = (function(infor) {
	// Get the canvas and the drawing context.
	canvas = document.getElementById("drawingCanvas");
	//canvas.height = h - 170;
	context = canvas.getContext("2d");
	var type = infor.type;
	if (type == 'clear') {
		context.clearRect(0, 0, canvas.width, canvas.height);
	} else if (type == 'paint') {
		context.beginPath();
		context.lineWidth = infor.lineWidth;
		context.strokeStyle = infor.strokeStyle;
		var points = infor.points;
		for ( var i = 0; i < points.length; i++) {
			if (i == 0) {
				context.moveTo(points[i].x, points[i].y);
			} else {
				context.lineTo(points[i].x, points[i].y);
				context.stroke();
			}
		}
	} else if (type == 'painting') {
		var points = infor.points;
		for ( var i = 0; i < points.length; i++) {
			context.lineTo(points[i].x, points[i].y);
			context.stroke();
		}
	}
});

var isDrawing = false;

function startDrawing(e) {
	// Start drawing.
	isDrawing = true;
	// Create a new path (with the current stroke color and stroke thickness).
	context.beginPath();
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	points = [];
	var point = {
		x : 0,
		y : 0
	};
	point.x = x;
	point.y = y;
	points.push(point);
	// Put the pen down where the mouse is positioned.
	context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function stopDrawing() {
	isDrawing = false;
}

function draw(e) {
	if (isDrawing == true) {
		// Find the new position of the mouse.
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		var point = {
			x : 0,
			y : 0
		};

		point.x = x;
		point.y = y;
		points.push(point);

		// Draw a line to the new position.
		context.lineTo(x, y);
		context.stroke();

		painting.type = 'paint';
		painting.lineWidth = context.lineWidth;
		painting.strokeStyle = context.strokeStyle;
		painting.points = points;

		if (points.length == 2) {
			Request.paint(painting);
			points = [];
		} else {
			painting.type = 'painting';
			Request.paint(painting);
			points = [];
		}
	}
}

// Keep track of the previous clicked <img> element for color.
var previousColorElement;

function changeColor(color, imgElement) {
	// Change the current drawing color.
	context.strokeStyle = color;

	// Give the newly clicked <img> element a new style.
	imgElement.className = "Selected";

	// Return the previously clicked <img> element to its normal state.
	if (previousColorElement != null)
		previousColorElement.className = "";
	previousColorElement = imgElement;
}

// Keep track of the previous clicked <img> element for thickness.
var previousThicknessElement;

function changeThickness(thickness, imgElement) {
	// Change the current drawing thickness.
	context.lineWidth = thickness;

	// Give the newly clicked <img> element a new style.
	imgElement.className = "Selected";

	// Return the previously clicked <img> element to its normal state.
	if (previousThicknessElement != null)
		previousThicknessElement.className = "";
	previousThicknessElement = imgElement;
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	painting.type = 'clear';
	Request.paint(painting);
}

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~end of
 * paint~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~start of
 * common~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
var requestTypes = {
	CREATE_ROOM : 0,
	ENTER_ROOM : 1,
	LEAVE_ROOM : 2,
	READY : 3,
	START_GAME : 4,
	GUESS : 5,
	PAINT : 6,
	QUIT_GAME : 7,
	QUIT_PAINT : 8
};

var responseTypes = {
	ALL_ROOMS : 0,
	CRE_ROOM_SUC : 1,
	CRE_ROOM : 2,
	LEAVE_ROOM_SUC : 3,
	LEAVE_ROOM : 4,
	ENTER_ROOM_SUC : 5,
	ENTER_ROOM : 6,
	READY_SUC : 7,
	START_GAME_SUC : 8,
	GUESS_SUC : 9,
	GUESS_FAIL : 10,
	PAINTING : 11,
	QUIT_GAME_SUC : 12,
	QUIT_GAME : 13,
	GAME_OVER : 14,
	REMOVE_ROOM : 15,
	START_GAME : 16,
	NEW_ROUND : 17,
	NEW_ROUND_PAINT : 18,
	QUIT_PAINTING_SUC : 19
};

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

function getElementsByClass(object, tag, className) {
	var o = object.getElementsByTagName(tag);
	for ( var i = 0, n = o.length, ret = []; i < n; i++) {
		if (o[i].className == className)
			ret.push(o[i]);
	}
	if (ret.length == 1)
		ret = ret[0];
	return ret;
};

function print_obj(myObject) {
	var s = "";
	for ( var property in myObject) {
		s = s + "\n " + property + ": " + myObject[property];
	}
	alert(s);
}

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~end of
 * common~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start of Request
 * Object~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

var Request = {};

Request.createRoom = (function() {
	var requestType = requestTypes.CREATE_ROOM;
	var request = "{'type':" + requestType + ",'content':''}";
	PaintAndGuess.socket.send(request);
});

Request.enterRoom = (function() {
	var roomID = this.id;
	var requestType = requestTypes.ENTER_ROOM;
	var request = "{'type':" + requestType + ",'content':" + roomID + "}";
	PaintAndGuess.socket.send(request);
});

Request.leaveRoom = (function() {
	var roomID = this.id;
	var requestType = requestTypes.LEAVE_ROOM;
	var request = "{'type':" + requestType + ",'content':" + roomID + "}";
	PaintAndGuess.socket.send(request);
});

Request.startGame = (function() {
	var height = $("#console").height();
	$("#console").height(height - 130);
	var requestType = requestTypes.START_GAME;
	var request = "{'type':" + requestType + ",'content':''}";
	PaintAndGuess.socket.send(request);
});

Request.guess = (function() {
	var content = document.getElementById('sayingInput').value;
	var requestType = requestTypes.GUESS;
	var request = "{'type':" + requestType + ",'content':'" + content + "'}";
	PaintAndGuess.socket.send(request);
});

Request.paint = (function(painting) {
	var content = JSON.stringify(painting);
	var requestType = requestTypes.PAINT;
	var request = "{'type':" + requestType + ",'content':'" + content + "'}";
	PaintAndGuess.socket.send(request);
});

Request.quitGame = (function() {
	var requestType = requestTypes.QUIT_GAME;
	var request = "{'type':" + requestType + ",'content':''}";
	PaintAndGuess.socket.send(request);
});

Request.quitPaint = (function() {
	Paint.unload();
	var requestType = requestTypes.QUIT_PAINT;
	var request = "{'type':" + requestType + ",'content':''}";
	PaintAndGuess.socket.send(request);
});

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Request
 * Object~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start of
 * PAINTandGUESS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
var PaintAndGuess = {};

PaintAndGuess.socket = null;

PaintAndGuess.connect = (function(host) {
	if ('WebSocket' in window) {
		PaintAndGuess.socket = new WebSocket(host);
	} else if ('MozWebSocket' in window) {
		PaintAndGuess.socket = new MozWebSocket(host);
	} else {
		Console.log('连接服务器出错');
		return;
	}

	PaintAndGuess.socket.onopen = function() {
		Console.log('成功连接到服务器');
		document.getElementById("createRoom").onclick = Request.createRoom;
		document.getElementById("sayingButton").onclick = Request.guess;
	};

	PaintAndGuess.socket.onclose = function() {
		Console.log('与服务器断开连接');
	};

	PaintAndGuess.socket.onmessage = function(message) {
		var response = JSON.parse(message.data);
		var responseType = response.type;

		if (responseType == responseTypes.PAINTING) {
			var str = response.content.substr(1, response.content.length - 2);
			response.content = str;
			// alert(response.content);
		}

		var respContent = JSON.parse(response.content);
		switch (responseType) {
		case responseTypes.ALL_ROOMS:
			Rooms.load(respContent);
			break;
		case responseTypes.CRE_ROOM_SUC:
			Rooms.loadRoom(respContent);
			break;
		case responseTypes.CRE_ROOM:
			Rooms.append(respContent);
			break;
		case responseTypes.LEAVE_ROOM_SUC:
			var mainBox = document.getElementById('mainBox');
			mainBox.innerHTML = '';
			var roomsDiv = document.createElement('div');
			roomsDiv.id = 'roomsDiv';
			var loading = document.createElement('div');
			loading.id = 'loading';
			var rooms = document.createElement('table');
			rooms.id = 'rooms';
			rooms.cellSpacing = 20;
			roomsDiv.appendChild(loading);
			roomsDiv.appendChild(rooms);
			mainBox.appendChild(roomsDiv);
			Rooms.load(respContent);
			Rooms.changeSideBox(0);
			break;
		case responseTypes.LEAVE_ROOM:
			Rooms.removePlayer(respContent);
			break;
		case responseTypes.ENTER_ROOM_SUC:
			Rooms.loadRoom(respContent);
			break;
		case responseTypes.ENTER_ROOM:
			Rooms.appendPlayer(respContent);
			break;
		case responseTypes.READY_SUC:
			break;
		case responseTypes.START_GAME_SUC:
			Rooms.loadGame(respContent, 'painter');
			break;
		case responseTypes.GUESS_SUC:
			var message = respContent.message;
			Console.log(message);
			break;
		case responseTypes.GUESS_FAIL:
			var message = respContent.message;
			Console.log(message);
			break;
		case responseTypes.PAINTING:
			Paint.paint(respContent);
			break;
		case responseTypes.QUIT_GAME_SUC:
			var mainBox = document.getElementById('mainBox');
			mainBox.innerHTML = '';
			var roomsDiv = document.createElement('div');
			roomsDiv.id = 'roomsDiv';
			var loading = document.createElement('div');
			loading.id = 'loading';
			var rooms = document.createElement('table');
			rooms.id = 'rooms';
			rooms.cellSpacing = 20;
			roomsDiv.appendChild(loading);
			roomsDiv.appendChild(rooms);
			mainBox.appendChild(roomsDiv);
			Rooms.load(respContent);
			Rooms.changeSideBox(0);
			break;
		case responseTypes.QUIT_GAME:
			Console.log("游戏只剩您一个玩家，三秒后结束游戏！！");
			setTimeout(function() {
				Rooms.loadRoom(respContent);
				Rooms.changeSideBox(3);
			}, 3 * 1000);
			break;
		case responseTypes.GAME_OVER:
			break;
		case responseTypes.REMOVE_ROOM:
			Rooms.removeRoom(respContent);
			break;
		case responseTypes.START_GAME:
			Rooms.loadGame(respContent, 'player');
			break;
		case responseTypes.NEW_ROUND:
			canvas = document.getElementById("drawingCanvas");
			//canvas.height = h - 170;
			context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			Rooms.newRound(respContent, 'player');
			break;
		case responseTypes.NEW_ROUND_PAINT:
			canvas = document.getElementById("drawingCanvas");
			//canvas.height = h - 170;
			context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			Rooms.newRound(respContent, 'painter');
			break;
		default:
			alert('操作失败');
			break;
		}
		// Console.log(message.data);
	};
});

PaintAndGuess.initialize = function() {
	if (window.location.protocol == 'http:') {
		PaintAndGuess.connect('ws://' + window.location.host
				+ '/mblog/servlet/App');
	} else {
		PaintAndGuess.connect('wss://' + window.location.host
				+ '/mblog/servlet/App');
	}
};

PaintAndGuess.sendMessage = (function() {
	// var message = document.getElementById('PaintAndGuess').value;
	if (message != '') {
		PaintAndGuess.socket.send(message);
		// document.getElementById('PaintAndGuess').value = '';
	}
});

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of
 * PAINTandGUESS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start of Console(be used
 * to print message to CONSOLE panel)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
var Console = {};

Console.log = (function(message) {
	var console = document.getElementById('console');
	var p = document.createElement('div');
	p.className = 'sayingItem';
	p.style.wordWrap = 'break-word';
	p.innerHTML = message;
	console.appendChild(p);
	while (console.childNodes.length > 25) {
		console.removeChild(console.firstChild);
	}
	console.scrollTop = console.scrollHeight;
});

/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Console(be used to
 * print message to CONSOLE panel)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

var Rooms = {};

/*
 * load:列出所有房间
 */
Rooms.load = (function(rooms) {
	var roomsContainer = document.getElementById('rooms');
	roomsContainer.innerHTML = '';
	var roomsDiv = document.getElementById('roomsDiv');
	var loading = document.getElementById('loading');
	if (loading != null) {
		roomsDiv.removeChild(loading);
	}
	for ( var i = 0; i < rooms.length; i++) {
		var room = rooms[i];
		var tr = document.createElement('tr');
		tr.className = 'tableTr';
		var td1 = document.createElement('td');
		td1.id = room.roomID + 9999;
		var td2 = document.createElement('td');
		Html.createRoom(room, td1);
		tr.appendChild(td1);
		if (i < rooms.length - 1) {
			i++;
			room = rooms[i];
			td2.id = room.roomID + 9999;
			Html.createRoom(room, td2);
			tr.appendChild(td2);
		}
		roomsContainer.appendChild(tr);

	}
});

/*
 * sideBox 0:初始界面 1：进入房间界面 2：进入游戏界面
 */
Rooms.changeSideBox = (function(type) {

	switch (type) {
	case 0:
		var sideBox = document.getElementById('sideBox');
		var tools = document.getElementById('tools');
		if (tools != null) {
			sideBox.removeChild(tools);
			;
		}

		var saying = document.getElementById('saying');
		var myOperations = document.getElementById('myOperations');
		myOperations.innerHTML = '';
		var operation1 = document.createElement('div');
		operation1.className = 'createRoom';
		operation1.innerHTML = '创建房间';
		operation1.id = 'createRoom';
		operation1.onclick = Request.createRoom;
		myOperations.appendChild(operation1);
		break;
	case 1:
		var sideBox = document.getElementById('sideBox');
		var tools = document.getElementById('tools');
		if (tools != null) {
			sideBox.removeChild(tools);
			;
		}
		var myOperations = document.getElementById('myOperations');
		myOperations.innerHTML = '';
		var operation1 = document.createElement('div');
		operation1.className = 'leave';
		operation1.innerHTML = '退出游戏';
		operation1.id = 'leaveGame';
		operation1.onclick = Request.quitGame;
		myOperations.appendChild(operation1);
		break;
	case 2:
		var myOperations = document.getElementById('myOperations');
		myOperations.innerHTML = '';
		var operation1 = document.createElement('div');
		operation1.className = 'leave';
		operation1.innerHTML = '退出游戏';
		operation1.id = 'leaveGame';
		operation1.onclick = Request.quitGame;
		myOperations.appendChild(operation1);

		var sideBox = document.getElementById('sideBox');
		var saying = document.getElementById('saying');
		var tools = document.createElement('div');
		tools.id = 'tools';
		tools.className = 'tools';
		tools.innerHTML = "<div class='Toolbar colors'>"
				+ "<table><tbody>"
				+ "<tr>"
				+ "<td id='black' onclick='changeColor(\"#000\", this)'></td>"
				+ "<td id='grey' onclick='changeColor(\"#999\", this)'></td>"
				+ "<td id='red' onclick='changeColor(\"#F00\", this)'></td>"
				+ "<td id='orange' onclick='changeColor(\"#F93\", this)'></td>"
				+ "<td id='yellow' onclick='changeColor(\"#FF0\", this)'></td>"
				+ "<td id='Color963' onclick='changeColor(\"#963\", this)'></td>"
				+ "<td id='ColorC9F' onclick='changeColor(\"#C9F\", this)'></td>"
				+ "<td id='green' onclick='changeColor(\"#0F0\", this)'>&nbsp;</td>"
				+ "<td id='blue' onclick='changeColor(\"#00F\", this)'>&nbsp;</td>"
				+ "<td id='purple' onclick='changeColor(\"#0FF\", this)'>&nbsp;</td>"
				+ "</tr>"
				+ "</tbody></table>"
				+ "</div>"
				+ " <div class='Toolbar thickness'>"
				+ "<table>"
				+ " <tbody><tr>"
				+ " <td id='thin' onclick='changeThickness(1, this)'><img src='images/pen_thin.gif' alt='Thin Pen'></td>"
				+ "  <td id='medium' onclick='changeThickness(5, this)'><img src='images/pen_medium.gif' alt='Medium Pen'></td>"
				+ " <td id='thick' onclick='changeThickness(10, this)'><img src='images/pen_thick.gif' alt='Thick Pen'></td>"
				+ "</tr>"
				+ " </tbody></table>"
				+ " </div>"
				+ "<div class='Toolbar operations'>"
				+ " <input type='button' onclick='clearCanvas()' value='清除画布'/>"
				+ " <input type='button' id='quitPaint' value='放弃作画' />"
				+ " </div> ";

		sideBox.insertBefore(tools, saying);
		var quitPaint = document.getElementById('quitPaint');
		quitPaint.onclick = Request.quitPaint;
		break;
	case 3:
		var sideBox = document.getElementById('sideBox');
		var tools = document.getElementById('tools');
		if (tools != null) {
			sideBox.removeChild(tools);
			;
		}
		break;
	}
});

/*
 * append:增加一个房间
 */
Rooms.append = (function(room) {
	var roomsContainer = document.getElementById('rooms');
	var rooms = roomsContainer.getElementsByTagName('td');
	var allTr = roomsContainer.getElementsByClassName('tableTr');
	if (rooms.length % 4 == 0) {
		var tr = document.createElement('tr');
		tr.className = 'tableTr';
		var td1 = document.createElement('td');
		td1.id = room.roomID + 9999;
		Html.createRoom(room, td1);
		tr.appendChild(td1);
		roomsContainer.appendChild(tr);
	} else {
		var lastTr = allTr[allTr.length - 1];
		var td1 = document.createElement('td');
		td1.id = room.roomID + 9999;
		Html.createRoom(room, td1);
		lastTr.appendChild(td1);
	}
});

Rooms.removeRoom = (function(room) {
	var roomTd = document.getElementById(room.roomID + 9999);
	roomTd.style.display = 'none';
});

/*
 * loadRoom:生成某个房间的UI
 */
Rooms.loadRoom = (function(room) {
	var mainBox = document.getElementById('mainBox');
	mainBox.innerHTML = '';

	var players = room.players;
	var playersLength = players.length;

	var html_roomInf = document.createElement('div');
	html_roomInf.className = 'roomInfor';
	html_roomInf.innerHTML = '房间号：';
	var html_roomID = document.createElement('span');
	html_roomID.className = 'roomID';
	var room_id = room.roomID;
	var romm_id_str = '';
	if (room_id < 100) {
		if (room_id < 10)
			room_id_str = '00' + room_id;
		else
			room_id_str = '0' + room_id;
	}
	html_roomID.innerHTML = room_id_str;
	html_roomInf.appendChild(html_roomID);

	var table = document.createElement('table');
	table.id = 'playersTable';
	table.cellSpacing = 20;
	var tr1 = document.createElement('tr');
	tr1.className = 'playersTr';
	var tr2 = document.createElement('tr');
	tr2.className = 'playersTr';
	for ( var i = 0; i < playersLength; i++) {
		var td = document.createElement('td');
		td.className = 'playersTd';
		var player;
		if (i == 0) {
			player = room.master;
			var host = document.createElement('div');
			host.className = 'host';
			var follow = '<input type="button" id="focus' + player.user.userId
					+ '" value="添加关注" onclick="removeFocus('
					+ player.user.userId + ')"/>';
			host.innerHTML = player.user.focused ? '房主' : '房主' + follow;
			td.id = player.user.nickname;
			td.appendChild(host);
		} else {
			player = players[i];
			var host = document.createElement('div');
			host.className = 'host';
			var follow = '<input type="button" id="focus' + player.user.userId
					+ '" value="添加关注" onclick="removeFocus('
					+ player.user.userId + ')"/>';
			host.innerHTML = player.user.focused ? '' : follow;
			td.id = player.user.nickname;
			td.appendChild(host);
		}

		var avatar = document.createElement('img');
		avatar.className = 'avatar';
		avatar.src = player.user.avatar;
		var playerName = document.createElement('div');
		playerName.className = 'playerName';
		playerName.innerHTML = player.user.nickname;

		td.appendChild(avatar);
		td.appendChild(playerName);
		if (i < 3) {
			tr1.appendChild(td);
		} else {
			tr2.appendChild(td);
		}
	}

	table.appendChild(tr1);
	table.appendChild(tr2);

	mainBox.appendChild(html_roomInf);
	mainBox.appendChild(table);

	var sideBox = document.getElementById('sideBox');
	var saying = document.getElementById('saying');
	var myOperations = document.getElementById('myOperations');
	myOperations.innerHTML = '';
	if (playersLength == 1) {
		var operation = document.createElement('div');
		operation.className = 'startGame';
		operation.innerHTML = '开始游戏';
		operation.onclick = Request.startGame;
		myOperations.appendChild(operation);
	}
	var operation1 = document.createElement('div');
	operation1.className = 'leaveRoom';
	operation1.innerHTML = '离开房间';
	operation1.id = room_id;
	operation1.onclick = Request.leaveRoom;
	myOperations.appendChild(operation1);

	var message = '欢迎您加入房间';
	Console.log(message);
});

/*
 * appendPlayer:房间中增加一位玩家
 */
Rooms.appendPlayer = (function(player) {
	var players = document.getElementsByClassName('playersTd');
	var allTr = document.getElementsByClassName('playersTr');
	var td = Html.createPlayer(player);
	if (players.length < 3) {
		var tr = allTr[0];
		tr.appendChild(td);
	} else {
		var lastTr = allTr[allTr.length - 1];
		lastTr.appendChild(td);
	}
	var message = player.user.nickname + '加入了房间';
	Console.log(message);
});

/*
 * removePlayer:房间中退出一位玩家
 */
Rooms.removePlayer = (function(room) {
	var mainBox = document.getElementById('mainBox');
	mainBox.innerHTML = '';

	var players = room.players;
	var playersLength = players.length;

	var html_roomInf = document.createElement('div');
	html_roomInf.className = 'roomInfor';
	html_roomInf.innerHTML = '房间号：';
	var html_roomID = document.createElement('span');
	html_roomID.className = 'roomID';
	var room_id = room.roomID;
	var romm_id_str = '';
	if (room_id < 100) {
		if (room_id < 10)
			room_id_str = '00' + room_id;
		else
			room_id_str = '0' + room_id;
	}
	html_roomID.innerHTML = room_id_str;
	html_roomInf.appendChild(html_roomID);

	var table = document.createElement('table');
	table.id = 'playersTable';
	table.cellSpacing = 20;
	var tr1 = document.createElement('tr');
	tr1.className = 'playersTr';
	var tr2 = document.createElement('tr');
	tr2.className = 'playersTr';
	for ( var i = 0; i < playersLength; i++) {
		var td = document.createElement('td');
		td.className = 'playersTd';
		var player;
		if (i == 0) {
			player = room.master;
			var host = document.createElement('div');
			host.className = 'host';
			var follow = '<input type="button" id="focus' + player.user.userId
					+ '" value="添加关注" onclick="removeFocus('
					+ player.user.userId + ')"/>';
			host.innerHTML = player.user.focused ? '房主' : '房主' + follow;
			td.id = player.user.nickname;
			td.appendChild(host);
		} else {
			player = players[i];
			var host = document.createElement('div');
			host.className = 'host';
			var follow = '<input type="button" id="focus' + player.user.userId
					+ '" value="添加关注" onclick="removeFocus('
					+ player.user.userId + ')"/>';
			host.innerHTML = player.user.focused ? '' : follow;
			td.id = player.user.nickname;
			td.appendChild(host);
		}

		var avatar = document.createElement('img');
		avatar.className = 'avatar';
		avatar.src = player.user.avatar;
		var playerName = document.createElement('div');
		playerName.className = 'playerName';
		playerName.innerHTML = player.user.nickname;

		td.appendChild(avatar);
		td.appendChild(playerName);
		if (i < 3) {
			tr1.appendChild(td);
		} else {
			tr2.appendChild(td);
		}
	}

	table.appendChild(tr1);
	table.appendChild(tr2);

	mainBox.appendChild(html_roomInf);
	mainBox.appendChild(table);

	var sideBox = document.getElementById('sideBox');
	var saying = document.getElementById('saying');
	var myOperations = document.getElementById('myOperations');
	myOperations.innerHTML = '';
	if (playersLength == 1) {
		var operation = document.createElement('div');
		operation.className = 'startGame';
		operation.innerHTML = '开始游戏';
		operation.onclick = Request.startGame;
		myOperations.appendChild(operation);
	}
	var operation1 = document.createElement('div');
	operation1.className = 'leaveRoom';
	operation1.innerHTML = '离开房间';
	operation1.id = room_id;
	operation1.onclick = Request.leaveRoom;
	myOperations.appendChild(operation1);

	var message = player.user.nickname + '离开了房间';
	Console.log(message);
});

Rooms.loadGame = (function(game, role) {

	var mainBox = document.getElementById('mainBox');
	mainBox.innerHTML = "<div class='painter'><div class='img'><img id='painterAvatar' src='../images/avatar/a.jpg' alt='选手照片'/><span id='painterName'>aaa</span>正在作画···"
			+ "</div><div class='infor' id='keyword'>meinb</div>"
			+ "<div class='timer'>倒计时：<span id='seconds'>80</span>S</div>"
			+ "</div>"
			+ "<div class='CanvasContainer'>"
			+ "<canvas id='drawingCanvas' width='1012px' height='400px'></canvas>"
			+ " </div>"
			+ "<div class='players'>"
			+ "  <table>"
			+ "  <tr id='playersContainer'>"
			+ " </tr>"
			+ " </table>"
			+ " </div>";

	var painterAvatar = document.getElementById('painterAvatar');
	painterAvatar.src = game.painter.user.avatar;
	var painterName = document.getElementById('painterName');
	painterName.innerHTML = game.painter.user.nickname;

	var keyword = document.getElementById('keyword');
	keyword.innerHTML = role == 'painter' ? game.keyword : '';

	var playersContainer = document.getElementById('playersContainer');
	var players = game.players;
	for ( var i = 0; i < players.length; i++) {
		var td = document.createElement('td');
		var player = players[i];
		td.id = player.user.nickname;
		td.className = 'allplayers';
		var avatar = document.createElement('img');
		avatar.src = player.user.avatar;
		avatar.className = 'player';
		var playerName = document.createElement('span');
		playerName.innerHTML = player.user.nickname;
		if (player.user.nickname == game.painter.user.nickname) {
			avatar.className = 'master';
		}
		td.appendChild(playerName);
		td.appendChild(avatar);
		playersContainer.appendChild(td);
	}

	if (role == 'painter') {
		Paint.onload();
		Rooms.changeSideBox(2);
	} else {
		Paint.unload();
		Rooms.changeSideBox(1);

	}

	Console.log("游戏开始！");
});

Rooms.newRound = (function(game, role) {
	var painterAvatar = document.getElementById('painterAvatar');
	painterAvatar.src = game.painter.user.avatar;
	var painterName = document.getElementById('painterName');
	painterName.innerHTML = game.painter.user.nickname;

	var keyword = document.getElementById('keyword');
	keyword.innerHTML = role == 'painter' ? game.keyword : '';

	var playersContainer = document.getElementById('playersContainer');
	var allplayers = document.getElementsByClassName('allplayers');
	var players = game.players;
	for ( var a = 0; a < allplayers.length; a++) {
		var allplayers_one = allplayers[a];
		var same = false;
		for ( var i = 0; i < players.length; i++) {
			var player = players[i];
			if (allplayers_one.id == player.user.nickname) {
				same = true;
				var avatar = allplayers_one.getElementsByClassName('player')[0];
				if (allplayers_one.id == game.painter.user.nickname) {
					if (avatar != null)
						avatar.className = 'master';
				}
				var avatarMaster = allplayers_one
						.getElementsByClassName('master')[0];
				if (allplayers_one.id != game.painter.user.nickname) {
					if (avatarMaster != null)
						avatarMaster.className = 'player';
				}
			}
		}
		if (!same)
			allplayers_one.style.visibility = 'hidden';
	}

	if (role == 'painter') {
		Paint.onload();
		Rooms.changeSideBox(2);
	} else {
		Paint.unload();
		Rooms.changeSideBox(1);
	}

	Console.log("游戏重新开始！！");
});

var Html = {};

/*
 * createPlayer:房间内新增一个Player的HTML
 */
Html.createPlayer = (function(player) {
	var td = document.createElement('td');
	td.id = player.user.nickname;
	var host = document.createElement('div');
	host.className = 'host';

	var follow = '<input type="button" id="focus' + player.user.userId
			+ '" value="添加关注" onclick="removeFocus(' + player.user.userId
			+ ')"/>';
	host.innerHTML = player.user.focused ? '' : follow;

	td.className = 'playersTd';
	var avatar = document.createElement('img');
	avatar.className = 'avatar';
	avatar.src = player.user.avatar;
	var playerName = document.createElement('div');
	playerName.className = 'playerName';
	playerName.innerHTML = player.user.nickname;
	td.appendChild(host);
	td.appendChild(avatar);
	td.appendChild(playerName);
	return td;
});

/*
 * createRoom:新增一个房间的HTML
 */
Html.createRoom = (function(room, td) {
	var players = room.players;

	var html_roomInf = document.createElement('div');
	html_roomInf.className = 'roomInf';
	var avatar = document.createElement('img');
	avatar.className = 'avatar';
	avatar.src = room.master.user.avatar;
	var IDAndMaster = document.createElement('div');
	IDAndMaster.className = 'IDAndMaster';
	var html_roomID = document.createElement('div');
	html_roomID.className = 'roomID';
	var room_id = room.roomID;
	var romm_id_str = '';
	if (room_id < 100) {
		if (room_id < 10)
			room_id_str = '00' + room_id;
		else
			room_id_str = '0' + room_id;
	}
	html_roomID.innerHTML = room_id_str;
	var html_master = document.createElement('div');
	html_master.className = 'master';
	html_master.innerHTML = room.master.user.nickname;
	IDAndMaster.appendChild(html_roomID);
	IDAndMaster.appendChild(html_master);
	html_roomInf.appendChild(avatar);
	html_roomInf.appendChild(IDAndMaster);

	var roomPlayers = document.createElement('div');
	roomPlayers.className = 'roomPlayers';
	var playersTable = document.createElement('table');
	var playersTr = document.createElement('tr');
	for ( var a = 0; a < players.length; a++) {
		var playersTd = document.createElement('td');
		var playersImg = document.createElement('img');
		playersImg.className = 'avatar';
		playersImg.src = players[a].user.avatar;
		playersTd.appendChild(playersImg);
		playersTr.appendChild(playersTd);
	}
	playersTable.appendChild(playersTr);
	roomPlayers.appendChild(playersTable);

	var enter = document.createElement('div');
	enter.className = 'enter';
	enter.id = room_id;
	enter.onclick = Request.enterRoom;
	var enterBut = document.createElement('span');
	enterBut.className = 'enterBut';
	enterBut.innerHTML = '加入房间';
	if (!room.status) {
		enter.className = 'playing';
		enterBut.innerHTML = '游戏中···';
		enter.onclick = null;
	}
	enter.appendChild(enterBut);

	var html_room = document.createElement('div');
	html_room.className = 'room';
	html_room.appendChild(html_roomInf);
	html_room.appendChild(roomPlayers);
	html_room.appendChild(enter);

	td.appendChild(html_room);

});

Html.loadRoom = (function(room, td) {
	var players = room.players;

	var html_roomInf = document.createElement('div');
	html_roomInf.className = 'roomInf';
	var avatar = document.createElement('img');
	avatar.className = 'avatar';
	avatar.src = room.master.user.avatar;
	var IDAndMaster = document.createElement('div');
	IDAndMaster.className = 'IDAndMaster';
	var html_roomID = document.createElement('div');
	html_roomID.className = 'roomID';
	var room_id = room.roomID;
	var romm_id_str = '';
	if (room_id < 100) {
		if (room_id < 10)
			room_id_str = '00' + room_id;
		else
			room_id_str = '0' + room_id;
	}
	html_roomID.innerHTML = room_id_str;
	var html_master = document.createElement('div');
	html_master.className = 'master';
	html_master.innerHTML = room.master.user.nickname;
	IDAndMaster.appendChild(html_roomID);
	IDAndMaster.appendChild(html_master);
	html_roomInf.appendChild(avatar);
	html_roomInf.appendChild(IDAndMaster);

	var roomPlayers = document.createElement('div');
	roomPlayers.className = 'roomPlayers';
	var playersTable = document.createElement('table');
	var playersTr = document.createElement('tr');
	for ( var a = 0; a < players.length; a++) {
		var playersTd = document.createElement('td');
		var playersImg = document.createElement('img');
		playersImg.className = 'avatar';
		playersImg.src = players[a].user.avatar;
		playersTd.appendChild(playersImg);
		playersTr.appendChild(playersTd);
	}
	playersTable.appendChild(playersTr);
	roomPlayers.appendChild(playersTable);

	var enter = document.createElement('div');
	enter.className = 'enter';
	enter.id = room_id;
	enter.onclick = Request.enterRoom;
	var enterBut = document.createElement('span');
	enterBut.className = 'enterBut';
	enterBut.innerHTML = '加入房间';
	if (!room.status) {
		enter.className = 'playing';
		enterBut.innerHTML = '游戏中···';
		enter.onclick = null;
	}
	enter.appendChild(enterBut);

	var html_room = document.createElement('div');
	html_room.className = 'room';
	html_room.appendChild(html_roomInf);
	html_room.appendChild(roomPlayers);
	html_room.appendChild(enter);

	td.appendChild(html_room);

});

function removeFocus(userID) {
	Xmlhttp.init();
	var url = 'l/add';
	var stateChange = function() {
		var focus = document.getElementById('focus' + userID);
		focus.type = "hidden";
	};
	Xmlhttp.removeFocus(url, userID, stateChange);
}

var Xmlhttp = {
	xmlhttp : null
};
Xmlhttp.init = function() {
	if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE6, IE5
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	} else {
		alert('Your browser does not support XMLHTTP.');
	}
};
Xmlhttp.removeFocus = function(url, userID, stateChange) {
	xmlhttp.onreadystatechange = stateChange;
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type',
			'application/x-www-form-urlencoded');
	xmlhttp.send('userID=' + userID);
};

PaintAndGuess.initialize();// Connect to the app
