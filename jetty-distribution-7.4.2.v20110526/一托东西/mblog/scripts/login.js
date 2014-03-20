$().ready(function() {
	$("#register_wrapper").hide();
	$("#show_login").click(function() {
		showLogin();
	});
	$("#show_register").click(function() {
		showRegister();
	});
	$("#start_button").click(function() {
		check();
	});
	$("#goto_login a").click(function() {
		regCheck();
	});
});

function getOs() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "MSIE";
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		return "Firefox";
	}
	if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
		return "Safari";
	}
	if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
		return "Camino";
	}
	if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
		return "Gecko";
	}
}

function showRegister() {
	$("#login_wrapper").animate({
		left : 'hide',
		opacity : 'hide',
		width : 'hide'
	}, "normal", function() {
		$("#login_wrapper").hide();
		$("#register_wrapper").animate({
			left : 'show',
			opacity : 'show',
			width : 'show'
		}, "normal", function() {
			$("#register_wrapper").show();
		});
	});
}

function showLogin() {
	$("#register_wrapper").animate({
		left : 'hide',
		opacity : 'hide',
		width : 'hide'
	}, "normal", function() {
		$("#register_wrapper").hide();
		$("#login_wrapper").animate({
			left : 'show',
			opacity : 'show',
			width : 'show'
		}, "normal", function() {
			$("#login_wrapper").show();
		});
	});
}

function check() {
	var username = document.getElementById("login_input_email");
	var password = document.getElementById("login_input_password");
	if (username.value == "") {
		username.setCustomValidity("请输入用户名");
	} else {
		username.setCustomValidity("");
		if (password.value == "") {
			password.setCustomValidity("请输入密码");
		} else {
			password.setCustomValidity("");
		}
	}
}

function badcheck() {
	if ($("#login_input_email").val() == "") {
		alert("请输入用户名");
		return false;
	}
	if ($("#login_input_password").val() == "") {
		alert("请输入密码");
		return false;
	}
	return true;
}

function regCheck() {
	/*var username = document.getElementById("reg_username");
	var password = document.getElementById("reg_password");
	var password2 = document.getElementById("reg_password2");
	if (username.value == "") {
		username.setCustomValidity("请输入用户名");
	} else {
		username.setCustomValidity("");
		if (password.value == "") {
			password.setCustomValidity("请输入密码");
		} else {
			password.setCustomValidity("");
			if (password2.value == "") {
				password2.setCustomValidity("请输入密码");
			} else if (password2.value != password.value) {
				password2.setCustomValidity("两次输入的密码不一致");
			} else {
				password.setCustomValidity("");
			}
		}
	}*/
}
function badregcheck() {
	/*if ($("#reg_username").val() == "") {
		alert("请输入用户名");
		return false;
	}
	if ($("#reg_password").val() == "") {
		alert("请输入密码");
		return false;
	}
	if ($("#reg_password2").val() != $("#reg_password").val()) {
		alert("两次输入的密码不一致");
		return false;
	}
	return true;*/
}