<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Simple Map</title>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
		<meta charset="utf-8">
		<style>
html,body,#map-canvas {
	margin: 0;
	padding: 0;
	height: 100%;
}
</style>
		<script
			src="https://maps.googleapis.com/maps/api/js?sensor=false&language=zh-CN"></script>
		<script>
	function initialize() {
		navigator.geolocation.getCurrentPosition(draw);
	}
	function draw(position) {
		var geocoder = new google.maps.Geocoder();
		//position的经度和纬度
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var address = "";
		var locate = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);
		geocoder.geocode({
			location : locate
		}, function GeoResult(result, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				address = result[0].address_components[1].short_name;
				var request = window.ActiveXObject ? new ActiveXObject(
						'Microsoft.XMLHTTP') : new XMLHttpRequest;

				request.onreadystatechange = function() {
					if (request.readyState == 4) {
						request.onreadystatechange = null;
					}
				};

				request.open('POST', "../signin/signin", true);
				request.setRequestHeader('Content-type',
						'application/x-www-form-urlencoded');
				request.send("lat=" + lat + "&lng=" + lng + "&address="
						+ address)
			}

		});

	}
</script>
	</head>
	<body>
		<input type="button" value="chushihua" onclick="initialize()" />
	</body>
</html>
