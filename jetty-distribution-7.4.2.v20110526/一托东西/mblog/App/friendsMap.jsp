<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html >

<head>
	<base href="<%=basePath%>">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>MyFriendsMap</title>
	<style>
      html, body, #map {
        margin: 0;
        padding: 0;
        height: 100%;
      }
    </style>
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
	<script type="text/javascript">        
	 //<![CDATA[
	var customIcons = {
		restaurant : {
			icon : 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
			shadow : 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
		},
		bar : {
			icon : 'http://labs.google.com/ridefinder/images/mm_20_red.png',
			shadow : 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
		}
	};

	function load() {
		var map = new google.maps.Map(document.getElementById("map"), {
			center : new google.maps.LatLng(31.194069, 121.595322),
			zoom : 13,
			title : "here",
			mapTypeId : 'roadmap'
		});
		var infoWindow = new google.maps.InfoWindow;

		downloadUrl("json/viewFriendsMap",function(data) {
			var xml = data.responseText;
			var markers = JSON.parse(xml);
			for ( var i = 0; i < markers.length; i++) {
				var name = markers[i].name;
				var address = markers[i].address;
				var type = markers[i].type;
				var point = new google.maps.LatLng(parseFloat(markers[i].lat), parseFloat(markers[i].lng));
				if(type == "bar"){
					map.setCenter(point);
				}
				var html = "<b>" + name + "</b> <br/>" + address;
				var icon = customIcons[type] || {};
				var marker = new google.maps.Marker({
					map : map,
					position : point,
					icon : icon.icon,
					shadow : icon.shadow
				});
				
				bindInfoWindow(marker, map, infoWindow, html);
			}
		});
	}

	function bindInfoWindow(marker, map, infoWindow, html) {
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(html);
			infoWindow.open(map, marker);
		});
	}

	function downloadUrl(url, callback) {
		var request = window.ActiveXObject ? new ActiveXObject(
				'Microsoft.XMLHTTP') : new XMLHttpRequest;

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				request.onreadystatechange = doNothing;
				callback(request);
			}
		};

		request.open('POST', url, true);
		request.send(null);
	}

	function doNothing() {
	}

	//]]>
</script>

</head>

<body onload="load()">
	<div id="map" ></div>
</body>

</html>