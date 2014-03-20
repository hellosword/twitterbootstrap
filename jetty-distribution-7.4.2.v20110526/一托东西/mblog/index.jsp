<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="styles/login.css" />
<script type="text/javascript" src="scripts/jquery-1.8.2.js"></script>
<script type="text/javascript" src="scripts/login.js"></script>
<title>Draw Something - Login</title>
</head>
<body>
	<div id="wrapper">
		<div id="logo">
			<img src="images/img/logo.png" />
		</div>
		<div id="login_wrapper" class="container">
			<s:form action="login" method="post">
				<%
					Object error = request.getSession().getAttribute("error");
						if (error == null) {
				%>
				<div class="title">Welcome Back</div>
				<%
					} else {
				%>
				<div class="title">用户名或密码错误</div>
				<%
					}
				%>
				<div class="account_div input_div">
					<label class="account_icon icon"><img alt="用户名"
						src="images/img/account_icon.png"> </label> <input type="text"
						id="login_input_email" class="input" name="username"
						placeholder="你的Email" />
				</div>
				<div class="password_div input_div">
					<label class="password_icon icon"><img alt="密码"
						src="images/img/password_icon.png"> </label> <input type="password"
						id="login_input_password" class="input" name="password"
						placeholder="输入你的密码" />
				</div>
				<input type="submit" id="login_button" class="button" value="登录" />
			</s:form>
		</div>
		<div id="register_wrapper" class="container">
			<form action="reg" method="post">
				<%
					Object error = request.getSession().getAttribute("error");
						if (error == null) {
				%>
				<div class="title">Welcome</div>
				<%
					} else {
				%>
				<div class="title">注册用户名重复</div>
				<%
					}
				%>
				<div class="email_div input_div">
					<label class="email_icon icon"><img alt="邮箱"
						src="images/img/email_icon.png"> </label> <input
						id="register_input_email" class="input" name="account"
						placeholder="你的Email" />
				</div>
				<div class="account_div input_div">
					<label class="account_icon icon"><img alt="昵称"
						src="images/img/account_icon.png"> </label> <input
						id="register_input_nickname" class="input" name="nickname"
						placeholder="你的昵称" />
				</div>
				<div class="password_div input_div">
					<label class="password_icon icon"><img alt="密码"
						src="images/img/password_icon.png"> </label> <input
						id="register_input_password" class="input" name="password" type="password"
						placeholder="输入你的密码" />
				</div>
				<div class="password_div input_div">
					<label class="password_icon icon"><img alt="密码"
						src="images/img/password_icon.png"> </label> <input
						id="register_input_password2" class="input" name="password2" type="password"
						placeholder="输再次入你的密码" />
				</div>
				<div class="comefrom_div input_div">
					<label class="comefrom_icon icon"><img alt="来自"
						src="images/img/from_icon.png"> </label> <input
						id="register_input_comefrom" class="input" name="comefrom"
						placeholder="你来自哪里" />
				</div>
				<div class="gender_div">
					<input type="radio" value="male" checked="checked" name="gender" />男
					<input type="radio" value="female" name="gender" />女
				</div>
				<input type="submit" id="register_button" class="button" value="注册" />
			</form>
		</div>

		<div id="footer">
			<div id="foot_sep1"></div>
			<div id="foot_sep2"></div>
			<div id="btns">
				<a class="button" id="show_register">注册</a> <a class="button"
					id="show_login">登录</a>
			</div>
		</div>
	</div>
</body>
</html>