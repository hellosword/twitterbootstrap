/**
 * 
 */
function initialize() {
	navigator.geolocation.getCurrentPosition(draw);
	alert("签到成功！");
}
function draw(position) {
	var geocoder = new google.maps.Geocoder();
	// position的经度和纬度
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

			request.open('POST', "signin/signin", true);
			request.setRequestHeader('Content-type',
					'application/x-www-form-urlencoded');
			request.send("lat=" + lat + "&lng=" + lng + "&address=" + address)
		}
	});
}
