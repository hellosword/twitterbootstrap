function sendXmlHttpRequest(url) {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","json/" + url,true);
	xmlhttp.send();
}

var sendBut = document.getElementById("but");
but.onclick = function(){
	var send = document.getElementById("send");
	var url = send.value;
	sendXmlHttpRequest(url);
};
